import {PUBLIC_REGISTRY_API_URL, PUBLIC_BLACKLIST_API_URL, PUBLIC_AUTHENTICATE_API_URL, PUBLIC_WHOIS_API_URL} from "$env/static/public"

export const APIS = {
    authentication: PUBLIC_AUTHENTICATE_API_URL ? PUBLIC_AUTHENTICATE_API_URL : "https://authentication.scamscan.net",
    blacklist: PUBLIC_BLACKLIST_API_URL ? PUBLIC_BLACKLIST_API_URL : "https://blacklist.scamscan.net",
    registry: PUBLIC_REGISTRY_API_URL ? PUBLIC_REGISTRY_API_URL : "https://registry.scamscan.net",
    whois: PUBLIC_WHOIS_API_URL ? PUBLIC_WHOIS_API_URL : "https://whois.deploy.ctrl-felix.de"
}

export const PATHS = {
    authentication: {
        register: "/",
        login: "/user/login"
    },
    blacklist: {
        lookup: "/blacklist/lookup",
        overview: "/overview",
        search: {
            complete: "/search/complete"
        },
        score: "/score",
        website_score: "/score_website",
        report: {
            new: "/report/"
        }

    },
    registry: {
        get: "/data/get",
        screenshot: "/get-image",
        createScrapeJob: "/dispatcher/create-job",
        dispatcher: {
            websocket: "/dispatcher/websocket"
        },nodes: {
            register: '/dispatcher/nodes/register',
            deactivate: '/dispatcher/nodes/deactivate',
            nodes: '/dispatcher/nodes',

        }

    },
    whois: {
        whois: "/whois",
        ipWhois: "/ip-whois",
        history: "/history"
    }
}