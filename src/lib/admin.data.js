import { db } from "./firebase";
import { getArticleById as getArticle, getAllArticles as getArticles } from "./articles.data";
import { getEventsFromFirestore, getMatchesByEventIdFromFirestore } from "./events.data";
import { doc, getDoc, setDoc, addDoc, collection, updateDoc, serverTimestamp } from "firebase/firestore";

export const getAllEvents = async () => {
  return await getEventsFromFirestore();
};

export const getEventMatches = async (eventId) => {
  return await getMatchesByEventIdFromFirestore(eventId);
};

export const saveEvent = async (eventData) => {
  if (!db) throw new Error("Firestore not initialized");
  const { id, imageFile, ...data } = eventData;
  if (id) {
    await setDoc(doc(db, "events", id), {
      ...data,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return id;
  } else {
    const docRef = await addDoc(collection(db, "events"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  }
};

export const saveMatch = async (eventId, matchData) => {
  if (!db) throw new Error("Firestore not initialized");
  const { id, imageFile, ...data } = matchData;
  if (id) {
    await setDoc(doc(db, "events", eventId, "matches", id), {
      ...data,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return id;
  } else {
    const docRef = await addDoc(collection(db, "events", eventId, "matches"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  }
};

export const setMatchOrder = async (eventId, matchId, sortOrder) => {
  if (!db) throw new Error("Firestore not initialized");
  await updateDoc(doc(db, "events", eventId, "matches", matchId), {
    sortOrder: Number(sortOrder),
    updatedAt: serverTimestamp(),
  });
};

export const setMatchFeatured = async (eventId, matchId, featured) => {
  if (!db) throw new Error("Firestore not initialized");
  await updateDoc(doc(db, "events", eventId, "matches", matchId), {
    featured: featured,
    updatedAt: serverTimestamp(),
  });
};

export const setMatchShowPlayer = async (eventId, matchId, showPlayer) => {
  if (!db) throw new Error("Firestore not initialized");
  await updateDoc(doc(db, "events", eventId, "matches", matchId), {
    showPlayer: showPlayer,
    updatedAt: serverTimestamp(),
  });
};

export const getAllArticles = async () => {
  return await getArticles();
};

export const saveArticle = async (articleData) => {
  if (!db) throw new Error("Firestore not initialized");
  const { id, imageFile, ...data } = articleData;
  if (id) {
    await setDoc(doc(db, "articles", id), {
      ...data,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return id;
  } else {
    const docRef = await addDoc(collection(db, "articles"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  }
};

export const getArticleById = async (articleId) => {
  return await getArticle(articleId);
};

import { deleteDoc } from "firebase/firestore";

export const deleteEvent = async (eventId) => {
  if (!db) throw new Error("Firestore not initialized");
  await deleteDoc(doc(db, "events", eventId));
};

export const deleteMatch = async (eventId, matchId) => {
  if (!db) throw new Error("Firestore not initialized");
  await deleteDoc(doc(db, "events", eventId, "matches", matchId));
};

export const deleteArticle = async (articleId) => {
  if (!db) throw new Error("Firestore not initialized");
  await deleteDoc(doc(db, "articles", articleId));
};

export const featureAllMatches = async (eventId) => {
  if (!db) throw new Error("Firestore not initialized");
  const snapshot = await getDocs(collection(db, "events", eventId, "matches"));
  const promises = snapshot.docs.map((docSnap) =>
    updateDoc(doc(db, "events", eventId, "matches", docSnap.id), {
      featured: true,
      updatedAt: serverTimestamp(),
    })
  );
  await Promise.all(promises);
};

export const getHeroEnabled = async () => {
  if (!db) return true;
  try {
    const snap = await getDoc(doc(db, "settings", "general"));
    if (snap.exists()) {
      return snap.data().heroEnabled !== false;
    }
  } catch (e) {
    console.error("Error reading hero setting:", e);
  }
  return true;
};

export const saveHeroEnabled = async (enabled) => {
  if (!db) throw new Error("Firestore not initialized");
  await setDoc(doc(db, "settings", "general"), {
    heroEnabled: enabled,
    updatedAt: serverTimestamp(),
  }, { merge: true });
};
