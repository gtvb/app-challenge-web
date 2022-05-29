import { writable, get } from 'svelte/store'

const initialState = {
  supported: false,
  allowed: false,
  error: null,
  location: null,
  loading: false,
  timestamp: -1,
}

export function distanceBetween(lat1, lng1, lat2, lng2) {
  let p = 0.017453292519943295;    // Math.PI / 180
  let c = Math.cos;
  let a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lng2 - lng1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

export const geolocation = writable(initialState)

if ('geolocation' in navigator) {
  geolocation.update(state => ({ ...state, supported: true }))
}

export const readLocation = () => new Promise((resolve, reject) => {
  if (get(geolocation).supported) {
    geolocation.update(state => ({ ...state, loading: true }))
    navigator.geolocation.getCurrentPosition(({ coords, timestamp }) => {
      geolocation.set({ loading: false, supported: true, allowed: true, location: coords, timestamp, error: null })
      resolve({ geolocation: coords, timestamp })
    }, (error) => {
      geolocation.update(state => ({ ...state, error, loading: false }))
      reject(error)
    }, {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 5000,
    })
  } else {
    reject(new Error('Seu navegador não é suportado'))
  }
})
