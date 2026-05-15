import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

// The specific Parent Document ID from your screenshot
const PARENT_ID = "Pzk4ibm8RgkPdt5H5EZg";

/**
 * Gets all links from the football subcollection
 */
export const getFootballLinks = async () => {
  try {
    const colRef = collection(db, "urls", PARENT_ID, "football");
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching football links:", error);
    return [];
  }
};

/**
 * Gets all links from the cricket subcollection
 */
export const getCricketLinks = async () => {
  try {
    const colRef = collection(db, "urls", PARENT_ID, "cricket");
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching cricket links:", error);
    return [];
  }
};