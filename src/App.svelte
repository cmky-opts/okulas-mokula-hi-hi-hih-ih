<script>
  import Router from "svelte-spa-router";
  import Navbar from "./components/ui/Navbar.svelte";
  import Home from "./components/Home.svelte";
  import PlayPage from "./components/PlayPage.svelte";


  const routes = {
    "/": Home,
    "/play": PlayPage,
    "*": Home,
  };
</script>

<section class="bg-black min-h-screen w-full">
  <Navbar />

  <main class="p-6">
    <Router {routes} />
  </main>
</section>
