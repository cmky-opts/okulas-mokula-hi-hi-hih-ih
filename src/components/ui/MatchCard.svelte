<script>
  export let homeTeam = "Home Team";
  export let awayTeam = "Away Team";
  export let homeLogo = "";
  export let awayLogo = "";
  export let dateTime = "TBD";
  export let venue = "Unknown Venue";
  export let tournament = "League";
  export let status = "Upcoming";
  export let score = "-";
  export let phase = "";

  const statusClasses =
    status === "Ongoing"
      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-200"
      : "bg-sky-500/10 border-sky-500/20 text-sky-200";
</script>

<div
  class="group overflow-hidden border border-white/10 bg-black/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-white/30"
>
  <div
    class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
  >
    <div class="space-y-2">
      <p class="action-label text-sky-400/80">
        {tournament}
      </p>
      <h2 class="text-xl font-bold text-white uppercase tracking-tight">{homeTeam} vs {awayTeam}</h2>
    </div>

    <span
      class={`inline-flex items-center border px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-300 -skew-x-6 ${statusClasses}`}
    >
      {status}
    </span>
  </div>

  <div
    class="mt-5 grid gap-4 border border-white/10 bg-black/40 p-4 text-sm text-zinc-300 sm:grid-cols-[1fr_auto_1fr] sm:items-center"
  >
    <div class="flex flex-col items-center gap-3">
      <img
        src={homeLogo}
        alt={homeTeam}
        class="h-16 w-16 border border-white/10 bg-black object-contain p-2 img-ink"
      />
      <span class="text-sm font-bold text-zinc-100 uppercase tracking-wider">{homeTeam}</span>
    </div>

    <div class="flex flex-col items-center justify-center gap-2 text-center">
      <span class="text-3xl font-black text-white">{score}</span>
      <span class="action-label text-zinc-500">{phase || dateTime}</span>
    </div>

    <div class="flex flex-col items-center gap-3">
      <img
        src={awayLogo}
        alt={awayTeam}
        class="h-16 w-16 border border-white/10 bg-black object-contain p-2 img-ink"
      />
      <span class="text-sm font-bold text-zinc-100 uppercase tracking-wider">{awayTeam}</span>
    </div>
  </div>

  <div
    class="mt-5 grid gap-3 border border-white/10 bg-black/60 p-4 text-sm text-zinc-300"
  >
    <div class="flex items-center justify-between">
      <span class="font-bold text-zinc-200 uppercase tracking-wider text-xs">Kickoff</span>
      <span class="action-label">{dateTime}</span>
    </div>
    <div class="flex items-center justify-between">
      <span class="font-bold text-zinc-200 uppercase tracking-wider text-xs">Venue</span>
      <span class="action-label">{venue}</span>
    </div>
  </div>
</div>
