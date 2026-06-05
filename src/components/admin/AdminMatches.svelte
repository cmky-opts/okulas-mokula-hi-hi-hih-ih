<script>
  import { onMount } from "svelte"
  import Quill from "quill"
  import "quill/dist/quill.snow.css"
  import ToggleSwitch from "../ui/ToggleSwitch.svelte"
  import { getAllEvents, getEventMatches, saveMatch, setMatchOrder, setMatchFeatured, setMatchShowPlayer, deleteMatch } from "../../lib/admin.data"
  import { sortMatchesByOrder } from "../../lib/events.data"

  let events = []
  let matches = []
  let loadingEvents = true
  let loadingMatches = false
  let selectedEventId = ""
  let error = ""
  let orderError = ""
  let featuredError = ""

  let matchForm = {
    id: "", homeTeam: "", awayTeam: "", homeLogoUrl: "", awayLogoUrl: "",
    imageUrl: "", dateTime: "", venue: "", tournament: "", status: "Upcoming",
    score: "-", phase: "", featured: false, showPlayer: true, sortOrder: null,
    description: "", links: [{ label: "", url: "" }],
  }

  let matchQuill

  function initMatchQuill(node) {
    matchQuill = new Quill(node, { theme: "snow" })
    matchQuill.root.innerHTML = matchForm.description
    matchQuill.on("text-change", () => { matchForm.description = matchQuill.root.innerHTML })
    return { destroy() { matchQuill = null } }
  }

  const loadEvents = async () => {
    loadingEvents = true
    try {
      events = await getAllEvents()
      if (events.length > 0 && !selectedEventId) {
        selectedEventId = events[0].id
      }
    } catch (e) {
      error = "Unable to load events."
      console.error(e)
    } finally {
      loadingEvents = false
    }
  }

  const loadMatches = async () => {
    if (!selectedEventId) { matches = []; return }
    loadingMatches = true
    try {
      matches = sortMatchesByOrder(await getEventMatches(selectedEventId))
    } catch (e) {
      error = "Unable to load matches."
      console.error(e)
    } finally {
      loadingMatches = false
    }
  }

  const selectEvent = async (eventId) => {
    selectedEventId = eventId
    await loadMatches()
  }

  const resetMatchForm = () => {
    matchForm = {
      id: "", homeTeam: "", awayTeam: "", homeLogoUrl: "", awayLogoUrl: "",
      imageUrl: "", dateTime: "", venue: "", tournament: "", status: "Upcoming",
      score: "-", phase: "", featured: false, showPlayer: true, sortOrder: null,
      description: "", links: [{ label: "", url: "" }],
    }
    if (matchQuill) matchQuill.root.innerHTML = matchForm.description
  }

  const editMatch = (match) => {
    matchForm = {
      id: match.id, homeTeam: match.homeTeam, awayTeam: match.awayTeam,
      homeLogoUrl: match.homeLogoUrl || "", awayLogoUrl: match.awayLogoUrl || "",
      imageUrl: match.imageUrl || "", dateTime: match.dateTime || "", venue: match.venue || "",
      tournament: match.tournament || "", status: match.status || "Upcoming", score: match.score || "-",
      phase: match.phase || "", featured: match.featured || false,
      showPlayer: match.showPlayer !== undefined ? match.showPlayer : true, sortOrder: match.sortOrder ?? null,
      description: match.description || "", links: match.links?.slice(0, 4) || [{ label: "", url: "" }],
    }
    if (matchQuill) matchQuill.root.innerHTML = matchForm.description
  }

  const handleMatchSave = async () => {
    if (!selectedEventId) { error = "Please select an event before saving a match."; return }
    if (!matchForm.homeTeam || !matchForm.awayTeam) { error = "Match teams are required."; return }
    if (matchForm.links.length > 4) { error = "A match can have up to 4 links."; return }
    try {
      await saveMatch(selectedEventId, matchForm)
      resetMatchForm()
      await loadMatches()
    } catch (e) {
      error = "Unable to save match."
      console.error(e)
    }
  }

  const handleOrderSave = async (matchId, value) => {
    const order = value === "" ? null : Number(value)
    const taken = matches.some((m) => m.id !== matchId && m.sortOrder === order)
    if (taken) { orderError = `Position ${order} is already assigned to another match.`; return }
    orderError = ""
    await setMatchOrder(selectedEventId, matchId, order)
    await loadMatches()
  }

  const toggleFeaturedMatch = async (match) => {
    const selectedFeaturedCount = matches.filter((item) => item.featured).length
    if (!match.featured && selectedFeaturedCount >= 2) { featuredError = "You may only feature exactly 2 matches per event."; return }
    featuredError = ""
    await setMatchFeatured(selectedEventId, match.id, !match.featured)
    await loadMatches()
  }

  const toggleShowPlayer = async (match) => {
    const show = match.showPlayer !== false
    await setMatchShowPlayer(selectedEventId, match.id, !show)
    await loadMatches()
  }

  const handleLinkChange = (index, field, value) => {
    matchForm.links = matchForm.links.map((link, idx) => idx === index ? { ...link, [field]: value } : link)
  }

  const addMatchLink = () => {
    if (matchForm.links.length < 4) matchForm.links = [...matchForm.links, { label: "", url: "" }]
  }

  const removeMatchLink = (index) => {
    matchForm.links = matchForm.links.filter((_, idx) => idx !== index)
  }

  const handleMatchDelete = async (match) => {
    if (window.confirm(`Are you sure you want to delete the match "${match.homeTeam} vs ${match.awayTeam}"?`)) {
      try {
        await deleteMatch(selectedEventId, match.id)
        await loadMatches()
      } catch (e) {
        error = "Unable to delete match."
        console.error(e)
      }
    }
  }

  onMount(loadEvents)

  $: if (selectedEventId && events.length > 0) loadMatches()
</script>

<div class="grid gap-6 xl:grid-cols-[1fr_420px]">
  <div class="space-y-6">
    {#if error}
      <div class="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">{error}</div>
    {/if}

    <div class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
      <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-sm uppercase tracking-[0.35em] text-sky-300/80">Featured matches</p>
          <h2 class="text-2xl font-semibold text-white">Match list</h2>
        </div>
        <select bind:value={selectedEventId} on:change={() => selectEvent(selectedEventId)}
          class="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none">
          {#each events as event}
            <option value={event.id}>{event.name}</option>
          {/each}
        </select>
      </div>

      {#if loadingMatches}
        <div class="rounded-3xl bg-zinc-950/60 p-6 text-center text-zinc-400">Loading matches...</div>
      {:else if matches.length === 0}
        <div class="rounded-3xl bg-zinc-950/60 p-6 text-center text-zinc-400">No matches found for this event.</div>
      {:else}
        <div class="grid gap-4">
          {#each matches as match}
            <div class="rounded-3xl border border-white/10 bg-zinc-950/80 p-4">
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-start gap-4">
                  <div class="flex flex-col items-center gap-1 pt-1">
                    <span class="text-xs text-zinc-500 uppercase tracking-wider">Pos</span>
                    <input type="number" min="0" max="99" value={match.sortOrder ?? ""} placeholder="--"
                      on:change={(e) => handleOrderSave(match.id, e.target.value)}
                      class="w-14 rounded-lg border border-white/10 bg-zinc-950 px-2 py-1.5 text-center text-sm text-white outline-none focus:border-emerald-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                  </div>
                  <div>
                    <p class="text-sm text-sky-300/80">{match.tournament}</p>
                    <h3 class="text-xl font-semibold text-white">{match.homeTeam} vs {match.awayTeam}</h3>
                    <p class="text-sm text-zinc-400">{match.dateTime} · {match.venue}</p>
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <div class="flex items-center gap-2">
                    <ToggleSwitch checked={match.featured} label={match.featured ? "Featured" : "Feature"} on:change={() => toggleFeaturedMatch(match)} />
                    <ToggleSwitch checked={match.showPlayer !== false} label={match.showPlayer !== false ? "Player On" : "Player Off"} on:change={() => toggleShowPlayer(match)} />
                  </div>
                  <div class="flex gap-2">
                    <button type="button" on:click={() => editMatch(match)}
                      class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/20 hover:bg-white/10">Edit</button>
                    <button type="button" on:click={() => handleMatchDelete(match)}
                      class="rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
      {#if orderError}
        <div class="mt-4 rounded-3xl bg-rose-500/10 p-3 text-sm text-rose-200">{orderError}</div>
      {/if}
      {#if featuredError}
        <div class="mt-4 rounded-3xl bg-rose-500/10 p-3 text-sm text-rose-200">{featuredError}</div>
      {/if}
    </div>
  </div>

  <div class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
    <div class="space-y-4">
      <div>
        <p class="text-sm uppercase tracking-[0.35em] text-sky-300/80">Match form</p>
        <h2 class="text-2xl font-semibold text-white">Create or edit match</h2>
      </div>
      <div class="grid gap-4">
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-sm text-zinc-300" for="home-team">Home team</label>
            <input id="home-team" type="text" bind:value={matchForm.homeTeam}
              class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label class="block text-sm text-zinc-300" for="away-team">Away team</label>
            <input id="away-team" type="text" bind:value={matchForm.awayTeam}
              class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500" />
          </div>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-sm text-zinc-300" for="home-logo">Home logo URL</label>
            <input id="home-logo" type="url" bind:value={matchForm.homeLogoUrl}
              class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label class="block text-sm text-zinc-300" for="away-logo">Away logo URL</label>
            <input id="away-logo" type="url" bind:value={matchForm.awayLogoUrl}
              class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500" />
          </div>
        </div>
        <div>
          <label class="block text-sm text-zinc-300" for="match-image">Match image URL</label>
          <input id="match-image" type="url" placeholder="https://example.com/image.jpg" bind:value={matchForm.imageUrl}
            class="w-full mt-2 rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500" />
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-sm text-zinc-300" for="match-datetime">Datetime</label>
            <input id="match-datetime" type="text" bind:value={matchForm.dateTime} placeholder="May 17 · 18:30"
              class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label class="block text-sm text-zinc-300" for="match-venue">Venue</label>
            <input id="match-venue" type="text" bind:value={matchForm.venue}
              class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500" />
          </div>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-sm text-zinc-300" for="match-tournament">Tournament</label>
            <input id="match-tournament" type="text" bind:value={matchForm.tournament}
              class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label class="block text-sm text-zinc-300" for="match-status">Status</label>
            <select id="match-status" bind:value={matchForm.status}
              class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500">
              <option>Upcoming</option>
              <option>Ongoing</option>
              <option>Finished</option>
            </select>
          </div>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-sm text-zinc-300" for="match-score">Score</label>
            <input id="match-score" type="text" bind:value={matchForm.score}
              class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label class="block text-sm text-zinc-300" for="match-phase">Phase</label>
            <input id="match-phase" type="text" bind:value={matchForm.phase}
              class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500" />
          </div>
        </div>
        <div class="space-y-4">
          <div class="flex items-center justify-between text-sm text-zinc-400">
            <p>Match links</p>
            <button type="button" on:click={addMatchLink}
              class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition hover:border-white/20 hover:bg-white/10">Add link</button>
          </div>
          {#each matchForm.links as link, index}
            <div class="grid gap-3 sm:grid-cols-[1fr_auto]">
              <div class="grid gap-2">
                <input type="text" placeholder="Link label" bind:value={link.label}
                  on:input={(e) => handleLinkChange(index, "label", e.target.value)}
                  class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500" />
                <input type="url" placeholder="https://example.com" bind:value={link.url}
                  on:input={(e) => handleLinkChange(index, "url", e.target.value)}
                  class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500" />
              </div>
              <button type="button" on:click={() => removeMatchLink(index)}
                class="rounded-full border border-white/10 bg-rose-500/10 px-4 py-3 text-xs font-semibold text-rose-200 transition hover:border-rose-300/40 hover:bg-rose-500/15">Remove</button>
            </div>
          {/each}
        </div>
        <div>
          <label class="block text-sm text-zinc-300 mb-2">Description</label>
          <div class="rounded-xl overflow-hidden border border-white/10 bg-white text-black min-h-[200px]">
            <div use:initMatchQuill></div>
          </div>
        </div>
        <button type="button" on:click={handleMatchSave}
          class="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400">Save Match</button>
      </div>
    </div>
  </div>
</div>

<style>
  :global(.ql-container) { max-height: 400px !important; overflow-y: auto !important; }
  :global(.ql-editor) { min-height: 150px; }
</style>
