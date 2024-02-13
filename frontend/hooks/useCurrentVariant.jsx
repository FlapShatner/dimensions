import { useValueState } from './useValueState'
import { useAtomValue } from 'jotai'
import { productAtom } from '../components/lib/atoms.js'
export function useCurrentVariant() {
  const product = useAtomValue(productAtom)

  const values = useValueState()
  const productExists = product && Object.keys(product).length > 0
  if (!productExists) return null
  const { variants } = product
  console.log('variants:', variants)
  let currentVariant = ''
  if (values._customText) {
    variants.forEach((variant) => {
      if (variant.title.includes('Text')) {
        currentVariant = variant
      }
    })
  } else if (values.vector && values.__business) {
    variants.forEach((variant) => {
      if (variant.title.includes('ready')) {
        currentVariant = variant
      }
    })
  } else if (values.nonVector && values._business) {
    variants.forEach((variant) => {
      if (variant.title.includes('recreate')) {
        currentVariant = variant
      }
    })
  } else if (values.designLogo && values._business) {
    variants.forEach((variant) => {
      if (variant.title.includes('design')) {
        currentVariant = variant
      }
    })
  } else if (values._business) {
    variants.forEach((variant) => {
      if (variant.title.includes('ready')) {
        currentVariant = variant
      }
    })
  } else {
    variants.forEach((variant) => {
      if (variant.title.includes('None')) {
        currentVariant = variant
      }
    })
  }
  console.log('currentVariant:', currentVariant)
  return currentVariant
}
