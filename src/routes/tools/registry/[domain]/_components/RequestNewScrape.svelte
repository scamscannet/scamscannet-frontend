<script>
    import {CLIENTS, makeApiRequest} from "../../../../../client/request";
    import {APIS, PATHS} from "../../../../../client/apis";
    import {Button} from "flowbite-svelte";
    import {CONTENTTYPES} from "../../../../../client/requests/post";

    export let domain;
    function scrapeRequest(){
        makeApiRequest(
            CLIENTS.POST,
            APIS.registry,
            PATHS.registry.createScrapeJob,
            {},
            {
                contentType: CONTENTTYPES.JSON,
                body: JSON.stringify({url: domain})
            }
        )

    }
</script>

<Button on:click={scrapeRequest}>Request new page data</Button>