import {PUBLIC_REGISTRY_API_URL, PUBLIC_BLACKLIST_API_URL, PUBLIC_AUTHENTICATE_API_URL} from "$env/static/public"

export const APIS = {
    authentication: PUBLIC_AUTHENTICATE_API_URL ? PUBLIC_AUTHENTICATE_API_URL : "https://authentication.scamscan.net",
    blacklist: PUBLIC_BLACKLIST_API_URL ? PUBLIC_BLACKLIST_API_URL : "https://blacklist.scamscan.net",
    registry: PUBLIC_REGISTRY_API_URL ? PUBLIC_REGISTRY_API_URL : "https://registry.scamscan.net"
}

export const PATHS = {
    authentication: {
        register: "/",
        login: "/user/login"
    },
    blacklist: {
        lookup: "/lookup"
    },
    registry: {
        get: "/get",
        screenshot: "/get-image",
        createScrapeJob: "/dispatcher/create-job"
    }
}