<script>
  import { push } from "svelte-spa-router";

  let form = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  let submitted = false;

  const handleBackClick = () => {
    push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitted = true;
    form = { name: "", email: "", subject: "", message: "" };
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
        <p class="action-label text-amber-400/80">Contact Us</p>
        <h1 class="print-headline text-3xl sm:text-5xl text-white">
          Get In Touch
        </h1>
        <p class="max-w-2xl text-sm text-zinc-400 uppercase tracking-wider">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>
    </div>

    <div class="border border-white/10 bg-black/80 p-6 sm:p-8">
      {#if submitted}
        <div class="border border-emerald-500/50 bg-emerald-900/20 p-6 text-center">
          <p class="text-emerald-400 font-bold uppercase tracking-wider text-lg">Message Sent!</p>
          <p class="text-stone-200 font-serif mt-2">
            Thank you for reaching out. We'll get back to you shortly.
          </p>
          <button
            type="button"
            on:click={() => (submitted = false)}
            class="mt-4 action-label border border-white/10 bg-black/60 px-4 py-2 text-white transition hover:border-white/30"
          >
            Send Another Message
          </button>
        </div>
      {:else}
        <form on:submit={handleSubmit} class="space-y-5">
          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label class="block text-sm text-zinc-300 mb-1" for="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                required
                bind:value={form.name}
                class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label class="block text-sm text-zinc-300 mb-1" for="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                required
                bind:value={form.email}
                class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm text-zinc-300 mb-1" for="contact-subject">Subject</label>
            <input
              id="contact-subject"
              type="text"
              required
              bind:value={form.subject}
              class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
              placeholder="How can we help?"
            />
          </div>
          <div>
            <label class="block text-sm text-zinc-300 mb-1" for="contact-message">Message</label>
            <textarea
              id="contact-message"
              required
              rows="6"
              bind:value={form.message}
              class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500 resize-y"
              placeholder="Write your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            class="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
          >
            Send Message
          </button>
        </form>
      {/if}
    </div>

    <div class="border border-white/10 bg-black/60 p-6">
      <h2 class="print-headline text-xl text-white mb-4">Other Ways to Reach Us</h2>
      <div class="h-0.5 w-16 bg-red-700/70 mb-4"></div>
      <div class="space-y-3 text-stone-200 font-serif">
        <p><strong class="text-white">Email:</strong> [Insert Email Address]</p>
        <p><strong class="text-white">Response Time:</strong> Typically within 24–48 hours.</p>
      </div>
    </div>
  </div>
</section>
