<script>
  import { buttonVariants } from "@/components/ui/button";
  import * as DropdownMenu from "@/components/ui/dropdown-menu";
  import { ITEMS_PER_PAGE_OPTIONS } from "@/constants";
  import { searchState } from "@/shared.svelte";
  import Settings from "@lucide/svelte/icons/settings";
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger
    class={[
      buttonVariants({ size: "icon", variant: "outline" }),
      "flex-1 border border-primary",
    ]}
  >
    <Settings />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56 overflow-y-scroll shadow-md" sticky="always">
    <DropdownMenu.Group>
      <DropdownMenu.GroupHeading>Options</DropdownMenu.GroupHeading>
      <DropdownMenu.Separator />
      <DropdownMenu.CheckboxItem bind:checked={searchState.scrollToTop}
        >Scroll to top</DropdownMenu.CheckboxItem
      >
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>Items per page</DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent>
          <DropdownMenu.RadioGroup
            bind:value={
              () => String(searchState.itemsPerPage),
              value => (searchState.itemsPerPage = Number(value))
            }
          >
            {#each ITEMS_PER_PAGE_OPTIONS as value}
              <DropdownMenu.RadioItem value={String(value)}
                >{value}</DropdownMenu.RadioItem
              >
            {/each}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
