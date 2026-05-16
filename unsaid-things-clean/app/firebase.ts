import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCMRhjmSxH5IHzFYZYLlt3QYvUNIAf7lh0",
  authDomain: "unsaid-things.firebaseapp.com",
  projectId: "unsaid-things",
  storageBucket: "unsaid-things.firebasestorage.app",
  messagingSenderId: "1066556879290",
  appId: "1:1066556879290:web:9f7f05bcf4c5aa3f41ad83"
};

const app = initializeApp(firebaseConfig);

export default app;