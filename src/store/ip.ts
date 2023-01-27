import {writable} from "svelte/store";

export const ipData = writable({});

/*
 * Status for the Whois Request
 *  0 => No results available / Loading / No request made
 *  1 => Raw Result available
 *  2 => Parsed result available
 *  -1 => Error
 */
export const ipStatus = writable(0);