import { must } from "./utils";

export const appEl = must(document.querySelector<HTMLElement>("#app"))
export const parser = new DOMParser();