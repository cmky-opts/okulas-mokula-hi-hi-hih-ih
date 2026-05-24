import { db } from "./firebase";
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const getEventsCollection = () => {
  if (!db) return null;
  return collection(db, "events");
};

export const getEventsFromFirestore = async () => {
  const eventsCollection = getEventsCollection();
  if (!eventsCollection) return [];

  try {
    const q = query(eventsCollection, orderBy("name", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error("Error fetching events from Firestore:", error);
    return [];
  }
};

export const getEventById = async (eventId) => {
  if (!db) return null;

  try {
    const eventDoc = doc(db, "events", eventId);
    const snapshot = await getDoc(eventDoc);
    return snapshot.exists()
      ? { id: snapshot.id, ...snapshot.data() }
      : null;
  } catch (error) {
    console.error("Error fetching event by ID from Firestore:", error);
    return null;
  }
};

export const getMatchesByEventIdFromFirestore = async (eventId) => {
  if (!db) return [];

  try {
    const matchesQuery = query(
      collection(db, "events", eventId, "matches"),
      orderBy("featured", "desc"),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(matchesQuery);
    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        eventId: eventId,
        ...docSnap.data(),
      }));
    }
  } catch (error) {
    console.error("Error fetching matches from Firestore:", error);
  }
  return [];
};

export const getMatchByIdFromFirestore = async (eventId, matchId) => {
  if (!db) return null;

  try {
    const matchDoc = doc(db, "events", eventId, "matches", matchId);
    const snapshot = await getDoc(matchDoc);
    if (snapshot.exists()) {
      return { id: snapshot.id, eventId, ...snapshot.data() };
    }
  } catch (error) {
    console.error("Error fetching match by ID from Firestore:", error);
  }
  return null;
};

export const getAllFeaturedMatches = async () => {
  if (!db) return [];
  try {
    // Instead of using collectionGroup which requires a custom Firebase index,
    // we query the featured matches from each event's subcollection directly.
    const eventsQuery = query(collection(db, "events"));
    const eventsSnapshot = await getDocs(eventsQuery);
    
    let allFeatured = [];
    
    // Fetch featured matches for each event
    const promises = eventsSnapshot.docs.map(async (eventDoc) => {
      const eventId = eventDoc.id;
      const matchesQuery = query(
        collection(db, "events", eventId, "matches"),
        where("featured", "==", true)
      );
      const matchesSnapshot = await getDocs(matchesQuery);
      
      return matchesSnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        eventId: eventId,
        ...docSnap.data(),
      }));
    });

    const results = await Promise.all(promises);
    // Flatten the array of arrays into a single array
    allFeatured = results.flat();
    
    return allFeatured;
  } catch (error) {
    console.error("Error fetching featured matches from Firestore:", error);
  }
  return [];
};

export const filterMatchesByStatus = (matches, status) => {
  if (status === "all") return matches;
  return matches.filter((match) => match.status === status);
};
