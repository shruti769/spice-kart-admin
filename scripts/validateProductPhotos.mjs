import { readFile, stat } from 'node:fs/promises'
import { resolve, extname } from 'node:path'
import assert from 'node:assert/strict'

const root = resolve('public/product-photo-samples')
const rows = JSON.parse(await readFile(resolve(root, 'manifest.json'), 'utf8'))
const pending = JSON.parse(await readFile(resolve(root, 'unmatched.json'), 'utf8'))
const names = new Set()
for (const row of rows) {
  assert.equal(typeof row.name, 'string')
  assert(!names.has(row.name), `Repeated product name: ${row.name}`)
  names.add(row.name)
  assert(/^[a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|webp|avif)$/.test(row.file), `Unsafe image filename: ${row.file}`)
  const file = resolve(root, row.file)
  assert((await stat(file)).size > 100, `Empty image: ${row.file}`)
  assert(['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(extname(file)))
  const bytes = await readFile(file)
  if (/\.jpe?g$/.test(file)) assert(bytes[0] === 255 && bytes[1] === 216, `Wrong JPEG MIME extension: ${row.file}`)
  if (file.endsWith('.png')) assert(bytes.subarray(1, 4).toString() === 'PNG', `Wrong PNG MIME extension: ${row.file}`)
  if (file.endsWith('.webp')) assert(bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP', `Wrong WebP MIME extension: ${row.file}`)
  assert(['source', 'generic', 'generated'].includes(row.kind || 'source'))
  if (row.kind !== 'generated') assert(row.source?.startsWith('https://'), `Missing source for ${row.name}`)
}
for (const row of pending) assert(!names.has(row.name), `Photo also listed as pending: ${row.name}`)
if (!pending.length) {
  for (const [name, subject] of [
    ['MATTA RICE 5 KG', 'matta-rice'],
    ['KAMAL GATTA(KAMAL KAKDI) 100 GM', 'lotus-seeds'],
    ['BIKAJI Khatta Meetha 1 KG', 'namkeen-mix'],
    ['KATOOMBA Poona Beans 1kg', 'red-cowpeas'],
    ['GANESH MAKAI POHA 1 KG', 'corn-poha'],
    ['GREEN MUKHVAS 100GMX20', 'green-mukhwas'],
    ['PATCHAULI', 'incense'],
  ]) assert.equal(rows.find((row) => row.name === name)?.promptSubject, subject, `Wrong contents photo for ${name}`)
  assert.equal(rows.find((row) => row.name === 'FEM')?.file, 'fem-pearl-bleach-pack.jpg')
}
console.log(`${rows.length} product photo mappings validated; ${pending.length} pending.`)
