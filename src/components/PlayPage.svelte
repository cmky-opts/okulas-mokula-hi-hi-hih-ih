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

<!-- Updated min-h-screen and background to match Home.svelte theme -->
<div class="min-h-screen bg-linear-to-b from-black via-[#121111] to-black w-full flex flex-col items-center">
  <div class="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 p-4 pt-10">
    <!-- Top Ad Space -->
    <div
      class="flex h-24 w-full items-center justify-center rounded border border-dashed border-white/20 bg-zinc-900/50"
    >
      <span class="text-[10px] uppercase tracking-widest text-zinc-600"
        >Advertisement</span
      >
    </div>

    {#if match}
      <!-- Match Info Header -->
      <div class="w-full text-center space-y-1">
        <h1 class="text-xl font-bold text-white uppercase tracking-wider">{match.homeTeam} vs {match.awayTeam}</h1>
        <p class="text-xs text-emerald-400 font-semibold tracking-[0.2em]">{match.tournament}</p>
      </div>
    {/if}

    <!-- Main Player -->
    <div class="w-auto m-0">
      <Player {streamUrl} />
    </div>

    <!-- Servers -->
    {#if match && match.links && match.links.length > 0}
      <div class="flex flex-wrap justify-center gap-2 md:gap-4 w-full px-4">
        {#each match.links as link, index (index)}
          <button
            type="button"
            on:click={() => selectServer(link.url)}
            class="rounded border px-3 py-1.5 text-sm font-medium transition-all md:px-6 md:py-2 md:text-base 
            {activeServerUrl === link.url ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'border-white/10 bg-zinc-900 text-zinc-300 hover:border-white/40 hover:text-white'}"
          >
            {link.label || `Server ${index + 1}`}
          </button>
        {/each}
      </div>
    {:else if match}
      <p class="text-zinc-500 text-sm">No streaming links available yet.</p>
    {:else}
      <p class="text-zinc-500 text-sm">Loading match details...</p>
    {/if}

    <!-- Bottom Ad Space -->
    <div
      class="flex h-32 w-full items-center justify-center rounded border border-dashed border-white/20 bg-zinc-900/50"
    >
      <span class="text-[10px] uppercase tracking-widest text-zinc-600"
        >Advertisement</span
      >
    </div>
  </div>
</div>
