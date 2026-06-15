<script>
  import { onMount } from "svelte"; // 1. Import onMount
  import { initAppCheck } from "./lib/firebase.js";
  import Router from "svelte-spa-router";
  import Navbar from "./components/ui/Navbar.svelte";
  import Home from "./components/Home.svelte";
  import PlayPage from "./components/PlayPage.svelte";
  import MatchesList from "./components/MatchesList.svelte";
  import ArticleDetail from "./components/ArticleDetail.svelte";
  import ArticlesList from "./components/ArticlesList.svelte";
  import AdminPanel from "./components/AdminPanel.svelte";
  import AboutUs from "./components/AboutUs.svelte";
  import ContactUs from "./components/ContactUs.svelte";
  import DMCA from "./components/DMCA.svelte";
  import PrivacyPolicy from "./components/PrivacyPolicy.svelte";
  import Disclaimer from "./components/Disclaimer.svelte";
  import VisitorCounter from "./components/VisitorCounter.svelte";
  import Footer from "./components/Footer.svelte";

  const routes = {
    "/": Home,
    "/play": PlayPage,
    "/event/:eventId": MatchesList,
    "/article/:articleId": ArticleDetail,
    "/articles": ArticlesList,
    "/admin": AdminPanel,
    "/about": AboutUs,
    "/contact": ContactUs,
    "/dmca": DMCA,
    "/privacy": PrivacyPolicy,
    "/disclaimer": Disclaimer,
    "*": Home,
  };

  // 3. Initialize App Check right when the root component mounts to the DOM
  onMount(() => {
    initAppCheck();
  });
</script>

<section
  class="bg-texture min-h-screen w-full border-l border-r border-white/5"
>
  <Navbar />

  <main class="p-0">
    <Router {routes} />
  </main>
  <VisitorCounter />
  <Footer></Footer>
</section>
