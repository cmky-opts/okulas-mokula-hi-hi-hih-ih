<script>
  import { onMount } from "svelte";
  import { getHeroEnabled, saveHeroEnabled } from "../../lib/admin.data";

  let heroEnabled = true;
  let saving = false;
  let saved = false;

  onMount(async () => {
    heroEnabled = await getHeroEnabled();
  });

  const toggle = async () => {
    saving = true;
    saved = false;
    try {
      const newVal = !heroEnabled;
      await saveHeroEnabled(newVal);
      heroEnabled = newVal;
      saved = true;
    } catch (e) {
      console.error("Failed to save setting:", e);
    } finally {
      saving = false;
    }
  };
</script>

<div class="space-y-6">
  <h2 class="text-base font-medium text-white">Site Settings</h2>

  <div class="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3">
    <div>
      <p class="text-sm text-white">Hero Section</p>
      <p class="text-xs text-zinc-500">Show the hero banner on the homepage</p>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={heroEnabled}
      on:click={toggle}
      disabled={saving}
      class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors {heroEnabled ? 'bg-emerald-500' : 'bg-zinc-700'} {saving ? 'opacity-50' : ''}"
    >
      <span
        class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform {heroEnabled ? 'translate-x-5' : 'translate-x-0'}"
      />
    </button>
  </div>

  {#if saved}
    <p class="text-xs text-emerald-400">Saved.</p>
  {/if}
</div>
