// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPCJA-ekqC5fUp2d9Wh-ceq7a6TKYj1yI",
  authDomain: "homeworkbuddy-d61b8.firebaseapp.com",
  projectId: "homeworkbuddy-d61b8",
  storageBucket: "homeworkbuddy-d61b8.appspot.com",
  messagingSenderId: "690307351732",
  appId: "1:690307351732:web:360cc90dd2b9636fce03e1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Add logout helper
const logout = () => signOut(auth);

export { auth, provider, logout };
