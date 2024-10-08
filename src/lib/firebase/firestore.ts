// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAOv3dJ_zeP2sm4R1HXg-weV9izr0YDoRI',
  authDomain: 'tic-tac-toe-online-699e6.firebaseapp.com',
  projectId: 'tic-tac-toe-online-699e6',
  storageBucket: 'tic-tac-toe-online-699e6.appspot.com',
  messagingSenderId: '156400568199',
  appId: '1:156400568199:web:ef5a821c6f55d48138f522',
  measurementId: 'G-YKL9S6ZJ92',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
