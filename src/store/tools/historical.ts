import {writable} from "svelte/store";
import {STATUS} from "../../lib/constants";

export const historicalRequestStatus = writable(STATUS.INITIAL);
export const historicalResults = writable([]);