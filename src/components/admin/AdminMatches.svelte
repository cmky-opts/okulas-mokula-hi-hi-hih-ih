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

<div class="grid gap-10 xl:grid-cols-[1fr_400px]">
  <div>
    <div class="mb-5 flex items-center justify-between gap-4">
      <h2 class="text-sm font-medium text-zinc-400">Matches</h2>
      {#if events.length > 0}
        <select bind:value={selectedEventId} on:change={() => selectEvent(selectedEventId)}
          class="rounded-lg border border-zinc-800 bg-transparent px-3 py-1.5 text-sm text-zinc-300 outline-none">
          {#each events as event}
            <option value={event.id}>{event.name}</option>
          {/each}
        </select>
      {/if}
    </div>

    {#if error}
      <div class="mb-4 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3.5 py-2.5 text-sm text-rose-300">{error}</div>
    {/if}

    {#if loadingMatches}
      <div class="py-12 text-center text-sm text-zinc-600">Loading...</div>
    {:else if matches.length === 0}
      <div class="py-12 text-center text-sm text-zinc-600">No matches for this event.</div>
    {:else}
      <div class="divide-y divide-zinc-800">
        {#each matches as match}
          <div class="py-4">
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-start gap-4">
                <div class="flex flex-col items-center gap-1 pt-0.5">
                  <span class="text-[10px] text-zinc-600">Pos</span>
                  <input type="number" min="0" max="99" value={match.sortOrder ?? ""} placeholder="--"
                    on:change={(e) => handleOrderSave(match.id, e.target.value)}
                    class="w-11 rounded border border-zinc-800 bg-transparent px-1.5 py-1 text-center text-xs text-zinc-400 outline-none focus:border-zinc-600 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                </div>
                <div>
                  <p class="text-xs text-zinc-500">{match.tournament}</p>
                  <p class="text-sm font-medium text-white">{match.homeTeam} vs {match.awayTeam}</p>
                  <p class="text-xs text-zinc-600">{match.dateTime}{match.venue ? " · " + match.venue : ""}</p>
                </div>
              </div>
              <div class="flex flex-col items-end gap-2">
                <div class="flex items-center gap-3">
                  <ToggleSwitch checked={match.featured} label={match.featured ? "Featured" : "Feature"} on:change={() => toggleFeaturedMatch(match)} />
                  <ToggleSwitch checked={match.showPlayer !== false} label={match.showPlayer !== false ? "Player On" : "Player Off"} on:change={() => toggleShowPlayer(match)} />
                </div>
                <div class="flex gap-2">
                  <button type="button" on:click={() => editMatch(match)}
                    class="rounded-md border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-200">Edit</button>
                  <button type="button" on:click={() => handleMatchDelete(match)}
                    class="rounded-md border border-zinc-800 px-3 py-1.5 text-xs text-zinc-500 transition hover:border-rose-500/40 hover:text-rose-400">Delete</button>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
    {#if orderError}
      <div class="mt-4 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3.5 py-2.5 text-sm text-rose-300">{orderError}</div>
    {/if}
    {#if featuredError}
      <div class="mt-4 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3.5 py-2.5 text-sm text-rose-300">{featuredError}</div>
    {/if}
  </div>

  <div>
    <h2 class="mb-5 text-sm font-medium text-zinc-400">{matchForm.id ? "Edit" : "New"} match</h2>
    <div class="space-y-4">
      <div class="grid gap-3 sm:grid-cols-2">
        <input id="home-team" type="text" bind:value={matchForm.homeTeam} placeholder="Home team"
          class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
        <input id="away-team" type="text" bind:value={matchForm.awayTeam} placeholder="Away team"
          class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
      </div>
      <div class="grid gap-3 sm:grid-cols-2">
        <input id="home-logo" type="url" bind:value={matchForm.homeLogoUrl} placeholder="Home logo URL"
          class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
        <input id="away-logo" type="url" bind:value={matchForm.awayLogoUrl} placeholder="Away logo URL"
          class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
      </div>
      <input id="match-image" type="url" bind:value={matchForm.imageUrl} placeholder="Match image URL"
        class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
      <div class="grid gap-3 sm:grid-cols-2">
        <input id="match-datetime" type="text" bind:value={matchForm.dateTime} placeholder="Date & time"
          class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
        <input id="match-venue" type="text" bind:value={matchForm.venue} placeholder="Venue"
          class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
      </div>
      <div class="grid gap-3 sm:grid-cols-2">
        <input id="match-tournament" type="text" bind:value={matchForm.tournament} placeholder="Tournament"
          class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
        <select id="match-status" bind:value={matchForm.status}
          class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-zinc-300 outline-none focus:border-zinc-600">
          <option>Upcoming</option>
          <option>Ongoing</option>
          <option>Finished</option>
        </select>
      </div>
      <div class="grid gap-3 sm:grid-cols-2">
        <input id="match-score" type="text" bind:value={matchForm.score} placeholder="Score"
          class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
        <input id="match-phase" type="text" bind:value={matchForm.phase} placeholder="Phase"
          class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
      </div>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs text-zinc-500">Links (max 4)</span>
          <button type="button" on:click={addMatchLink}
            class="rounded-md border border-zinc-800 px-2.5 py-1 text-xs text-zinc-500 transition hover:border-zinc-600 hover:text-zinc-300">+ Add</button>
        </div>
        {#each matchForm.links as link, index}
          <div class="flex items-start gap-2">
            <div class="flex-1 space-y-2">
              <input type="text" placeholder="Label" bind:value={link.label}
                on:input={(e) => handleLinkChange(index, "label", e.target.value)}
                class="w-full rounded-lg border border-zinc-800 bg-transparent px-3 py-2 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
              <input type="url" placeholder="https://example.com" bind:value={link.url}
                on:input={(e) => handleLinkChange(index, "url", e.target.value)}
                class="w-full rounded-lg border border-zinc-800 bg-transparent px-3 py-2 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
            </div>
            <button type="button" on:click={() => removeMatchLink(index)}
              class="rounded-md border border-zinc-800 px-2.5 py-2 text-xs text-zinc-500 transition hover:border-rose-500/40 hover:text-rose-400">Remove</button>
          </div>
        {/each}
      </div>
      <div>
        <div class="rounded-lg overflow-hidden border border-zinc-800 bg-white text-black min-h-[180px]">
          <div use:initMatchQuill></div>
        </div>
      </div>
      <button type="button" on:click={handleMatchSave}
        class="w-full rounded-lg bg-emerald-500 px-3.5 py-2.5 text-sm font-medium text-black transition hover:bg-emerald-400">Save Match</button>
    </div>
  </div>
</div>

<style>
  :global(.ql-container) { max-height: 400px !important; overflow-y: auto !important; }
  :global(.ql-editor) { min-height: 150px; }
</style>
