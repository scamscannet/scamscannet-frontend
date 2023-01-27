<script>
    import {Accordion, AccordionItem, Breadcrumb, BreadcrumbItem} from "flowbite-svelte";
    import MapBox from "../../../../_components/MapBox.svelte";
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import {validateIpAddress} from "$lib/checks";
    import {CLIENTS, makeApiRequest} from "$lib/client/request";
    import {APIS, PATHS} from "$lib/client/apis";
    import LoadingView from "../../../../_components/LoadingView.svelte";
    let result = null;
    let ip = null;
    onMount(() => {
        ip = $page.params.ip;
        if(ip){

            let checkForIpAddress = validateIpAddress(ip)
            if(checkForIpAddress){
                makeApiRequest(
                    CLIENTS.GET,
                    APIS.whois,
                    PATHS.whois.ipWhois + "/" + ip,
                    {},
                    {}
                ).then(response => {
                    result = response.content;
                })

            }
        }
    })

</script>
<Breadcrumb aria-label="Breadcrumb" solid>
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/tools">Tools</BreadcrumbItem>
    <BreadcrumbItem href="/tools/ip">IP</BreadcrumbItem>
    <BreadcrumbItem href="/tools/ip/{ip}">{ip}</BreadcrumbItem>
</Breadcrumb>
{#if !result}
    <LoadingView></LoadingView>
{:else }
    {#if result.parsed.addresses.length >= 1}
        <div class="w-full my-2">
            <MapBox latitude={result.parsed.addresses[0].latitude}
                    longitude={result.parsed.addresses[0].longitude}
                    markers={
                                result.parsed.addresses.map(() => {
                                    return {
                                        longitude: result.parsed.addresses[0].longitude,
                                        latitude: result.parsed.addresses[0].latitude
                                    }
                                })
                              }
            >

            </MapBox>

        </div>
    {/if}
    <Accordion>
        <AccordionItem>
            <span slot="header">IP Subnet</span>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                {#each result.parsed.ipnet.all_ips as lip}
                    <div>
                        <a target="_blank" href="/tools/ip/{lip}" class="p-0.5 text-blue-500 hover:underline">{lip}</a>
                    </div>
                {/each}
            </div>
        </AccordionItem>
        <AccordionItem open>
            <span slot="header">Raw Whois Response</span>
            <p class="mb-2 text-gray-600 dark:text-gray-400">
                {#each result.raw.split("\n") as line}
                    {line}<br />
                {/each}
            </p>
        </AccordionItem>
    </Accordion>

{/if}
