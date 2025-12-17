import { doc, setDoc, deleteDoc, collection, onSnapshot, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../configs/firebase';

const userFavoritesCol = (uid) => collection(db, 'users', uid, 'favorites');
const userFavoriteDoc = (uid, movieId) => doc(db, 'users', uid, 'favorites', String(movieId));


export async function addFavorite(uid, movie) {
  const ref = userFavoriteDoc(uid, movie.id);
  const payload = {
    movieId: movie.id,
    title: movie.title ?? movie.name ?? '',
    poster_path: movie.poster_path ?? '',
    vote_average: movie.vote_average ?? null,
    createdAt: serverTimestamp(),
  };
  await setDoc(ref, payload, { merge: true });
}


export async function removeFavorite(uid, movieId) {
  const ref = userFavoriteDoc(uid, movieId);
  await deleteDoc(ref);
}


export async function getFavorites(uid) {
  const snap = await getDocs(userFavoritesCol(uid));
  return snap.docs.map(d => {
    const data = d.data();
    const createdAt = data.createdAt?.toMillis ? data.createdAt.toMillis() : (data.createdAt ?? null);
    return { id: d.id, ...data, createdAt };
  });
}

export function subscribeFavorites(uid, callback) {
  return onSnapshot(userFavoritesCol(uid), (snap) => {
    const items = snap.docs.map(d => {
      const data = d.data();
      const createdAt = data.createdAt?.toMillis ? data.createdAt.toMillis() : (data.createdAt ?? null);
      return { id: d.id, ...data, createdAt };
    });
    callback(items);
  });
}