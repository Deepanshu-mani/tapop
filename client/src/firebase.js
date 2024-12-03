import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCxDypwrCx5cVNp-m_q9jmIr6vnqAROi64",
    authDomain: "tapop-112211.firebaseapp.com",
    projectId: "tapop-112211",
    storageBucket: "tapop-112211.appspot.com", 
    messagingSenderId: "622760826795",
    appId: "1:622760826795:web:a0422a306159de545a64ee",
    measurementId: "G-RZ0KYJC8FH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export functions
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app); 

export { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, storage }; 
