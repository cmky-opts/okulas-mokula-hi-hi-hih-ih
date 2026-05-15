<script>
  import { push } from "svelte-spa-router";
  import Card from "./ui/Card.svelte";
  import HeroCard from "./ui/HeroCard.svelte";
  import NewsCard from "./ui/NewsCard.svelte";
  import Hero from "./ui/Hero.svelte";
  import { events } from "../lib/events.data";
  import { getPaginatedArticles } from "../lib/articles.data";

  const logo = "/Logo-01.png";

  // Get first 6 articles for home page preview
  const homeArticles = getPaginatedArticles(1, 6);

  const handleSeeMore = () => {
    push("/articles");
  };
</script>

<!-- Main Container with Black Background -->
<div
  class="min-h-screen bg-linear-to-b from-black via-[#121111] to-black flex flex-col items-center justify-center gap-0 p-0"
>
  <!-- Wrapper 1: Cards -->
  <!-- Added 'shadow-white/10' and a subtle border -->

  <Hero></Hero>
  <div
    class="flex min-h-fit w-full max-w-6xl flex-col items-center justify-center gap-8 mt-12 rounded-xl border border-white/10 bg-zinc-900/50 p-6 md:p-10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
  >
    <!-- Title -->
    <p
      class="w-full text-center font-fifa2026 text-2xl uppercase tracking-widest text-white md:text-4xl"
    >
      Events
    </p>

    <!-- 
    Cards Container: 
    Changed h-28 to min-h-fit so it expands to fit the cards.
  -->
    <div
      class="flex w-full flex-col items-center justify-center gap-10 md:flex-row"
    >
      {#each events as event (event.id)}
        <div class="flex w-full justify-center md:w-1/3">
          <Card
            imgSrc={event.image}
            eventId={event.id}
            eventName={event.name}
          />
        </div>
      {/each}
    </div>
  </div>

  <!-- Wrapper 2: HeroCards -->
  <div
    class="flex w-full max-w-6xl flex-col items-center justify-center gap-8 rounded-xl border border-white/10 bg-transparent hover:bg-zinc-900 mt-10 p-6 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
  >
    <!-- Text stays on top because parent is flex-col -->
    <p
      class="w-full text-center font-integral-extrabold text-2xl text-white md:text-4xl"
    >
      Matches
    </p>

    <!-- Inner div handles the card orientation -->
    <div
      class="flex w-full flex-col items-center justify-center gap-6 md:flex-row"
    >
      <HeroCard imgSrc={logo} />
      <HeroCard imgSrc={logo} />
    </div>
  </div>

  <!-- Wrapper 3: NewsCards -->
  <div
    class="flex w-full max-w-6xl flex-col items-center justify-center gap-8 rounded-xl border border-white/10 hover:bg-zinc-900 p-6 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
  >
    <!-- Row 1: The Title -->
    <div class="w-full text-center space-y-2">
      <p class="font-fifa2026 text-2xl text-white md:text-3xl">
        News & Prediction
      </p>
      <p class="text-sm text-zinc-400">
        Latest articles and expert predictions
      </p>
    </div>

    <!-- Row 2: The NewsCards Grid -->
    <!-- 
    Mobile: 1 column (default)
    Medium (md): 2 columns 
    Large (lg): 3 columns 
  -->
    <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each homeArticles as article (article.id)}
        <NewsCard
          imgSrc={article.image}
          title={article.title}
          date={article.date}
          articleId={article.id}
        />
      {/each}
    </div>

    <!-- See More Button -->
    <button
      type="button"
      on:click={handleSeeMore}
      class="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-200 transition hover:border-emerald-500/60 hover:bg-emerald-500/15"
    >
      See All Articles →
    </button>
  </div>
</div>
