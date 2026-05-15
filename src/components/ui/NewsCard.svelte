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
  class="group flex h-32 w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900 transition-all hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:cursor-pointer text-left"
>
  <!-- Image Section -->
  <figure class="w-1/3 shrink-0 overflow-hidden bg-black">
    <img
      src={imgSrc || "https://via.placeholder.com/400x300?text=News"}
      alt={title}
      class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
  </figure>

  <!-- Content Section -->
  <div class="flex flex-col justify-center p-4">
    <span
      class="mb-1 text-[10px] font-bold uppercase tracking-widest text-amber-900"
    >
      {date}
    </span>
    <h2
      class="line-clamp-2 font-fifa2026 text-sm text-white leading-tight md:text-base"
    >
      {title}
    </h2>
    <div class="mt-2 h-0.5 w-0 bg-white transition-all group-hover:w-8"></div>
  </div>
</button>
