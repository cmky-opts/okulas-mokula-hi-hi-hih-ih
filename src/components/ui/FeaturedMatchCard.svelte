<script>
  export let match = {};
  export let eventId = "";
  export let matchId = "";
</script>

<a
  href="#/play?eventId={eventId}&matchId={matchId}"
  class="block rounded-xl border border-white/10 bg-black/60 transition hover:border-white/25"
>
  <div class="flex items-center justify-between border-b border-white/10 px-5 py-3">
    <div class="flex items-center gap-2">
      <span class="text-base">⚽</span>
      <span class="text-sm font-bold text-white">{match.tournament}</span>
    </div>
    <span
      class="inline-flex items-center rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider {match.status === 'Ongoing' ? 'bg-emerald-500/10 text-emerald-300' : match.status === 'Finished' ? 'bg-zinc-800 text-zinc-500' : 'bg-sky-500/10 text-sky-300'}"
    >
      {match.status === 'Ongoing' ? 'Live' : match.status === 'Finished' ? 'FT' : match.status}
    </span>
  </div>

  <div class="px-5 pt-3 pb-2">
    <p class="text-[11px] font-medium uppercase tracking-widest text-zinc-500">{match.venue}</p>
  </div>

  <div class="flex items-center px-5 pb-5">
    <div class="flex flex-1 flex-col gap-4">
      <div class="flex items-center gap-3">
        <img
          src={match.homeLogoUrl}
          alt={match.homeTeam}
          class="h-10 w-10 shrink-0 rounded-full border border-white/10 bg-black object-contain p-1"
        />
        <span class="text-sm font-medium text-zinc-100">{match.homeTeam}</span>
      </div>
      <div class="flex items-center gap-3">
        <img
          src={match.awayLogoUrl}
          alt={match.awayTeam}
          class="h-10 w-10 shrink-0 rounded-full border border-white/10 bg-black object-contain p-1"
        />
        <span class="text-sm font-medium text-zinc-100">{match.awayTeam}</span>
      </div>
    </div>

    <div class="ml-6 border-l border-white/10 pl-6">
      {#if match.status === 'Upcoming'}
        <span class="text-2xl font-bold tracking-tight text-white">{match.dateTime}</span>
      {:else}
        <span class="text-2xl font-bold tracking-tight text-emerald-400">{match.score}</span>
      {/if}
    </div>
  </div>
</a>
