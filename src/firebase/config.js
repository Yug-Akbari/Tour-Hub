import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
// Replace these values with your actual Firebase config from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyCQZklGiB1TvQXOvaR_ISbR3O2WZIARZOE",
    authDomain: "tourist-management-5cf3f.firebaseapp.com",
    projectId: "tourist-management-5cf3f",
    storageBucket: "tourist-management-5cf3f.firebasestorage.app",
    messagingSenderId: "1099239352539",
    appId: "1:1099239352539:web:8884f6a523722eee1044fe",
    measurementId: "G-EK2FH3GN4S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;