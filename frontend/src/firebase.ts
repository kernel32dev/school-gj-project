import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCMaRG5wjqMBQaiOEbkqPHepWNDVUelMNQ",
    authDomain: "school-gj-project.firebaseapp.com",
    projectId: "school-gj-project",
    storageBucket: "school-gj-project.appspot.com",
    messagingSenderId: "314230982472",
    appId: "1:314230982472:web:22138c261d0b1a7d6ad57d",
    measurementId: "G-G5K73J1R6C"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);