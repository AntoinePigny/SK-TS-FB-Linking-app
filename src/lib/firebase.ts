import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { writable } from 'svelte/store'

const firebaseConfig = {
   apiKey: 'AIzaSyDsNANqGLjrSY19jxY1f8oTn0U9lDKoZxk',
   authDomain: 'fkit-linking-app.firebaseapp.com',
   projectId: 'fkit-linking-app',
   storageBucket: 'fkit-linking-app.appspot.com',
   messagingSenderId: '938099259232',
   appId: '1:938099259232:web:0c23b6b55926e786bc5005',
   measurementId: 'G-RJPFQXNSZB',
}

//Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore()
export const auth = getAuth()
export const storage = getStorage()

/**
 * @returns a store with current firebase user
 * @param params
 */
function userStore() {
   let unsubscribe: () => void

   if (!auth || !globalThis.window) {
      console.warn('Auth is not initialized or not in browser')
      const { subscribe } = writable<User | null>(null)
      return {
         subscribe,
      }
   }

   const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
      unsubscribe = onAuthStateChanged(auth, (user) => {
         set(user)
      })

      return () => unsubscribe()
   })

   return {
      subscribe,
   }
}
export const user = userStore()
