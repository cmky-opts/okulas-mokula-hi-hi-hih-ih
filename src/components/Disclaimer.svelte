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
          Important notices regarding content, accuracy, and liability.
        </p>
      </div>
    </div>

    <div class="border border-white/10 bg-black/80 p-6 sm:p-8 space-y-6 text-stone-200 font-serif leading-relaxed">
      <p>
        <strong class="text-white">Last Updated:</strong> [Insert Date]
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">General Information</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        The information provided on [Insert Website URL] ("the Site") is for general informational and 
        entertainment purposes only. All content on the Site is provided in good faith; however, we make no 
        representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, 
        reliability, availability, or completeness of any information on the Site.
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">External Links Disclaimer</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        The Site may contain links to external websites that are not provided or maintained by or in any way 
        affiliated with [Insert Brand Name]. We do not guarantee the accuracy, relevance, timeliness, or 
        completeness of any information on these external websites.
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">Content Disclaimer</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        The views and opinions expressed in articles, predictions, and other content on the Site are those of 
        the authors and do not necessarily reflect the official policy or position of [Insert Brand Name]. 
        Any content provided by our authors is of their opinion and is not intended to malign any religion, 
        ethnic group, club, organization, company, individual, or anyone or anything.
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">No Professional Advice</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        The content on the Site is not intended to be a substitute for professional advice. Always seek the 
        advice of qualified professionals regarding any questions you may have. Reliance on any information 
        provided on the Site is solely at your own risk.
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">Limitation of Liability</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        In no event shall [Insert Brand Name] or its affiliates be liable for any direct, indirect, incidental, 
        special, consequential, or punitive damages arising out of or relating to your use of the Site or any 
        content therein.
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">Contact Us</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        If you have any questions about this Disclaimer, please contact us at 
        <a href="mailto:[Insert Email Address]" class="text-red-400 underline hover:text-red-300">[Insert Email Address]</a>.
      </p>
    </div>
  </div>
</section>
