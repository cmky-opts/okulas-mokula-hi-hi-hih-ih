<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import Card from "./ui/Card.svelte";
  import MatchCard from "./ui/MatchCard.svelte";
  import NewsCard from "./ui/NewsCard.svelte";
  import Hero from "./ui/Hero.svelte";
  import {
    getEventsFromFirestore,
    getAllFeaturedMatches,
  } from "../lib/events.data";
  import { getPaginatedArticles } from "../lib/articles.data";

  let homeEvents = [];
  let featuredMatches = [];
  /** @type {{ id: string; title?: string; date?: string; imageUrl?: string; image?: string }[]} */
  let homeArticles = [];

  onMount(async () => {
    const [fetchedEvents, fetchedMatches, fetchedArticles] = await Promise.all([
      getEventsFromFirestore(),
      getAllFeaturedMatches(),
      getPaginatedArticles(1, 6),
    ]);
    homeEvents = fetchedEvents;
    featuredMatches = fetchedMatches;
    homeArticles = fetchedArticles;
  });

  const handleSeeMore = () => {
    push("/articles");
  };
</script>

<!-- Main Container -->
<div
  class="min-h-screen bg-texture flex flex-col items-center justify-center gap-0 p-0 border-b border-white/10"
>
  <Hero />

  <!-- Section 1: Events -->
  <div
    class="flex min-h-fit w-full max-w-6xl flex-col items-center justify-center gap-8 mt-12 border border-white/10 bg-black/60 p-6 md:p-10"
  >
    <p class="print-headline text-3xl md:text-5xl text-white w-full text-center">
      Events
    </p>

    <div class="flex w-full flex-col items-center justify-center gap-10 md:flex-row">
      {#each homeEvents as event (event.id)}
        <div class="flex w-full justify-center md:w-1/3">
          <Card
            imgSrc={event.image || event.imageUrl}
            eventId={event.id}
            eventName={event.name}
          />
        </div>
      {/each}
    </div>
  </div>

  <!-- Section 2: Featured Matches -->
  <div
    id="featured-matches"
    class="flex w-full max-w-6xl flex-col items-center justify-center gap-8 border border-white/10 bg-black/60 mt-10 p-6 clip-jagged"
  >
    <p class="print-headline text-3xl md:text-5xl text-white w-full text-center">
      Featured Matches
    </p>

    <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      {#each featuredMatches as match (match.id)}
        <a
          href="#/play?eventId={match.eventId}&matchId={match.id}"
          class="block h-full w-full"
        >
          <MatchCard
            {...match}
            homeLogo={match.homeLogoUrl}
            awayLogo={match.awayLogoUrl}
          />
        </a>
      {/each}
    </div>
  </div>

  <!-- Section 3: NewsCards -->
  <div
    class="flex w-full max-w-6xl flex-col items-center justify-center gap-8 border border-white/10 bg-black/60 p-6"
  >
    <div class="w-full text-center space-y-2">
      <p class="print-headline text-3xl md:text-5xl text-white">
        News &amp; Prediction
      </p>
      <p class="action-label text-zinc-400">
        Latest articles and expert predictions
      </p>
    </div>

    <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each homeArticles as article (article.id)}
        <NewsCard
          imgSrc={article.imageUrl || article.image}
          title={article.title}
          date={article.date}
          articleId={article.id}
        />
      {/each}
    </div>

    <button
      type="button"
      on:click={handleSeeMore}
      class="action-label border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 text-emerald-200 transition hover:border-emerald-500/60 hover:bg-emerald-500/15"
    >
      See All Articles →
    </button>
  </div>
</div>
