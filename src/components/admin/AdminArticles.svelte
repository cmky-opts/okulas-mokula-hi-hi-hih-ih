<script>
  import { onMount } from "svelte"
  import { push } from "svelte-spa-router"
  import Quill from "quill"
  import "quill/dist/quill.snow.css"
  import { getAllArticles, getArticleById, saveArticle, deleteArticle } from "../../lib/admin.data"

  let articles = []
  let loading = true
  let error = ""

  let articleForm = {
    id: "", title: "", category: "News", date: new Date().toLocaleDateString(),
    author: "Admin", readTime: "4 min read", imageUrl: "", tags: "",
    content: "<p>Start writing here...</p>",
  }

  let articleQuill

  function initArticleQuill(node) {
    articleQuill = new Quill(node, { theme: "snow" })
    articleQuill.root.innerHTML = articleForm.content
    articleQuill.on("text-change", () => { articleForm.content = articleQuill.root.innerHTML })
    return { destroy() { articleQuill = null } }
  }

  const loadArticles = async () => {
    loading = true
    try {
      articles = await getAllArticles()
    } catch (e) {
      error = "Unable to load articles."
      console.error(e)
    } finally {
      loading = false
    }
  }

  const resetArticleForm = () => {
    articleForm = {
      id: "", title: "", category: "News", date: new Date().toLocaleDateString(),
      author: "Admin", readTime: "4 min read", imageUrl: "", tags: "",
      content: "<p>Start writing here...</p>",
    }
    if (articleQuill) articleQuill.root.innerHTML = articleForm.content
  }

  const editArticle = async (article) => {
    articleForm = {
      id: article.id, title: article.title, category: article.category || "News",
      date: article.date || new Date().toLocaleDateString(), author: article.author || "Admin",
      readTime: article.readTime || "4 min read", imageUrl: article.imageUrl || "",
      tags: article.tags ? article.tags.join(", ") : "",
      content: article.content || "<p></p>",
    }
    if (articleQuill) articleQuill.root.innerHTML = articleForm.content
  }

  const loadArticleForEdit = async (articleId) => {
    const article = await getArticleById(articleId)
    if (article) {
      editArticle(article)
    }
  }

  const handleArticleSave = async () => {
    if (!articleForm.title || !articleForm.content) { error = "Article title and content are required."; return }
    try {
      const parsedTags = articleForm.tags ? articleForm.tags.split(",").map((t) => t.trim()).filter(Boolean) : []
      await saveArticle({ ...articleForm, tags: parsedTags })
      resetArticleForm()
      await loadArticles()
    } catch (e) {
      error = "Unable to save article."
      console.error(e)
    }
  }

  const handleArticleDelete = async (article) => {
    if (window.confirm(`Are you sure you want to delete the article "${article.title}"?`)) {
      try {
        await deleteArticle(article.id)
        await loadArticles()
      } catch (e) {
        error = "Unable to delete article."
        console.error(e)
      }
    }
  }

  onMount(loadArticles)
</script>

<div class="grid gap-6 xl:grid-cols-[1fr_420px]">
  <div class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
    <div class="mb-6">
      <p class="text-sm uppercase tracking-[0.35em] text-sky-300/80">Articles</p>
      <h2 class="text-2xl font-semibold text-white">Manage published content</h2>
    </div>
    {#if error}
      <div class="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 mb-4 text-sm text-rose-200">{error}</div>
    {/if}
    <div class="grid gap-4">
      {#if loading}
        <div class="rounded-3xl bg-zinc-950/60 p-6 text-center text-zinc-400">Loading articles...</div>
      {:else if articles.length === 0}
        <div class="rounded-3xl bg-zinc-950/60 p-6 text-center text-zinc-400">No articles found. Use the form to create one.</div>
      {:else}
        <div class="grid gap-4">
          {#each articles as article}
            <div class="rounded-3xl border border-white/10 bg-zinc-950/80 p-4">
              <div class="space-y-3">
                <div class="h-28 overflow-hidden rounded-3xl bg-black">
                  {#if article.imageUrl}
                    <img src={article.imageUrl} alt={article.title} class="h-full w-full object-cover" />
                  {/if}
                </div>
                <div>
                  <p class="text-sm text-sky-300/80">{article.category}</p>
                  <h3 class="text-lg font-semibold text-white">{article.title}</h3>
                  <p class="text-xs text-zinc-500">{article.date} · {article.readTime}</p>
                </div>
                <div class="flex gap-2 mt-2">
                  <button type="button" on:click={() => loadArticleForEdit(article.id)}
                    class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/20 hover:bg-white/10">Edit</button>
                  <button type="button" on:click={() => handleArticleDelete(article)}
                    class="rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20">Delete</button>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <div class="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
    <div class="space-y-4">
      <div>
        <p class="text-sm uppercase tracking-[0.35em] text-sky-300/80">Article form</p>
        <h2 class="text-2xl font-semibold text-white">Write or edit article</h2>
      </div>
      <div class="grid gap-4">
        <div>
          <label class="block text-sm text-zinc-300" for="article-title">Title</label>
          <input id="article-title" type="text" bind:value={articleForm.title}
            class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500" />
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-sm text-zinc-300" for="article-category">Category</label>
            <select id="article-category" bind:value={articleForm.category}
              class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500">
              <option>News</option>
              <option>Prediction</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-zinc-300" for="article-readtime">Read time</label>
            <input id="article-readtime" type="text" bind:value={articleForm.readTime}
              class="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500" />
          </div>
        </div>
        <div>
          <label class="block text-sm text-zinc-300" for="article-image">Header image URL</label>
          <input id="article-image" type="url" placeholder="https://example.com/image.jpg" bind:value={articleForm.imageUrl}
            class="w-full mt-2 rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500" />
        </div>
        <div>
          <label class="block text-sm text-zinc-300" for="article-tags">Tags (comma separated)</label>
          <input id="article-tags" type="text" placeholder="e.g. Messi, Transfers, La Liga" bind:value={articleForm.tags}
            class="w-full mt-2 rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500" />
        </div>
        <div>
          <label class="block text-sm text-zinc-300 mb-2">Content</label>
          <div class="rounded-xl overflow-hidden border border-white/10 bg-white text-black min-h-[300px]">
            <div use:initArticleQuill></div>
          </div>
        </div>
        <button type="button" on:click={handleArticleSave}
          class="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400">Save Article</button>
      </div>
    </div>
  </div>
</div>

<style>
  :global(.ql-container) { max-height: 400px !important; overflow-y: auto !important; }
  :global(.ql-editor) { min-height: 150px; }
</style>
