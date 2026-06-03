<script>
  import { push } from "svelte-spa-router";
  import NewsCard from "./ui/NewsCard.svelte";
  import { getPaginatedArticles, getTotalPages } from "../lib/articles.data";

  let currentPage = 1;
  const itemsPerPage = 6;

  let articles = [];
  let totalPages = 1;

  $: {
    getPaginatedArticles(currentPage, itemsPerPage).then(res => {
      articles = res;
    });
    getTotalPages(itemsPerPage).then(res => {
      totalPages = res;
    });
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      currentPage--;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      currentPage++;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBackClick = () => {
    push("/");
  };
</script>

<section class="min-h-screen bg-texture w-full py-10 pt-20 border-b border-white/10">
  <div class="mx-auto w-full max-w-6xl space-y-6 px-4 sm:px-6 lg:px-8">
    <!-- Back Button -->
    <button
      type="button"
      on:click={handleBackClick}
      class="action-label flex items-center gap-2 border border-white/10 bg-black/60 px-4 py-2 text-white transition hover:border-white/30"
    >
      ← Back to Home
    </button>

    <!-- Header -->
    <div class="border border-white/10 bg-black/60 p-6">
      <div class="space-y-2">
        <p class="action-label text-emerald-400/80">
          All Articles
        </p>
        <h1 class="print-headline text-3xl sm:text-5xl text-white">
          News &amp; Prediction
        </h1>
        <p class="max-w-2xl text-sm text-zinc-400 uppercase tracking-wider">
          Browse all the latest news articles and expert predictions. Stay
          updated with comprehensive coverage of the latest football events.
        </p>
      </div>
    </div>

    <!-- Articles Grid -->
    <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each articles as article (article.id)}
        <NewsCard
          imgSrc={article.imageUrl}
          title={article.title}
          date={article.date}
          articleId={article.id}
        />
      {/each}
    </div>

    <!-- Pagination Controls -->
    <div class="border border-white/10 bg-black/60 p-4 flex items-center justify-between">
      <div class="action-label text-zinc-400">
        Page <span class="font-bold text-white">{currentPage}</span> of
        <span class="font-bold text-white">{totalPages}</span>
      </div>

      <div class="flex gap-3">
        <button
          type="button"
          on:click={handlePreviousPage}
          disabled={currentPage === 1}
          class="action-label border border-white/10 bg-black/60 px-4 py-2 text-white transition disabled:opacity-50 disabled:cursor-not-allowed hover:border-white/30"
        >
          ← Previous
        </button>
        <button
          type="button"
          on:click={handleNextPage}
          disabled={currentPage === totalPages}
          class="action-label border border-white/10 bg-black/60 px-4 py-2 text-white transition disabled:opacity-50 disabled:cursor-not-allowed hover:border-white/30"
        >
          Next →
        </button>
      </div>
    </div>
  </div>
</section>
