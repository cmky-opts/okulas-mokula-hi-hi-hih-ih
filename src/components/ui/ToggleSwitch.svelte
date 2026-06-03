<script>
  import { createEventDispatcher } from "svelte";

  export let checked = false;
  export let disabled = false;
  export let label = "";

  const dispatch = createEventDispatcher();

  const toggle = () => {
    if (disabled) return;
    dispatch("change", !checked);
  };
</script>

<button
  type="button"
  on:click={toggle}
  class="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition duration-200 focus:outline-none hover:bg-white/10"
  class:cursor-not-allowed={disabled}
  class:opacity-50={disabled}
  {disabled}
>
  <span
    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200"
    class:bg-emerald-500={checked}
    class:bg-zinc-700={!checked}
  >
    <span
      class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200"
      class:translate-x-5={checked}
      class:translate-x-0={!checked}
    ></span>
  </span>
  <span>{label}</span>
</button>
