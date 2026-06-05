<script>
  import { onMount } from "svelte"
  import { auth } from "../lib/firebase"
  import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
  import AdminEvents from "./admin/AdminEvents.svelte"
  import AdminMatches from "./admin/AdminMatches.svelte"
  import AdminArticles from "./admin/AdminArticles.svelte"
  import AdminStats from "./admin/AdminStats.svelte"

  let activeTab = "events"
  let user = null
  let authChecked = false
  let authError = ""
  let loadingAuth = true

  let email = ""
  let password = ""

  const handleAuthState = (current) => {
    user = current
    authChecked = true
    loadingAuth = false
  }

  onMount(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthState)
    return unsubscribe
  })

  const handleSignIn = async () => {
    authError = ""
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      authError = e.message
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    user = null
  }
</script>

<section class="min-h-screen bg-zinc-950 text-white py-20 px-4 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl space-y-8">
    <header class="flex flex-col gap-4 rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-lg shadow-black/30">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-sm uppercase tracking-[0.35em] text-emerald-300/80">Admin Panel</p>
          <h1 class="text-3xl font-semibold text-white">Hidden Admin Dashboard</h1>
          <p class="max-w-2xl text-sm text-zinc-400">Manage events, matches, and articles with Firebase Auth and Firestore.</p>
        </div>
        {#if user}
          <div class="flex flex-wrap items-center gap-3">
            <span class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">{user.email}</span>
            <button type="button" on:click={handleLogout}
              class="rounded-full border border-white/10 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-300/40 hover:bg-emerald-500/15">Sign Out</button>
          </div>
        {/if}
      </div>
    </header>

    {#if !authChecked}
      <div class="flex items-center justify-center rounded-3xl border border-white/10 bg-zinc-900/70 p-16 text-zinc-400">
        <div class="flex items-center gap-3">
          <svg class="h-5 w-5 animate-spin text-emerald-400" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span class="text-sm">Checking authentication...</span>
        </div>
      </div>
    {:else if !user}
      <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 p-8 shadow-2xl shadow-black/40 sm:p-12">
        <div class="pointer-events-none absolute -inset-1 opacity-20" aria-hidden="true">
          <div class="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-emerald-500 blur-3xl"></div>
          <div class="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-sky-500 blur-3xl"></div>
        </div>
        <div class="relative mx-auto max-w-md space-y-8">
          <div class="text-center">
            <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-inner shadow-white/5">
              <svg class="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-white">Admin Access</h2>
            <p class="mt-2 text-sm text-zinc-400">Sign in to manage content</p>
          </div>
          <form on:submit|preventDefault={handleSignIn} class="space-y-5">
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold uppercase tracking-widest text-zinc-400" for="email">Email</label>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <input id="email" type="email" bind:value={email} required placeholder="admin@example.com"
                  class="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3.5 pl-11 text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20" />
              </div>
            </div>
            <div class="space-y-1.5">
              <label class="block text-xs font-semibold uppercase tracking-widest text-zinc-400" for="password">Password</label>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <input id="password" type="password" bind:value={password} required placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  class="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3.5 pl-11 text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20" />
              </div>
            </div>
            {#if authError}
              <div class="flex items-center gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-200">
                <svg class="h-4 w-4 shrink-0 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span>{authError}</span>
              </div>
            {/if}
            <button type="submit"
              class="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.98]">
              <span class="relative z-10 flex items-center justify-center gap-2">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                Sign In
              </span>
            </button>
          </form>
        </div>
      </div>
    {:else}
      <div class="grid gap-8">
        <div class="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-zinc-900/70 p-4">
          <div class="flex flex-wrap gap-2">
            <button type="button"
              class="rounded-full px-5 py-2 text-sm font-semibold transition {activeTab === 'events' ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white hover:bg-white/10'}"
              on:click={() => activeTab = "events"}>Events</button>
            <button type="button"
              class="rounded-full px-5 py-2 text-sm font-semibold transition {activeTab === 'matches' ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white hover:bg-white/10'}"
              on:click={() => activeTab = "matches"}>Matches</button>
            <button type="button"
              class="rounded-full px-5 py-2 text-sm font-semibold transition {activeTab === 'articles' ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white hover:bg-white/10'}"
              on:click={() => activeTab = "articles"}>Articles</button>
            <button type="button"
              class="rounded-full px-5 py-2 text-sm font-semibold transition {activeTab === 'stats' ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white hover:bg-white/10'}"
              on:click={() => activeTab = "stats"}>Stats</button>
          </div>
          <div class="text-sm text-zinc-400">Hidden route: /admin</div>
        </div>

        {#if activeTab === "events"}
          <AdminEvents />
        {:else if activeTab === "matches"}
          <AdminMatches />
        {:else if activeTab === "articles"}
          <AdminArticles />
        {:else if activeTab === "stats"}
          <AdminStats />
        {/if}
      </div>
    {/if}
  </div>
</section>
