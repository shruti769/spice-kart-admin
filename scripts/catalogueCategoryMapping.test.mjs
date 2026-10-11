import test from 'node:test'
import assert from 'node:assert/strict'
import { mappedCatalogueCategory, planCatalogueCategoryRepair, repairCatalogueCategories } from '../src/lib/catalogueCategoryMapping.js'

const categories = [
  ['flours', 'FLOURS'], ['general', 'General Foods'], ['fasting', 'Fasting Foods'],
  ['tea', 'Tea & Beverages'], ['baking', 'Sweeteners & Miscellaneous Baking'],
  ['snacks', 'SNACKS'], ['savouries', 'Snacks And Savouries'],
].map(([id, name]) => ({ id, name, enabled: true }))
const products = [
  { id: 'a', name: 'GANESH SABUDANA 908GM', category_id: 'flours' },
  { id: 'b', name: 'Tata Tea Premium Tea 1 kg', category_id: 'general' },
  { id: 'c', name: 'INDYA TUTI FRUTI RED 200GM', category_id: 'general' },
  { id: 'd', name: 'TATA Salt 1Kg', category_id: 'general' },
]

test('moves workbook products to the correct aisles and only hides the empty duplicate', () => {
  const plan = planCatalogueCategoryRepair(products, categories)
  assert.deepEqual(plan.moves.map((p) => [p.id, p.targetId, p.subcategory]), [
    ['a', 'fasting', 'Fasting Flours & Items'], ['b', 'tea', null], ['c', 'baking', null],
  ])
  assert.equal(plan.duplicate.id, 'snacks')
})

test('preserves unrelated names, tea masala in Spices, and manual category changes', () => {
  assert.equal(mappedCatalogueCategory('EVEREST TEA MASALA 100GM', 'Spices & Masalas'), null)
  assert.equal(mappedCatalogueCategory('TATA Salt 1Kg', 'General Foods'), null)
  assert.equal(mappedCatalogueCategory('GANESH SABUDANA 908GM', 'Pulses & Lentils'), null)
})

test('already repaired products are not moved again', () => {
  const first = planCatalogueCategoryRepair(products, categories)
  const repaired = products.map((p) => ({ ...p, category_id: first.moves.find((m) => m.id === p.id)?.targetId || p.category_id }))
  assert.equal(planCatalogueCategoryRepair(repaired, categories).moves.length, 0)
})

test('never hides a duplicate that has products or lacks an enabled replacement', () => {
  assert.equal(planCatalogueCategoryRepair([...products, { id: 'e', category_id: 'snacks' }], categories).duplicate, undefined)
  assert.equal(planCatalogueCategoryRepair(products, categories.filter((c) => c.id !== 'savouries')).duplicate, undefined)
})

test('fails before any writes if a destination is missing or disabled', () => {
  assert.throws(() => planCatalogueCategoryRepair(products, categories.filter((c) => c.id !== 'tea')), /Missing category/)
  assert.throws(() => planCatalogueCategoryRepair(products, categories.map((c) => c.id === 'fasting' ? { ...c, enabled: false } : c)), /Enable Fasting/)
})

test('does not read or write catalogue data without a signed-in user', async () => {
  const client = { auth: { getUser: async () => ({ data: { user: null }, error: null }) }, from: () => assert.fail('Unauthenticated catalogue access') }
  assert.equal(await repairCatalogueCategories(client), null)
})

test('merges legacy SPICES into Spices & Masalas while preserving product subcategories', () => {
  const cats = [...categories, { id: 'spices', name: 'SPICES', enabled: true }, { id: 'spices-and-masalas', name: 'Spices & Masalas', enabled: true }]
  const rows = [{ id: 'x', name: 'GANESH CUMIN POWDER', category_id: 'spices', subcategory: 'Ground Spices' }]
  const plan = planCatalogueCategoryRepair(rows, cats)
  assert.equal(plan.moves[0].targetId, 'spices-and-masalas')
  assert.equal(plan.moves[0].subcategory, 'Ground Spices')
  assert(plan.duplicates.some((c) => c.id === 'spices'))
  assert.equal(planCatalogueCategoryRepair([{ ...rows[0], category_id: 'spices-and-masalas' }], cats).moves.length, 0)
})

test('guarded writes retry after a denial and stop overwriting products moved by another admin', async () => {
  const writes = [], subs = []
  let denied = true
  const client = {
    auth: { getUser: async () => ({ data: { user: { id: 'admin' } }, error: null }) },
    from(table) {
      return {
        select(_columns, options) {
          if (table === 'categories') return Promise.resolve({ data: categories, error: null })
          if (options?.head) return { eq: async () => ({ count: 0, error: null }) }
          return { order: () => ({ range: async () => ({ data: products, error: null }) }) }
        },
        upsert(values) { subs.push(values); return Promise.resolve({ error: null }) },
        update(values) {
          const guards = []
          const query = {
            eq(key, value) { guards.push([key, value]); return query },
            async select() {
              writes.push({ table, values, guards })
              if (denied) { denied = false; return { data: null, error: { message: 'Denied' } } }
              // The tea product was moved elsewhere while this repair was running.
              return { data: guards.some(([k, v]) => k === 'id' && v === 'b') ? [] : [{ id: 'saved' }], error: null }
            },
          }
          return query
        },
      }
    },
  }
  await assert.rejects(repairCatalogueCategories(client), { message: 'Denied' })
  assert.deepEqual(await repairCatalogueCategories(client), { moved: 2, hidden: 1 })
  const fasting = writes.find((w) => w.table === 'products')
  assert.deepEqual(fasting.guards, [['id', 'a'], ['name', 'GANESH SABUDANA 908GM'], ['category_id', 'flours']])
  assert.deepEqual(fasting.values, { category_id: 'fasting', subcategory: 'Fasting Flours & Items' })
  assert(subs.every((s) => s.category_id === 'fasting'))
  assert.deepEqual(writes.at(-1).values, { enabled: false })
})
