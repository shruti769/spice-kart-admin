import { mappedCatalogueCategory } from './catalogueCategoryMapping.js'

export const normalizeName = (value) => String(value ?? '').trim().replace(/\s+/g, ' ')
const key = (value) => normalizeName(value).toLowerCase()
const text = (cell) => cell.value == null ? '' : normalizeName(cell.text)
const CATEGORY_NAMES = {
  Flours: 'Flours', Spices: 'Spices & Masalas', 'Powd Spices': 'Spices & Masalas',
  'Whole@Ground Spices': 'Spices & Masalas', 'Papdum@Fryums': 'Condiments,Pickles and Paste',
  'Pickles@Paste': 'Condiments,Pickles and Paste', 'OIL@GHEE': 'Oil & Ghee',
  'Lentils@Pulses-Beans': 'Pulses & Lentils', RET: 'Instant & Ready to Eat',
  'INSTANT MIX': 'Instant & Ready to Eat', Rice: 'Grains, Rice @ Cereals',
  Snacks: 'Snacks And Savouries', 'Dairy Products': 'Dairy & Refrigerated',
  'Vegeies @ Fruits': 'Fresh Produce', 'Frojen Food and Vegeies': 'Instant & Ready to Eat',
  'Frojen Foods @Veggies': 'Frojen Foods & Vegetables', 'Pooja@Festival': 'Pooja/Festival',
  'Bakery @Bread': 'Bakery & Bread', 'GENERAL FOODS': 'General Foods',
}

// Reads this catalogue's numbered lists; headings and unpriced product rows stay distinct.
export function parseCatalogueWorkbook(workbook) {
  const rows = [], excluded = [], seen = new Map(), categoryDefinitions = []
  workbook.getWorksheet('Categories')?.eachRow((row) => {
    if (/^\d+$/.test(text(row.getCell(1)))) {
      const name = text(row.getCell(2)).replace(/\s*-+\s*(?:\d+\s*)?sub$/i, '').trim()
      if (name) categoryDefinitions.push(name)
    }
  })
  workbook.eachSheet((sheet) => {
    if (sheet.name === 'Categories') return
    if (sheet.name === 'Sheet1 (3)') { excluded.push(sheet.name); return }
    let nameCol = 5, priceCol = 8, headerRow = 0, subcategory = ''
    sheet.eachRow((row, index) => {
      row.eachCell((cell, col) => {
        if (cell.isMerged && cell.master.address !== cell.address) return
        if (/^product name$/i.test(text(cell))) { nameCol = col; headerRow = index }
        if (/^sale price/i.test(text(cell))) priceCol = col
      })
    })
    sheet.eachRow((row, index) => {
      if (index <= headerRow) return
      const name = text(row.getCell(nameCol)), serial = text(row.getCell(nameCol - 1))
      if (!name || /^product name$/i.test(name)) return
      const rawPrice = row.getCell(priceCol).value
      const value = rawPrice && typeof rawPrice === 'object' ? rawPrice.result : rawPrice
      const price = typeof value === 'number' ? value : Number(String(value ?? '').replace(/[$,\s]/g, ''))
      const hasPrice = value !== null && value !== undefined && value !== ''
      if (/^in \$$/i.test(String(value ?? '').trim())) return
      const numbered = /^\d+$/.test(serial)
      if (!hasPrice && !numbered) {
        if (/^[A-Z]$/i.test(serial)) subcategory = name
        return
      }
      const sourceCategory = CATEGORY_NAMES[sheet.name] || sheet.name
      const mapped = mappedCatalogueCategory(name, sourceCategory)
      const category = mapped?.category || sourceCategory
      const duplicate = seen.get(key(name))
      const issue = !hasPrice ? 'Missing price' : !Number.isFinite(price) || price <= 0 ? 'Invalid price' : name.length > 200 ? 'Name exceeds 200 characters' : duplicate ? `Repeated product (first: ${duplicate})` : ''
      if (!issue) seen.set(key(name), `${sheet.name}, row ${index}`)
      rows.push({ id: `${sheet.id}-${index}`, sheet: sheet.name, row: index, name, category, subcategory: mapped ? mapped.subcategory : subcategory, price: hasPrice && Number.isFinite(price) ? Math.round(price * 100) / 100 : null, issue, selected: !issue })
    })
  })
  return { rows, excluded, categoryDefinitions }
}

export async function readCatalogueFile(file) {
  if (!/\.xlsx$/i.test(file.name)) throw new Error('Choose an .xlsx workbook')
  if (file.size > 10 * 1024 * 1024) throw new Error('Maximum workbook size is 10 MB')
  const { default: ExcelJS } = await import('exceljs')
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(await file.arrayBuffer())
  const result = parseCatalogueWorkbook(workbook)
  if (!result.rows.length) throw new Error('No product rows found. Use Product Name and Sale Price columns with numbered product rows.')
  return result
}

export async function importCatalogue(rows, db, helpers, onProgress, categoryDefinitions = []) {
  // Refresh all saved names to make retries after partial failure safe.
  const existing = new Set()
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db.from('products').select('name').range(from, from + 999).order('id')
    if (error) throw error
    data.forEach((p) => existing.add(key(p.name)))
    if (data.length < 1000) break
  }
  const categories = await helpers.fetchCategories()
  for (const name of categoryDefinitions) {
    if (categories.some((c) => key(c.name) === key(name))) continue
    const category = { id: helpers.uniqueSlug(name, categories.map((c) => c.id)), name, short_name: name.slice(0, 30), sort: Math.max(0, ...categories.map((c) => c.sort || 0)) + 1, enabled: true, bg_color: '#F1F3EE' }
    await helpers.createCategory(category)
    categories.push({ ...category, subcategories: [] })
  }
  let added = 0, skipped = 0
  for (const row of rows) {
    if (existing.has(key(row.name))) { skipped++; continue }
    let category = categories.find((c) => key(c.name) === key(row.category))
    if (!category) {
      const id = helpers.uniqueSlug(row.category, categories.map((c) => c.id))
      category = { id, name: row.category, short_name: row.category.slice(0, 30), sort: Math.max(0, ...categories.map((c) => c.sort || 0)) + 1, enabled: true, bg_color: '#F1F3EE', subcategories: [] }
      const { subcategories, ...values } = category
      await helpers.createCategory(values)
      category.subcategories = subcategories
      categories.push(category)
    }
    if (row.subcategory && !category.subcategories.includes(row.subcategory)) {
      await helpers.addSubcategory(category.id, row.subcategory, category.subcategories.length + 1)
      category.subcategories.push(row.subcategory)
    }
    const pack = row.name.match(/\b\d+(?:\.\d+)?\s*(?:KG|GM|G|ML|LTR|L|PCS|PACKS?)\b/i)?.[0] || ''
    const { error } = await db.from('products').insert({
      name: row.name, category_id: category.id, subcategory: row.subcategory || null,
      price: row.price, description: '', brand: '', weight: pack,
      stock_qty: 0, track_inventory: false, published: true,
      express_delivery: true, scheduled_delivery: true, sensitive: false, image_url: null,
    })
    if (error) throw new Error(`${row.sheet}, row ${row.row}: ${error.message}. ${added} products saved; retry skips saved names.`)
    existing.add(key(row.name)); added++
    onProgress({ added, skipped })
  }
  return { added, skipped }
}
