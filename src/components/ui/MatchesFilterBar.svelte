<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let activeFilter = "all";

  const filters = [
    { value: "all", label: "All matches", color: "white" },
    { value: "Ongoing", label: "Ongoing", color: "emerald" },
    { value: "Upcoming", label: "Upcoming", color: "sky" },
  ];

  const handleFilterChange = (value) => {
    activeFilter = value;
    dispatch("filterChange", value);
  };
</script>

<div class="flex flex-wrap gap-2">
  {#each filters as filter}
    <button
      type="button"
      on:click={() => handleFilterChange(filter.value)}
      class={`action-label border px-4 py-2 transition ${
        activeFilter === filter.value
          ? filter.color === "white"
            ? "border-white/40 bg-white/10 text-white"
            : filter.color === "emerald"
              ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-200"
              : "border-sky-500/40 bg-sky-500/15 text-sky-200"
          : "border-white/10 bg-black/60 text-white/70 hover:border-white/30 hover:bg-black/80"
      }`}
    >
      {filter.label}
    </button>
  {/each}
</div>
