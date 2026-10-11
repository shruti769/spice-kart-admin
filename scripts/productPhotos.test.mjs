import test from 'node:test'
import assert from 'node:assert/strict'
import { saveProductPhoto } from '../src/lib/productPhotos.js'

function fakeClient(products, { updateError = null, stale = false, uploadError = null } = {}) {
  const calls = { uploads: [], deletes: [], guards: [], updates: [] }
  const bucket = {
    async upload(path) { calls.uploads.push(path); return { error: uploadError } },
    getPublicUrl() { return { data: { publicUrl: 'https://example.test/photo.jpg' } } },
    async remove(paths) { calls.deletes.push(...paths); return { error: null } },
  }
  const update = {
    eq(column, value) { calls.guards.push([column, value]); return update },
    is(column, value) { calls.guards.push([column, value]); return update },
    async select() { return { data: stale ? [] : [{ id: 1 }], error: updateError } },
  }
  const client = {
    from() { return {
      select() { return { async eq() { return { data: products, error: null } } } },
      update(values) { calls.updates.push(values); return update },
    } },
    storage: { from() { return bucket } },
  }
  return { client, calls }
}
const row = { name: 'MATCHED PRODUCT', file: 'photo.jpg' }
const fetchPhoto = async () => new Response(new Blob(['image'], { type: 'image/jpeg' }))

for (const [description, products] of [
  ['existing photo', [{ id: 1, image_url: 'existing' }]],
  ['missing product', []],
  ['duplicate names', [{ id: 1, image_url: null }, { id: 2, image_url: null }]],
]) {
  test(`skips ${description} before upload`, async () => {
    const { client, calls } = fakeClient(products)
    assert.equal(await saveProductPhoto(client, row, '/', fetchPhoto), 'skipped')
    assert.equal(calls.uploads.length, 0)
    assert.equal(calls.updates.length, 0)
  })
}
for (const image_url of [null, '']) {
  test(`saves only if image is still ${JSON.stringify(image_url)}`, async () => {
    const { client, calls } = fakeClient([{ id: 1, image_url }])
    assert.equal(await saveProductPhoto(client, row, '/', fetchPhoto), 'saved')
    assert.deepEqual(calls.guards, [['id', 1], ['name', row.name], ['image_url', image_url]])
    assert.equal(calls.deletes.length, 0)
  })
}
test('removes only the new upload after another admin adds a photo', async () => {
  const { client, calls } = fakeClient([{ id: 1, image_url: null }], { stale: true })
  assert.equal(await saveProductPhoto(client, row, '/', fetchPhoto), 'skipped')
  assert.deepEqual(calls.deletes, calls.uploads)
})
test('cleans upload and propagates a denied database update', async () => {
  const error = new Error('Denied')
  error.code = '42501'
  const { client, calls } = fakeClient([{ id: 1, image_url: null }], { updateError: error })
  await assert.rejects(saveProductPhoto(client, row, '/', fetchPhoto), error)
  assert.deepEqual(calls.deletes, calls.uploads)
})
test('keeps the uploaded object when a response is lost after a possible commit', async () => {
  const { client, calls } = fakeClient([{ id: 1, image_url: null }], { updateError: new Error('Failed to fetch') })
  await assert.rejects(saveProductPhoto(client, row, '/', fetchPhoto), /Failed to fetch/)
  assert.equal(calls.deletes.length, 0)
})
test('failed upload never changes the product', async () => {
  const { client, calls } = fakeClient([{ id: 1, image_url: null }], { uploadError: new Error('Storage denied') })
  await assert.rejects(saveProductPhoto(client, row, '/', fetchPhoto), /Storage denied/)
  assert.equal(calls.updates.length, 0)
})
test('rejects an HTML error returned as a successful response', async () => {
  const { client, calls } = fakeClient([{ id: 1, image_url: null }])
  await assert.rejects(saveProductPhoto(client, row, '/', async () => new Response('error', { headers: { 'Content-Type': 'text/html' } })), /Invalid photo/)
  assert.equal(calls.uploads.length, 0)
})
