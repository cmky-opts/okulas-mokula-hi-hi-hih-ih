<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import Card from "./ui/Card.svelte";
  import FeaturedMatchCard from "./ui/FeaturedMatchCard.svelte";
  import NewsCard from "./ui/NewsCard.svelte";
  import Hero from "./ui/Hero.svelte";
  import {
    getEventsFromFirestore,
    getAllFeaturedMatches,
  } from "../lib/events.data";
  import { getPaginatedArticles } from "../lib/articles.data";
  import { getHeroEnabled } from "../lib/admin.data";

  let homeEvents = [];
  let liveMatches = [];
  let highlights = [];
  /** @type {{ id: string; title?: string; date?: string; imageUrl?: string; image?: string }[]} */
  let homeArticles = [];
  let heroEnabled = true;

  onMount(async () => {
    const [fetchedEvents, fetchedMatches, fetchedArticles, hero] =
      await Promise.all([
        getEventsFromFirestore(),
        getAllFeaturedMatches(),
        getPaginatedArticles(1, 6),
        getHeroEnabled(),
      ]);
    homeEvents = fetchedEvents;
    liveMatches = fetchedMatches
      .filter((m) => m.status !== "Finished")
      .sort((a, b) => {
        const order = { Ongoing: 0, Upcoming: 1 };
        return (order[a.status] ?? 1) - (order[b.status] ?? 1);
      });
    highlights = fetchedMatches
      .filter((m) => m.status === "Finished")
      .sort((a, b) => {
        const aTime = a.dateTime || "";
        const bTime = b.dateTime || "";
        return bTime.localeCompare(aTime);
      });
    homeArticles = fetchedArticles;
    heroEnabled = hero;
  });

  const handleSeeMore = () => {
    push("/articles");
  };
</script>

<!-- Main Container -->
<div
  class="min-h-screen bg-texture flex flex-col items-center justify-center gap-0 p-0 border-b border-white/10"
>
  {#if heroEnabled}
    <Hero />
  {/if}

  <!-- Section 1: Events -->
  <div
    class="flex min-h-fit w-full max-w-6xl flex-col items-center justify-center gap-8 mt-12 border border-white/10 bg-black/60 p-6 md:p-10"
  >
    <p
      class="print-headline text-2xl md:text-3xl text-white w-full text-center"
    >
      Events
    </p>

    <!-- Changed from CSS Grid to a wrapped Flexbox with justify-center -->
    <div class="flex w-full flex-wrap justify-center gap-6">
      {#each homeEvents as event (event.id)}
        <!-- Set responsive widths to match the 4-in-a-row layout while allowing centering -->
        <div
          class="flex justify-center w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
        >
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
    <p
      class="print-headline text-2xl md:text-3xl text-white w-full text-center"
    >
      Featured Matches
    </p>

    <div class="flex w-full flex-col gap-4">
      {#each liveMatches as match (match.id)}
        <FeaturedMatchCard {match} eventId={match.eventId} matchId={match.id} />
      {/each}
    </div>
  </div>

  <!-- Section 3: Highlights -->
  {#if highlights.length > 0}
    <div
      class="flex w-full max-w-6xl flex-col items-center justify-center gap-8 border border-white/10 bg-black/60 mt-10 p-6"
    >
      <p
        class="print-headline text-2xl md:text-3xl text-white w-full text-center"
      >
        Highlights
      </p>

      <div class="flex w-full flex-col gap-4">
        {#each highlights as match (match.id)}
          <FeaturedMatchCard {match} eventId={match.eventId} matchId={match.id} />
        {/each}
      </div>
    </div>
  {/if}

  <!-- Section 4: NewsCards -->
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
