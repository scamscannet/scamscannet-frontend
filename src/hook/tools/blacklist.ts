import {CLIENTS, makeApiRequest} from "../../lib/client/request";
import {APIS, PATHS} from "../../lib/client/apis";
import {blacklistStatus, domainScamScore, pageScamScore} from "../../store/tools/blacklist";

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
        blacklistStatus.set(response.content.status === "blacklist" ? 1 : response.content.status === "whitelist" ? 2 : 3);
    }


}

export const requestDomainNameScore = async (domain: string) => {
    domainScamScore.set(0);
    const response = await makeApiRequest(
        CLIENTS.GET,
        APIS.blacklist,
        PATHS.blacklist.score,
        {domain},
        {},
        false
    )

    if (response.error) {
        domainScamScore.set(-1);
    } else  {
        domainScamScore.set(response.content.score);
    }


}

export const requestWebsiteScore = async (domain: string) => {
    pageScamScore.set(0);
    const response = await makeApiRequest(
        CLIENTS.GET,
        APIS.blacklist,
        PATHS.blacklist.website_score,
        {domain},
        {},
        false
    )

    if (response.error) {
        pageScamScore.set(-1);
    } else  {
        pageScamScore.set(response.content.score);
    }


}