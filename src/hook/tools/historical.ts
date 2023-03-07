import {CLIENTS, makeApiRequest} from "../../lib/client/request";
import {APIS, PATHS} from "../../lib/client/apis";
import {historicalRequestStatus, historicalResults} from "../../store/tools/historical";
import {STATUS} from "../../lib/constants";

export const requestDomainNameScore = async (term: string, exact: boolean) => {
    historicalRequestStatus.set(STATUS.LOADING);
    const response = await makeApiRequest(
        CLIENTS.GET,
        APIS.blacklist,
        PATHS.blacklist.search.historical,
        {term, exact_match: exact, days: 7},
        {},
        false
    )

    if (response.error) {
        historicalRequestStatus.set(STATUS.ERROR);
    } else  {
        historicalRequestStatus.set(STATUS.COMPLETED)
        historicalResults.set(response.content.suggestions);
    }


}
