// src/utils/favorites.js
import {
    doc,
    setDoc,
    deleteDoc,
    collection,
    onSnapshot,
    query,
} from "firebase/firestore";
import { db } from "../firebase";

/**
 * Favori ekle: doküman yolu users/{uid}/favorites/{movieId}
 */
export async function addFavorite(userId, movie) {
    const ref = doc(db, "users", userId, "favorites", String(movie.id));
    await setDoc(ref, movie);
}

/**
 * Favori çıkar
 */
export async function removeFavorite(userId, movieId) {
    const ref = doc(db, "users", userId, "favorites", String(movieId));
    await deleteDoc(ref);
}

/**
 * Favorileri dinle (realtime)
 * callback: (favoritesArray) => void
 */
export function onFavoritesChange(userId, callback) {
    const q = query(collection(db, "users", userId, "favorites"));
    return onSnapshot(q, (snapshot) => {
        const favs = snapshot.docs.map((doc) => doc.data());
        callback(favs);
    });
}
