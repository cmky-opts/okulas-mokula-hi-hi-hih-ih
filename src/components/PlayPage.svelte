<script>
  import { onMount } from "svelte";
  import Player from "./ui/Player.svelte";
  import { getMatchByIdFromFirestore } from "../lib/events.data";

  let streamUrl = "";
  let match = null;
  let activeServerUrl = "";

  onMount(async () => {
    // Parse URL params from hash-based routing (e.g. #/play?eventId=...&matchId=...)
    const hashSplit = window.location.hash.split("?");
    if (hashSplit.length > 1) {
      const urlParams = new URLSearchParams(hashSplit[1]);
      const eventId = urlParams.get("eventId");
      const matchId = urlParams.get("matchId");

      if (eventId && matchId) {
        match = await getMatchByIdFromFirestore(eventId, matchId);
        if (match && match.links && match.links.length > 0) {
          activeServerUrl = match.links[0].url;
          streamUrl = activeServerUrl;
        }
      }
    }
  });

  const selectServer = (url) => {
    activeServerUrl = url;
    streamUrl = url;
  };
</script>

<div class="min-h-screen bg-texture w-full flex flex-col items-center border-b border-white/10">
  <div class="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 p-4 pt-10">
    <!-- Top Ad Space -->
    <div
      class="flex h-24 w-full items-center justify-center border border-dashed border-white/20 bg-black/60"
    >
      <span class="action-label text-zinc-600">Advertisement</span>
    </div>

    {#if match}
      <!-- Match Info Header -->
      <div class="w-full text-center space-y-1">
        <h1 class="print-headline text-xl md:text-2xl text-white">{match.homeTeam} vs {match.awayTeam}</h1>
        <p class="action-label text-emerald-400">{match.tournament}</p>
      </div>
    {/if}

    {#if match && match.showPlayer !== false}
      <!-- Main Player -->
      <div class="w-auto m-0">
        <Player {streamUrl} />
      </div>

      <!-- Servers -->
      {#if match.links && match.links.length > 0}
        <div class="flex flex-wrap justify-center gap-2 md:gap-4 w-full px-4">
          {#each match.links as link, index (index)}
            <button
              type="button"
              on:click={() => selectServer(link.url)}
              class="action-label border px-3 py-1.5 transition-all md:px-6 md:py-2
              {activeServerUrl === link.url ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'border-white/10 bg-black text-zinc-300 hover:border-white/40 hover:text-white'}"
            >
              {link.label || `Server ${index + 1}`}
            </button>
          {/each}
        </div>
      {:else}
        <p class="text-zinc-500 action-label">No streaming links available yet.</p>
      {/if}
    {:else if !match}
      <p class="text-zinc-500 action-label">Loading match details...</p>
    {/if}

    {#if match && match.description}
      <div class="w-full border border-white/10 bg-black/80 p-6">
        <h2 class="print-headline text-lg text-white mb-3">Match Details</h2>
        <div class="playpage-description text-stone-200 font-serif text-sm leading-relaxed">
          {@html match.description}
        </div>
      </div>
    {/if}

    <!-- Bottom Ad Space -->
    <div
      class="flex h-32 w-full items-center justify-center border border-dashed border-white/20 bg-black/60"
    >
      <span class="action-label text-zinc-600">Advertisement</span>
    </div>
  </div>
</div>

<style>
  .playpage-description :global(p) {
    margin-bottom: 0.5rem;
  }
  .playpage-description :global(strong),
  .playpage-description :global(b) {
    color: #ffffff;
    font-weight: 700;
  }
  .playpage-description :global(ul) {
    list-style: disc;
    padding-left: 1.25rem;
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
  }
  .playpage-description :global(ol) {
    list-style: decimal;
    padding-left: 1.25rem;
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
  }
  .playpage-description :global(li) {
    margin-bottom: 0.125rem;
  }
  .playpage-description :global(a) {
    color: #f87171;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .playpage-description :global(a:hover) {
    color: #fca5a5;
  }
</style>
