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

<section class="min-h-screen bg-linear-to-b from-black via-[#121111] to-black w-full py-10 pt-20">
  <div class="mx-auto w-full max-w-6xl space-y-6 px-4 sm:px-6 lg:px-8">
    <!-- Back Button -->
    <button
      type="button"
      on:click={handleBackClick}
      class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
    >
      ← Back to Home
    </button>

    <!-- Header -->
    <div
      class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-md"
    >
      <div class="space-y-2">
        <p class="text-sm uppercase tracking-[0.35em] text-emerald-400/80">
          All Articles
        </p>
        <h1 class="text-3xl font-semibold text-white sm:text-4xl">
          News & Prediction
        </h1>
        <p class="max-w-2xl text-sm text-zinc-400 sm:text-base">
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
    <div
      class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-md flex items-center justify-between"
    >
      <div class="text-sm text-zinc-400">
        Page <span class="font-semibold text-white">{currentPage}</span> of
        <span class="font-semibold text-white">{totalPages}</span>
      </div>

      <div class="flex gap-3">
        <button
          type="button"
          on:click={handlePreviousPage}
          disabled={currentPage === 1}
          class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed hover:border-white/20 hover:bg-white/10"
        >
          ← Previous
        </button>
        <button
          type="button"
          on:click={handleNextPage}
          disabled={currentPage === totalPages}
          class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed hover:border-white/20 hover:bg-white/10"
        >
          Next →
        </button>
      </div>
    </div>
  </div>
</section>
