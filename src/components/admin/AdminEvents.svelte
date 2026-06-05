<script>
  import { onMount } from "svelte"
  import Quill from "quill"
  import "quill/dist/quill.snow.css"
  import { getAllEvents, saveEvent, deleteEvent } from "../../lib/admin.data"

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

<div class="grid gap-6 xl:grid-cols-[1fr_420px]">
  <div class="space-y-6">
    <div class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
      <div class="mb-4 flex items-center justify-between gap-4">
        <div>
          <p class="text-sm uppercase tracking-[0.35em] text-sky-300/80">Events list</p>
          <h2 class="text-2xl font-semibold text-white">Manage Events</h2>
        </div>
      </div>
      <div class="grid gap-4">
        {#if loading}
          <div class="rounded-3xl bg-zinc-950/60 p-6 text-center text-zinc-400">Loading events...</div>
        {:else if events.length === 0}
          <div class="rounded-3xl bg-zinc-950/60 p-6 text-center text-zinc-400">No events found. Create one below.</div>
        {:else}
          <div class="grid gap-4 sm:grid-cols-2">
            {#each events as event}
              <div class="rounded-3xl border border-white/10 bg-zinc-950/80 p-4">
                <div class="space-y-3">
                  <div class="h-32 overflow-hidden rounded-3xl bg-black">
                    {#if event.imageUrl}
                      <img src={event.imageUrl} alt={event.name} class="h-full w-full object-cover" />
                    {:else}
                      <div class="flex h-full items-center justify-center text-xs uppercase text-zinc-500">No image uploaded</div>
                    {/if}
                  </div>
                  <div>
                    <p class="text-sm text-zinc-400">{event.name}</p>
                    <p class="text-sm text-zinc-500">{@html event.description}</p>
                  </div>
                  <div class="flex gap-2 mt-2">
                    <button type="button" on:click={() => editEvent(event)}
                      class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/20 hover:bg-white/10">Edit event</button>
                    <button type="button" on:click={() => handleEventDelete(event)}
                      class="rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20">Delete</button>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <div class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
    <div class="space-y-4">
      <div>
        <p class="text-sm uppercase tracking-[0.35em] text-sky-300/80">Event form</p>
        <h2 class="text-2xl font-semibold text-white">Create or edit event</h2>
      </div>
      {#if error}
        <div class="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">{error}</div>
      {/if}
      <div class="grid gap-4">
        <div>
          <label class="block text-sm text-zinc-300" for="event-name">Event name</label>
          <input id="event-name" type="text" bind:value={eventForm.name}
            class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500" />
        </div>
        <div>
          <label class="block text-sm text-zinc-300" for="event-desc">Description</label>
          <div class="mt-2 rounded-xl overflow-hidden border border-white/10 bg-white text-black min-h-[150px]">
            <div use:initEventQuill></div>
          </div>
        </div>
        <div>
          <label class="block text-sm text-zinc-300" for="event-image">Event image URL</label>
          <input id="event-image" type="url" placeholder="https://example.com/image.jpg" bind:value={eventForm.imageUrl}
            class="w-full mt-2 rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500" />
        </div>
        <button type="button" on:click={handleEventSave}
          class="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400">Save Event</button>
      </div>
    </div>
  </div>
</div>

<style>
  :global(.ql-container) { max-height: 400px !important; overflow-y: auto !important; }
  :global(.ql-editor) { min-height: 150px; }
</style>
