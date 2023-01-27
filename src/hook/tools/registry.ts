import {CLIENTS, makeApiRequest} from "../../lib/client/request";
import {APIS, PATHS} from "../../lib/client/apis";
import {pageData, pageStatus} from "../../store/registry";

export const requestPageData = async (domain: string) => {
    pageStatus.set(0);
    const response = await makeApiRequest(
        CLIENTS.GET,
        APIS.registry,
        PATHS.registry.get,
        {"url": domain},
        {},
        false
    )
    if (response.error) {
        pageStatus.set(-1);
    } else  {
        pageData.set(response.content);
        pageStatus.set(response.content.redirect ? 3 : response.content.offline? 1 : 2);
    }


}