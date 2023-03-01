<script>
    import {Alert, Button, Card, Input, Label} from "flowbite-svelte";
    import DomainWithSuggestionInput from "./_components/DomainWithSuggestionInput.svelte";
    import CardView from "./_components/CardView.svelte";
    import {CLIENTS, makeApiRequest} from "$lib/client/request";
    import {APIS, PATHS} from "$lib/client/apis";
    import {is_domain} from "$lib/checks";

    let reportDomainInput;
    let status;
    async function reportPage(){
        let response = await makeApiRequest(
            CLIENTS.POST,
            APIS.blacklist,
            PATHS.blacklist.report.new + reportDomainInput,
            {},
            {}
        )
        let data = response.content;
        if('status' in data && data.status === 'success'){
            status = 'success';
            reportDomainInput = '';
        } else {
            status = 'error';
        }

    }

</script>

<div style="height: 560px" class="relative w-full h-96">
    <div class="h-full rounded overflow-hidden absolute w-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="min-h-full lg:h-auto lg:min-w-full" preserveAspectRatio="none" viewBox="0 0 1440 560">
            <g mask="url(&quot;#SvgjsMask1021&quot;)" fill="none">
                <rect width="1440" height="560" x="0" y="0" fill="#0e2a47"></rect>
                <path d="M107 308L106 692" stroke-width="6" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M706 438L705 135" stroke-width="8" stroke="url(#SvgjsLinearGradient1023)" stroke-linecap="round" class="Down"></path>
                <path d="M862 38L861 204" stroke-width="8" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M1392 450L1391 635" stroke-width="6" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M296 363L295 691" stroke-width="6" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M619 343L618 535" stroke-width="10" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M829 532L828 712" stroke-width="6" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M556 89L555 301" stroke-width="6" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M1349 354L1348 555" stroke-width="10" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M1129 415L1128 170" stroke-width="6" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M131 448L130 612" stroke-width="8" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M356 1L355 -373" stroke-width="10" stroke="url(#SvgjsLinearGradient1023)" stroke-linecap="round" class="Down"></path>
                <path d="M1071 238L1070 596" stroke-width="6" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M380 39L379 287" stroke-width="10" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M899 339L898 530" stroke-width="6" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M645 157L644 455" stroke-width="8" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M1332 256L1331 542" stroke-width="10" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M843 144L842 -90" stroke-width="10" stroke="url(#SvgjsLinearGradient1023)" stroke-linecap="round" class="Down"></path>
                <path d="M275 463L274 78" stroke-width="6" stroke="url(#SvgjsLinearGradient1023)" stroke-linecap="round" class="Down"></path>
                <path d="M755 226L754 -192" stroke-width="8" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M1313 125L1312 303" stroke-width="10" stroke="url(#SvgjsLinearGradient1023)" stroke-linecap="round" class="Down"></path>
                <path d="M1121 244L1120 -29" stroke-width="6" stroke="url(#SvgjsLinearGradient1023)" stroke-linecap="round" class="Down"></path>
                <path d="M434 519L433 821" stroke-width="6" stroke="url(#SvgjsLinearGradient1023)" stroke-linecap="round" class="Down"></path>
                <path d="M223 539L222 289" stroke-width="8" stroke="url(#SvgjsLinearGradient1023)" stroke-linecap="round" class="Down"></path>
                <path d="M1358 213L1357 615" stroke-width="10" stroke="url(#SvgjsLinearGradient1023)" stroke-linecap="round" class="Down"></path>
                <path d="M886 514L885 308" stroke-width="8" stroke="url(#SvgjsLinearGradient1023)" stroke-linecap="round" class="Down"></path>
                <path d="M175 155L174 -176" stroke-width="10" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M860 179L859 507" stroke-width="8" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M252 349L251 80" stroke-width="8" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M39 12L38 -314" stroke-width="6" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
                <path d="M309 148L308 323" stroke-width="6" stroke="url(#SvgjsLinearGradient1023)" stroke-linecap="round" class="Down"></path>
                <path d="M983 355L982 87" stroke-width="6" stroke="url(#SvgjsLinearGradient1023)" stroke-linecap="round" class="Down"></path>
                <path d="M1126 195L1125 547" stroke-width="8" stroke="url(#SvgjsLinearGradient1023)" stroke-linecap="round" class="Down"></path>
                <path d="M1250 518L1249 727" stroke-width="10" stroke="url(#SvgjsLinearGradient1023)" stroke-linecap="round" class="Down"></path>
                <path d="M520 4L519 302" stroke-width="8" stroke="url(#SvgjsLinearGradient1023)" stroke-linecap="round" class="Down"></path>
                <path d="M376 460L375 165" stroke-width="6" stroke="url(#SvgjsLinearGradient1022)" stroke-linecap="round" class="Up"></path>
            </g>
            <defs>
                <mask id="SvgjsMask1021">
                    <rect width="1440" height="560" fill="#ffffff"></rect>
                </mask>
                <linearGradient x1="0%" y1="100%" x2="0%" y2="0%" id="SvgjsLinearGradient1022">
                    <stop stop-color="rgba(28, 83, 142, 0)" offset="0"></stop>
                    <stop stop-color="#1c538e" offset="1"></stop>
                </linearGradient>
                <linearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="SvgjsLinearGradient1023">
                    <stop stop-color="rgba(28, 83, 142, 0)" offset="0"></stop>
                    <stop stop-color="#1c538e" offset="1"></stop>
                </linearGradient>
            </defs>
        </svg>
    </div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-100 text-center">
        <h1 class="font-bold text-4xl">ScamScan <br> Find the fraud before it happens</h1>
    </div>
</div>
<h2 class="text-3xl font-bold mt-8 mb-2">The ScamScan Scam Check</h2>
<div class="w-full flex flex-col items-center">
    <CardView>
        It can be hard to spot whether a page is a scam or not.
        Our automated scam check will help you to find out if a you can trust a website.<br>
        Simply enter the domain and we will provide you with all the informations we have about the website you are looking for.

    </CardView>
    <DomainWithSuggestionInput></DomainWithSuggestionInput>
</div>

<h3 class="text-3xl font-bold mt-8 mb-2">Tools</h3>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <Card href="/tools/whois">
        <h4 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Domain & IP Whois</h4>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
            Lookup domain and ip data through the whois protocol.
        </p>
    </Card>
    <Card href="/tools/registry">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Registry</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
            The registry contains all data we scraped about websites.
        </p>
    </Card>
    <Card href="/tools/blacklist">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Blacklist</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
            Access our domain blacklist with all known scam domains we are aware of.
        </p>
    </Card>
    <Card href="/tools/ip">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">IP</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
            Search data according to ips such as location, AS, or ip nets.
        </p>
    </Card>
    <Card href="/tools/takedown">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Takedown Tracker</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
            Track our progress in taking down websites after we identified them as fraud.
        </p>
    </Card>
</div>
<h3 class="text-3xl font-bold mt-8 mb-2">Report Website</h3>
{#if status === 'success'}
    <Alert dismissable color="green" >Your report was successful and will be reviewed by us as soon as possible.</Alert>
{:else if status !== undefined}
    <Alert dismissable color="yellow" >Something went wrong. Please contact us if this error keeps appearing.</Alert>

{/if}
<form>
    <div class='mb-6'>
        <Label for='default-input' class='block mb-2'></Label>
        <Input bind:value={reportDomainInput} id='default-input' placeholder="domain.tld" />
    </div>
    {#if is_domain(reportDomainInput)}
        <Button on:click={reportPage}>Report</Button>
    {:else }
        <Button on:click={reportPage} disabled>Please enter a valid domain</Button>
    {/if}
</form>