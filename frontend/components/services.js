import { toUpper, hashData } from './utils.js'

let previousData = new Set()

export const saveWindow = async (data) => {
 const upperData = toUpper(data)
 const upperDataString = JSON.stringify(upperData)
 const dataHash = hashData(upperDataString)

 if (previousData.has(dataHash)) {
  console.log('No changes')
  return upperData
 }

 try {
  const res = await fetch('/a/server/save', {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: upperDataString,
  })
  if (!res.ok) 
    throw new Error(res.statusText)
  const saved = await res.json()
  previousData.add(dataHash) // Store the hash
  return saved
 } catch (error) {
  console.error('Error saving window:', error)
  throw error
 }
}

export const getVehicles = async () => {
 try {
  const res = await fetch('/a/server/vehicles')
  if (!res.ok) throw new Error(res.statusText)
  return await res.json()
 } catch (error) {
  console.error('Error fetching vehicles:', error)
 }
}

export const getMakes = async () => {
  try {
    const res = await fetch('/a/server/makes')
    if (!res.ok) throw new Error(res.statusText)
    return await res.json()
  } catch (error) {
    console.error('Error fetching makes:', error)
  }
  }