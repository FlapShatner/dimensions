

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

