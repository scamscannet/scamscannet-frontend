<script>
    import {onMount} from "svelte";
    import {CLIENTS, makeApiRequest} from "../../../../lib/client/request";
    import {APIS, PATHS} from "../../../../lib/client/apis";
    import {page} from "$app/stores";
    import LoadingView from "../../../_components/LoadingView.svelte";
    import {Accordion, AccordionItem, Breadcrumb, BreadcrumbItem, Modal} from "flowbite-svelte";

    let result = null;

    onMount(() => {
        makeApiRequest(
            CLIENTS.GET,
            APIS.whois,
            PATHS.whois.whois + "/" + $page.params.domain,
            {},
            {}
        ).then(response => {
            result = response.content;
            console.log(result.raw.split("\n"))
        })

    })
</script>
<Breadcrumb aria-label="Default breadcrumb example" solid>
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/tools">Tools</BreadcrumbItem>
    <BreadcrumbItem href="/tools/whois">Whois</BreadcrumbItem>
    <BreadcrumbItem href="/tools/whois/{$page.params.domain}">{$page.params.domain.toUpperCase()}</BreadcrumbItem>
</Breadcrumb>
<h1 class="text-3xl font-bold mt-4 mb-2">Whois Lookup</h1>

{#if (!result)}
    <LoadingView></LoadingView>
{:else}
    <Accordion>
        <AccordionItem open>
            <span slot="header">Raw Whois Response</span>
            <p class="mb-2 text-gray-500 dark:text-gray-400">
                {#each result.raw.split("\n") as line}
                    {line}<br />
                {/each}
            </p>
        </AccordionItem>
    </Accordion>

{/if}