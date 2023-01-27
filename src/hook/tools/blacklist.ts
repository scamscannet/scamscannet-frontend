import {CLIENTS, makeApiRequest} from "../../lib/client/request";
import {APIS, PATHS} from "../../lib/client/apis";
import {blacklistStatus, domainScamScore, pageScamScore} from "../../store/blacklist";

export const requestBlacklistStatus = async (domain: String) => {
    const response = await makeApiRequest(
        CLIENTS.GET,
        APIS.blacklist,
        PATHS.blacklist.overview + "/" + domain,
        {},
        {},
        false
    )

    if (response.error) {
        blacklistStatus.set(-1);
    } else  {
        console.log(response.content.status);
        blacklistStatus.set(response.content.status === "blacklist" ? 1 : response.content.status === "whitelist" ? 2 : 3);
    }


}