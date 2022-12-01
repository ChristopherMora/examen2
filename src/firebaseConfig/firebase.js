import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBP99aa8oNvUyL2Pk4xBY2HiF-gVGrcVHc",
  authDomain: "examen-9bf08.firebaseapp.com",
  projectId: "examen-9bf08",
  storageBucket: "examen-9bf08.appspot.com",
  messagingSenderId: "127948138672",
  appId: "1:127948138672:web:f17a71cd6da98a361ef375"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)