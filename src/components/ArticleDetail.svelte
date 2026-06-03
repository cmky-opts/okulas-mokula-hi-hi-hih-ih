<script>
  import { push } from "svelte-spa-router";
  import { getArticleById, getSuggestedArticles } from "../lib/articles.data";
  import NewsCard from "./ui/NewsCard.svelte";

  /** @type {{ articleId?: string }} */
  export let params = {};

  /** @type {any} */
  let article = null;
  let isLoading = true;
  let suggestedArticles = [];

  $: gridCols = suggestedArticles.length === 1 ? 1
    : suggestedArticles.length === 2 || suggestedArticles.length === 4 ? 2
    : 3;

  $: if (params.articleId) {
    isLoading = true;
    getArticleById(params.articleId).then(data => {
      article = data;
      isLoading = false;
      if (data) {
        getSuggestedArticles(data.id, data.tags || [], 6).then(result => {
          suggestedArticles = result;
        });
      }
    }).catch(() => {
      isLoading = false;
    });
  }

  const handleBackClick = () => {
    push("/");
  };
</script>

<svelte:head>
  {#if article && article.tags && article.tags.length > 0}
    <meta name="keywords" content={article.tags.join(', ')} />
  {/if}
</svelte:head>

<section class="min-h-screen bg-texture w-full py-10 pt-20 border-b border-white/10">
  <div class="mx-auto w-full max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">

    <!-- Back Button -->
    <button
      type="button"
      on:click={handleBackClick}
      class="action-label flex items-center gap-2 border border-white/10 bg-black/60 px-4 py-2 text-white transition hover:border-white/30"
    >
      ← Back to Home
    </button>

    {#if isLoading}
      <div class="text-center py-20 text-zinc-400 font-medium animate-pulse uppercase tracking-widest">
        Loading article content...
      </div>
    {:else}
      {#if article}
        <!-- Article Card with Jagged Clip -->
        <div class="border border-white/10 bg-black/80 clip-jagged">
          <div class="p-6 sm:p-8">
            <!-- Featured Image -->
            {#if article.imageUrl}
              <div class="mb-6 overflow-hidden border border-white/10">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  class="h-auto w-full object-cover transition-transform duration-300 hover:scale-105 img-ink"
                />
              </div>
            {/if}

            <!-- Article Metadata -->
            <div class="space-y-4">
              <div class="flex flex-wrap items-center gap-4 text-sm">
                <span
                  class="inline-block border border-red-600/50 bg-red-900/40 px-3 py-1 text-red-200 action-label"
                >
                  {article.category}
                </span>
                <span class="text-zinc-400 uppercase tracking-widest text-xs">{article.date}</span>
                <span class="text-zinc-500">|</span>
                <span class="text-zinc-400 uppercase tracking-widest text-xs">{article.readTime}</span>
              </div>

              <!-- Title -->
              <h1 class="print-headline text-3xl sm:text-4xl text-white">
                {article.title}
              </h1>
              <div class="h-0.5 w-16 bg-red-700/70"></div>
            </div>

            <!-- Article Content -->
            <div class="mt-8 pt-8 border-t border-white/10">
              <div class="article-body-content text-stone-200 font-serif">
                {@html article.content}
              </div>
            </div>

            <!-- Tags Section -->
            {#if article.tags && article.tags.length > 0}
              <div class="mt-8 pt-6 flex flex-wrap gap-2 border-t border-white/10">
                {#each article.tags as tag}
                  <span
                    class="border border-white/10 bg-black/40 px-3 py-1 text-xs text-zinc-300 action-label -skew-x-6"
                  >
                    #{tag}
                  </span>
                {/each}
              </div>
            {/if}

            {#if suggestedArticles.length > 0}
              <div class="mt-10 pt-8 border-t border-white/10">
                <h3 class="text-lg font-bold text-white uppercase tracking-wider mb-6">
                  Related Articles
                </h3>
                <div
                  class="suggested-grid grid gap-3"
                  style="--cols: {gridCols}"
                >
                  {#each suggestedArticles as suggested}
                    <NewsCard
                      imgSrc={suggested.imageUrl}
                      title={suggested.title}
                      date={suggested.date}
                      articleId={suggested.id}
                    />
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        </div>
      {:else}
        <!-- Article Not Found -->
        <div class="border border-white/10 bg-black/60 p-12 text-center">
          <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 border border-white/10 bg-black/80">
            <span class="text-2xl">📄</span>
          </div>
          <div class="space-y-2">
            <h3 class="text-lg font-bold text-white uppercase tracking-wider">Article Not Found</h3>
            <p class="text-sm text-zinc-400 uppercase tracking-wider">
              The article data could not be fetched.
            </p>
          </div>
        </div>
      {/if}
    {/if}
  </div>
</section>


<style>
  .article-body-content :global(p), 
  .article-body-content :global(div),
  .article-body-content :global(span) {
    color: #e7e5d6 !important;
    font-size: 1.125rem;
    line-height: 1.8;
  }

  .article-body-content :global(em),
  .article-body-content :global(i) {
    color: #f0a8a8 !important;
    font-style: italic;
  }

  .article-body-content :global(strong),
  .article-body-content :global(b) {
    color: #ffffff !important;
    font-weight: 700;
  }

  .article-body-content :global(h1),
  .article-body-content :global(h2),
  .article-body-content :global(h3) {
    color: #ffffff !important;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    line-height: 1;
    font-family: "PT Serif", serif;
  }

  .article-body-content :global(a) {
    color: #f87171 !important;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .article-body-content :global(a:hover) {
    color: #fca5a5 !important;
  }

  .article-body-content :global(blockquote) {
    border-left: 3px solid #ffffff !important;
    padding-left: 1rem;
    color: #d6d3c6 !important;
    font-style: italic;
  }

  .article-body-content :global(hr) {
    border-color: rgba(255, 255, 255, 0.1) !important;
  }

  .article-body-content :global(img) {
    filter: grayscale(100%) contrast(150%);
    mix-blend-mode: multiply;
  }

  .suggested-grid {
    grid-template-columns: 1fr;
  }

  @media (min-width: 640px) {
    .suggested-grid {
      grid-template-columns: repeat(var(--cols, 3), minmax(0, 1fr));
    }
  }
</style>
