import { SvelteSet } from "svelte/reactivity";

export const searchState = $state({
  title: "",
  genres: new SvelteSet<string>(),
  releaseDates: new SvelteSet<string>(),
  page: 1,
});
