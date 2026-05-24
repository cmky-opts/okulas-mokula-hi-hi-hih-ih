<script>
  import Router from "svelte-spa-router";
  import Navbar from "./components/ui/Navbar.svelte";
  import Home from "./components/Home.svelte";
  import PlayPage from "./components/PlayPage.svelte";
  import MatchesList from "./components/MatchesList.svelte";
  import ArticleDetail from "./components/ArticleDetail.svelte";
  import ArticlesList from "./components/ArticlesList.svelte";
  import AdminPanel from "./components/AdminPanel.svelte";
  import Footer from "./components/Footer.svelte";

  const routes = {
    "/": Home,
    "/play": PlayPage,
    "/event/:eventId": MatchesList,
    "/article/:articleId": ArticleDetail,
    "/articles": ArticlesList,
    "/admin": AdminPanel,
    "*": Home,
  };
</script>

<section class="bg-transparent min-h-screen w-full">
  <Navbar />

  <main class="p-0">
    <Router {routes} />
  </main>
  <Footer></Footer>
</section>
