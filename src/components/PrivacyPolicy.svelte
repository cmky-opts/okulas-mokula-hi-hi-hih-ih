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
          Privacy Policy
        </h1>
        <p class="max-w-2xl text-sm text-zinc-400 uppercase tracking-wider">
          How information is handled on worldcup2026live.xyz
        </p>
      </div>
    </div>

    <div class="border border-white/10 bg-black/80 p-6 sm:p-8 space-y-6 text-stone-200 font-serif leading-relaxed">
      <p>
        <strong class="text-white">Last Updated:</strong> June 2026
      </p>
      <p>
        At Sports Live, accessible from worldcup2026live.xyz, we prioritize the privacy of our visitors. This Privacy Policy outlines how data is managed on our platform.
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">1. Data We Collect</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        <strong>We do not personally collect, store, or request any personal data or identifiable information</strong> from our users. You can browse and use our website completely anonymously without creating an account or providing a name or email address.
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">2. Third-Party Services & Cookies</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        While we do not collect your information, we utilize third-party services (such as advertising networks, analytics platforms, and content delivery streams) to keep the site operational. 
      </p>
      <p>
        These external third-party providers may use cookies, web beacons, or tracking scripts to serve content, display relevant ads, and analyze traffic behavior. These third-party tools automatically receive your IP address and device information when this occurs. 
      </p>
      <p>
        Please note that Sports Live has no access to or control over the cookies and tracking technologies used by these third-party partners. We encourage you to consult their respective privacy policies for more information.
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">3. Managing Cookies</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        You can choose to disable cookies through your individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers' respective websites.
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">4. Contact Us</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        If you have any questions or require more information about our Privacy Policy, do not hesitate to contact us via email at 
        <a href="mailto:WorldCup2026.fever@protonmail.com" class="text-emerald-400 underline hover:text-emerald-300">WorldCup2026.fever@protonmail.com</a>.
      </p>
    </div>
  </div>
</section>