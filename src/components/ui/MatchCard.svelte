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
  class="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/90 p-5 shadow-[0_0_30px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-white/20"
>
  <div
    class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
  >
    <div class="space-y-2">
      <p class="text-xs uppercase tracking-[0.35em] text-sky-400/80">
        {tournament}
      </p>
      <h2 class="text-xl font-semibold text-white">{homeTeam} vs {awayTeam}</h2>
    </div>

    <span
      class={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] transition-colors duration-300 ${statusClasses}`}
    >
      {status}
    </span>
  </div>

  <div
    class="mt-5 grid gap-4 rounded-3xl bg-white/5 p-4 text-sm text-zinc-300 shadow-inner shadow-black/10 sm:grid-cols-[1fr_auto_1fr] sm:items-center"
  >
    <div class="flex flex-col items-center gap-3">
      <img
        src={homeLogo}
        alt={homeTeam}
        class="h-16 w-16 rounded-full border border-white/10 bg-zinc-900 object-contain p-2"
      />
      <span class="text-sm font-medium text-zinc-100">{homeTeam}</span>
    </div>

    <div class="flex flex-col items-center justify-center gap-2 text-center">
      <span class="text-3xl font-semibold text-white">{score}</span>
      <span class="text-xs uppercase tracking-[0.25em] text-zinc-500"
        >{phase || dateTime}</span
      >
    </div>

    <div class="flex flex-col items-center gap-3">
      <img
        src={awayLogo}
        alt={awayTeam}
        class="h-16 w-16 rounded-full border border-white/10 bg-zinc-900 object-contain p-2"
      />
      <span class="text-sm font-medium text-zinc-100">{awayTeam}</span>
    </div>
  </div>

  <div
    class="mt-5 grid gap-3 rounded-3xl border border-white/10 bg-zinc-900/70 p-4 text-sm text-zinc-300"
  >
    <div class="flex items-center justify-between">
      <span class="font-medium text-zinc-200">Kickoff</span>
      <span>{dateTime}</span>
    </div>
    <div class="flex items-center justify-between">
      <span class="font-medium text-zinc-200">Venue</span>
      <span>{venue}</span>
    </div>
  </div>
</div>
