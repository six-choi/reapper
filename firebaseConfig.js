// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcrkY4ud0YtCRMNV1GCkyAeTILpihTyGQ",
  authDomain: "code4korea.firebaseapp.com",
  projectId: "code4korea",
  storageBucket: "code4korea.appspot.com",
  messagingSenderId: "265480232830",
  appId: "1:265480232830:web:79c652b4e1ae0aca4c1d2f",
  measurementId: "${config.measurementId}",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
