<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import shaka from "shaka-player/dist/shaka-player.ui.js";
  import "shaka-player/dist/controls.css";

  shaka.polyfill.installAll();

  let videoContainer: HTMLDivElement;
  let videoElement: HTMLVideoElement;
  let player: shaka.Player | null = null;
  let ui: shaka.ui.Overlay | null = null;
  let intervalId: any;
  let loading = false;
  let errorMsg = "";
  export let streamUrl: string = "";

  async function loadVideo(): Promise<void> {
    if (!streamUrl || !videoElement || loading) return;
    errorMsg = "";
    loading = true;

    if (ui) {
      ui.destroy();
      ui = null;
    }
    if (player) {
      player.destroy();
      player = null;
    }

    if (!shaka.Player.isBrowserSupported()) {
      videoElement.setAttribute("controls", "");
      loading = false;
      return;
    }

    try {
      player = new shaka.Player();
      await player.attach(videoElement, false);

      player.configure({
        streaming: {
          liveSync: {
            enabled: true,
            targetLatency: 5,
            targetLatencyTolerance: 2,
          },
        },
      });

      await player.load(streamUrl);

      ui = new shaka.ui.Overlay(player, videoContainer, videoElement);

      ui.configure({
        overflowMenuButtons: ['playback_rate', 'quality'],
      });

      videoElement.removeAttribute("controls");
      await videoElement.play().catch(() => {});
    } catch (err) {
      videoElement.setAttribute("controls", "");
      errorMsg = "Stream unavailable. The server may be offline or blocked by CORS policy.";
      console.error("shaka-player setup error:", err);
    } finally {
      loading = false;
    }
  }

  function startLatencyMonitor() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (!player || !videoElement || videoElement.paused) return;
      if (!player.isLive()) return;

      const range = player.seekRange();
      const latency = range.end - videoElement.currentTime;

      if (latency > 6 && latency < 12) {
        videoElement.playbackRate = 1.15;
      } else if (latency >= 12) {
        videoElement.currentTime = range.end;
        videoElement.playbackRate = 1.0;
      } else {
        videoElement.playbackRate = 1.0;
      }
    }, 2000);
  }

  onMount(() => {
    if (streamUrl && videoElement) loadVideo();
    startLatencyMonitor();
  });

  $: if (streamUrl) {
    loadVideo();
  }

  onDestroy(() => {
    clearInterval(intervalId);
    if (ui) ui.destroy();
    if (player) player.destroy();
  });
</script>

<div class="flex w-full flex-col items-center justify-center p-0 md:p-4 m-0">
  <div
    class="w-full md:max-w-2xl overflow-hidden border border-white/10 bg-black shadow-xl"
  >
    <div
      class="flex items-center justify-between bg-black/80 px-3 py-1.5 border-b border-white/10"
    >
      <span class="action-label text-zinc-400">worldcup2026live.xyz</span>

      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1.5">
          <div class="h-1.5 w-1.5 animate-pulse bg-red-500"></div>
          <span class="action-label text-zinc-500">Live</span>
        </div>
      </div>
    </div>

    <div bind:this={videoContainer} class="relative">
      <video
        bind:this={videoElement}
        controls
        autoplay
        playsinline
        class="aspect-video w-full bg-black shadow-inner"
      >
        <track kind="captions" />
      </video>
      {#if errorMsg}
        <div class="absolute bottom-0 left-0 right-0 bg-red-900/80 px-3 py-2 text-xs text-red-200 text-center">
          {errorMsg}
        </div>
      {/if}
    </div>
  </div>
</div>
