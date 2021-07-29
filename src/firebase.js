// Conveniently import this file anywhere to use db

import firebase from 'firebase'
import 'firebase/firestore'

const config ={
    apiKey: "AIzaSyDIug9ErItR1hH8RpP7M8OOXMjDMpvyEKQ",
    authDomain: "vueagenda.firebaseapp.com",
    projectId: "vueagenda",
    storageBucket: "vueagenda.appspot.com",
    messagingSenderId: "171360346249",
    appId: "1:171360346249:web:d92754ddde96b787e7e658",
    measurementId: "G-SKDFM23B6X"
}
const firebaseApp = firebase.initializeApp(config)
export const db = firebaseApp.firestore()
export const programsCollection = db.collection('programs')

export const createProgram = (program) => {
    return programsCollection.add(program)
}

export const getProgram = async (id) => {
    const program = await programsCollection.doc(id).get()
    return program.exists ? program.data() : null
}

export const updateProgram = (id, program) => {
    return programsCollection.doc(id).update(program)
}

export const deleteProgram = (id) => {
    return programsCollection.doc(id).delete()
}



// Export types that exists in Firestore - Uncomment if you need them in your app
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }
