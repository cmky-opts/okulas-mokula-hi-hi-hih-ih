<script>
//WorldCup2026.fever@protonmail.com

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

    <div class="border border-white/10 bg-black/60 p-6 sm:p-8">
      <div class="space-y-4">
        <p class="action-label text-amber-400/80">Contact Us</p>
        <h1 class="print-headline text-3xl sm:text-5xl text-white">
          Get In Touch
        </h1>
        
        <div class="h-0.5 w-16 bg-red-700/70 my-4"></div>
        
        <div class="space-y-3 text-stone-200 font-serif text-lg">
          <p>We'd love to hear from you. Please reach out to us directly via email:</p>
          <p>
            <strong class="text-white">Email:</strong> 
            <a href="mailto:WorldCup2026.fever@protonmail.com" class="text-emerald-400 hover:underline">
              WorldCup2026.fever@protonmail.com
            </a>
          </p>
          <p class="text-sm text-zinc-400 font-sans uppercase tracking-wider pt-2">
            Response Time: Typically within 24–48 hours.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>