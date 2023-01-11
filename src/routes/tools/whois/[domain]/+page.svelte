<script>
    import {onMount} from "svelte";
    import {CLIENTS, makeApiRequest} from "$lib/client/request";
    import {APIS, PATHS} from "$lib/client/apis";
    import {page} from "$app/stores";
    import LoadingView from "../../../_components/LoadingView.svelte";
    import {
        Accordion,
        AccordionItem,
        Breadcrumb,
        BreadcrumbItem,
        Card,
        Modal, Table, TableBody,
        TableBodyCell,
        TableBodyRow, TableHead, TableHeadCell
    } from "flowbite-svelte";

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
        })

    })

    function capitalize(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
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
    {#if result.parsed.registrar.name}
        <div class="grid grid-cols-4 mb-4 gap-4">
            <Card>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Registrar</h5>
                <a target="_blank" href="{result.parsed.registrar.url}" class="font-normal text-lg text-gray-700 dark:text-gray-400 leading-tight">
                    {result.parsed.registrar.name}
                </a>
            </Card>
            <Card>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Registration Date</h5>
                <p class="font-normal text-lg text-gray-700 dark:text-gray-400 leading-tight">
                    {new Date(Date.parse(result.parsed.date.registration_date)).toLocaleDateString()}
                </p>
            </Card>
            <Card>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Expiration Date</h5>
                <p class="font-normal text-lg text-gray-700 dark:text-gray-400 leading-tight">
                    {result.parsed.date.expiration_date ? new Date(Date.parse(result.parsed.date.expiration_date)).toLocaleDateString() : "No expiration"}
                </p>
            </Card>
            <Card>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Abuse Contact</h5>
                <a href="mailto:{result.parsed.registrar.abuse_mail}" class="font-normal text-lg text-gray-700 dark:text-gray-400 leading-tight">
                    {result.parsed.registrar.abuse_mail}
                </a>
            </Card>
        </div>
        {#each result.parsed.contact as contact}
        <div class="border overflow-hidden rounded-lg mb-4">
                <Table striped={true}>
                    <TableHead>
                        <TableHeadCell>{contact.type}</TableHeadCell>
                        <TableHeadCell>Contact</TableHeadCell>
                    </TableHead>
                    <TableBody class="divide-y">
                        {#each Object.entries(contact) as [title, value] }
                            {#if title && title !== "type" && value}
                                <TableBodyRow>
                                    <TableBodyCell>{capitalize(title).replace("-", "")}</TableBodyCell>
                                    <TableBodyCell>{value}</TableBodyCell>
                                </TableBodyRow>
                            {/if}
                        {/each}
                    </TableBody>
                </Table>
            </div>
        {/each}




    {/if}
    <Accordion>
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