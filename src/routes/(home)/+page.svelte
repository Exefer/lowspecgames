<script lang="ts">
  import ThemeToggle from "@/components/theme-toggle.svelte";
  import { Input } from "@/components/ui/input";
  import * as Pagination from "@/components/ui/pagination";
  import { ITEMS_PER_PAGE, uf } from "@/constants";
  import lowspec from "@lowspec/data.json";
  import SpecCard from "./spec-card.svelte";

  let search = $state({ value: "" });
  let currentPage = $state<number>(1);

  const haystack = lowspec.map(spec => spec.title);

  const searchResults = $derived.by(() => {
    if (!search.value) return lowspec;

    const idxs = uf.filter(haystack, search.value)!;

    return idxs.map(index => lowspec[index]);
  });

  const totalPages = $derived(Math.ceil(searchResults.length / ITEMS_PER_PAGE));
  const startIndex = $derived((currentPage - 1) * ITEMS_PER_PAGE);
  const endIndex = $derived(
    currentPage === totalPages ? searchResults.length : startIndex + ITEMS_PER_PAGE
  );
  const paginatedSearchResults = $derived(searchResults.slice(startIndex, endIndex));

  $effect(() => {
    if (search.value) currentPage = 1;
  });
</script>

<main class="flex flex-col gap-4 p-4">
  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold">Low Spec Games</h1>
    <ThemeToggle />
  </div>
  <div class="flex gap-2">
    <Input
      bind:value={search.value}
      placeholder="Search..."
      class="border border-primary"
    />
  </div>
  {#if paginatedSearchResults.length > 0}
    <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {#each paginatedSearchResults as spec}
        <SpecCard {spec} />
      {/each}
    </div>
  {:else if search.value}
    <p class="mt-4 text-center text-muted-foreground">
      No results found for "<strong>{search.value}</strong>"
    </p>
  {:else}
    <p class="mt-4 text-center text-muted-foreground">No results to show.</p>
  {/if}

  {#if totalPages > 1}
    <Pagination.Root
      count={searchResults.length}
      perPage={ITEMS_PER_PAGE}
      bind:page={currentPage}
      onPageChange={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
    >
      {#snippet children({ pages, currentPage })}
        <p class="mt-2">
          Displaying {searchResults.length === 0 ? 0 : startIndex + 1} to {endIndex} of {searchResults.length}
        </p>
        <Pagination.Content class="mt-2">
          <Pagination.Item>
            <Pagination.PrevButton />
          </Pagination.Item>
          {#each pages as page (page.key)}
            {#if page.type === "ellipsis"}
              <Pagination.Item>
                <Pagination.Ellipsis />
              </Pagination.Item>
            {:else}
              <Pagination.Item>
                <Pagination.Link {page} isActive={currentPage === page.value}>
                  {page.value}
                </Pagination.Link>
              </Pagination.Item>
            {/if}
          {/each}
          <Pagination.Item>
            <Pagination.NextButton />
          </Pagination.Item>
        </Pagination.Content>
      {/snippet}
    </Pagination.Root>
  {/if}
</main>
