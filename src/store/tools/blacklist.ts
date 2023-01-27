import {writable} from "svelte/store";
/*
 * Status for the Whois Request
 *  0 => Loading / Loading / No request made
 *  1 => Blacklist
 *  2 => Whitelist
 *  3 => Unknown
 *  -1 => Error
 */
export const blacklistStatus = writable(0);



export const domainScamScore = writable(0);
export const pageScamScore = writable(0);