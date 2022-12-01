import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA40VeEkVxtSYYit--tC_iUYiX7IdwCX_4",
    authDomain: "samit-vue-vite-ts-vuetify.firebaseapp.com",
    projectId: "samit-vue-vite-ts-vuetify",
    storageBucket: "samit-vue-vite-ts-vuetify.appspot.com",
    messagingSenderId: "61153835643",
    appId: "1:61153835643:web:c1de59397576c2262980de"
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()
const db = firebase.firestore()

export { storage, db }