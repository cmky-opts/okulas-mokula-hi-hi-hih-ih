<script>
  // Placeholder for carousel logic
  let activeSlide = 0;
  const slides = [0, 1, 2, 3];
</script>

<section
  class="relative w-full min-h-125 bg-black overflow-hidden flex items-center border-y border-white/10"
>
  <!-- Background Image with Dark Overlay -->
  <div class="absolute inset-0 z-0 clip-jagged">
    <div
      class="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent z-10"
    ></div>
    <img
      src="public/495932177544.jpeg"
      alt="Hero Background"
      class="w-full h-full object-cover opacity-70 img-ink"
    />
  </div>

  <!-- Content Container -->
  <div
    class="relative z-20 mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full"
  >
    <!-- Left: Text Content -->
    <div class="flex flex-col items-start space-y-6">
      <h1 class="print-headline text-5xl md:text-7xl text-white">
        FREE FOOTBALL<br />HIGHLIGHTS
      </h1>

      <p class="text-zinc-400 font-medium text-lg max-w-md leading-relaxed uppercase tracking-wider">
        Goals, highlights and big moments from LALIGA, Bundesliga, Serie A and
        the Saudi Pro League.
      </p>

      <a
        href="#featured-matches"
        class="bg-white text-black px-10 py-3 font-black hover:bg-zinc-200 transition-all action-label border-2 border-white inline-block text-center"
      >
        Watch Free
      </a>
    </div>

    <!-- Right: Featured Graphic -->
    <div class="hidden md:flex justify-center items-center relative"></div>
  </div>
</section>
