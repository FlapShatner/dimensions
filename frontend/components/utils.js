import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
 return twMerge(clsx(inputs))
}

export const currentYear = new Date().getFullYear()

export const hashData = (data) => {
 return data.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0)
}

export const formatPrice = (price, quantity) => {    
  let result = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((price * quantity) / 100)
    return result
}

export const toUpper = (data) => Object.fromEntries(Object.entries(data).map(([key, value]) => [key, typeof value === 'string' ? value.toUpperCase() : value]))

export function getYears() {
 const years = []
 for (let year = currentYear + 1; year >= 1950; year--) {
  years.push(year)
 }
 return years
}

export function formatPhoneNumber(phoneNumber) {
 // Remove all non-numeric characters
 let digits = phoneNumber.replace(/\D/g, '')
 // Format the digits based on their length
 if (digits.length > 6) {
  digits = digits.substring(0, 10) // Ensure not more than 10 digits
  return `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6)}`
 } else if (digits.length > 3) {
  return `(${digits.substring(0, 3)}) ${digits.substring(3)}`
 } else if (digits.length > 0) {
  return `(${digits}`
 } else {
  return ''
 }
}

export function checkABCErrors(errors) {
 if (errors.a || errors.b || errors.c) {
  return true
 } else {
  return false
 }
}

export const uploadImage = async (image) => {
 const CLOUDINARY_UPLOAD_PRESET = 'business-logo'
 const CLOUDINARY_CLOUD_NAME = 'dkxssdk96'
 const data = new FormData()
 data.append('file', image)
 data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
 data.append('cloud_name', CLOUDINARY_CLOUD_NAME)
 data.append('folder', 'Cloudinary-React')
 try {
  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
   method: 'POST',
   body: data,
  })
  const res = await response.json()
  if (res.error) throw new Error(res.error.message)
  return res.url
 } catch (error) {
  // console.log(error)
  return { error: error }
 }
}

export const getCurrentVariant = (product, values) => {
  const { variants } = product
  let currentVariant = ''
  if (values.customText) {
    variants.forEach((variant) => {
      if (variant.title.includes('Text')) {
        currentVariant = variant
      }
    })
  } else if (values.vector) {
    variants.forEach((variant) => {
      if (variant.title.includes('ready')) {
        currentVariant = variant
      }
    })
  } else if( values.nonVector) {
    variants.forEach((variant) => {
      if (variant.title.includes('recreate')) {
        currentVariant = variant
      }
    })
  } else if(values.designLogo) {
    variants.forEach((variant) => {
      if (variant.title.includes('design')) {
        currentVariant = variant
      }
    })

  }
  else {
    variants.forEach((variant) => {
      if (variant.title.includes('None')) {
        currentVariant = variant
      }
    })
  }
  return currentVariant
}

export function matchesValue(str, arr) {
    return arr.some(item => item.value === str.toLowerCase());
}

export function makePropertiesObject(values, logo, image){

 

  function filterTruthyValues(obj) {  
  const filteredEntries = Object.entries(obj).filter(([key, value]) => value);
  return Object.fromEntries(filteredEntries);
}

  const vals = {
      _standard: values.standard,
            _a: values.a,
            _b: values.b,
            _c: values.c,
            _customText: values.customText,
            customTextField: values.customText ? values.customTextField : null,
            notesField:  values.customText ? values.notesField : null,
            _business: values.business,
            businessName: values.business ? values.businessName : null,
            slogan: values.business ? values.slogan : null,
            city: values.business ? values.city : null,
            state: values.business ? values.state : null,
            phone: values.business ? values.phone : null,
            website: values.business ? values.website : null,
            logo: logo ? true : null,
            designLogo: values.designLogo ? true : null,
            vector: values.vector ? true : null,
            nonVector: values.nonVector ? true : null,
            _image: logo ? image : null,
    }

    const filtered = filterTruthyValues(vals)
    // console.log('filtered:', filtered)
    return filtered

}


