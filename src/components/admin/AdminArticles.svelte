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

<div class="grid gap-10 xl:grid-cols-[1fr_400px]">
  <div>
    <h2 class="mb-5 text-sm font-medium text-zinc-400">Articles</h2>
    {#if error}
      <div class="mb-4 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3.5 py-2.5 text-sm text-rose-300">{error}</div>
    {/if}
    {#if loading}
      <div class="py-12 text-center text-sm text-zinc-600">Loading...</div>
    {:else if articles.length === 0}
      <div class="py-12 text-center text-sm text-zinc-600">No articles yet.</div>
    {:else}
      <div class="divide-y divide-zinc-800">
        {#each articles as article}
          <div class="flex items-start gap-4 py-4">
            <div class="h-14 w-20 shrink-0 overflow-hidden rounded-md bg-zinc-900">
              {#if article.imageUrl}
                <img src={article.imageUrl} alt={article.title} class="h-full w-full object-cover" />
              {/if}
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-xs text-zinc-500">{article.category}</p>
              <p class="text-sm font-medium text-white truncate">{article.title}</p>
              <p class="text-xs text-zinc-600">{article.date} · {article.readTime}</p>
            </div>
            <div class="flex shrink-0 gap-2">
              <button type="button" on:click={() => loadArticleForEdit(article.id)}
                class="rounded-md border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-200">Edit</button>
              <button type="button" on:click={() => handleArticleDelete(article)}
                class="rounded-md border border-zinc-800 px-3 py-1.5 text-xs text-zinc-500 transition hover:border-rose-500/40 hover:text-rose-400">Delete</button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <div>
    <h2 class="mb-5 text-sm font-medium text-zinc-400">{articleForm.id ? "Edit" : "New"} article</h2>
    <div class="space-y-4">
      <input id="article-title" type="text" bind:value={articleForm.title} placeholder="Article title"
        class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
      <div class="grid gap-3 sm:grid-cols-2">
        <select id="article-category" bind:value={articleForm.category}
          class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-zinc-300 outline-none focus:border-zinc-600">
          <option>News</option>
          <option>Prediction</option>
        </select>
        <input id="article-readtime" type="text" bind:value={articleForm.readTime} placeholder="Read time"
          class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
      </div>
      <input id="article-image" type="url" bind:value={articleForm.imageUrl} placeholder="Header image URL"
        class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
      <input id="article-tags" type="text" bind:value={articleForm.tags} placeholder="Tags (comma separated)"
        class="w-full rounded-lg border border-zinc-800 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600" />
      <div>
        <div class="rounded-lg overflow-hidden border border-zinc-800 bg-white text-black min-h-[260px]">
          <div use:initArticleQuill></div>
        </div>
      </div>
      <button type="button" on:click={handleArticleSave}
        class="w-full rounded-lg bg-emerald-500 px-3.5 py-2.5 text-sm font-medium text-black transition hover:bg-emerald-400">Save Article</button>
    </div>
  </div>
</div>

<style>
  :global(.ql-container) { max-height: 400px !important; overflow-y: auto !important; }
  :global(.ql-editor) { min-height: 150px; }
</style>
