import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyC55-ULSYtslj45kxXeBSt2-xaQAt-3UAc",
    authDomain: "ecommerce-2f8ad.firebaseapp.com",
    projectId: "ecommerce-2f8ad",
    storageBucket: "ecommerce-2f8ad.appspot.com",
    messagingSenderId: "32681441282",
    appId: "1:32681441282:web:a8de6621af1c9c03778f1b",
    measurementId: "G-GQY4VTDHD2"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);