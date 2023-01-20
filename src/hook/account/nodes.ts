import {nodes} from "../../store/account/nodes";
import {CLIENTS, makeApiRequest} from "../../lib/client/request";
import {APIS, PATHS} from "../../lib/client/apis";

export const loadNodesStore = () => {
    makeApiRequest(
        CLIENTS.GET,
        APIS.registry,
        PATHS.registry.nodes.nodes,
        {},
        {},
        true

    )
        .then(response => {if (!response.error){nodes.set(response.content)} } )
        .catch(e => console.log(e))

}