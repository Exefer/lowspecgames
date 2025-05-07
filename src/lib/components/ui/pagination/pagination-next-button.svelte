<script lang="ts">
  import { buttonVariants } from "@/components/ui/button";
  import { cn } from "@/utils";
  import ChevronRight from "@lucide/svelte/icons/chevron-right";
  import { Pagination as PaginationPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: PaginationPrimitive.NextButtonProps = $props();
</script>

{#snippet Fallback()}
  <span class="max-sm:hidden">Next</span>
  <ChevronRight class="size-4" />
{/snippet}

<PaginationPrimitive.NextButton
  bind:ref
  class={cn(
    buttonVariants({
      variant: "ghost",
      class: "gap-1 pr-2.5",
    }),
    className
  )}
  children={children || Fallback}
  {...restProps}
/>
