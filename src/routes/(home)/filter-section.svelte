<script lang="ts">
  import { buttonVariants } from "@/components/ui/button";
  import * as DropdownMenu from "@/components/ui/dropdown-menu";
  import { Input } from "@/components/ui/input";
  import { searchState } from "@/shared.svelte";
  import ArrowUpDown from "@lucide/svelte/icons/arrow-up-down";

  type FilterSectionKey = "genres" | "releaseDates";

  export interface FilterSectionProps {
    title: string;
    key: FilterSectionKey;
    items: string[];
    hasFilter?: boolean;
  }

  let { title, key, items, hasFilter = true }: FilterSectionProps = $props();

  let search = $state("");

  const filteredItems = $derived.by(() => {
    if (!search) return items;

    return items.filter(item => item.toLowerCase().includes(search.toLowerCase()));
  });
  const selectedItemsCount = $derived(searchState[key].size);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger
    class={[buttonVariants({ variant: "outline" }), "flex-1 border border-primary"]}
    >{title}
    {#if selectedItemsCount > 0}
      ({selectedItemsCount})
    {/if}
    <ArrowUpDown />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="max-h-64 w-56 overflow-y-scroll shadow-md" sticky="always">
    <DropdownMenu.Group>
      <DropdownMenu.GroupHeading>{title}</DropdownMenu.GroupHeading>
      {#if selectedItemsCount > 0}
        <button class="px-2 text-xs underline" onclick={() => searchState[key].clear()}>
          Clear {selectedItemsCount} selected
        </button>
      {/if}
      {#if hasFilter}
        <div class="p-1">
          <Input class="border border-primary" bind:value={search} placeholder="Filter..."
            >Filter
          </Input>
        </div>
      {/if}
      <DropdownMenu.Separator />
      {#each filteredItems as item (item)}
        <DropdownMenu.CheckboxItem
          closeOnSelect={false}
          bind:checked={
            () => searchState[key].has(item),
            checked => {
              searchState.page = 1;
              return checked ? searchState[key].add(item) : searchState[key].delete(item);
            }
          }
        >
          {item}
        </DropdownMenu.CheckboxItem>
      {/each}
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
