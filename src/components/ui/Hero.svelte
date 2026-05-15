<script>
  // Placeholder for carousel logic
  let activeSlide = 0;
  const slides = [0, 1, 2, 3];
</script>

<section
  class="relative w-full min-h-125 bg-black overflow-hidden flex items-center"
>
  <!-- Background Image with Dark Overlay -->
  <div class="absolute inset-0 z-0">
    <!-- Using a dark radial gradient to make the text pop -->
    <div
      class="absolute inset-0 bg-linear-to-r from-black via-black/10 to-transparent z-10"
    ></div>
    <img
      src="public\495932177544.jpeg"
      alt="Hero Background"
      class="w-full h-full object-cover opacity-60"
    />
  </div>

  <!-- Content Container -->
  <div
    class="relative z-20 mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full"
  >
    <!-- Left: Text Content -->
    <div class="flex flex-col items-start space-y-6">
      <h1
        class="font-integral text-4xl md:text-6xl text-white leading-tight tracking-tight"
      >
        FREE FOOTBALL <br /> HIGHLIGHTS ON DAZN
      </h1>

      <p
        class="text-zinc-400 font-integral-medium text-lg max-w-md leading-relaxed"
      >
        Goals, highlights and big moments from LALIGA, Bundesliga, Serie A and
        the Saudi Pro League.
      </p>

      <button
        class="bg-white text-black px-10 py-3 rounded font-bold hover:bg-zinc-200 transition-all uppercase tracking-wide"
      >
        Watch Free
      </button>
    </div>

    <!-- Right: Featured Graphic (Optional overlay for the image_903b23.jpg) -->
    <div class="hidden md:flex justify-center items-center relative">
      <!-- This side remains open for the subjects in image_903b23.jpg to be visible -->
    </div>
  </div>
</section>
