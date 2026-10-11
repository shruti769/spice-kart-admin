// Match one product only, and preserve an image added by another admin.
export async function saveProductPhoto(client, row, base, fetchImage = fetch) {
  const { data: products, error: readError } = await client.from('products').select('id,image_url').eq('name', row.name)
  if (readError) throw readError
  if (products.length !== 1 || products[0].image_url) return 'skipped'
  const product = products[0]
  const response = await fetchImage(`${base}${row.file}`)
  if (!response.ok) throw new Error(`Could not load ${row.name}`)
  const blob = await response.blob()
  if (!blob.type.startsWith('image/')) throw new Error('Invalid photo file')
  const path = `catalogue/${product.id}-${crypto.randomUUID()}.${row.file.split('.').at(-1)}`
  const bucket = client.storage.from('product-images')
  const { error: uploadError } = await bucket.upload(path, blob, { contentType: blob.type, upsert: false })
  if (uploadError) throw uploadError
  const url = bucket.getPublicUrl(path).data.publicUrl
  const update = client.from('products').update({ image_url: url }).eq('id', product.id).eq('name', row.name)
  const { data, error } = await (product.image_url === null ? update.is('image_url', null) : update.eq('image_url', product.image_url)).select('id')
  if (error) {
    // A lost response may follow a successful commit. Keep the object unless
    // the server definitively rejected the update, so saved URLs stay valid.
    if (/^(?:\d{5}|PGRST\d+)$/.test(error.code || '')) await bucket.remove([path])
    throw error
  }
  if (!data?.length) { await bucket.remove([path]); return 'skipped' }
  return 'saved'
}
