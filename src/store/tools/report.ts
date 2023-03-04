import {writable} from "svelte/store";

export const reportData = writable({});
export const reportsList = writable(undefined);
/*
 * Status for the Whois Request
 * -1 - Error
 *  0 => Loading
 *  1 => No Report existing
 *  2 => Report submitted but not completed
 *  3 => Report verified as scam
 *  4 => Report declined - No Scam
 */
export const reportStatus = writable(-1);


/*
 * Status for the Whois Request
 * -1 - Error
 *  0 => Loading
 *  1 => No Abuse Report existing
 *  2 => Abuse case submitted but not completed
 *  3 => Abuse case submitted and website taken down
 *  4 => Abuse case declined by provider
 */
export const abuseStatus = writable(-1);

export const abuseData = writable({});
