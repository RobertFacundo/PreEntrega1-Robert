
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAWEfby7swkKmgKzd4rTIz7ssDKMX-Db9M",
    authDomain: "ecommerce-78dfe.firebaseapp.com",
    projectId: "ecommerce-78dfe",
    storageBucket: "ecommerce-78dfe.appspot.com",
    messagingSenderId: "1023271523427",
    appId: "1:1023271523427:web:d76ecd004fc6b771a0d456",
    measurementId: "G-DE41NDVNW7"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
