import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCJKwY4_0WR5nhlNo6O_9Omhby_c95Sv2Q",
    authDomain: "school-gj.firebaseapp.com",
    projectId: "school-gj",
    storageBucket: "school-gj.appspot.com",
    messagingSenderId: "797864433655",
    appId: "1:797864433655:web:b795d47873cc58d18b00f2",
    measurementId: "G-HEWH5RKK3C",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);