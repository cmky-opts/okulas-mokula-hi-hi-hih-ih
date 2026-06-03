<script>
  export let title = "The Future of Web Development in 2026";
  export let description =
    "Exploring how AI and new frameworks are reshaping the digital landscape...";
  export let author = "Jane Doe";
  export let date = "May 13, 2026";
  export let readTime = "5 min read";
  export let tag = "Technology";
  export let imgSrc = "https://via.placeholder.com/150";
</script>

<article
  class="flex flex-col-reverse md:flex-row items-start justify-between py-8 border-b border-zinc-100 gap-6 cursor-pointer group"
>
  <div class="flex-1">
    <!-- Author Info -->
    <div class="flex items-center gap-2 mb-3">
      <div class="w-6 h-6 rounded-full bg-zinc-200"></div>
      <span class="text-sm font-medium text-zinc-900">{author}</span>
      <span class="text-sm text-zinc-500">·</span>
      <span class="text-sm text-zinc-500">{tag}</span>
    </div>

    <!-- Content -->
    <h2
      class="text-xl md:text-2xl font-bold text-zinc-900 mb-2 group-hover:text-zinc-700 transition-colors"
    >
      {title}
    </h2>
    <p class="text-zinc-600 line-clamp-2 md:line-clamp-3 mb-4 font-serif">
      {description}
    </p>

    <!-- Meta Info -->
    <div class="flex items-center gap-4 text-sm text-zinc-500">
      <span>{date}</span>
      <span>·</span>
      <span>{readTime}</span>
    </div>
  </div>

  <!-- Thumbnail -->
  <div
    class="w-full md:w-32 lg:w-40 aspect-square shrink-0 overflow-hidden rounded-sm"
  >
    <img src={imgSrc} alt="Post thumbnail" class="w-full h-full object-cover" />
  </div>
</article>
