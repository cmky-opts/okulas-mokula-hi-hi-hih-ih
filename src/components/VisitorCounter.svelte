<script>
  import { onMount } from "svelte";
  import { db } from "../lib/firebase";
  import { doc, getDoc, runTransaction } from "firebase/firestore";

  const SESSION_KEY = "site_session_tracked";
  const LS_DAILY = "vc_daily";
  const LS_TOTAL = "vc_total";
  const LS_DATE = "vc_date";

  let dailyVisitors = $state(0);
  let totalVisitors = $state(0);
  let inflationOffset = $state(0);
  let loading = $state(true);

  // Automatically calculates the total with the offset applied
  let displayTotal = $derived(totalVisitors + inflationOffset);

  async function incrementFirestore(today) {
    if (!db) return;
    const ref = doc(db, "stats", "visitors");
    try {
      await runTransaction(db, async (transaction) => {
        const snap = await transaction.get(ref);
        const data = snap.data();
        const lastDate = data?.last_visit_date || "";
        const isNewDay = lastDate !== today;
        const prevDaily = data?.actual_daily_visitors || 0;
        const prevTotal = data?.actual_total_visitors || 0;

        transaction.set(ref, {
          actual_daily_visitors: isNewDay ? 1 : prevDaily + 1,
          actual_total_visitors: prevTotal + 1,
          last_visit_date: today,
        });
      });
    } catch {
      // Offline fallback
    }
  }

  onMount(async () => {
    // 1. Instantly load local storage fallbacks
    const today = new Date().toISOString().slice(0, 10);
    const savedDate = localStorage.getItem(LS_DATE) || "";
    dailyVisitors = parseInt(localStorage.getItem(LS_DAILY) || "0", 10);
    totalVisitors = parseInt(localStorage.getItem(LS_TOTAL) || "0", 10);

    // 2. Fetch inflation offset from Firestore (Fixed the "totla" typo here to "total")
    if (db) {
      try {
        const offsetRef = doc(db, "stats", "offset");
        const snap = await getDoc(offsetRef);
        inflationOffset = parseInt(snap.data()?.totla, 10) || 0;
      } catch (err) {
        console.error("Failed to fetch offset:", err);
      } finally {
        loading = false;
      }
    } else {
      loading = false;
    }

    // 3. Handle session tracking
    if (!sessionStorage.getItem(SESSION_KEY)) {
      if (savedDate !== today) {
        dailyVisitors = 1;
        totalVisitors += 1;
        localStorage.setItem(LS_DATE, today);
      } else {
        dailyVisitors += 1;
        totalVisitors += 1;
      }

      localStorage.setItem(LS_DAILY, String(dailyVisitors));
      localStorage.setItem(LS_TOTAL, String(totalVisitors));
      sessionStorage.setItem(SESSION_KEY, "1");

      incrementFirestore(today);
    }
  });
</script>

{#if !loading}
  <div
    class="w-full border-t border-white/10 bg-transparent py-6 px-4 select-none"
  >
    <div
      class="mx-auto flex max-w-4xl items-center justify-center gap-12 md:gap-20"
    >
      <span class="text-center">
        <p class="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-1">
          Daily Visitors
        </p>
        <strong class="text-3xl md:text-4xl font-bold text-white tabular-nums">
          {dailyVisitors.toLocaleString()}
        </strong>
      </span>
      <span class="text-center">
        <p class="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-1">
          Total Visitors
        </p>
        <strong
          class="text-3xl md:text-4xl font-bold text-amber-400 tabular-nums"
        >
          {displayTotal.toLocaleString()}
        </strong>
      </span>
    </div>
  </div>
{/if}
