const normalize = (name) => String(name || '').trim().replace(/\s+/g, ' ').toLowerCase()

// These rows belong to dedicated aisles even though the workbook groups them
// under Flours or General Foods. Keep unrelated and manually moved rows intact.
const groups = [
  { source: 'Flours', category: 'Fasting Foods', subcategory: 'Fasting Flours & Items', names: [
    'GANESH RAJGIRA WHOLE 454GM', 'GANESH RAJGIRA FLOUR 454GM', 'GANESH FASTING FLOUR 454GM',
    'GANESH SHINGODA FLOUR 454GM', 'GANESH MORAIYA 454GM', 'GANESH MORAIYA 908GM',
    'GANESH SABUDANA 454GM', 'GANESH SABUDANA 908GM',
  ] },
  { source: 'General Foods', category: 'Tea & Beverages', subcategory: '', names: [
    'Wagh Bakari Tea 500 gm', 'Wagh Bakari Tea 1 kg', 'WaghBakari Tea Masala 250gm',
    'Red label Tea 1 Kg', 'Tata Tea Premium Tea 1 kg',
  ] },
  { source: 'General Foods', category: 'Sweeteners & Miscellaneous Baking', subcategory: '', names: [
    'NAYHA JAGGERY 1 KG', 'NAYHA JAGGERY 2 KG', 'NAYHA JAGGERY 5 KG',
    'GANESH CRYSTAL SAKAR 454GMX20', 'NAYHA Punjabi Shakkar 1kg X 12',
    'NAYHA Pesi Jaggery 1kg X 12', 'NAYHA Masala Jaggery 1kg X 12',
    'INDYA TUTI FRUTI RED 200GM', 'INDYA TUTI FRUTI GREEN 200GM',
  ] },
]

export function mappedCatalogueCategory(name, sourceCategory) {
  const group = groups.find((g) => normalize(g.source) === normalize(sourceCategory) && g.names.some((n) => normalize(n) === normalize(name)))
  return group ? { category: group.category, subcategory: group.subcategory } : null
}

export function planCatalogueCategoryRepair(products, categories) {
  const byId = new Map(categories.map((c) => [c.id, c]))
  const moves = []
  for (const product of products) {
    const source = byId.get(product.category_id)
    const mapped = mappedCatalogueCategory(product.name, source?.name)
    if (!mapped) continue
    const target = categories.find((c) => normalize(c.name) === normalize(mapped.category))
    if (!target) throw new Error(`Missing category: ${mapped.category}`)
    if (!target.enabled) throw new Error(`Enable ${mapped.category} before correcting products`)
    moves.push({ ...product, targetId: target.id, subcategory: mapped.subcategory || null })
  }
  const canonicalSnacks = categories.find((c) => normalize(c.name) === 'snacks and savouries' && c.enabled)
  const duplicate = canonicalSnacks && categories.find((c) => c.id === 'snacks' && normalize(c.name) === 'snacks' && c.enabled && !products.some((p) => p.category_id === c.id))
  return { moves, duplicate }
}

let running = null
let complete = false
export function repairCatalogueCategories(client) {
  if (complete) return Promise.resolve({ moved: 0, hidden: 0 })
  if (running) return running
  running = performRepair(client).then((result) => { if (result) complete = true; return result }).finally(() => { running = null })
  return running
}

async function performRepair(client) {
  const { data: auth, error: authError } = await client.auth.getUser()
  if (authError) throw authError
  if (!auth.user) return null
  const { data: categories, error: catError } = await client.from('categories').select('id,name,enabled')
  if (catError) throw catError
  const products = []
  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await client.from('products').select('id,name,category_id').order('id').range(offset, offset + 999)
    if (error) throw error
    products.push(...data)
    if (data.length < 1000) break
  }
  const { moves, duplicate } = planCatalogueCategoryRepair(products, categories)
  let moved = 0, hidden = 0
  for (const row of moves) {
    if (row.subcategory) {
      const { error } = await client.from('subcategories').upsert({ category_id: row.targetId, name: row.subcategory, sort: 1 }, { onConflict: 'category_id,name', ignoreDuplicates: true })
      if (error) throw error
    }
    const { data, error } = await client.from('products').update({ category_id: row.targetId, subcategory: row.subcategory })
      .eq('id', row.id).eq('name', row.name).eq('category_id', row.category_id).select('id')
    if (error) throw error
    moved += data.length
  }
  if (duplicate) {
    // Recheck after the reads above; preserve it if a product now uses this aisle.
    const { count, error } = await client.from('products').select('id', { count: 'exact', head: true }).eq('category_id', duplicate.id)
    if (error) throw error
    if (count === 0) {
      const { data, error: hideError } = await client.from('categories').update({ enabled: false }).eq('id', duplicate.id).eq('name', duplicate.name).eq('enabled', true).select('id')
      if (hideError) throw hideError
      hidden = data.length
    }
  }
  return { moved, hidden }
}
