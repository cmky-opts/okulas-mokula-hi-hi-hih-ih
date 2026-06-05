<script>
  import { onMount } from "svelte"
  import { db } from "../lib/firebase"
  import { doc, getDoc, runTransaction } from "firebase/firestore"

  /*
   * SessionStorage prevents refresh increments:
   *
   * sessionStorage persists as long as the browser tab is open.
   * On first visit (new tab/session), `site_session_tracked` is absent,
   * so the counters increment by 1 and the flag is saved.
   * On page refresh (same tab), sessionStorage still holds the flag,
   * so the increment block is skipped entirely — fires a no-op.
   * Only a brand new tab or closing/reopening the browser creates
   * a fresh sessionStorage context, allowing one increment.
   */

  const SESSION_KEY = "site_session_tracked"
  const LS_DAILY = "vc_daily"
  const LS_TOTAL = "vc_total"
  const LS_DATE = "vc_date"

  let dailyVisitors = $state(0)
  let totalVisitors = $state(0)
  let inflationOffset = $state(0)
  let loading = $state(true)
  let adminMode = $state(false)

  let displayDaily = $derived(dailyVisitors)
  let displayTotal = $derived(adminMode ? totalVisitors : totalVisitors + inflationOffset)

  function toggleAdmin() {
    adminMode = !adminMode
  }

  async function incrementFirestore(today) {
    if (!db) return
    const ref = doc(db, "stats", "visitors")
    try {
      await runTransaction(db, async (transaction) => {
        const snap = await transaction.get(ref)
        const data = snap.data()
        const lastDate = data?.last_visit_date || ""
        const isNewDay = lastDate !== today
        const prevDaily = data?.actual_daily_visitors || 0
        const prevTotal = data?.actual_total_visitors || 0

        transaction.set(ref, {
          actual_daily_visitors: isNewDay ? 1 : prevDaily + 1,
          actual_total_visitors: prevTotal + 1,
          last_visit_date: today,
        })
      })
    } catch {
      // Firestore write failed — public counter still works via localStorage
    }
  }

  onMount(() => {
    if (typeof window !== "undefined") {
      adminMode =
        window.location.hash.includes("admin=true") ||
        window.location.search.includes("admin=true")
    }

    const offsetRef = doc(db, "stats", "offset")

    // Fetch inflation offset from Firestore
    if (db) {
      getDoc(offsetRef)
        .then((snap) => {
          inflationOffset = parseInt(snap.data()?.totla, 10) || 0
        })
        .catch(() => {
          inflationOffset = 0
        })
        .finally(() => {
          loading = false
        })
    } else {
      inflationOffset = 0
      loading = false
    }

    const today = new Date().toISOString().slice(0, 10)
    const savedDate = localStorage.getItem(LS_DATE) || ""

    // Read persisted counters
    dailyVisitors = parseInt(localStorage.getItem(LS_DAILY) || "0", 10)
    totalVisitors = parseInt(localStorage.getItem(LS_TOTAL) || "0", 10)

    // Increment only once per browser session
    if (!sessionStorage.getItem(SESSION_KEY)) {
      if (savedDate !== today) {
        // First visitor of a new day — start daily at 1
        dailyVisitors = 1
        totalVisitors += 1
        localStorage.setItem(LS_DATE, today)
      } else {
        // Same day — increment both
        dailyVisitors += 1
        totalVisitors += 1
      }

      localStorage.setItem(LS_DAILY, String(dailyVisitors))
      localStorage.setItem(LS_TOTAL, String(totalVisitors))
      sessionStorage.setItem(SESSION_KEY, "1")

      incrementFirestore(today)
    }
  })
</script>

{#if !loading}
  <div
    class="w-full border-t border-white/10 bg-black/60 py-6 px-4 select-none"
  role="button"
  tabindex="0"
  onclick={toggleAdmin}
  onkeydown={(e) => e.key === "Enter" && toggleAdmin()}
>
  <div
    class="mx-auto flex max-w-4xl items-center justify-center gap-12 md:gap-20"
  >
    <span class="text-center">
      <p class="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-1">Daily Visitors</p>
      <strong class="text-3xl md:text-4xl font-bold text-white tabular-nums">
        {displayDaily.toLocaleString()}
      </strong>
    </span>
    <span class="text-center">
      <p class="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-1">Total Visitors</p>
      <strong class="text-3xl md:text-4xl font-bold text-amber-400 tabular-nums">
        {displayTotal.toLocaleString()}
      </strong>
    </span>
    {#if adminMode}
      <span class="hidden md:inline text-[10px] uppercase tracking-widest text-amber-500">● ADMIN</span>
    {/if}
  </div>
</div>
{/if}
