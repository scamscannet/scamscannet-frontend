<script>
    import { page } from '$app/stores';
    import {
        Accordion,
        AccordionItem,
        Breadcrumb,
        BreadcrumbItem,
        Button,
        Card,
        Popover,
        Spinner
    } from "flowbite-svelte";
    import pretty from  'pretty'
    import UserView from "../../../_components/UserView.svelte";
    import RequestNewScrape from "./_components/RequestNewScrape.svelte";
    import {onMount} from "svelte";
    import {browser} from "$app/environment";
    import LoadingView from "../../../_components/LoadingView.svelte";
    import CardView from "../../../_components/CardView.svelte";

    let loading = true;
    let requested_page = {
        data: {},
        available: 1 // 0 => No Report, 1 => Available, 2=> Website offline
    }


    fetch("https://registry.scamscan.net/data/get?url=" + $page.params.domain)
        .then(response => response.json())
        .then(data => {
            requested_page.data = data;
            if(data.detail === "There is no existing data for this url."){
                requested_page.available = 0
                loading = false;

            } else if(data.offline) {
                requested_page.available = 2
                loading = false;

            } else {
                requested_page.data.code.html = pretty(requested_page.data.code.html)
                loading = false;

            }
        }).catch(error => {
            requested_page.available = 0;
        console.log(error);
    });

    function truncate(str, n){
        return (str.length > n) ? str.slice(0, n-1) + '...' : str;
    }

</script>
<svelte:head>
    <meta property="og:type" content="website">
    <meta property="og:url" content={window.location.origin}>
    <meta property="og:title" content="{$page.params.domain} | ScamScan Domain Registry">
    <meta property="og:description" content="Explore {$page.params.domain} in a secure environment without putting your own security at risk.">
    <meta property="og:image" content={"https://registry.scamscan.net/data/get-image?url=" + $page.params.domain}>
</svelte:head>
<Breadcrumb aria-label="Default breadcrumb example" solid>
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/tools">Tools</BreadcrumbItem>
    <BreadcrumbItem href="/tools/registry">Registry</BreadcrumbItem>
    <BreadcrumbItem>{$page.params.domain.toUpperCase()}</BreadcrumbItem>
</Breadcrumb>


{#if loading}
    <LoadingView>

    </LoadingView>
{:else if requested_page.available === 1}
    <div class="w-full flex justify-center rounded overflow-hidden mt-4 ">
        <img class=" w-4/5" src={"https://registry.scamscan.net/data/get-image?url=" + $page.params.domain}>
    </div>
    <UserView>
        <div class="w-full flex justify-center pt-6 pb-2" slot="content">
            <RequestNewScrape domain={$page.params.domain} ></RequestNewScrape>
        </div>
    </UserView>
    <div class="p-2 flex flex-col rounded border mt-4">
        <h1 class="w-full text-center text-4xl font-bold">{$page.params.domain.toUpperCase()}</h1>
        <div class="grid grid-cols-4 mt-4 gap-y-4">
            <div class="text-center">
                <p class="text-xl font-semibold">Title</p>
            </div>
            <div class="pl-6 py-5 col-span-3 rounded-t-xl border w-full text-gray-700 dark:text-gray-400 hover:bg-gray-100">
                <p class=" font-medium">
                    {requested_page.data.code.title}
                </p>
            </div>


            <div class="text-center">
                <p class="text-xl font-semibold">Text</p>
            </div>
            <div class="col-span-3 text-center overflow-hidden">
                <Accordion>
                    <AccordionItem>
                        <span class="text-gray-800" slot="header">Press here to view raw page text</span>
                        <p class="mb-2 text-gray-800 dark:text-gray-400">
                            {requested_page.data.code.text.replace(requested_page.data.code.title, '')}
                        </p>
                    </AccordionItem>
                </Accordion>
            </div>

            <div class="text-center">
                <p class="text-xl font-semibold">Source Code</p>
            </div>
            <div class="col-span-3 text-center overflow-hidden">
                <Accordion>
                    <AccordionItem>
                        <span class="text-gray-800" slot="header">Press here to view raw page source code</span>
                        <div class="mb-2 text-gray-800 dark:text-gray-400 text-left">
                            <pre>
                                <p>
                                    {requested_page.data.code.html}
                                </p>
                            </pre>
                        </div>
                    </AccordionItem>
                </Accordion>
            </div>

            <div class="text-center">
                <p class="text-xl font-semibold">Links</p>
            </div>
            <div class="col-span-3 text-center overflow-hidden">
                <Accordion>
                    <AccordionItem>
                        <span class="text-gray-800" slot="header">External Links</span>
                        <div class="mb-2 text-gray-800 dark:text-gray-400">
                            <ul class="list-disc">
                                {#each requested_page.data.links.external as link, i}
                                    <li class:bg-gray-200={i % 2 !== 0} class="rounded overflow-hidden">
                                        <div>
                                            <div id="link-ext-{i}" class="py-2">{truncate(link, 45)}</div>
                                            <Popover class="w-96 text-sm font-light " title="Full Link" triggeredBy="#link-ext-{i}">
                                                {link}
                                            </Popover>

                                        </div>

                                    </li>
                                {/each}
                            </ul>

                        </div>
                    </AccordionItem>
                    <AccordionItem>
                        <span class="text-gray-800" slot="header">Internal Links</span>
                        <div class="mb-2 text-gray-800 dark:text-gray-400">
                            <ul class="list-none">
                                {#each requested_page.data.links.internal as link, i}
                                    <li class:bg-gray-200={i % 2 !== 0} class="rounded overflow-hidden">
                                        <div>
                                            <div id="link-int-{i}" class="py-2">{truncate(link, 45)}</div>
                                            <Popover class="w-96 text-sm font-light " title="Full Link" triggeredBy="#link-int-{i}">
                                                {requested_page.data.url + link}
                                            </Popover>

                                        </div>

                                    </li>
                                {/each}
                            </ul>

                        </div>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    </div>
{:else if (requested_page.available === 0)}
    <UserView>
        <CardView slot="content">
            <div class="">
                <p>The requested page has not yet been scraped. You can request a new scrape by pressing the button below.</p>
                <div class="flex justify-center w-full mt-3">
                    <RequestNewScrape class="" domain={$page.params.domain} ></RequestNewScrape>
                </div>
            </div>
        </CardView>
        <div slot="errorNotice">
            <p>The requested page has not yet been scraped. Only authenticated users can request to scrape a page.</p>
        </div>
    </UserView>
{:else if (requested_page.available === 2)}
    <UserView>
        <CardView slot="content">
            <div class="">
                <p>The requested page was offline during the last scrape attempt. You can request a new try by pressing the button below.</p>
                <div class="flex justify-center w-full mt-3">
                    <RequestNewScrape class="" domain={$page.params.domain} ></RequestNewScrape>
                </div>
            </div>
        </CardView>
        <div slot="errorNotice">
            <p>The requested page was offline during the last scrape attempt. Please sign in if you believe it is online to submit a new scrape request. </p>
        </div>
    </UserView>


{/if}