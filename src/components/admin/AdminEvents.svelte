<script>
  import { onMount } from "svelte"
  import Quill from "quill"
  import "quill/dist/quill.snow.css"
  import { getAllEvents, saveEvent, deleteEvent, featureAllMatches } from "../../lib/admin.data"

  let events = []
  let loading = true
  let error = ""

  let eventForm = {
    id: "",
    name: "",
    description: "",
    imageUrl: "",
  }

  let eventQuill

  function initEventQuill(node) {
    eventQuill = new Quill(node, { theme: "snow" })
    eventQuill.root.innerHTML = eventForm.description
    eventQuill.on("text-change", () => {
      eventForm.description = eventQuill.root.innerHTML
    })
    return {
      destroy() {
        eventQuill = null
      },
    }
  }

  const loadEvents = async () => {
    loading = true
    try {
      events = await getAllEvents()
    } catch (e) {
      error = "Unable to load events."
      console.error(e)
    } finally {
      loading = false
    }
  }

  const resetEventForm = () => {
    eventForm = { id: "", name: "", description: "<p>Event description...</p>", imageUrl: "" }
    if (eventQuill) eventQuill.root.innerHTML = eventForm.description
  }

  const handleEventSave = async () => {
    if (!eventForm.name) {
      error = "Event name is required."
      return
    }
    try {
      await saveEvent(eventForm)
      resetEventForm()
      await loadEvents()
    } catch (e) {
      error = "Unable to save event."
      console.error(e)
    }
  }

  const editEvent = (eventData) => {
    eventForm = {
      id: eventData.id,
      name: eventData.name,
      description: eventData.description || "<p></p>",
      imageUrl: eventData.imageUrl || "",
    }
    if (eventQuill) eventQuill.root.innerHTML = eventForm.description
  }

  const handleEventDelete = async (event) => {
    if (window.confirm(`Are you sure you want to delete the event "${event.name}"? This action cannot be undone.`)) {
      try {
        await deleteEvent(event.id)
        await loadEvents()
      } catch (e) {
        error = "Unable to delete event."
        console.error(e)
      }
    }
  }

  onMount(loadEvents)
</script>

<div class="grid gap-10 xl:grid-cols-[1fr_400px]">
  <div>
    <h2 class="mb-5 text-sm font-medium text-zinc-400">Events</h2>
    {#if loading}
      <div class="py-12 text-center text-sm text-zinc-600">Loading...</div>
    {:else if events.length === 0}
      <div class="py-12 text-center text-sm text-zinc-600">No events found.</div>
    {:else}
      <div class="divide-y divide-zinc-800">
        {#each events as event}
          <div class="flex items-start gap-4 py-4">
            <div class="h-16 w-24 shrink-0 overflow-hidden rounded-md bg-zinc-900">
              {#if event.imageUrl}
                <img src={event.imageUrl} alt={event.name} class="h-full w-full object-cover" />
              {:else}
                <div class="flex h-full items-center justify-center text-[10px] text-zinc-700">No img</div>
              {/if}
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-white truncate">{event.name}</p>
              <div class="mt-0.5 text-xs text-zinc-600 line-clamp-2">{@html event.description}</div>
            </div>
            <div class="flex shrink-0 flex-col items-end gap-2">
              <div class="flex gap-2">
                <button type="button" on:click={() => editEvent(event)}
                  class="rounded-md border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-200">Edit</button>
                <button type="button" on:click={() => handleEventDelete(event)}
                  class="rounded-md border border-zinc-800 px-3 py-1.5 text-xs text-zinc-500 transition hover:border-rose-500/40 hover:text-rose-400">Delete</button>
              </div>
              <button type="button" on:click={() => featureAllMatches(event.id)}
                class="rounded-md border border-emerald-500/30 px-3 py-1.5 text-xs text-emerald-400 transition hover:border-emerald-500/60 hover:bg-emerald-500/10">Feature All</button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <div>
    <h2 class="mb-5 text-sm font-medium text-zinc-400">{eventForm.id ? "Edit" : "New"} event</h2>
    {#if error}
      <div class="mb-4 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3.5 py-2.5 text-sm text-rose-300">{error}</div>
    {/if}
    <div class="space-y-4">
      <div>
        <input id="event-name" type="text" bind:value={eventForm.name} placeholder="Event name"
          class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
      </div>
      <div>
        <div class="rounded-lg overflow-hidden border border-zinc-800 bg-white text-black min-h-[130px]">
          <div use:initEventQuill></div>
        </div>
      </div>
      <div>
        <input id="event-image" type="url" bind:value={eventForm.imageUrl} placeholder="Image URL"
          class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
      </div>
      <button type="button" on:click={handleEventSave}
        class="w-full rounded-lg bg-emerald-500 px-3.5 py-2.5 text-sm font-medium text-black transition hover:bg-emerald-400">Save Event</button>
    </div>
  </div>
</div>

<style>
  :global(.ql-container) { max-height: 400px !important; overflow-y: auto !important; }
  :global(.ql-editor) { min-height: 150px; }
</style>
