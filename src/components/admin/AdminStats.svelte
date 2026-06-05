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

<div class="grid gap-6 md:grid-cols-3">
  <div class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 text-center">
    <p class="text-xs uppercase tracking-[0.35em] text-sky-300/80 mb-2">Actual Daily</p>
    <p class="text-4xl font-bold text-white tabular-nums">{statsDaily.toLocaleString()}</p>
    <p class="text-xs text-zinc-500 mt-2">Resets to 0 each day</p>
  </div>
  <div class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 text-center">
    <p class="text-xs uppercase tracking-[0.35em] text-amber-400/80 mb-2">Offset (totla)</p>
    <p class="text-4xl font-bold text-amber-400 tabular-nums">{statsOffset.toLocaleString()}</p>
    <p class="text-xs text-zinc-500 mt-2">Fetched from stats/offset</p>
  </div>
  <div class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 text-center">
    <p class="text-xs uppercase tracking-[0.35em] text-emerald-300/80 mb-2">Actual Total</p>
    <p class="text-4xl font-bold text-emerald-400 tabular-nums">{statsTotal.toLocaleString()}</p>
    <p class="text-xs text-zinc-500 mt-2">Cumulative (live from Firestore)</p>
  </div>
</div>
