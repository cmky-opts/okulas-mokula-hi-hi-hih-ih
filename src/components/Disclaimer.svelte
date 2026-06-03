<script>
  import { push } from "svelte-spa-router";

  const handleBackClick = () => {
    push("/");
  };
</script>

<section class="min-h-screen bg-texture w-full py-10 pt-20 border-b border-white/10">
  <div class="mx-auto w-full max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
    <button
      type="button"
      on:click={handleBackClick}
      class="action-label flex items-center gap-2 border border-white/10 bg-black/60 px-4 py-2 text-white transition hover:border-white/30"
    >
      ← Back to Home
    </button>

    <div class="border border-white/10 bg-black/60 p-6">
      <div class="space-y-2">
        <p class="action-label text-amber-400/80">Legal</p>
        <h1 class="print-headline text-3xl sm:text-5xl text-white">
          Disclaimer
        </h1>
        <p class="max-w-2xl text-sm text-zinc-400 uppercase tracking-wider">
          Information regarding scores, match facts, and content reliability.
        </p>
      </div>
    </div>

    <div class="border border-white/10 bg-black/80 p-6 sm:p-8 space-y-6 text-stone-200 font-serif leading-relaxed">
      <p>
        <strong class="text-white">Last Updated:</strong> June 2026
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">Scores & Match Information</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        All live scores, match timings, and upcoming event data provided on worldcup2026live.xyz are intended solely for informational and entertainment purposes. While we strive to display real-time updates, technical delays or data inconsistencies from third-party sources can occur. We do not guarantee the 100% accuracy or real-time precision of any scoreline or fixture timing.
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">Fun Facts & Content</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        The fun facts, trivia, and commentary regarding matches or events are published in good faith for general knowledge and fan engagement. They do not constitute official statements, expert analysis, or professional advice. 
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">External Links Disclaimer</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        Our platform may contain links or embeds directing to external websites or media streams. These external resources are managed by third parties and are not affiliated with us. We do not control, endorse, or assume responsibility for the content, quality, or reliability of these external streams and web platforms.
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">Limitation of Liability</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        Under no circumstances shall Sports Live be held responsible or liable for any decisions made, actions taken, or losses incurred based on the score updates, trivia, or timelines provided on this website. Relying on the data presented here is completely at your own risk.
      </p>

      
  </div>
</section>