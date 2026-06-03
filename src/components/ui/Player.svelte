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
    class="w-full md:max-w-2xl overflow-hidden border border-white/10 bg-black shadow-xl"
  >
    <div
      class="flex items-center justify-between bg-black/80 px-3 py-1.5 border-b border-white/10"
    >
      <span class="action-label text-zinc-400">worldcup2026live.xyz</span>
      <div class="flex items-center gap-1.5">
        <div class="h-1.5 w-1.5 animate-pulse bg-red-500"></div>
        <span class="action-label text-zinc-500">Live</span>
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
