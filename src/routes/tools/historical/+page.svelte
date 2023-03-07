<script>
    import {
        Breadcrumb,
        BreadcrumbItem,
        Button,
        Checkbox,
        Input, Table, TableBody,
        TableBodyCell,
        TableBodyRow, TableHead,
        TableHeadCell
    } from "flowbite-svelte";
    import CardView from "../../_components/CardView.svelte";
    import {requestDomainNameScore} from "../../../hook/tools/historical";
    import {STATUS} from "$lib/constants";
    import LoadingView from "../../_components/LoadingView.svelte";
    import {historicalRequestStatus, historicalResults} from "../../../store/tools/historical";

    let inputDomain;
    let days;
    let exactMatch = true;
    console
    async function search(event){
        await requestDomainNameScore(inputDomain.toLowerCase(), exactMatch);
    }


</script>
<Breadcrumb aria-label="Breadcrumb" solid>
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/tools">Tools</BreadcrumbItem>
    <BreadcrumbItem href="/tools/registry">Historical</BreadcrumbItem>
</Breadcrumb>
<h1 class="text-3xl font-bold mt-4 mb-2">ScamScan Historical Domains</h1>
<CardView>
    <div class="flex flex-col mx-auto w-full md:w-4/5 xl:w-2/3">
        <h3 class="text-xl font-bold">About the ScamScan Historical Domain Lookup</h3>
        <p>The historical domain lookup allows you to search through the domains registered in the last weeks. This can help you to monitor a brand and find fraudulent domains before they go live. THe results are limited to ten entries. If you need better scanning abilities please contact us for a custom plan.</p>
    </div>
</CardView>
<div class='my-6'>
    <Input bind:value={inputDomain} placeholder="domain.tld"/>
    <Checkbox class="mt-2" bind:checked={exactMatch}>Exact match</Checkbox>
    <div class="flex justify-between">
        <Button on:click={search} class="mt-2" disabled={inputDomain === null}>
            Check Domain
        </Button>
    </div>

</div>

{#if $historicalRequestStatus === STATUS.LOADING}
    <LoadingView></LoadingView>
{:else if $historicalRequestStatus === STATUS.COMPLETED}
    <div class="rounded-lg border border-lg w-full py-4 my-4 px-4">
        {#if $historicalResults.length >= 1}
            <Table striped={true} class="min-w-full">
                <TableHead>
                    <TableHeadCell>Domain</TableHeadCell>
                    <TableHeadCell>Discovered</TableHeadCell>
                    <TableHeadCell>
                        <span class="sr-only"> View </span>
                    </TableHeadCell>
                </TableHead>
                <TableBody class="divide-y">
                    {#each $historicalResults as result}
                        <TableBodyRow>
                            <TableBodyCell>{result.full_domain}</TableBodyCell>
                            <TableBodyCell>{new Date(Date.parse(result.discovered)).toLocaleDateString()}</TableBodyCell>
                            <TableBodyCell>
                                <a href="/tools/registry/{result.full_domain}" class="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                    View
                                </a>
                            </TableBodyCell>
                        </TableBodyRow>
                    {/each}
                </TableBody>
            </Table>

        {:else }
            <p>No Results found!</p>
        {/if}
    </div>

    {:else if $historicalRequestStatus === STATUS.ERROR}
        <CardView>A error occurred!</CardView>

{/if}
