<script>
  export let eventName = "Event";
  export let eventImage = "";
  export let eventDescription = "";
  export let matchCount = 0;
</script>

<style>
  .event-description :global(p) {
    margin-bottom: 0.5rem;
  }
  .event-description :global(strong),
  .event-description :global(b) {
    color: #ffffff;
    font-weight: 700;
  }
  .event-description :global(ul) {
    list-style: disc;
    padding-left: 1.25rem;
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
  }
  .event-description :global(ol) {
    list-style: decimal;
    padding-left: 1.25rem;
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
  }
  .event-description :global(li) {
    margin-bottom: 0.125rem;
  }
  .event-description :global(a) {
    color: #f87171;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .event-description :global(a:hover) {
    color: #fca5a5;
  }
</style>

<div
  class="relative border border-white/10 bg-black/60 p-6 overflow-hidden clip-jagged"
>
  {#if eventImage}
    <div
      class="absolute inset-0 bg-cover bg-center opacity-25"
      style="background-image: url({eventImage})"
    ></div>
    <div class="absolute inset-0 bg-black/70"></div>
  {/if}

  <div
    class="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
  >
    <div class="space-y-2">
      <p class="action-label text-emerald-400/80">
        Event Details
      </p>
      <h1 class="print-headline text-3xl sm:text-4xl text-white">
        {eventName}
      </h1>
      <div class="event-description max-w-2xl text-sm text-white sm:text-base font-serif leading-relaxed">
        {@html eventDescription}
      </div>
      {#if matchCount > 0}
        <p class="action-label text-emerald-300/70 mt-2">
          {matchCount}
          {matchCount === 1 ? "match" : "matches"}
        </p>
      {/if}
    </div>

    <!-- Right: Event Badge/Icon -->
    <div
      class="flex items-center justify-center w-20 h-20 bg-emerald-500/10 border border-emerald-500/20"
    >
      <span class="text-2xl">🏆</span>
    </div>
  </div>
</div>
