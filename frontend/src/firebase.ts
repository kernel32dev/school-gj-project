import "./types";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { connectFunctionsEmulator, getFunctions, httpsCallable, httpsCallableFromURL } from "firebase/functions";

export const development = process.env["NODE_ENV"] !== "production";

const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyCMaRG5wjqMBQaiOEbkqPHepWNDVUelMNQ",
    authDomain: "school-gj-project.firebaseapp.com",
    projectId: "school-gj-project",
    storageBucket: "school-gj-project.appspot.com",
    messagingSenderId: "314230982472",
    appId: "1:314230982472:web:22138c261d0b1a7d6ad57d",
    measurementId: "G-G5K73J1R6C",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const functions = getFunctions(app);

if (development) connectFunctionsEmulator(functions, "localhost", 5001);

function customCallable<RequestData = unknown, ResponseData = unknown>(name: string) {
    if (development) {
        return httpsCallableFromURL<RequestData, ResponseData>(functions, "http://localhost:5001/school-gj-project/southamerica-east1/" + name);
    } else {
        return httpsCallable<RequestData, ResponseData>(functions, name);
    }
}

export const listGuardian = customCallable<void, db.Guardian[]>("listGuardian");
export const listStudent = customCallable<void, db.Student[]>("listStudent");
export const listCourse = customCallable<void, db.Course[]>("listCourse");
export const listGrade = customCallable<void, db.Grade[]>("listGrade");
export const listClass = customCallable<void, db.Class[]>("listClass");
export const listClassStudent = customCallable<void, db.ClassStudent[]>("listClassStudent");