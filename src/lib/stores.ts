import { onAuthStateChanged, type User } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { derived, writable, type Readable } from 'svelte/store'
import { auth, db } from './firebase'
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
/**
 *
 * @param {string}path document path or reference
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(path: string) {
   let unsubscribe: () => void

   const docRef = doc(db, path)

   const { subscribe } = writable<T | null>(null, (set) => {
      unsubscribe = onSnapshot(docRef, (snapshot) => {
         set((snapshot.data() as T) ?? null)
      })

      return () => unsubscribe()
   })

   return {
      subscribe,
      ref: docRef,
      id: docRef.id,
   }
}

interface UserData {
   username: string
   bio: string
   photoURL: string
   links: any[]
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
   if ($user) {
      return docStore<UserData>(`users/${$user.uid}`).subscribe(set)
   } else {
      set(null)
   }
})
