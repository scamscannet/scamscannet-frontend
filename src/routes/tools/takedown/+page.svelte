<script>
    import {Breadcrumb, BreadcrumbItem, Button, Input} from "flowbite-svelte";
    import DomainInputForm from "../_components/DomainInputForm.svelte";
    import CardView from "../../_components/CardView.svelte";
    import {reportsList} from "../../../store/tools/report";
    import {onMount} from "svelte";
    import {requestAllReports} from "../../../hook/tools/report";
    import LoadingView from "../../_components/LoadingView.svelte";

    onMount(async () => {
        await requestAllReports();
    })
</script>
<Breadcrumb aria-label="Breadcrumb" solid>
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/tools">Tools</BreadcrumbItem>
    <BreadcrumbItem href="/tools/takedown">Takedown</BreadcrumbItem>
</Breadcrumb>
<h1 class="text-3xl font-bold mt-4 mb-2">ScamScan Domain Takedown</h1>
<CardView>
    <p>The ScamScan domain takedown is a transparent way to track our efforts to shut down fraudulent websites.
        We cover the whole workflow from the first report to the abuse request with the provider and describe each step here on the website.
        Every domain that is reported and identified as scam will automatically trigger a takedown attempt. Unfortunately, we can't guarantee the success as the outcome depends on the hosting provider/registrar.</p>
</CardView>
<DomainInputForm redirectURL="/tools/takedown/" ></DomainInputForm>
<h2 class="text-2xl font-bold mt-4">Pending Reports</h2>
{#if $reportsList === undefined}
    <LoadingView></LoadingView>

{:else }
    <div class="mt-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {#each $reportsList as report }
            <div class="rounded shadow text-center p-3 hover:text-blue-500 cursor-pointer">
                <a href="/tools/takedown/{report}">{report}</a>
            </div>
        {/each}
    </div>
{/if}

