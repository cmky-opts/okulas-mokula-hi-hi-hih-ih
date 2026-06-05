<script>
  import { onDestroy } from "svelte"
  import { db } from "../../lib/firebase"
  import { doc, getDoc, onSnapshot } from "firebase/firestore"

  let statsDaily = 0
  let statsOffset = 0
  let statsTotal = 0
  let statsUnsubscribe = null

  function initStatsListener() {
    if (!db) return
    const visitorsRef = doc(db, "stats", "visitors")
    const offsetRef = doc(db, "stats", "offset")

    getDoc(offsetRef)
      .then((snap) => { statsOffset = parseInt(snap.data()?.totla, 10) || 0 })
      .catch(() => { statsOffset = 0 })

    statsUnsubscribe = onSnapshot(visitorsRef, (snap) => {
      if (snap.exists()) {
        statsDaily = snap.data().actual_daily_visitors || 0
        statsTotal = snap.data().actual_total_visitors || 0
      }
    })
  }

  onDestroy(() => {
    if (statsUnsubscribe) statsUnsubscribe()
  })

  initStatsListener()
</script>

<div class="grid gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 sm:grid-cols-3">
  <div class="bg-zinc-950 px-5 py-6">
    <p class="text-xs font-medium text-zinc-500">Actual Daily</p>
    <p class="mt-1.5 text-2xl font-semibold text-white tabular-nums">{statsDaily.toLocaleString()}</p>
    <p class="mt-1 text-xs text-zinc-600">Resets each day</p>
  </div>
  <div class="bg-zinc-950 px-5 py-6">
    <p class="text-xs font-medium text-zinc-500">Offset</p>
    <p class="mt-1.5 text-2xl font-semibold text-amber-400 tabular-nums">{statsOffset.toLocaleString()}</p>
    <p class="mt-1 text-xs text-zinc-600">Inflation from stats/offset</p>
  </div>
  <div class="bg-zinc-950 px-5 py-6">
    <p class="text-xs font-medium text-zinc-500">Actual Total</p>
    <p class="mt-1.5 text-2xl font-semibold text-emerald-400 tabular-nums">{statsTotal.toLocaleString()}</p>
    <p class="mt-1 text-xs text-zinc-600">Cumulative live count</p>
  </div>
</div>
