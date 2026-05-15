<script>
  import { push } from "svelte-spa-router";

  export let imgSrc = "";
  export let eventId = "";
  export let eventName = "";

  const handleClick = () => {
    if (eventId) {
      push(`/event/${eventId}`);
    }
  };
</script>

<!-- 
  Card component that displays an event and navigates to event matches
  when clicked. Follows modular principle with reusable styling.
-->
<button
  type="button"
  on:click={handleClick}
  class="group relative flex w-full flex-col items-center justify-center overflow-hidden transition-all hover:cursor-pointer rounded-xl border border-white/10 bg-zinc-900/40 p-4 hover:border-white/20 hover:bg-zinc-900/60"
>
  <div class="flex w-full items-center justify-center p-2">
    <figure class="w-full">
      <img
        src={imgSrc}
        alt={eventName}
        class="h-auto w-full max-h-32 object-contain transition-transform duration-300 group-hover:scale-110"
      />
    </figure>
  </div>

  <!-- Event name shown on hover/focus -->
  {#if eventName}
    <div
      class="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center rounded-xl"
    >
      <p class="text-center text-sm font-semibold text-white px-2">
        {eventName}
      </p>
    </div>
  {/if}

  <!-- Subtle Emerald Glow on hover to match your style -->
  <div
    class="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(84,255,218,0.3)]"
  ></div>
</button>
