export function getProductCasings(product) {
    let productCasingData = product.collection.casings
    let materialMap = new Map();

    productCasingData.forEach(item => {
        if (materialMap.has(item.material)) {
            materialMap.get(item.material).push(item);
        } else {
            materialMap.set(item.material, [item]);
        }
    });
    return  Object.fromEntries(materialMap);
}

export function getCasingVariants(product) {


    let casingData = product.collection

    let output = {};

    for (let casing of casingData.casings) {
        let casingValue = casing.casing;
        if (!(casingValue in output)) {
            output[casingValue] = {};
        }
        for (let variant of casing.casing_variants) {
            let colorValue = variant.color;
            if (!(colorValue in output[casingValue])) {
                output[casingValue][colorValue] = [];
            }
            output[casingValue][colorValue].push(variant);
        }
    }
    return  output;

}

export function getMaterialColorVariantsByColorId(products, colorId) {
    return products.reduce((output, product) => {
        product.product_variants.forEach(variant => {
            const matchingColors = variant.material_color_variant.filter(item => item.color === colorId);
            matchingColors.forEach(color => {
                output.push({
                    name: product.name,
                    material: variant.material,
                    color: color.color,
                    price: color.price,
                    id: product.id,
                    leaf_image: color.leaf_image,
                    merged_image: color.merged_image
                });
            });
        });
        return output;
    }, []);
}