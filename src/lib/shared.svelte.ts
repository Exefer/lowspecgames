import { SvelteSet } from "svelte/reactivity";

export const searchState = $state({
  title: "",
  genres: new SvelteSet<string>(),
  releaseDates: new SvelteSet<string>(),
  scrollToTop: true,
  itemsPerPage: 20,
  page: 1,
});
