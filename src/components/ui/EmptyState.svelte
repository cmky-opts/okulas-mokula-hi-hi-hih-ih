<script>
  export let message = "No matches found";
  export let subMessage =
    "Try selecting a different filter or check back later";
</script>

<div
  class="flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-zinc-900/50 p-12 text-center"
>
  <div
    class="flex items-center justify-center rounded-full w-16 h-16 bg-zinc-800 border border-white/10"
  >
    <span class="text-2xl">📭</span>
  </div>
  <div class="space-y-2">
    <h3 class="text-lg font-semibold text-white">{message}</h3>
    <p class="text-sm text-zinc-400">{subMessage}</p>
  </div>
</div>
