<script>
  import { push } from "svelte-spa-router";

  const handleBackClick = () => {
    push("/");
  };
</script>

<section
  class="min-h-screen bg-texture w-full py-10 pt-20 border-b border-white/10"
>
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
          About Sports Live
        </h1>
        <p class="max-w-2xl text-sm text-zinc-400 uppercase tracking-wider">
          Your go-to source for multi-sport news, entertaining stories, and
          engaging game analysis.
        </p>
      </div>
    </div>

    <div class="border border-white/10 bg-black/80 p-6 sm:p-8 space-y-6">
      <div>
        <h2 class="print-headline text-xl text-white mb-3">Our Mission</h2>
        <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
        <p class="text-stone-200 font-serif leading-relaxed">
          At Sports Live, we are passionate about the lighter, more entertaining
          side of the sporting world. Our platform brings fans together with the
          latest breaking news, viral sports stories, and creative deep-dives
          into the greatest moments across all sports and games.
        </p>
      </div>

      <div>
        <h2 class="print-headline text-xl text-white mb-3">Who We Are</h2>
        <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
        <p class="text-stone-200 font-serif leading-relaxed">
          Sports Live is a dedicated group of sports writers, analytical
          thinkers, and passionate gaming enthusiasts. We love competition in
          all its forms and focus on delivering fresh, entertaining content that
          keeps you connected to your favorite sports, leagues, and tournaments
          worldwide.
        </p>
      </div>

      <div>
        <h2 class="print-headline text-xl text-white mb-3">What We Offer</h2>
        <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
        <ul class="list-disc list-inside text-stone-200 font-serif space-y-2">
          <li>
            <strong class="text-white">Multi-Sport News:</strong> Quick updates on
            global headlines across athletics, court sports, racing, and more.
          </li>
          <li>
            <strong class="text-white">Fun Content &amp; Trivia:</strong> Memes, viral
            clips, and entertaining history from the world of games.
          </li>
          <li>
            <strong class="text-white">Engaging Articles:</strong> In-depth looks
            into player culture, legendary rivalries, and fan community perspectives.
          </li>
          <li>
            <strong class="text-white">Game Breakdowns &amp; Previews:</strong> Written
            analysis and insight into major upcoming matchups and events.
          </li>
        </ul>
      </div>

      <div>
        <h2 class="print-headline text-xl text-white mb-3">Contact Us</h2>
        <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
        <p class="text-stone-200 font-serif leading-relaxed">
          Have a question or want to contribute an article? Reach out to us.
        </p>
      </div>
    </div>
  </div>
</section>
