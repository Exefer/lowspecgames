<script lang="ts" module>
  export const metadata = {
    title: "Low Spec Games",
    description: "A list of games that run on low-end PCs",
    url: "https://exefer.github.io/lowspecgames/",
    image: "",
    author: "Exefer",
    keywords: "low-end, steam, games",
  };
</script>

<svelte:head>
  <title>{metadata.title}</title>
  <meta charset="utf-8" />
  <meta name="description" content={metadata.description} />
  <meta name="keywords" content={metadata.keywords} />
  <meta name="author" content={metadata.author} />
  <meta name="copyright" content={metadata.author} />
  <meta name="robots" content="index, follow" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content={metadata.title} />
  <meta property="og:description" content={metadata.description} />
  <meta property="og:url" content={metadata.url} />
  <meta property="og:image" content={metadata.image} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={metadata.title} />
  <meta name="twitter:description" content={metadata.description} />
  <meta name="twitter:image" content={metadata.image} />

  <link rel="canonical" href={metadata.url} />
</svelte:head>
