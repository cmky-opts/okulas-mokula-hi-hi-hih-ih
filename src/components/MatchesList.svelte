<script>
  import { push } from "svelte-spa-router";
  import MatchCard from "./ui/MatchCard.svelte";
  import EventHeader from "./ui/EventHeader.svelte";
  import MatchesFilterBar from "./ui/MatchesFilterBar.svelte";
  import EmptyState from "./ui/EmptyState.svelte";
  import { getEventById, filterMatchesByStatus, getMatchesByEventIdFromFirestore } from "../lib/events.data";

  /** @type {{ eventId?: string }} */
  export let params = {};

  /** @type {string} */
  let activeFilter = "all";

  /** @type {any} */
  let event = null;

  /** @type {any[]} */
  let allMatches = [];
  /** @type {any[]} */
  let displayedMatches = [];

  // Load event data when component mounts or eventId changes
  $: if (params.eventId) {
    loadEventData(params.eventId);
  }

  const loadEventData = async (eventId) => {
    event = await getEventById(eventId);
    if (event) {
      allMatches = await getMatchesByEventIdFromFirestore(eventId);
      updateDisplayedMatches();
    }
  };

  // Update displayed matches based on filter
  $: if (event && allMatches) {
    updateDisplayedMatches();
  }

  const updateDisplayedMatches = () => {
    if (!event) {
      displayedMatches = [];
      return;
    }
    displayedMatches = filterMatchesByStatus(allMatches, activeFilter);
  };

  /** @param {string} value */
  const handleFilterChange = (value) => {
    activeFilter = value;
  };

  const handleBackClick = () => {
    push("/");
  };
</script>

<section class="min-h-screen bg-linear-to-b from-black via-[#121111] to-black w-full py-10 pt-20">
  <div class="mx-auto w-full max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
    <!-- Back Button -->
    <button
      type="button"
      on:click={handleBackClick}
      class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
    >
      ← Back to Events
    </button>

    <!-- Event Header -->
    {#if event}
      <EventHeader
        eventName={event.name}
        eventImage={event.imageUrl || event.image}
        eventDescription={event.description}
        matchCount={allMatches.length}
      />

      <!-- Filter Bar -->
      <div
        class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-md"
      >
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="space-y-2">
            <p class="text-sm uppercase tracking-[0.35em] text-sky-300/80">
              Filter matches
            </p>
            <h2 class="text-2xl font-semibold text-white sm:text-3xl">
              {displayedMatches.length}
              {displayedMatches.length === 1 ? "Match" : "Matches"}
            </h2>
          </div>

          <MatchesFilterBar
            bind:activeFilter
            on:filterChange={(e) => handleFilterChange(e.detail)}
          />
        </div>
      </div>

      <!-- Matches Grid -->
      {#if displayedMatches.length > 0}
        <div class="grid gap-6 xl:grid-cols-3">
          {#each displayedMatches as match (match.id)}
            <a href="#/play?eventId={match.eventId || event.id}&matchId={match.id}" class="block h-full w-full">
              <MatchCard {...match} homeLogo={match.homeLogoUrl} awayLogo={match.awayLogoUrl} />
            </a>
          {/each}
        </div>
      {:else}
        <EmptyState
          message="No matches found"
          subMessage="Try selecting a different filter or check back later for new matches"
        />
      {/if}
    {:else}
      <EmptyState
        message="Event not found"
        subMessage="The event you're looking for doesn't exist. Please go back and select a valid event."
      />
    {/if}
  </div>
</section>
