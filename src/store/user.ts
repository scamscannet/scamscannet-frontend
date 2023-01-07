import { writable } from "svelte/store";
import { browser } from "$app/environment"

let localStorageKey = "userStore";
export const userStore = writable(browser ? localStorage.getItem(localStorageKey) : null);

userStore.subscribe((val) => {
    if (browser) {
        return (val ? localStorage.setItem(localStorageKey, val) : localStorage.removeItem(localStorageKey))
    }
})
