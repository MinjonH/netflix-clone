// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4Ju9ixjf-G27bTO5ltdVwp3V2FLRZlK8",
    authDomain: "netflix-clone-1b07f.firebaseapp.com",
    projectId: "netflix-clone-1b07f",
    storageBucket: "netflix-clone-1b07f.appspot.com",
    messagingSenderId: "725930786506",
    appId: "1:725930786506:web:a7a796d9cc3cbb650d3e33"
  };
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }