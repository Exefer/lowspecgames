<script lang="ts">
  import ThemeToggle from "@/components/theme-toggle.svelte";
  import { Badge } from "@/components/ui/badge";
  import { Input } from "@/components/ui/input";
  import * as Pagination from "@/components/ui/pagination";
  import { ITEMS_PER_PAGE, uf } from "@/constants";
  import { searchState } from "@/shared.svelte";
  import lowspec from "@lowspec/data.json";
  import X from "@lucide/svelte/icons/x";
  import FilterSection, {
    type FilterSectionKey,
    type FilterSectionProps,
  } from "./filter-section.svelte";
  import SpecCard from "./spec-card.svelte";

  const getReleaseYear = (date: string | Date) => String(new Date(date).getFullYear());

  const haystack = lowspec.map(spec => spec.title);

  const searchResults = $derived.by(() => {
    const results = searchState.title
      ? (uf.filter(haystack, searchState.title)?.map(i => lowspec[i]) ?? [])
      : lowspec;

    return results.filter(spec => {
      const year = getReleaseYear(spec.releaseDate);

      const matchesGenres =
        searchState.genres.size === 0 ||
        [...searchState.genres].every(g => spec.genres.includes(g));

      const matchesYear =
        searchState.releaseDates.size === 0 || searchState.releaseDates.has(year);

      return matchesGenres && matchesYear;
    });
  });

  const totalPages = $derived(Math.ceil(searchResults.length / ITEMS_PER_PAGE));
  const startIndex = $derived((searchState.page - 1) * ITEMS_PER_PAGE);
  const endIndex = $derived(
    searchState.page === totalPages ? searchResults.length : startIndex + ITEMS_PER_PAGE
  );
  const paginatedSearchResults = $derived(searchResults.slice(startIndex, endIndex));

  const filters: FilterSectionProps[] = [
    {
      title: "Genres",
      key: "genres",
      items: Array.from(new Set(lowspec.flatMap(spec => spec.genres))).sort((a, b) =>
        a.localeCompare(b)
      ),
    },
    {
      title: "Release Date",
      key: "releaseDates",
      items: Array.from(
        new Set(lowspec.flatMap(spec => new Date(spec.releaseDate).getFullYear()))
      )
        .filter(Boolean)
        .sort((a, b) => b - a)
        .map(String),
      hasFilter: false,
    },
  ];

  const filterKeys: FilterSectionKey[] = ["genres", "releaseDates"];

  $effect(() => {
    searchState.title;
    searchState.page = 1;
  });
</script>

<main class="flex flex-col gap-4 p-4">
  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold">Low Spec Games</h1>
    <ThemeToggle />
  </div>
  <div class="flex flex-col gap-2 md:flex-row">
    <Input
      bind:value={searchState.title}
      placeholder="Search..."
      class="border border-primary"
    />
    <div class="flex gap-2">
      {#each filters as filter}
        <FilterSection {...filter} />
      {/each}
    </div>
  </div>

  {#if filterKeys.some(key => searchState[key].size > 0)}
    <div class="flex flex-wrap gap-2">
      {#each filterKeys as key}
        {#if searchState[key].size > 0}
          {#each searchState[key] as item}
            <Badge class="select-none gap-0.5 text-sm">
              <span>{item}</span>
              <X
                size="16"
                class="cursor-pointer"
                onclick={() => searchState[key].delete(item)}
              />
            </Badge>
          {/each}
        {/if}
      {/each}
    </div>
  {/if}

  {#if paginatedSearchResults.length > 0}
    <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {#each paginatedSearchResults as spec}
        <SpecCard {spec} />
      {/each}
    </div>
  {:else if searchState.title}
    <p class="mt-4 text-center text-muted-foreground">
      No results found for "<strong>{searchState.title}</strong>"
    </p>
  {:else}
    <p class="mt-4 text-center text-muted-foreground">No results to show.</p>
  {/if}

  {#if totalPages > 1}
    <Pagination.Root
      count={searchResults.length}
      perPage={ITEMS_PER_PAGE}
      bind:page={searchState.page}
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
