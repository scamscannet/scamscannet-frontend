<script>
    import {Activity, ActivityItem, Breadcrumb, BreadcrumbItem, Button, Timeline, TimelineItem} from 'flowbite-svelte';
    import {page} from "$app/stores";
    import CardView from "../../../_components/CardView.svelte";
    import {reportStatus, reportData, abuseData, abuseStatus} from "../../../../store/tools/report.ts";
    import {requestAbuseData, requestReportData} from "../../../../hook/tools/report";
    import {onMount} from "svelte";
    import LoadingView from "../../../_components/LoadingView.svelte";
    onMount(async () => {

        await requestReportData($page.params.domain)
        if ($reportStatus > 2){
            console.log("Request data for potential takedown/abuse request")
            await requestAbuseData($page.params.domain)
        }
    })
</script>
<svelte:head>
    <meta name="description" content="The ScamScan blacklist check takes the domain name and creates a scam rating according to the name. This is the first step in our scam detection flow. The blacklist check is the first step towards detecting whether {$page.params.domain} is a scam."/>
    <title>Website Takedown {$page.params.domain}</title>

    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:title" content="{$page.params.domain} Takedown"/>
    <meta name="twitter:description" content="The ScamScam Takedown tracker tracks our efforts to block fraudulent websites."/>
</svelte:head>
<Breadcrumb aria-label="Breadcrumb" solid>
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/tools">Tools</BreadcrumbItem>
    <BreadcrumbItem href="/tools/takedown">Takedown</BreadcrumbItem>
    <BreadcrumbItem href="/tools/takedown/{$page.params.domain}">{$page.params.domain.toUpperCase()}</BreadcrumbItem>
</Breadcrumb>
<h1 class="text-3xl font-bold mt-4 mb-2">Website Takedown Tracker | {$page.params.domain.toUpperCase()}</h1>
{#if $reportStatus === 0}
    <LoadingView></LoadingView>
{:else if $reportStatus === -1}
    <CardView><p>Something went wrong</p></CardView>
{:else if $reportStatus === 1}
    <CardView>
        <div class="flex flex-col">
            <p>This website hasn't been reported yet and therefore no takedown has been initiated. If you want to report this domain press the button below.</p>
            <Button class="w-36 m-auto mt-4">Report</Button>

        </div>
    </CardView>
{:else }
<CardView>

    <Timeline>
        <TimelineItem title="Report Created" date="User -> ScamScan">
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                A report for {$page.params.domain.toLowerCase()} has been created and is now awaiting review.
            </p>
            <Button on:click={() => {window.location.replace("/check/" + $page.params.domain.toLowerCase())}} color="alternative"
            >Website report<svg
                    class="ml-2 w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
            ><path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" /></svg
            ></Button>
        </TimelineItem>
        {#if $reportStatus === 3}
        <TimelineItem title="Report verified" date="ScamScan">
            <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                The report has been reviewed and the website is a confirmed scam. We are now gathering the evidence to make the report.
            </p>
        </TimelineItem>
        {:else if ($reportStatus === 4)}
            <TimelineItem title="Report declined" date="ScamScan">
                <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                    The report has been reviewed and we weren't able to identify a scam. If you believe this is a mistake you can contact us with more proof anytime.
                </p>
            </TimelineItem>
        {/if}

        {#if $abuseStatus > 1}
            <TimelineItem title="Abuse report created" date="ScamScan -> Registrar">
                <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                    A abuse report has been opened with the hosting provider.
                </p>
            </TimelineItem>
        {/if}
        {#if $abuseStatus === 3}
            <TimelineItem title="Case closed | Website removed" date="Registrar">
                <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                    The abuse report has been processed and the website is now down. The process is now completed.
                </p>
            </TimelineItem>
        {:else if $abuseStatus === 4}
        <TimelineItem title="Abuse case declined" date="Registrar">
            <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                The abuse report has been processed but the provider has rejected the takedown request.
            </p>
        </TimelineItem>
        {/if}
    </Timeline>
</CardView>
{/if}