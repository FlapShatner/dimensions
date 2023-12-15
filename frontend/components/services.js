export const getUsers = async () => {
  const res = await fetch('/a/server/users')
  const users = await res.json()
  return users
}

function toUpper(data) {
  const valuesUpper = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      valuesUpper[key] = value.toUpperCase();
    } else {
      valuesUpper[key] = value;
    }
  }
  return valuesUpper;
}


export const saveWindow = async (data) => {
  let previousData = []
const upperData = toUpper(data)
// compare with previous data
if (previousData.includes(JSON.stringify(upperData))) {
    console.log('No changes')
    return upperData.json()
}
try {
    const res = await fetch('/a/server/save', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(upperData),
    })
    if (!res.ok) throw new Error(res.statusText)    
    const saved = await res.json()
    previousData.push(JSON.stringify(saved))
    return saved
} catch (error) {
    console.log('OOPS',error)
    return error   
}
}

export const getVehicles = async () => {
    const res = await fetch('/a/server/vehicles')
    const vehicles = await res.json()
    console.log(vehicles)
}