<script>
  import { onMount } from "svelte"
  import { auth } from "../lib/firebase"
  import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
  import AdminEvents from "./admin/AdminEvents.svelte"
  import AdminMatches from "./admin/AdminMatches.svelte"
  import AdminArticles from "./admin/AdminArticles.svelte"
  import AdminStats from "./admin/AdminStats.svelte"
  import AdminSettings from "./admin/AdminSettings.svelte"

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

<section class="min-h-screen bg-zinc-950 text-white py-16 px-4 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">

    {#if !authChecked}
      <div class="flex items-center justify-center py-24 text-zinc-500">
        <div class="flex items-center gap-3">
          <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span class="text-sm">Checking authentication...</span>
        </div>
      </div>
    {:else if !user}
      <div class="relative mx-auto max-w-sm">
        <div class="mb-10 text-center">
          <div class="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-800">
            <svg class="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <h1 class="text-lg font-medium text-white">Sign in</h1>
          <p class="mt-1 text-sm text-zinc-500">Admin credentials required</p>
        </div>
        <form on:submit|preventDefault={handleSignIn} class="space-y-4">
          <div>
            <input id="email" type="email" bind:value={email} required placeholder="Email"
              class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
          </div>
          <div>
            <input id="password" type="password" bind:value={password} required placeholder="Password"
              class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
          </div>
          {#if authError}
            <div class="flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3.5 py-2.5 text-sm text-rose-300">
              <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span>{authError}</span>
            </div>
          {/if}
          <button type="submit"
            class="w-full rounded-lg bg-emerald-500 px-3.5 py-2.5 text-sm font-medium text-black transition hover:bg-emerald-400 active:scale-[0.98]">Sign In</button>
        </form>
      </div>
    {:else}
      <div>
        <header class="mb-8 flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <h1 class="text-lg font-medium text-white">Dashboard</h1>
            <p class="text-sm text-zinc-500">Manage events, matches, and articles</p>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-sm text-zinc-500">{user.email}</span>
            <button type="button" on:click={handleLogout}
              class="rounded-lg border border-zinc-800 px-3 py-1.5 text-sm text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-200">Sign out</button>
          </div>
        </header>

        <nav class="mb-8 flex items-center gap-6 border-b border-zinc-800">
          <button type="button"
            class="border-b-2 pb-3 text-sm transition {activeTab === 'events' ? 'border-emerald-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}"
            on:click={() => activeTab = "events"}>Events</button>
          <button type="button"
            class="border-b-2 pb-3 text-sm transition {activeTab === 'matches' ? 'border-emerald-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}"
            on:click={() => activeTab = "matches"}>Matches</button>
          <button type="button"
            class="border-b-2 pb-3 text-sm transition {activeTab === 'articles' ? 'border-emerald-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}"
            on:click={() => activeTab = "articles"}>Articles</button>
          <button type="button"
            class="border-b-2 pb-3 text-sm transition {activeTab === 'stats' ? 'border-emerald-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}"
            on:click={() => activeTab = "stats"}>Stats</button>
          <button type="button"
            class="border-b-2 pb-3 text-sm transition {activeTab === 'settings' ? 'border-emerald-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}"
            on:click={() => activeTab = "settings"}>Settings</button>
        </nav>

        {#if activeTab === "events"}
          <AdminEvents />
        {:else if activeTab === "matches"}
          <AdminMatches />
        {:else if activeTab === "articles"}
          <AdminArticles />
        {:else if activeTab === "stats"}
          <AdminStats />
        {:else if activeTab === "settings"}
          <AdminSettings />
        {/if}
      </div>
    {/if}
  </div>
</section>
