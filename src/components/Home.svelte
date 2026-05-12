<script>
  import Card from "./ui/Card.svelte";
  import HeroCard from "./ui/HeroCard.svelte";
  import NewsCard from "./ui/NewsCard.svelte";

  const logo = "/Logo-01.png";
  const news = "/news.webp";
</script>

<!-- Main Container with Black Background -->
<div
  class="min-h-screen bg-transparent flex flex-col items-center justify-center gap-12 p-6"
>
  <!-- Wrapper 1: Cards -->
  <!-- Added 'shadow-white/10' and a subtle border -->
  <div
    class="flex h-fit w-full max-w-6xl flex-col items-center justify-center gap-4 rounded-xl border border-white/10 bg-zinc-900 p-4 shadow-[0_0_20px_rgba(255,255,255,0.05)] md:flex-row"
  >
    <Card imgSrc={logo} />
    <Card imgSrc={logo} />
    <Card imgSrc={logo} />
  </div>

  <!-- Wrapper 2: HeroCards -->
  <div
    class="flex w-full max-w-6xl flex-col items-center justify-center gap-6 rounded-xl border border-white/10 bg-zinc-900 p-6 shadow-[0_0_20px_rgba(255,255,255,0.05)] md:flex-row"
  >
    <HeroCard imgSrc={logo} />
    <HeroCard imgSrc={logo} />
  </div>

  <!-- Wrapper 3: NewsCards -->
  <div
    class="grid w-auto max-w-6xl grid-cols-1 gap-6 rounded-xl border border-white/10 bg-zinc-900 p-6 shadow-[0_0_20px_rgba(255,255,255,0.05)] md:grid-cols-2 lg:grid-cols-3"
  >
    <NewsCard imgSrc={news} />
    <NewsCard imgSrc={news} />
    <NewsCard imgSrc={news} />
    <NewsCard imgSrc={news} />
    <NewsCard imgSrc={news} />
    <NewsCard imgSrc={news} />
  </div>
</div>
