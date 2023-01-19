<script>
    import {CLIENTS, makeApiRequest} from "../../../../../lib/client/request";
    import {APIS, PATHS} from "../../../../../lib/client/apis";
    import {Button, Spinner} from "flowbite-svelte";
    import {CONTENTTYPES} from "../../../../../lib/client/requests/post";

    export let domain;
    let loading = false;
    async function scrapeRequest(){
        loading = true;
        let response = await makeApiRequest(
            CLIENTS.POST,
            APIS.registry,
            PATHS.registry.createScrapeJob,
            {},
            {
                contentType: CONTENTTYPES.JSON,
                body: JSON.stringify({url: domain})
            },
            true
        )
        if (response.error){
            alert("There was an error while requiesting the new scrape");

        } else {
            let jobid = response.content.jobid;
            const socket = new WebSocket(APIS.registry.replace("https://", "wss://").replace("http://", "ws://") + PATHS.registry.dispatcher.websocket);
            socket.onopen = (event) => {
                socket.send(JSON.stringify({
                    method: "subscribe",
                    "jobid": jobid
                }));
            }

            socket.addEventListener('message', (event) => {
                const msg = JSON.parse(event.data);
                console.log(msg);
                if (msg.method === "jobUpdate" && msg.jobId === jobid){
                    alert("The scrape has been completed. The website will reload now.")
                    location.reload();
                }
            });

        }


    }
</script>
{#if loading}
    <Button> <Spinner class="mr-3" size="4" color="white" />Loading ...</Button>
{:else}
    <Button on:click={scrapeRequest}>Request new page data</Button>

{/if}