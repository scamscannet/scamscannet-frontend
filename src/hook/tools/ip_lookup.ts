import {ipData, ipStatus} from "../../store/ip";
import {CLIENTS, makeApiRequest} from "../../lib/client/request";
import {APIS, PATHS} from "../../lib/client/apis";

export const requestIpData = async (ip: String) => {
    ipStatus.set(0);
    const response = await makeApiRequest(
        CLIENTS.GET,
        APIS.whois,
        PATHS.whois.ipWhois + "/" + ip,
        {},
        {},
        false
    )
    if (response.error) {
        ipStatus.set(-1);
    } else  {
        ipData.set(response.content);
        ipStatus.set(response.content.parsed.addresses.length > 0 ? 2 : 1);
    }


}