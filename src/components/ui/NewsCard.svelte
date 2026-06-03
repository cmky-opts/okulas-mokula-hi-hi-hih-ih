<script>
  import { push } from "svelte-spa-router";

  export let imgSrc = "";
  export let title = "Latest Football Update";
  export let date = "May 13, 2026";
  export let articleId = "";

  const handleClick = () => {
    if (articleId) {
      push(`/article/${articleId}`);
    }
  };
</script>

<!-- 
  Using a group for hover effects. 
  bg-zinc-900 and border-white/10 to match your theme.
  Clickable button that navigates to article detail page.
-->
<button
  type="button"
  on:click={handleClick}
  class="group flex h-32 w-full overflow-hidden border border-white/10 bg-black transition-all hover:border-white/30 hover:cursor-pointer text-left"
>
  <!-- Image Section -->
  <figure class="w-1/3 shrink-0 overflow-hidden bg-black">
    <img
      src={imgSrc}
      alt={title}
      class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 img-ink"
    />
  </figure>

  <!-- Content Section -->
  <div class="flex flex-col justify-center p-4">
    <span class="action-label text-amber-400/80 mb-1">
      {date}
    </span>
    <h2 class="line-clamp-2 text-sm text-white leading-tight font-bold uppercase tracking-tight md:text-base">
      {title}
    </h2>
    <div class="mt-2 h-0.5 w-0 bg-white transition-all group-hover:w-8"></div>
  </div>
</button>
