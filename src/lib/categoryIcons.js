import { fetchCategories, uploadCategoryImage, updateCategory, removeCategoryImage, notifyCategoriesChanged } from './categories'

// Supplied artwork matched by the full category name, not its shortened label.
const matches = [
  [/cosmetic|personal care|beauty/i, 'cosmetics'],
  [/dairy|refrigerated|milk/i, 'dairy'], [/bakery|bread/i, 'bakery'],
  [/fresh produce|vegetable.*fruit|vegeies.*fruit/i, 'produce'],
  [/fasting|farari/i, 'fasting'], [/flour|atta/i, 'flours'],
  [/pulses|lentils|beans/i, 'pulses'], [/spice|masala/i, 'spices'],
  [/oil|ghee/i, 'oil'], [/snack|savour/i, 'snacks'],
  [/instant|ready to eat|^ret$/i, 'instant'], [/grain|rice|cereal/i, 'grains'],
  [/tea|beverage|coffee/i, 'beverages'], [/condiment|pickle|paste|papad|papdum|fryum/i, 'condiments'],
  [/sweetener|miscellaneous baking|jaggery|sugar/i, 'sweeteners'],
  [/general food/i, 'general'], [/pooja|festival/i, 'pooja'],
  [/frozen|frojen/i, 'frozen'],
]
export function categoryIcon(name) {
  const match = matches.find(([pattern]) => pattern.test(name || ''))
  return match ? `${import.meta.env.BASE_URL}category-icons-3d/${match[1]}.png` : null
}

export async function applyCategoryIcons(onProgress) {
  const rows = await fetchCategories()
  let saved = 0, skipped = 0
  try {
    for (const row of rows) {
      const icon = categoryIcon(row.name)
      if (!icon) { skipped++; continue }
      const response = await fetch(icon)
      if (!response.ok) throw new Error(`Could not load the icon for ${row.name}`)
      const blob = await response.blob()
      const file = new File([blob], icon.split('/').at(-1), { type: 'image/png' })
      const uploaded = await uploadCategoryImage(file, row.id)
      try { await updateCategory(row.id, { image_url: uploaded.url }) }
      catch (error) { await removeCategoryImage(uploaded.path); throw error }
      await removeCategoryImage(row.image_url)
      saved++
      onProgress(saved)
    }
    return { saved, skipped }
  } catch (error) {
    throw new Error(`${saved} icons saved. ${error.message || 'Could not save icons'}`, { cause: error })
  } finally { notifyCategoriesChanged() }
}
