<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Hls from "hls.js";

  let videoElement: HTMLVideoElement;
  let hls: Hls | null = null;
  let intervalId: any;
  export let streamUrl: string = "";

  // Quality control states
  let qualityLevels: any[] = [];
  let currentQualityIndex: number = -1; // -1 means "Auto" mode

  function loadVideo(): void {
    if (!streamUrl || !videoElement) return;

    if (hls) {
      hls.destroy();
      hls = null;
    }

    if (Hls.isSupported()) {
      hls = new Hls({
        lowLatencyMode: true,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 5,
        enableWorker: true,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        abrEwmaFastLive: 3,
        abrEwmaSlowLive: 9,
      });

      hls.loadSource(streamUrl);
      hls.attachMedia(videoElement);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // 1. Fetch available quality streams once the file manifest loads
        if (hls) {
          qualityLevels = hls.levels;
          currentQualityIndex = hls.currentLevel; // Reflect current level
        }

        videoElement
          .play()
          .catch((err) => console.log("Auto-play blocked or delayed:", err));
      });

      // Update the dropdown UI if Auto-Mode dynamically changes resolution tracks
      hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
        if (hls && hls.loadLevel === -1) {
          // Only sync UI with adaptive changes if user is still on "Auto"
          currentQualityIndex = -1;
        }
      });

      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError();
              break;
            default:
              loadVideo();
              break;
          }
        }
      });
    } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = streamUrl;
    }
  }

  // Handle manual resolution changes from user selection
  function handleQualityChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const levelIndex = parseInt(target.value, 10);

    if (hls) {
      currentQualityIndex = levelIndex;
      // hls.currentLevel sets the variant index immediately
      hls.currentLevel = levelIndex;
    }
  }

  function startLatencyMonitor() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (!hls || !videoElement || videoElement.paused) return;
      const latency = hls.latency;
      if (latency > 6 && latency < 12) {
        videoElement.playbackRate = 1.15;
      } else if (latency >= 12) {
        videoElement.currentTime =
          hls.liveSyncPosition ?? videoElement.duration;
        videoElement.playbackRate = 1.0;
      } else {
        videoElement.playbackRate = 1.0;
      }
    }, 2000);
  }

  onMount(() => {
    loadVideo();
    startLatencyMonitor();
  });

  $: if (streamUrl && videoElement) {
    loadVideo();
  }

  onDestroy(() => {
    clearInterval(intervalId);
    if (hls) hls.destroy();
  });
</script>

<div class="flex w-full flex-col items-center justify-center p-0 md:p-4 m-0">
  <div
    class="w-full md:max-w-2xl overflow-hidden border border-white/10 bg-black shadow-xl"
  >
    <!-- Top Bar Navigation Panel -->
    <div
      class="flex items-center justify-between bg-black/80 px-3 py-1.5 border-b border-white/10"
    >
      <span class="action-label text-zinc-400">worldcup2026live.xyz</span>

      <div class="flex items-center gap-3">
        <!-- Quality Selection Dropdown Control UI -->
        {#if qualityLevels.length > 0}
          <div class="flex items-center gap-1">
            <label for="quality-select" class="text-xs text-zinc-500">HQ:</label
            >
            <select
              id="quality-select"
              class="bg-zinc-900 border border-white/20 text-zinc-300 text-xs rounded px-1 py-0.5 outline-none cursor-pointer focus:border-red-500"
              value={currentQualityIndex}
              on:change={handleQualityChange}
            >
              <option value={-1}>Auto</option>
              {#each qualityLevels as level, index}
                <option value={index}>
                  {level.height ? `${level.height}p` : `Track ${index + 1}`}
                  {level.bitrate
                    ? `(${Math.round(level.bitrate / 1000)} kbps)`
                    : ""}
                </option>
              {/each}
            </select>
          </div>
        {/if}

        <div class="flex items-center gap-1.5">
          <div class="h-1.5 w-1.5 animate-pulse bg-red-500"></div>
          <span class="action-label text-zinc-500">Live</span>
        </div>
      </div>
    </div>

    <!-- Video Frame Element -->
    <video
      bind:this={videoElement}
      controls
      playsinline
      class="aspect-video w-full bg-black shadow-inner"
    >
      <track kind="captions" />
    </video>
  </div>
</div>
