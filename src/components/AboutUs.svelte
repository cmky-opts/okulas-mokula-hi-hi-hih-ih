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
        <p class="action-label text-amber-400/80">About Us</p>
        <h1 class="print-headline text-3xl sm:text-5xl text-white">
          About [Insert Brand Name]
        </h1>
        <p class="max-w-2xl text-sm text-zinc-400 uppercase tracking-wider">
          Your destination for live sports streaming and expert football coverage.
        </p>
      </div>
    </div>

    <div class="border border-white/10 bg-black/80 p-6 sm:p-8 space-y-6">
      <div>
        <h2 class="print-headline text-xl text-white mb-3">Our Mission</h2>
        <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
        <p class="text-stone-200 font-serif leading-relaxed">
          At [Insert Brand Name], we are passionate about bringing football fans closer to the action. 
          Our platform provides seamless access to live sports streaming, breaking news, expert predictions, 
          and in-depth match coverage from tournaments around the globe.
        </p>
      </div>

      <div>
        <h2 class="print-headline text-xl text-white mb-3">Who We Are</h2>
        <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
        <p class="text-stone-200 font-serif leading-relaxed">
          [Insert Brand Name] is a dedicated team of sports enthusiasts, content creators, and technology 
          professionals committed to delivering a world-class sports viewing experience. From the biggest 
          international tournaments to local derbies, we strive to cover every angle of the beautiful game.
        </p>
      </div>

      <div>
        <h2 class="print-headline text-xl text-white mb-3">What We Offer</h2>
        <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
        <ul class="list-disc list-inside text-stone-200 font-serif space-y-2">
          <li><strong class="text-white">Live Streaming:</strong> Real-time access to matches and events.</li>
          <li><strong class="text-white">News &amp; Updates:</strong> Timely articles covering the latest developments.</li>
          <li><strong class="text-white">Expert Predictions:</strong> Match previews and outcome analysis.</li>
          <li><strong class="text-white">Comprehensive Coverage:</strong> Stats, lineups, and post-match analysis.</li>
        </ul>
      </div>

      <div>
        <h2 class="print-headline text-xl text-white mb-3">Contact Us</h2>
        <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
        <p class="text-stone-200 font-serif leading-relaxed">
          Have a question or feedback? Reach out to us at <a href="mailto:[Insert Email Address]" class="text-red-400 underline hover:text-red-300">[Insert Email Address]</a>.
        </p>
      </div>
    </div>
  </div>
</section>
