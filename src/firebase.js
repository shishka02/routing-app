import firebase from 'firebase'
import uuid from 'uuid/v4'



// Initialize Firebase
 var config = {
   apiKey: "AIzaSyBBNw6m0vJaSLT_zKn_8AYyGzMLGMW89gQ",
   authDomain: "test-rote-app.firebaseapp.com",
   databaseURL: "https://test-rote-app.firebaseio.com",
   projectId: "test-rote-app",
   storageBucket: "test-rote-app.appspot.com",
   messagingSenderId: "362906358496"
 };
 firebase.initializeApp(config);

 const database = firebase.database()
export default database



export const addTaskToFirebase = (task) => {
 const id = uuid()
 database.ref(`/${id}`).set({
 task, id
 })
}
export const removeTaskFromFirebase = (id) => {
database.ref(`/${id}`).remove()
}
