<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Hls from "hls.js";

  let videoElement: HTMLVideoElement;
  let hls: Hls | null = null;
  export let streamUrl: string = "";

  function loadVideo(): void {
    if (hls) hls.destroy();

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement
          .play()
          .catch((err) => console.error("Auto-play blocked", err));
      });
    } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = streamUrl;
    }
  }

  onMount(() => {
    if (streamUrl) loadVideo();
  });
  
  $: if (streamUrl && videoElement) {
    loadVideo();
  }
  onDestroy(() => {
    if (hls) hls.destroy();
  });
</script>

<!-- 
  Changed p-0 for mobile to give the video more space.
  md:p-4 restores the padding for larger screens.
-->
<div class="flex w-full flex-col items-center justify-center p-0 md:p-4 m-0">
  <div
    class="w-full md:max-w-2xl overflow-hidden md:rounded-lg border-y md:border border-white/10 bg-zinc-900 shadow-xl"
  >
    <div
      class="flex items-center justify-between bg-zinc-900/80 px-3 py-1.5 border-b border-white/5"
    >
      <span class="text-xs font-medium text-zinc-400">Stream Player</span>
      <div class="flex items-center gap-1.5">
        <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500"></div>
        <span class="text-[9px] uppercase tracking-tighter text-zinc-500"
          >Live</span
        >
      </div>
    </div>

    <!-- Video Element -->
    <video
      bind:this={videoElement}
      controls
      class="aspect-video w-full bg-black shadow-inner"
    >
      <track kind="captions" />
    </video>
  </div>
</div>
