<script lang="ts">
  import { Button } from "@/components/ui/button";
  import type { Spec } from "@/types";

  interface SpecCardProps {
    spec: Spec;
  }

  const { spec }: SpecCardProps = $props();

  const visibleGenres = $derived(
    spec.genres.sort((a, b) => a.length - b.length).slice(0, 3)
  );
  const remainingGenres = $derived(spec.genres.length - visibleGenres.length);
</script>

<div
  class="flex flex-col overflow-hidden rounded-md border border-primary bg-card text-card-foreground shadow-md"
>
  <img src={spec.thumbnailUrl} alt={spec.title} loading="lazy" />
  <div class="flex flex-col p-4">
    <div class="flex flex-col gap-1">
      <p class="truncate text-lg font-semibold" title={spec.title}>
        {spec.title}
      </p>
      <p title={spec.genres.join(", ")}>
        {visibleGenres.join(", ") || "N/A"}
        {#if remainingGenres > 0}
          +{remainingGenres}
        {/if}
      </p>
      <p class="text-muted-foreground">Released: {spec.releaseDate}</p>
    </div>
    <Button
      target="_blank"
      href="https://store.steampowered.com/app/{spec.id}"
      rel="noopener noreferrer"
      class="mt-4">View Steam</Button
    >
  </div>
</div>
