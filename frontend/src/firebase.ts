/// <reference path="../../types.d.ts" />
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

const functions = getFunctions(app, "southamerica-east1");

if (development) connectFunctionsEmulator(functions, "localhost", 5001);

export const backendCallable = httpsCallable(functions, "backend");

export function backend<T extends FirebaseApi[keyof FirebaseApi]["request"]>(request: T): Promise<FirebaseApi[T["api"]]["response"]> {
    return backendCallable(request).then(x => x.data) as Promise<any>;
}

Object.assign(window, { backend });
