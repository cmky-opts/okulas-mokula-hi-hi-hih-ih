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
          How we collect, use, and protect your information.
        </p>
      </div>
    </div>

    <div class="border border-white/10 bg-black/80 p-6 sm:p-8 space-y-6 text-stone-200 font-serif leading-relaxed">
      <p>
        <strong class="text-white">Last Updated:</strong> [Insert Date]
      </p>
      <p>
        [Insert Brand Name] ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
        explains how we collect, use, disclose, and safeguard your information when you visit our website 
        [Insert Website URL] and use our services.
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">1. Information We Collect</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>We may collect the following types of information:</p>
      <ul class="list-disc list-inside space-y-1 mt-2">
        <li><strong class="text-white">Personal Data:</strong> Name, email address, and other information you voluntarily provide.</li>
        <li><strong class="text-white">Usage Data:</strong> Pages visited, time spent, browser type, device information, and IP address.</li>
        <li><strong class="text-white">Cookies:</strong> We use cookies to enhance your experience and analyze site traffic.</li>
      </ul>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">2. How We Use Your Information</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <ul class="list-disc list-inside space-y-1">
        <li>To provide, operate, and maintain our website and services.</li>
        <li>To improve and personalize your experience.</li>
        <li>To communicate with you regarding updates, promotions, and support.</li>
        <li>To monitor usage and prevent abuse.</li>
      </ul>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">3. Sharing Your Information</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        We do not sell your personal information. We may share data with trusted third-party service providers 
        who assist in operating our website and services, subject to confidentiality agreements.
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">4. Cookies</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        Our website uses cookies to improve functionality and analyze traffic. You can control cookie preferences 
        through your browser settings. Disabling cookies may affect certain features of the site.
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">5. Third-Party Services</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        We may use third-party services for analytics, advertising, and content delivery. These services have 
        their own privacy policies governing data usage.
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">6. Data Security</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        We implement reasonable security measures to protect your data. However, no method of transmission over 
        the Internet is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">7. Your Rights</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        Depending on your jurisdiction, you may have the right to access, correct, delete, or port your personal 
        data. To exercise these rights, contact us at [Insert Email Address].
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">8. Changes to This Policy</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of changes by posting the new 
        policy on this page with an updated revision date.
      </p>

      <h2 class="print-headline text-xl text-white mt-8 mb-3">9. Contact Us</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <p>
        If you have questions about this Privacy Policy, please contact us at <a href="mailto:[Insert Email Address]" class="text-red-400 underline hover:text-red-300">[Insert Email Address]</a>.
      </p>
    </div>
  </div>
</section>
