import {whoisData, whoisStatus} from "../../store/tools/whois";
import {CLIENTS, makeApiRequest} from "../../lib/client/request";
import {APIS, PATHS} from "../../lib/client/apis";

export const requestPageWhoisData = async (domain: String) => {
    whoisStatus.set(0);
    const response = await makeApiRequest(
        CLIENTS.GET,
        APIS.whois,
        PATHS.whois.whois + "/" + domain,
        {},
        {},
        false
    )
    if (response.error) {
        whoisStatus.set(-1);
    } else  {
        whoisData.set(response.content);
        whoisStatus.set(response.content.parsed.registrar.name ? 2 : 1);
    }


}