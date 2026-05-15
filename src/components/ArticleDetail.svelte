<script>
  import { push } from "svelte-spa-router";
  import { getArticleById } from "../lib/articles.data";

  /** @type {{ articleId?: string }} */
  export let params = {};

  /** @type {any} */
  let article = null;

  // Load article data when component mounts or articleId changes
  $: if (params.articleId) {
    article = getArticleById(params.articleId);
  }

  const handleBackClick = () => {
    push("/");
  };
</script>

<section class="w-full bg-transparent py-10">
  <div class="mx-auto w-full max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
    <!-- Back Button -->
    <button
      type="button"
      on:click={handleBackClick}
      class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
    >
      ← Back to Home
    </button>

    {#if article}
      <!-- Article Header -->
      <div
        class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-md overflow-hidden"
      >
        <!-- Featured Image -->
        {#if article.image}
          <div class="mb-6 overflow-hidden rounded-xl">
            <img
              src={article.image}
              alt={article.title}
              class="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        {/if}

        <!-- Article Metadata -->
        <div class="space-y-4">
          <!-- Category and Date -->
          <div class="flex flex-wrap items-center gap-4 text-sm">
            <span
              class="inline-block rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-emerald-200 uppercase tracking-wider font-semibold"
            >
              {article.category}
            </span>
            <span class="text-zinc-400">{article.date}</span>
            <span class="text-zinc-500">•</span>
            <span class="text-zinc-400">{article.readTime}</span>
          </div>

          <!-- Title -->
          <h1 class="text-3xl font-semibold text-white sm:text-4xl">
            {article.title}
          </h1>

          <!-- Author -->
          <div class="border-t border-white/10 pt-4">
            <p class="text-sm text-zinc-400">
              By <span class="text-white font-semibold">{article.author}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Article Content -->
      <div
        class="rounded-3xl border border-white/10 bg-zinc-900/50 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.15)] backdrop-blur-md"
      >
        <div class="prose prose-invert max-w-none">
          <p class="text-lg leading-relaxed text-zinc-200">
            {article.content}
          </p>

          <!-- Extended content placeholder for longer articles -->
          <div class="mt-8 space-y-6 text-base leading-relaxed text-zinc-300">
            <p>
              This article covers all the important details and analysis related
              to the topic. Our team has conducted thorough research and
              interviews to bring you the most accurate and up-to-date
              information.
            </p>
            <p>
              The implications of these developments extend across multiple
              dimensions of the sport, affecting team strategies, player morale,
              and fan engagement. We've analyzed various perspectives to provide
              comprehensive coverage.
            </p>
            <p>
              Stay tuned for follow-up reports and updates as the situation
              develops. Our dedicated team will continue monitoring and
              reporting on all significant developments in the coming weeks.
            </p>
          </div>
        </div>

        <!-- Share Section -->
        <div
          class="mt-8 border-t border-white/10 pt-6 flex items-center justify-between flex-wrap gap-4"
        >
          <p class="text-sm text-zinc-400">Share this article:</p>
          <div class="flex gap-3">
            <button
              type="button"
              class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/10"
            >
              Twitter
            </button>
            <button
              type="button"
              class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/10"
            >
              Facebook
            </button>
            <button
              type="button"
              class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/10"
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>
    {:else}
      <!-- Article Not Found -->
      <div
        class="flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-zinc-900/50 p-12 text-center"
      >
        <div
          class="flex items-center justify-center rounded-full w-16 h-16 bg-zinc-800 border border-white/10"
        >
          <span class="text-2xl">📄</span>
        </div>
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-white">Article Not Found</h3>
          <p class="text-sm text-zinc-400">
            The article you're looking for doesn't exist. Please go back and
            select a valid article.
          </p>
        </div>
      </div>
    {/if}
  </div>
</section>
