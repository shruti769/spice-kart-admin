// Address → map pin with OpenStreetMap's free Nominatim service (no key needed).
// Usage policy (https://operations.osmfoundation.org/policies/nominatim/): at most one request a
// second, no search-as-you-type, and show the attribution. So this only runs when the admin
// presses "Find on map", and callers must wait for one search to finish before the next.

const ENDPOINT = 'https://nominatim.openstreetmap.org/search'
let lastCall = 0

/**
 * Up to 5 Australian matches for `query`:
 * `[{ label, lat, lon, address_line, suburb, state, postcode }]`.
 */
export async function searchAddress(query) {
  const wait = lastCall + 1100 - Date.now()
  if (wait > 0) await new Promise((r) => setTimeout(r, wait))
  lastCall = Date.now()
  const url = `${ENDPOINT}?${new URLSearchParams({ q: query, format: 'jsonv2', addressdetails: '1', countrycodes: 'au', limit: '5' })}`
  let res
  try {
    res = await fetch(url, { headers: { Accept: 'application/json', 'Accept-Language': 'en-AU' } })
  } catch {
    throw new Error('Couldn’t reach OpenStreetMap · check your internet connection')
  }
  if (res.status === 429) throw new Error('OpenStreetMap is busy · try again in a minute')
  if (!res.ok) throw new Error(`OpenStreetMap search failed (${res.status})`)
  const rows = await res.json()
  return rows.map((r) => {
    const a = r.address ?? {}
    const street = [a.house_number, a.road].filter(Boolean).join(' ')
    return {
      label: r.display_name.replace(/, Australia$/, ''),
      lat: Number(r.lat),
      lon: Number(r.lon),
      address_line: [a.unit ? `${a.unit}/` : '', street].join('') || a.amenity || '',
      suburb: a.suburb || a.city_district || a.town || a.village || a.city || '',
      state: (a['ISO3166-2-lvl4'] || '').replace(/^AU-/, ''),
      postcode: a.postcode || '',
    }
  })
}

/** OpenStreetMap embed URL showing a marker at lat/lon. */
export function mapEmbedUrl(lat, lon) {
  const dLat = 0.004, dLon = 0.007
  const bbox = [lon - dLon, lat - dLat, lon + dLon, lat + dLat].map((n) => n.toFixed(5)).join(',')
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat.toFixed(6)},${lon.toFixed(6)}`
}

export const mapLink = (lat, lon) => `https://www.openstreetmap.org/?mlat=${lat.toFixed(6)}&mlon=${lon.toFixed(6)}#map=17/${lat.toFixed(6)}/${lon.toFixed(6)}`
