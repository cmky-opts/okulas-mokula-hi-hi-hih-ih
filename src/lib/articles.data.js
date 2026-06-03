import { db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

const getArticlesCollection = () => {
  if (!db) return null;
  return collection(db, "articles");
};

export const getFirestoreArticles = async () => {
  const articlesCollection = getArticlesCollection();
  if (!articlesCollection) return [];

  try {
    const q = query(articlesCollection, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error("Error fetching articles from Firestore:", error);
    return [];
  }
};

export const getAllArticles = async () => {
  return await getFirestoreArticles();
};

export const getArticleById = async (articleId) => {
  if (!db) return null;

  try {
    const articleDoc = doc(db, "articles", articleId);
    const snapshot = await getDoc(articleDoc);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
  } catch (error) {
    console.error("Error fetching article by ID from Firestore:", error);
  }
  return null;
};

export const getPaginatedArticles = async (page = 1, itemsPerPage = 6) => {
  const allArticles = await getFirestoreArticles();
  const startIndex = (page - 1) * itemsPerPage;
  return allArticles.slice(startIndex, startIndex + itemsPerPage);
};

export const getTotalPages = async (itemsPerPage = 6) => {
  const allArticles = await getFirestoreArticles();
  return Math.max(1, Math.ceil(allArticles.length / itemsPerPage));
};

export const getSuggestedArticles = async (currentArticleId, tags, maxResults = 3) => {
  const allArticles = await getFirestoreArticles();
  const others = allArticles.filter((a) => a.id !== currentArticleId);

  if (!tags || tags.length === 0) {
    return others.slice(0, maxResults);
  }

  const scored = others.map((article) => {
    const articleTags = article.tags || [];
    const score = articleTags.filter((t) => tags.includes(t)).length;
    return { article, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.article.createdAt?.toMillis?.() - a.article.createdAt?.toMillis?.();
  });

  return scored.slice(0, maxResults).map((s) => s.article);
};

export const getArticlesByCategory = async (
  category,
  page = 1,
  itemsPerPage = 6,
) => {
  const allArticles = await getFirestoreArticles();
  const filtered = allArticles.filter((article) => article.category === category);
  const startIndex = (page - 1) * itemsPerPage;
  return {
    articles: filtered.slice(startIndex, startIndex + itemsPerPage),
    totalPages: Math.max(1, Math.ceil(filtered.length / itemsPerPage)),
  };
};
