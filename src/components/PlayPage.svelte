<script>
  import Player from "./ui/Player.svelte";
</script>

<div class="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 p-4">
  <!-- Top Ad Space -->
  <div
    class="flex h-24 w-full items-center justify-center rounded border border-dashed border-white/20 bg-zinc-900/50"
  >
    <span class="text-[10px] uppercase tracking-widest text-zinc-600"
      >Advertisement</span
    >
  </div>

  <!-- Main Player -->
  <div class="w-auto m-0">
    <Player />
  </div>
  <div class="flex flex-wrap justify-center gap-2 md:gap-4">
    <!-- Repeat this button structure for each server -->
    <button
      type="button"
      class="rounded border border-white/10 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-300 transition-all hover:border-white/40 hover:text-white md:px-6 md:py-2 md:text-base"
    >
      Server 1
    </button>

    <button
      type="button"
      class="rounded border border-white/10 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-300 transition-all hover:border-white/40 hover:text-white md:px-6 md:py-2 md:text-base"
    >
      Server 2
    </button>

    <button
      type="button"
      class="rounded border border-white/10 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-300 transition-all hover:border-white/40 hover:text-white md:px-6 md:py-2 md:text-base"
    >
      Server 3
    </button>
    <button
      type="button"
      class="rounded border border-white/10 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-300 transition-all hover:border-white/40 hover:text-white md:px-6 md:py-2 md:text-base"
    >
      Server 4
    </button>
    <button
      type="button"
      class="rounded border border-white/10 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-300 transition-all hover:border-white/40 hover:text-white md:px-6 md:py-2 md:text-base"
    >
      Server 5
    </button>
  </div>
  <div
    class="flex h-32 w-full items-center justify-center rounded border border-dashed border-white/20 bg-zinc-900/50"
  >
    <span class="text-[10px] uppercase tracking-widest text-zinc-600"
      >Advertisement</span
    >
  </div>
</div>
