<script>
  let isOpen = false;
  import logo from "../../assets/WORLDCUP2026LIVE-01.png"

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "News", href: "/articles" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { name: "DMCA", href: "/dmca" },
    { name: "Privacy", href: "/privacy" },
    { name: "Disclaimer", href: "/disclaimer" },
  ];

  let showLegal = false;
    function navigateHome() {
    window.location.href = "/";
  }
  
</script>

<nav
  class="fixed left-0 top-0 z-50 w-full h-fit p-4 border-b border-white/10 bg-black"
>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <button
        class="flex shrink-0 items-center  text-2xl font-black tracking-tighter text-white uppercase hover:cursor-pointer"
        onclick={navigateHome}
      >
        <img src={logo} alt="logo" class="h-30 w-auto " >
      </button>

      <!-- Desktop Menu -->
      <div class="hidden items-center gap-1 md:flex">
        {#each navLinks as link}
          <a
            href="#{link.href}"
            class="action-label px-4 py-2 text-zinc-400 transition-colors hover:text-white border border-transparent hover:border-white/20"
          >
            {link.name}
          </a>
        {/each}
        <!-- Legal Dropdown -->
        <div class="relative">
          <button
            type="button"
            onclick={() => (showLegal = !showLegal)}
            onblur={() => setTimeout(() => (showLegal = false), 150)}
            class="action-label px-4 py-2 text-zinc-400 transition-colors hover:text-white border border-transparent hover:border-white/20"
          >
            Legal ▾
          </button>
          {#if showLegal}
            <div
              role="menu"
              class="absolute right-0 top-full mt-1 w-44 border border-white/10 bg-black shadow-xl"
                onmouseleave={() => (showLegal = false)}
            >
              {#each legalLinks as link}
                <a
                  href="#{link.href}"
                  class="action-label block border-b border-white/5 px-4 py-3 text-zinc-400 transition-colors last:border-b-0 hover:bg-white/5 hover:text-white"
                >
                  {link.name}
                </a>
              {/each}
            </div>
          {/if}
        </div>
      </div>

      <div class="flex items-center md:hidden">
        <button
          onclick={() => (isOpen = !isOpen)}
          class="action-label px-3 py-2 text-zinc-400 hover:text-white border border-white/10"
          aria-label="Toggle menu"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if isOpen}
    <div class="border-t border-white/10 bg-black px-4 py-4 space-y-1">
      {#each navLinks as link}
        <a
          href="#{link.href}"
          onclick={() => (isOpen = false)}
          class="action-label block border border-white/10 px-4 py-3 text-zinc-300 hover:bg-white/5 hover:text-white"
        >
          {link.name}
        </a>
      {/each}
      <div class="pt-3 border-t border-white/5 mt-3">
        <p class="action-label text-zinc-500 px-4 pb-2 text-xs">Legal</p>
        {#each legalLinks as link}
          <a
            href="#{link.href}"
            onclick={() => (isOpen = false)}
            class="action-label block border border-white/10 px-4 py-3 text-zinc-300 hover:bg-white/5 hover:text-white"
          >
            {link.name}
          </a>
        {/each}
      </div>
    </div>
  {/if}
</nav>

<div class="p-4"></div>
