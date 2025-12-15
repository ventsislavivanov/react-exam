import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyDaemHS_-hFYmKcWsUhA3C-ByNnbJ4Cpuk",
	authDomain: "tmdb-movies-2810c.firebaseapp.com",
	projectId: "tmdb-movies-2810c",
	storageBucket: "tmdb-movies-2810c.firebasestorage.app",
	messagingSenderId: "73273024586",
	appId: "1:73273024586:web:1d0664eebeda7d97ef86b3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);