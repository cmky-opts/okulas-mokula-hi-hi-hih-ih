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
          DMCA Notice
        </h1>
        <p class="max-w-2xl text-sm text-zinc-400 uppercase tracking-wider">
          Digital Millennium Copyright Act compliance and takedown procedure.
        </p>
      </div>
    </div>

    <div class="border border-white/10 bg-black/80 p-6 sm:p-8 space-y-6 text-stone-200 font-serif leading-relaxed">
      <p>
        Sports Live respects the intellectual property rights of others and expects its users to do the same. 
        In accordance with the Digital Millennium Copyright Act of 1998, we will respond expeditiously to claims of 
        copyright infringement committed using our platform.
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">Filing a DMCA Notice</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, 
        please provide our designated copyright agent with the following information in writing:
      </p>
      <ul class="list-disc list-inside space-y-1 mt-2">
        <li>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf.</li>
        <li>Identification of the copyrighted work claimed to have been infringed.</li>
        <li>Identification of the material that is claimed to be infringing and information reasonably sufficient to locate the material.</li>
        <li>Your contact information, including address, telephone number, and email address.</li>
        <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
        <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the copyright owner.</li>
      </ul>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">Submit a Notice</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        Please send your DMCA notice to our designated agent at:
      </p>
      <div class="border border-white/10 bg-black/40 p-4 mt-2 text-sm">
        <p><strong class="text-white">Email:</strong>WorldCup2026.fever@protonmail.com</p>
        
      </div>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">Counter-Notice</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        If you believe that material you posted was removed by mistake, you may submit a counter-notification. 
        Please include your contact information, identification of the removed material, a statement under penalty 
        of perjury that you have a good faith belief the material was removed in error, and your signature.
      </p>
    </div>
  </div>
</section>
