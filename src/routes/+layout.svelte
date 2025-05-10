<script lang="ts">
  import Footer from "@/components/footer.svelte";
  import Meta from "@/components/meta.svelte";
  import { ModeWatcher } from "mode-watcher";
  import "../app.css";

  let { children } = $props();
</script>

<ModeWatcher />

<Meta />

<div class="flex min-h-screen flex-col">
  {@render children()}
  <Footer />
</div>
