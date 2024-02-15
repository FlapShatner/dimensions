import { toUpper, hashData, sanitizeObject } from './utils.js'

let previousData = new Set()

const server = '/a/server/'

// export const saveWindow = async (data) => {
//  const saniData = sanitizeObject(data)
//  const upperData = toUpper(saniData)
//  const upperDataString = JSON.stringify(upperData)
//  const dataHash = hashData(upperDataString)

//  if (previousData.has(dataHash)) {
//   console.log('No changes')
//   return upperData
//  }

//  try {
//   const res = await fetch(server + 'save', {
//    method: 'POST',
//    headers: { 'Content-Type': 'application/json' },
//    body: upperDataString,
//   })
//   if (!res.ok) throw new Error(res.statusText)
//   const saved = await res.json()
//   previousData.add(dataHash) // Store the hash
//   return saved
//  } catch (error) {
//   console.error('Error saving window:', error)
//   throw error
//  }
// }

export const getVehicles = async () => {
 try {
  const res = await fetch(server + 'vehicles')
  if (!res.ok) throw new Error(res.statusText)
  return await res.json()
 } catch (error) {
  console.error('Error fetching vehicles:', error)
 }
}

export const getMakes = async () => {
 try {
  const res = await fetch(server + 'makes')
  if (!res.ok) throw new Error(res.statusText)
  return await res.json()
 } catch (error) {
  console.error('Error fetching makes:', error)
 }
}

export const getModels = async (data) => {
 try {
  const res = await fetch(server + `vehicles`, {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(res.statusText)
  return await res.json()
 } catch (error) {
  console.error('Error fetching models:', error)
 }
}

export const getVehicleWithWindow = async (data) => {
 try {
  const res = await fetch(`${server}vehicle/${data}`)
  if (!res.ok) throw new Error(res.statusText)
  return await res.json()
 } catch (error) {
  console.error('Error fetching vehicle:', error)
 }
}

// export const addMake = async (make) => {
//  try {
//   const res = await fetch(server + 'makes', {
//    method: 'POST',
//    headers: { 'Content-Type': 'application/json' },
//    body: JSON.stringify(make),
//   })
//   if (!res.ok) throw new Error(res.statusText)
//   return await res.json()
//  } catch (error) {
//   console.error('Error adding make:', error)
//  }
// }

export const saveVehicle = async (data) => {
    try {
        const res = await fetch(server + 'save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error(res.statusText)
        return await res.json()
    } catch (error) {
        console.error('Error saving vehicle:', error)
    }
}
