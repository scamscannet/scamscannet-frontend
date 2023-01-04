<script>
    import { page } from '$app/stores';
    import {Accordion, AccordionItem, Breadcrumb, BreadcrumbItem, Card, Spinner} from "flowbite-svelte";
    import prettify from 'html-prettify';

    let loading = true;
    let requested_page = {
        data: {},
        available: 1 // 0 => No Report, 1 => Available, 2=> Website offline
    }
    fetch("https://registry.scamscan.net/data/get?domain=" + $page.params.domain)
        .then(response => response.json())
        .then(data => {
            requested_page.data = data;
            loading = false;
        }).catch(error => {
        console.log(error);
    });

</script>
<Breadcrumb aria-label="Default breadcrumb example" solid>
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/tools">Tools</BreadcrumbItem>
    <BreadcrumbItem href="/tools/registry">Registry</BreadcrumbItem>
    <BreadcrumbItem>{$page.params.domain.toUpperCase()}</BreadcrumbItem>
</Breadcrumb>

<div class="w-full flex justify-center rounded overflow-hidden mt-4 ">
    <img class=" w-4/5" src={"https://registry.scamscan.net/data/get-image?domain=" + $page.params.domain}>
</div>
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
            <div class="col-span-3 text-center">
                {requested_page.data.code.title}
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
        </div>
    </div>
{/if}