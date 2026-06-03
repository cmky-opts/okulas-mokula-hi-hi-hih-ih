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
  class="group relative flex w-full h-fit flex-col items-center justify-center overflow-hidden transition-all hover:cursor-pointer border border-white/10 bg-black/60 p-0.5 hover:border-white/30"
>
  <div class="flex w-full items-center justify-center ">
    <figure class="w-full">
      <img
        src={imgSrc}
        alt={eventName}
        class="w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-110 img-ink"
      />
    </figure>
  </div>

  {#if eventName}
    <div
      class="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center"
    >
      <p class="text-center action-label text-white px-2">
        {eventName}
      </p>
    </div>
  {/if}

  <div
    class="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(84,255,218,0.3)]"
  ></div>
</button>
