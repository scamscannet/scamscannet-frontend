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
    import prettify from 'html-prettify';
    import UserView from "../../../_components/UserView.svelte";
    import RequestNewScrape from "./_components/RequestNewScrape.svelte";

    let loading = true;
    let requested_page = {
        data: {},
        available: 1 // 0 => No Report, 1 => Available, 2=> Website offline
    }
    fetch("https://registry.scamscan.net/data/get?url=" + $page.params.domain)
        .then(response => response.json())
        .then(data => {
            requested_page.data = data;
            loading = false;
        }).catch(error => {
        console.log(error);
    });

    function truncate(str, n){
        return (str.length > n) ? str.slice(0, n-1) + '...' : str;
    };
</script>
<Breadcrumb aria-label="Default breadcrumb example" solid>
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/tools">Tools</BreadcrumbItem>
    <BreadcrumbItem href="/tools/registry">Registry</BreadcrumbItem>
    <BreadcrumbItem>{$page.params.domain.toUpperCase()}</BreadcrumbItem>
</Breadcrumb>

<div class="w-full flex justify-center rounded overflow-hidden mt-4 ">
    <img class=" w-4/5" src={"https://registry.scamscan.net/data/get-image?url=" + $page.params.domain}>
</div>
<UserView>
    <div class="w-full flex justify-center pt-6 pb-2" slot="content">
        <RequestNewScrape domain={$page.params.domain} ></RequestNewScrape>
    </div>
</UserView>
{#if loading}
    <div class="w-full flex justify-center mt-8">
        <Spinner></Spinner>

    </div>
{:else }
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
                        <div class="mb-2 text-gray-800 dark:text-gray-400">
                            <pre>
                                <code>
                                    {prettify(requested_page.data.code.html)}
                                </code>
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
{/if}