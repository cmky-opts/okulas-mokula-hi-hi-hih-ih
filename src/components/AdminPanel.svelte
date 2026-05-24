<script>
  import { onMount, onDestroy } from "svelte";
  import { push } from "svelte-spa-router";
  import { auth } from "../lib/firebase";
  import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
  } from "firebase/auth";
  import Quill from "quill";
  import "quill/dist/quill.snow.css";
  import MatchCard from "./ui/MatchCard.svelte";
  import NewsCard from "./ui/NewsCard.svelte";
  import ToggleSwitch from "./ui/ToggleSwitch.svelte";
  import {
    getAllEvents,
    getEventMatches,
    saveEvent,
    saveMatch,
    setMatchFeatured,
    getAllArticles,
    saveArticle,
    getArticleById,
    deleteEvent,
    deleteMatch,
    deleteArticle,
  } from "../lib/admin.data";

  let activeTab = "events";
  let user = null;
  let authChecked = false;
  let authError = "";
  let loadingAuth = true;

  let email = "";
  let password = "";

  let events = [];
  let selectedEventId = "";
  let matches = [];
  let articles = [];

  let eventForm = {
    id: "",
    name: "",
    description: "",
    imageUrl: "",
  };

  let matchForm = {
    id: "",
    homeTeam: "",
    awayTeam: "",
    homeLogoUrl: "",
    awayLogoUrl: "",
    imageUrl: "",
    imageFile: null,
    dateTime: "",
    venue: "",
    tournament: "",
    status: "Upcoming",
    score: "-",
    phase: "",
    featured: false,
    links: [{ label: "", url: "" }],
  };

  let articleForm = {
    id: "",
    title: "",
    category: "News",
    date: new Date().toLocaleDateString(),
    author: "Admin",
    readTime: "4 min read",
    imageUrl: "",
    tags: "",
    content: "<p>Start writing here...</p>",
  };

  let eventQuill;
  let articleQuill;

  function initEventQuill(node) {
    eventQuill = new Quill(node, {
      theme: "snow",
    });
    eventQuill.root.innerHTML = eventForm.description;
    eventQuill.on("text-change", () => {
      eventForm.description = eventQuill.root.innerHTML;
    });
    return {
      destroy() {
        eventQuill = null;
      }
    };
  }

  function initArticleQuill(node) {
    articleQuill = new Quill(node, {
      theme: "snow",
    });
    articleQuill.root.innerHTML = articleForm.content;
    articleQuill.on("text-change", () => {
      articleForm.content = articleQuill.root.innerHTML;
    });
    return {
      destroy() {
        articleQuill = null;
      }
    };
  }

  let globalError = "";
  let featuredError = "";
  let loadingEvents = false;
  let loadingMatches = false;
  let loadingArticles = false;

  const loadDashboard = async () => {
    await loadEvents();
    await loadArticles();
    if (events.length > 0) {
      selectedEventId = events[0].id;
      await loadMatches();
    }
  };

  const loadEvents = async () => {
    loadingEvents = true;
    try {
      events = await getAllEvents();
    } catch (error) {
      globalError = "Unable to load events.";
      console.error(error);
    } finally {
      loadingEvents = false;
    }
  };

  const loadMatches = async () => {
    if (!selectedEventId) {
      matches = [];
      return;
    }
    loadingMatches = true;
    try {
      matches = await getEventMatches(selectedEventId);
    } catch (error) {
      globalError = "Unable to load matches for this event.";
      console.error(error);
    } finally {
      loadingMatches = false;
    }
  };

  const loadArticles = async () => {
    loadingArticles = true;
    try {
      articles = await getAllArticles();
    } catch (error) {
      globalError = "Unable to load articles.";
      console.error(error);
    } finally {
      loadingArticles = false;
    }
  };

  const resetEventForm = () => {
    eventForm = {
      id: "",
      name: "",
      description: "<p>Event description...</p>",
      imageUrl: "",
      imageFile: null,
    };
    if (eventQuill) {
      eventQuill.root.innerHTML = eventForm.description;
    }
  };

  const resetMatchForm = () => {
    matchForm = {
      id: "",
      homeTeam: "",
      awayTeam: "",
      homeLogoUrl: "",
      awayLogoUrl: "",
      imageUrl: "",
      dateTime: "",
      venue: "",
      tournament: "",
      status: "Upcoming",
      score: "-",
      phase: "",
      featured: false,
      links: [{ label: "", url: "" }],
    };
  };

  const resetArticleForm = () => {
    articleForm = {
      id: "",
      title: "",
      category: "News",
      date: new Date().toLocaleDateString(),
      author: "Admin",
      readTime: "4 min read",
      imageUrl: "",
      tags: "",
      content: "<p>Start writing here...</p>",
    };
    if (articleQuill) {
      articleQuill.root.innerHTML = articleForm.content;
    }
  };

  const handleAuthState = async (current) => {
    user = current;
    if (user) {
      await loadDashboard();
    }
    authChecked = true;
    loadingAuth = false;
  };

  onMount(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthState);
    return () => {
      unsubscribe();
    };
  });

  const handleSignIn = async () => {
    authError = "";
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      authError = error.message;
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    user = null;
  };

  const selectEvent = async (eventId) => {
    selectedEventId = eventId;
    await loadMatches();
  };



  const handleEventSave = async () => {
    globalError = "";
    if (!eventForm.name) {
      globalError = "Event name is required.";
      return;
    }

    try {
      const payload = {
        name: eventForm.name,
        description: eventForm.description,
        imageUrl: eventForm.imageUrl,
      };
      await saveEvent({
        ...eventForm,
      });
      resetEventForm();
      await loadEvents();
      if (!selectedEventId && events.length > 0) {
        selectedEventId = events[0].id;
        await loadMatches();
      }
    } catch (error) {
      globalError = "Unable to save event.";
      console.error(error);
    }
  };

  const editEvent = (eventData) => {
    eventForm = {
      id: eventData.id,
      name: eventData.name,
      description: eventData.description || "<p></p>",
      imageUrl: eventData.imageUrl || "",
      imageFile: null,
    };
    if (eventQuill) {
      eventQuill.root.innerHTML = eventForm.description;
    }
  };

  const handleMatchSave = async () => {
    if (!selectedEventId) {
      globalError = "Please select an event before saving a match.";
      return;
    }

    if (!matchForm.homeTeam || !matchForm.awayTeam) {
      globalError = "Match teams are required.";
      return;
    }

    if (matchForm.links.length > 4) {
      globalError = "A match can have up to 4 links.";
      return;
    }

    try {
      await saveMatch(selectedEventId, {
        ...matchForm,
        homeLogoUrl: matchForm.homeLogoUrl,
        awayLogoUrl: matchForm.awayLogoUrl,
        imageUrl: matchForm.imageUrl,
        links: matchForm.links,
      });
      resetMatchForm();
      await loadMatches();
    } catch (error) {
      globalError = "Unable to save match.";
      console.error(error);
    }
  };

  const editMatch = (match) => {
    matchForm = {
      id: match.id,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      homeLogoUrl: match.homeLogoUrl || "",
      awayLogoUrl: match.awayLogoUrl || "",
      imageUrl: match.imageUrl || "",
      imageFile: null,
      dateTime: match.dateTime || "",
      venue: match.venue || "",
      tournament: match.tournament || "",
      status: match.status || "Upcoming",
      score: match.score || "-",
      phase: match.phase || "",
      featured: match.featured || false,
      links: match.links?.slice(0, 4) || [{ label: "", url: "" }],
    };
  };

  const toggleFeaturedMatch = async (match) => {
    const selectedFeaturedCount = matches.filter(
      (item) => item.featured,
    ).length;
    if (!match.featured && selectedFeaturedCount >= 2) {
      featuredError = "You may only feature exactly 2 matches per event.";
      return;
    }
    featuredError = "";
    await setMatchFeatured(selectedEventId, match.id, !match.featured);
    await loadMatches();
  };

  const handleLinkChange = (index, field, value) => {
    matchForm.links = matchForm.links.map((link, idx) =>
      idx === index ? { ...link, [field]: value } : link,
    );
  };

  const addMatchLink = () => {
    if (matchForm.links.length < 4) {
      matchForm.links = [...matchForm.links, { label: "", url: "" }];
    }
  };

  const removeMatchLink = (index) => {
    matchForm.links = matchForm.links.filter((_, idx) => idx !== index);
  };

  const handleArticleSave = async () => {
    if (!articleForm.title || !articleForm.content) {
      globalError = "Article title and content are required.";
      return;
    }

    try {
      const parsedTags = articleForm.tags
        ? articleForm.tags.split(',').map(t => t.trim()).filter(Boolean)
        : [];

      await saveArticle({
        ...articleForm,
        tags: parsedTags,
      });
      resetArticleForm();
      await loadArticles();
    } catch (error) {
      globalError = "Unable to save article.";
      console.error(error);
    }
  };

  const editArticle = async (article) => {
    articleForm = {
      id: article.id,
      title: article.title,
      category: article.category || "News",
      date: article.date || new Date().toLocaleDateString(),
      author: article.author || "Admin",
      readTime: article.readTime || "4 min read",
      imageUrl: article.imageUrl || "",
      tags: article.tags ? article.tags.join(', ') : "",
      content: article.content || "<p></p>",
    };

    if (articleQuill) {
      articleQuill.root.innerHTML = articleForm.content;
    }
  };

  const loadArticleForEdit = async (articleId) => {
    const article = await getArticleById(articleId);
    if (article) {
      editArticle(article);
      activeTab = "articles";
    }
  };

  const handleEventDelete = async (event) => {
    if (window.confirm(`Are you sure you want to delete the event "${event.name}"? This action cannot be undone.`)) {
      try {
        await deleteEvent(event.id);
        if (selectedEventId === event.id) {
          selectedEventId = "";
          matches = [];
        }
        await loadEvents();
      } catch (error) {
        globalError = "Unable to delete event.";
        console.error(error);
      }
    }
  };

  const handleMatchDelete = async (match) => {
    if (window.confirm(`Are you sure you want to delete the match "${match.homeTeam} vs ${match.awayTeam}"?`)) {
      try {
        await deleteMatch(selectedEventId, match.id);
        await loadMatches();
      } catch (error) {
        globalError = "Unable to delete match.";
        console.error(error);
      }
    }
  };

  const handleArticleDelete = async (article) => {
    if (window.confirm(`Are you sure you want to delete the article "${article.title}"?`)) {
      try {
        await deleteArticle(article.id);
        await loadArticles();
      } catch (error) {
        globalError = "Unable to delete article.";
        console.error(error);
      }
    }
  };
</script>

<section class="min-h-screen bg-zinc-950 text-white py-20 px-4 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl space-y-8">
    <header
      class="flex flex-col gap-4 rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-lg shadow-black/30"
    >
      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p class="text-sm uppercase tracking-[0.35em] text-emerald-300/80">
            Admin Panel
          </p>
          <h1 class="text-3xl font-semibold text-white">
            Hidden Admin Dashboard
          </h1>
          <p class="max-w-2xl text-sm text-zinc-400">
            Manage events, matches, and articles with Firebase Auth, Firestore,
            and Supabase S3.
          </p>
        </div>
        {#if user}
          <div class="flex flex-wrap items-center gap-3">
            <span
              class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200"
            >
              {user.email}
            </span>
            <button
              type="button"
              on:click={handleLogout}
              class="rounded-full border border-white/10 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-300/40 hover:bg-emerald-500/15"
            >
              Sign Out
            </button>
          </div>
        {/if}
      </div>
    </header>

    {#if !authChecked}
      <div
        class="rounded-3xl border border-white/10 bg-zinc-900/70 p-10 text-center text-zinc-400"
      >
        Checking authentication...
      </div>
    {:else if !user}
      <div
        class="rounded-3xl border border-white/10 bg-zinc-900/70 p-8 shadow-lg"
      >
        <form on:submit|preventDefault={handleSignIn} class="grid gap-4">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-zinc-200"
               for="email">>Email</label>
            <input id="email"
              type="email"
              bind:value={email}
              required
              class="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-semibold text-zinc-200"
               for="password">>Password</label>
            <input id="password"
              type="password"
              bind:value={password}
              required
              class="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
            />
          </div>

          {#if authError}
            <div class="rounded-2xl bg-rose-500/10 p-3 text-sm text-rose-200">
              {authError}
            </div>
          {/if}

          <button
            type="submit"
            class="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
          >
            Sign in with Firebase Auth
          </button>
        </form>
      </div>
    {:else}
      <div class="grid gap-8">
        <div
          class="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-zinc-900/70 p-4"
        >
          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              class="rounded-full px-5 py-2 text-sm font-semibold transition ${activeTab ===
              'events'
                ? 'bg-emerald-500 text-black'
                : 'bg-white/5 text-white hover:bg-white/10'}"
              on:click={() => (activeTab = "events")}
            >
              Events
            </button>
            <button
              type="button"
              class="rounded-full px-5 py-2 text-sm font-semibold transition ${activeTab ===
              'matches'
                ? 'bg-emerald-500 text-black'
                : 'bg-white/5 text-white hover:bg-white/10'}"
              on:click={() => (activeTab = "matches")}
            >
              Matches
            </button>
            <button
              type="button"
              class="rounded-full px-5 py-2 text-sm font-semibold transition ${activeTab ===
              'articles'
                ? 'bg-emerald-500 text-black'
                : 'bg-white/5 text-white hover:bg-white/10'}"
              on:click={() => (activeTab = "articles")}
            >
              Articles
            </button>
          </div>
          <div class="text-sm text-zinc-400">Hidden route: /admin</div>
        </div>

        {#if globalError}
          <div
            class="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200"
          >
            {globalError}
          </div>
        {/if}

        {#if activeTab === "events"}
          <div class="grid gap-6 xl:grid-cols-[1fr_420px]">
            <div class="space-y-6">
              <div
                class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6"
              >
                <div class="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p
                      class="text-sm uppercase tracking-[0.35em] text-sky-300/80"
                    >
                      Events list
                    </p>
                    <h2 class="text-2xl font-semibold text-white">
                      Manage Events
                    </h2>
                  </div>
                </div>
                <div class="grid gap-4">
                  {#if loadingEvents}
                    <div
                      class="rounded-3xl bg-zinc-950/60 p-6 text-center text-zinc-400"
                    >
                      Loading events...
                    </div>
                  {:else if events.length === 0}
                    <div
                      class="rounded-3xl bg-zinc-950/60 p-6 text-center text-zinc-400"
                    >
                      No events found. Create one below.
                    </div>
                  {:else}
                    <div class="grid gap-4 sm:grid-cols-2">
                      {#each events as event}
                        <div
                          class="rounded-3xl border border-white/10 bg-zinc-950/80 p-4"
                        >
                          <div class="space-y-3">
                            <div
                              class="h-32 overflow-hidden rounded-3xl bg-black"
                            >
                              {#if event.imageUrl}
                                <img
                                  src={event.imageUrl}
                                  alt={event.name}
                                  class="h-full w-full object-cover"
                                />
                              {:else}
                                <div
                                  class="flex h-full items-center justify-center text-xs uppercase text-zinc-500"
                                >
                                  No image uploaded
                                </div>
                              {/if}
                            </div>
                            <div>
                              <p class="text-sm text-zinc-400">{event.name}</p>
                              <p class="text-sm text-zinc-500">
                                {event.description}
                              </p>
                            </div>
                            <div class="flex gap-2 mt-2">
                              <button
                                type="button"
                                on:click={() => editEvent(event)}
                                class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
                              >
                                Edit event
                              </button>
                              <button
                                type="button"
                                on:click={() => handleEventDelete(event)}
                                class="rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      {/each}
                    </div>
                  {/if}
                </div>
              </div>

              <div
                class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6"
              >
                <div class="space-y-4">
                  <div>
                    <p
                      class="text-sm uppercase tracking-[0.35em] text-sky-300/80"
                    >
                      Event form
                    </p>
                    <h2 class="text-2xl font-semibold text-white">
                      Create or edit event
                    </h2>
                  </div>
                  <div class="grid gap-4">
                    <div>
                      <label class="block text-sm text-zinc-300"
                         for="event-name">Event name</label>
                      <input id="event-name"
                        type="text"
                        bind:value={eventForm.name}
                        class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm text-zinc-300"
                         for="event-desc">Description</label>
                      <div class="mt-2 rounded-xl overflow-hidden border border-white/10 bg-white text-black min-h-[150px]">
                        <div use:initEventQuill></div>
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm text-zinc-300"
                         for="event-image">Event image URL</label>
                      <input id="event-image"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        bind:value={eventForm.imageUrl}
                        class="w-full mt-2 rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                      />
                    </div>
                    <button
                      type="button"
                      on:click={handleEventSave}
                      class="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
                    >
                      Save Event
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/if}

        {#if activeTab === "matches"}
          <div class="grid gap-6 xl:grid-cols-[1fr_420px]">
            <div class="space-y-6">
              <div
                class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6"
              >
                <div
                  class="mb-6 flex flex-wrap items-center justify-between gap-4"
                >
                  <div>
                    <p
                      class="text-sm uppercase tracking-[0.35em] text-sky-300/80"
                    >
                      Featured matches
                    </p>
                    <h2 class="text-2xl font-semibold text-white">
                      Match list
                    </h2>
                  </div>
                  <select
                    bind:value={selectedEventId}
                    on:change={() => selectEvent(selectedEventId)}
                    class="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none"
                  >
                    {#each events as event}
                      <option value={event.id}>{event.name}</option>
                    {/each}
                  </select>
                </div>

                {#if loadingMatches}
                  <div
                    class="rounded-3xl bg-zinc-950/60 p-6 text-center text-zinc-400"
                  >
                    Loading matches...
                  </div>
                {:else if matches.length === 0}
                  <div
                    class="rounded-3xl bg-zinc-950/60 p-6 text-center text-zinc-400"
                  >
                    No matches found for this event.
                  </div>
                {:else}
                  <div class="grid gap-4">
                    {#each matches as match}
                      <div
                        class="rounded-3xl border border-white/10 bg-zinc-950/80 p-4"
                      >
                        <div
                          class="flex flex-wrap items-start justify-between gap-4"
                        >
                          <div>
                            <p class="text-sm text-sky-300/80">
                              {match.tournament}
                            </p>
                            <h3 class="text-xl font-semibold text-white">
                              {match.homeTeam} vs {match.awayTeam}
                            </h3>
                            <p class="text-sm text-zinc-400">
                              {match.dateTime} · {match.venue}
                            </p>
                          </div>
                          <div class="flex flex-col gap-2">
                            <ToggleSwitch
                              checked={match.featured}
                              label={match.featured ? "Featured" : "Feature"}
                              on:change={() => toggleFeaturedMatch(match)}
                            />
                            <div class="flex gap-2 mt-2">
                              <button
                                type="button"
                                on:click={() => editMatch(match)}
                                class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                on:click={() => handleMatchDelete(match)}
                                class="rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    {/each}
                  </div>
                {/if}
                {#if featuredError}
                  <div
                    class="mt-4 rounded-3xl bg-rose-500/10 p-3 text-sm text-rose-200"
                  >
                    {featuredError}
                  </div>
                {/if}
              </div>

              <div
                class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6"
              >
                <div class="space-y-4">
                  <div>
                    <p
                      class="text-sm uppercase tracking-[0.35em] text-sky-300/80"
                    >
                      Match form
                    </p>
                    <h2 class="text-2xl font-semibold text-white">
                      Create or edit match
                    </h2>
                  </div>
                  <div class="grid gap-4">
                    <div class="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label class="block text-sm text-zinc-300"
                           for="home-team">Home team</label>
                        <input id="home-team"
                          type="text"
                          bind:value={matchForm.homeTeam}
                          class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label class="block text-sm text-zinc-300"
                           for="away-team">Away team</label>
                        <input id="away-team"
                          type="text"
                          bind:value={matchForm.awayTeam}
                          class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <div class="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label class="block text-sm text-zinc-300"
                           for="home-logo">Home logo URL</label>
                        <input id="home-logo"
                          type="url"
                          bind:value={matchForm.homeLogoUrl}
                          class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label class="block text-sm text-zinc-300"
                           for="away-logo">Away logo URL</label>
                        <input id="away-logo"
                          type="url"
                          bind:value={matchForm.awayLogoUrl}
                          class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm text-zinc-300"
                         for="match-image">Match image URL</label>
                      <input id="match-image"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        bind:value={matchForm.imageUrl}
                        class="w-full mt-2 rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div class="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label class="block text-sm text-zinc-300"
                           for="match-datetime">Datetime</label>
                        <input id="match-datetime"
                          type="text"
                          bind:value={matchForm.dateTime}
                          placeholder="May 17 · 18:30"
                          class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label class="block text-sm text-zinc-300" for="match-venue">Venue</label>
                        <input id="match-venue"
                          type="text"
                          bind:value={matchForm.venue}
                          class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <div class="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label class="block text-sm text-zinc-300"
                           for="match-tournament">Tournament</label>
                        <input id="match-tournament"
                          type="text"
                          bind:value={matchForm.tournament}
                          class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label class="block text-sm text-zinc-300" for="match-status">Status</label>
                        <select id="match-status"
                          bind:value={matchForm.status}
                          class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                        >
                          <option>Upcoming</option>
                          <option>Ongoing</option>
                          <option>Finished</option>
                        </select>
                      </div>
                    </div>
                    <div class="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label class="block text-sm text-zinc-300" for="match-score">Score</label>
                        <input id="match-score"
                          type="text"
                          bind:value={matchForm.score}
                          class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label class="block text-sm text-zinc-300" for="match-phase">Phase</label>
                        <input id="match-phase"
                          type="text"
                          bind:value={matchForm.phase}
                          class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <div class="space-y-4">
                      <div
                        class="flex items-center justify-between text-sm text-zinc-400"
                      >
                        <p>Match links</p>
                        <button
                          type="button"
                          on:click={addMatchLink}
                          class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
                        >
                          Add link
                        </button>
                      </div>
                      {#each matchForm.links as link, index}
                        <div class="grid gap-3 sm:grid-cols-[1fr_auto]">
                          <div class="grid gap-2">
                            <input
                              type="text"
                              placeholder="Link label"
                              bind:value={link.label}
                              on:input={(e) =>
                                handleLinkChange(
                                  index,
                                  "label",
                                  e.target.value,
                                )}
                              class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                            />
                            <input
                              type="url"
                              placeholder="https://example.com"
                              bind:value={link.url}
                              on:input={(e) =>
                                handleLinkChange(index, "url", e.target.value)}
                              class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                            />
                          </div>
                          <button
                            type="button"
                            on:click={() => removeMatchLink(index)}
                            class="rounded-full border border-white/10 bg-rose-500/10 px-4 py-3 text-xs font-semibold text-rose-200 transition hover:border-rose-300/40 hover:bg-rose-500/15"
                          >
                            Remove
                          </button>
                        </div>
                      {/each}
                    </div>
                    <button
                      type="button"
                      on:click={handleMatchSave}
                      class="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
                    >
                      Save Match
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/if}

        {#if activeTab === "articles"}
          <div class="grid gap-6 xl:grid-cols-[1fr_420px]">
            <div class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
              <div class="mb-6">
                <p class="text-sm uppercase tracking-[0.35em] text-sky-300/80">
                  Articles
                </p>
                <h2 class="text-2xl font-semibold text-white">
                  Manage published content
                </h2>
              </div>
              <div class="grid gap-4">
                {#if loadingArticles}
                  <div
                    class="rounded-3xl bg-zinc-950/60 p-6 text-center text-zinc-400"
                  >
                    Loading articles...
                  </div>
                {:else if articles.length === 0}
                  <div
                    class="rounded-3xl bg-zinc-950/60 p-6 text-center text-zinc-400"
                  >
                    No articles found. Use the form to create one.
                  </div>
                {:else}
                  <div class="grid gap-4">
                    {#each articles as article}
                      <div
                        class="rounded-3xl border border-white/10 bg-zinc-950/80 p-4"
                      >
                        <div class="space-y-3">
                          <div
                            class="h-28 overflow-hidden rounded-3xl bg-black"
                          >
                            {#if article.imageUrl}
                              <img
                                src={article.imageUrl}
                                alt={article.title}
                                class="h-full w-full object-cover"
                              />
                            {/if}
                          </div>
                          <div>
                            <p class="text-sm text-sky-300/80">
                              {article.category}
                            </p>
                            <h3 class="text-lg font-semibold text-white">
                              {article.title}
                            </h3>
                            <p class="text-xs text-zinc-500">
                              {article.date} · {article.readTime}
                            </p>
                          </div>
                          <div class="flex gap-2 mt-2">
                            <button
                              type="button"
                              on:click={() => loadArticleForEdit(article.id)}
                              class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              on:click={() => handleArticleDelete(article)}
                              class="rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>

            <div class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
              <div class="space-y-4">
                <div>
                  <p
                    class="text-sm uppercase tracking-[0.35em] text-sky-300/80"
                  >
                    Article form
                  </p>
                  <h2 class="text-2xl font-semibold text-white">
                    Write or edit article
                  </h2>
                </div>
                <div class="grid gap-4">
                  <div>
                    <label class="block text-sm text-zinc-300" for="article-title">Title</label>
                    <input id="article-title"
                      type="text"
                      bind:value={articleForm.title}
                      class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="block text-sm text-zinc-300" for="article-category">Category</label>
                      <select id="article-category"
                        bind:value={articleForm.category}
                        class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                      >
                        <option>News</option>
                        <option>Prediction</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm text-zinc-300"
                         for="article-readtime">Read time</label>
                      <input id="article-readtime"
                        type="text"
                        bind:value={articleForm.readTime}
                        class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm text-zinc-300"
                       for="article-image">Header image URL</label>
                    <input id="article-image"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      bind:value={articleForm.imageUrl}
                      class="w-full mt-2 rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm text-zinc-300"
                       for="article-tags">Tags (comma separated)</label>
                    <input id="article-tags"
                      type="text"
                      placeholder="e.g. Messi, Transfers, La Liga"
                      bind:value={articleForm.tags}
                      class="w-full mt-2 rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm text-zinc-300 mb-2">Content</label>
                    <div class="rounded-xl overflow-hidden border border-white/10 bg-white text-black min-h-[300px]">
                      <div use:initArticleQuill></div>
                    </div>
                  </div>
                  <button
                    type="button"
                    on:click={handleArticleSave}
                    class="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
                  >
                    Save Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</section>

<style>
  :global(.ql-container) {
    max-height: 400px !important;
    overflow-y: auto !important;
  }
  
  :global(.ql-editor) {
    min-height: 150px;
  }
</style>
