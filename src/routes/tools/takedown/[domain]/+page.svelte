<script>
    import {Activity, ActivityItem, Breadcrumb, BreadcrumbItem, Button, Timeline, TimelineItem} from 'flowbite-svelte';
    import {page} from "$app/stores";
    import CardView from "../../../_components/CardView.svelte";
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
<CardView>
    <Timeline>
        <TimelineItem title="Report Created" date="February">
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                A report for {$page.params.domain.toLowerCase()} has been created and is now in review.
            </p>
            <Button color="alternative"
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
        <TimelineItem title="Report verified" date="March 2022">
            <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                The report has been reviewed and the website is a confirmed scam. We are now gathering the evidence to make the report.
            </p>
        </TimelineItem>
        <TimelineItem title="Abuse report created" date="April 2022">
            <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                A abuse report has been opened with the hosting provider.
            </p>
        </TimelineItem>
        <TimelineItem title="Case closed | Website removed" date="April 2022">
            <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                The abuse report has been processed and the website is not available anymore. The process is now completed.
            </p>
        </TimelineItem>
    </Timeline>
</CardView>
