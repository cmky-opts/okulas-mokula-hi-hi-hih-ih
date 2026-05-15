// News & Prediction articles data
export const newsArticles = [
  {
    id: "article-1",
    title: "Al Ahli Secures Victory Against Al Hilal in Thrilling Encounter",
    date: "May 13, 2026",
    image: "/news.webp",
    category: "News",
    content:
      "Al Ahli demonstrated impressive performance against Al Hilal, clinching a 2-1 victory in a tightly contested match. The win highlights their determination and tactical prowess in the Saudi Pro League.",
    author: "Sports Editor",
    readTime: "4 min read",
  },
  {
    id: "article-2",
    title: "Expert Prediction: Top 3 Contenders for Saudi Cup Final",
    date: "May 12, 2026",
    image: "/news.webp",
    category: "Prediction",
    content:
      "Analyzing the remaining matches, our experts predict that Al Shabab, Al Wehda, and Al Raed have the strongest chances of reaching the Saudi Cup Final. Strategic analysis reveals their balanced squad and recent form.",
    author: "Analysis Team",
    readTime: "6 min read",
  },
  {
    id: "article-3",
    title: "Injury Update: Key Players Ruled Out for Next Round",
    date: "May 11, 2026",
    image: "/news.webp",
    category: "News",
    content:
      "Multiple top-tier players have been ruled out due to injuries sustained during recent matches. Teams are now adjusting their lineups as they prepare for the upcoming fixtures.",
    author: "Medical Team Correspondent",
    readTime: "3 min read",
  },
  {
    id: "article-4",
    title: "Prediction Analysis: Al Nassr vs Al Ittihad - Who Wins?",
    date: "May 10, 2026",
    image: "/news.webp",
    category: "Prediction",
    content:
      "Head-to-head statistics, recent form, and team composition suggest an edge to Al Nassr in the upcoming clash. However, Al Ittihad's strong defensive setup could prove decisive.",
    author: "Tactical Analyst",
    readTime: "5 min read",
  },
  {
    id: "article-5",
    title: "Transfer News: Breaking Changes in Squad Composition",
    date: "May 9, 2026",
    image: "/news.webp",
    category: "News",
    content:
      "Several clubs have announced significant transfers and loan arrangements as they strengthen their squads for the remaining season. Notable moves include international stars joining the Saudi league.",
    author: "Transfer Correspondent",
    readTime: "4 min read",
  },
  {
    id: "article-6",
    title: "Fan Favorite Players Nominated for Monthly Award",
    date: "May 8, 2026",
    image: "/news.webp",
    category: "News",
    content:
      "Based on impressive performances and fan voting, five players have been nominated for the monthly excellence award. The winner will be announced during the weekend ceremony.",
    author: "Community Editor",
    readTime: "2 min read",
  },
  {
    id: "article-7",
    title: "Stadium Attendance Records Broken in Recent Matches",
    date: "May 7, 2026",
    image: "/news.webp",
    category: "News",
    content:
      "Record-breaking attendance numbers were witnessed in last week's matches, indicating rising interest in Saudi football. Fan engagement continues to reach new heights.",
    author: "Sports Editor",
    readTime: "3 min read",
  },
  {
    id: "article-8",
    title: "Weekend Forecast: Prediction for All Upcoming Matches",
    date: "May 6, 2026",
    image: "/news.webp",
    category: "Prediction",
    content:
      "Our comprehensive weekend forecast analyzes all scheduled matches, providing predictions and key talking points for fans. Expert opinions vary on several high-stakes encounters.",
    author: "Prediction Team",
    readTime: "7 min read",
  },
  {
    id: "article-9",
    title: "Youth Academy Success: Young Talent Impresses in League",
    date: "May 5, 2026",
    image: "/news.webp",
    category: "News",
    content:
      "Academy graduates are making waves in professional leagues, proving the effectiveness of the youth development programs. Several young stars have become key players for their respective teams.",
    author: "Youth Sports Reporter",
    readTime: "4 min read",
  },
  {
    id: "article-10",
    title: "Tactical Breakdown: Formation Changes Impact Team Performance",
    date: "May 4, 2026",
    image: "/news.webp",
    category: "Prediction",
    content:
      "Recent formation adjustments by leading clubs have influenced match outcomes significantly. Our analysis explores how tactical flexibility provides competitive advantages.",
    author: "Tactical Analyst",
    readTime: "5 min read",
  },
  {
    id: "article-11",
    title: "Record-Breaking Goal Scorer Continues Stellar Form",
    date: "May 3, 2026",
    image: "/news.webp",
    category: "News",
    content:
      "A prolific goal scorer has set a new record with consistent performances this season. Their contribution remains crucial for team success and championship aspirations.",
    author: "Sports Editor",
    readTime: "3 min read",
  },
  {
    id: "article-12",
    title: "Pre-Match Interviews: Players Prepare for Critical Encounters",
    date: "May 2, 2026",
    image: "/news.webp",
    category: "News",
    content:
      "Key players from leading clubs shared their thoughts ahead of crucial matches. Confidence and determination are evident in their statements and body language.",
    author: "Interview Correspondent",
    readTime: "4 min read",
  },
];

// Helper function to get article by ID
export const getArticleById = (articleId) => {
  return newsArticles.find((article) => article.id === articleId);
};

// Helper function to get paginated articles
export const getPaginatedArticles = (page = 1, itemsPerPage = 6) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return newsArticles.slice(startIndex, endIndex);
};

// Helper function to get total pages
export const getTotalPages = (itemsPerPage = 6) => {
  return Math.ceil(newsArticles.length / itemsPerPage);
};

// Helper function to filter by category
export const getArticlesByCategory = (category, page = 1, itemsPerPage = 6) => {
  const filtered = newsArticles.filter(
    (article) => article.category === category,
  );
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return {
    articles: filtered.slice(startIndex, endIndex),
    totalPages: Math.ceil(filtered.length / itemsPerPage),
  };
};
