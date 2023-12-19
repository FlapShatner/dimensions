

export const getCurrentUrl = () => {
    const url = window.location.href
    return url
}    

export const getSelectedVariant =() => {
    const url = getCurrentUrl()    
  const queryParams = new URLSearchParams(new URL(url).search);
  return queryParams.get('variant');
}


export const getCurrentProduct = async () => {
    const url = getCurrentUrl()    
    const productId = url.split('/products/')[1].split('?')[0]
   const product = await fetch(window.Shopify.routes.root + 'products/' + productId + '.js')
    const productJson = await product.json()
    return productJson
}

export const addToCart = async (formData) => {    
    try {
        const result = await fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const resultJson = await result.json()
        // console.log("resultJson", resultJson)
        return resultJson
    }
    catch {
        console.log('error')
    }
}
