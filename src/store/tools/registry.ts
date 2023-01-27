import {writable} from "svelte/store";

export const pageData = writable({});

/*
 * Status for the Registry Request
 *  0 => No results available / Loading / No request made
 *  1 => offline
 *  2 => Parsed result available
 *  3 => Redirect
 *  -1 => Error
 */
export const pageStatus = writable(0);