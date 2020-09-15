import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyApiNBmsBFigZ5Ioqy-SJTia6cVdpbscxk",
  authDomain: "mockpj-e2b9b.firebaseapp.com",
  DatabaseURL: "https://mockpj-e2b9b.firebaseio.com",
  projectId: "mockpj-e2b9b",
  storageBucket: "mockpj-e2b9b.appspot.com",
  messagingSenderId: "891.378.057.064",
  AppID: "1: 891.378.057.064: web: 7f231abc086022fc3b60dd",
  measurementId: "G-BRJMNMNGXQ",
};
firebase.initializeApp(firebaseConfig)

const storage=firebase.storage();
export {storage,firebase as default}

