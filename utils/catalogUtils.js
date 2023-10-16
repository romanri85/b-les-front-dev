export function getProductCasings(product) {
  const productCasingData = product.collection.casings
  const materialMap = new Map()

  productCasingData.forEach((item) => {
    if (materialMap.has(item.material))
      materialMap.get(item.material).push(item)
    else
      materialMap.set(item.material, [item])
  })
  return Object.fromEntries(materialMap)
}

export function getCasingVariants(product) {
  const casingData = product.collection

  const output = {}

  for (const casing of casingData.casings) {
    const casingValue = casing.casing
    if (!(casingValue in output))
      output[casingValue] = {}

    for (const variant of casing.casing_variants) {
      const colorValue = variant.color
      if (!(colorValue in output[casingValue]))
        output[casingValue][colorValue] = []

      output[casingValue][colorValue].push(variant)
    }
  }
  return output
}

export function getMaterialColorVariantsByColorId(products, colorId) {
  return products.reduce((output, product) => {
    product.product_variants.forEach((variant) => {
      const matchingColors = variant.material_color_variant.filter(item => item.color === colorId)
      matchingColors.forEach((color) => {
        output.push({
          name: product.name,
          material: variant.material,
          color: color.color,
          price: color.price,
          id: product.id,
          leaf_image: color.leaf_image,
          merged_image: color.merged_image,
        })
      })
    })
    return output
  }, [])
}
