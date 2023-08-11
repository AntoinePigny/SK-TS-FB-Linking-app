import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

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
