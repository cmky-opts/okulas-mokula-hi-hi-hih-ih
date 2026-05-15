<script>
  export let eventName = "Event";
  export let eventImage = "";
  export let eventDescription = "";
  export let matchCount = 0;
</script>

<div
  class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-md overflow-hidden"
>
  <!-- Background Image with Overlay -->
  {#if eventImage}
    <div
      class="absolute inset-0 opacity-10 bg-cover bg-center"
      style="background-image: url({eventImage})"
    />
  {/if}

  <div
    class="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
  >
    <!-- Left: Event Title and Description -->
    <div class="space-y-2">
      <p class="text-sm uppercase tracking-[0.35em] text-emerald-400/80">
        Event Details
      </p>
      <h1 class="text-3xl font-semibold text-white sm:text-4xl">
        {eventName}
      </h1>
      <p class="max-w-2xl text-sm text-zinc-400 sm:text-base">
        {eventDescription}
      </p>
      {#if matchCount > 0}
        <p class="text-xs uppercase tracking-[0.25em] text-emerald-300/70">
          {matchCount}
          {matchCount === 1 ? "match" : "matches"}
        </p>
      {/if}
    </div>

    <!-- Right: Event Badge/Icon -->
    <div
      class="flex items-center justify-center rounded-full w-20 h-20 bg-emerald-500/10 border border-emerald-500/20"
    >
      <span class="text-2xl">🏆</span>
    </div>
  </div>
</div>
