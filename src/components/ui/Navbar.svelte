<script>
  let isOpen = false;

  const navLinks = [
    { name: "হোম", href: "/" },
    { name: "আমাদের সম্পর্কে", href: "/play" },
    { name: "সেবা", href: "/play" },
    { name: "যোগাযোগ", href: "/play" },
  ];
</script>

<nav
  class="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md"
>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <div
        class="flex shrink-0 items-center text-2xl font-bold tracking-tighter text-white"
      >
        My<span class="text-zinc-500">Brand</span>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden space-x-8 font-medium text-zinc-400 md:flex">
        {#each navLinks as link}
          <!-- Fixed the hash prefix and removed the extra double quote -->
          <a href="#{link.href}" class="transition-colors hover:text-white">
            {link.name}
          </a>
        {/each}
      </div>

      <div class="flex items-center md:hidden">
        <button
          onclick={() => (isOpen = !isOpen)}
          class="text-zinc-400 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {#if isOpen}
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            {:else}
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            {/if}
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if isOpen}
    <div
      class="border-t border-white/10 bg-zinc-900 px-4 py-4 space-y-2 md:hidden"
    >
      {#each navLinks as link}
        <!-- Added # here as well so mobile links work with svelte-spa-router -->
        <a
          href="#{link.href}"
          onclick={() => (isOpen = false)}
          class="block rounded-md px-3 py-2 text-zinc-300 hover:bg-white/10 hover:text-white"
        >
          {link.name}
        </a>
      {/each}
    </div>
  {/if}
</nav>

<div class="pt-20"></div>
