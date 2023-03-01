<script>
    /** Views **/
    import CardView from "../../_components/CardView.svelte";
    import {Breadcrumb, BreadcrumbItem, Button, Card, Spinner} from "flowbite-svelte";
    import InfoCard from "../_components/InfoCard.svelte";
    import DomainWithSuggestionInput from "../../_components/DomainWithSuggestionInput.svelte";
    import LoadingView from "../../_components/LoadingView.svelte";
    import UserView from "../../_components/UserView.svelte";
    import RequestNewScrape from "../../tools/registry/[domain]/_components/RequestNewScrape.svelte";
    import WebsiteOfflineView from "../../_components/websites/WebsiteOfflineView.svelte";


    import {page} from "$app/stores";
    import {onMount} from "svelte";
    import {requestPageWhoisData} from "../../../hook/tools/whois";
    import {whoisData, whoisStatus} from "../../../store/tools/whois";
    import {blacklistStatus} from "../../../store/tools/blacklist";
    import {dateDifferenceToNow, dateDifferenceAsString} from "$lib/converter/date";
    import {requestBlacklistStatus, requestDomainNameScore, requestWebsiteScore} from "../../../hook/tools/blacklist";
    import {ipData, ipStatus} from "../../../store/tools/ip";
    import {requestIpData} from "../../../hook/tools/ip_lookup";
    import {requestPageData} from "../../../hook/tools/registry";
    import {pageData} from "../../../store/tools/registry";
    import countryCodeToFlagEmoji from "country-code-to-flag-emoji";
    import * as iso from "iso-3166-1";
    import {domainScamScore, pageScamScore} from "../../../store/tools/blacklist";

    let ip = null;
    let scraped = undefined;
    let offline = false;
    onMount(async () => {
        await requestPageWhoisData($page.params.domain);
        await requestBlacklistStatus($page.params.domain);
        await requestDomainNameScore($page.params.domain);
        await requestPageData($page.params.domain);

        // Check if website has been scraped yet
        if (Object.entries($pageData).length !== 0 && $pageData.constructor === Object) {
            scraped = true;
            offline = $pageData.offline;

            if (!offline) {
                await requestWebsiteScore($page.params.domain);
                try {
                    ip = $pageData.server.ip;
                    await requestIpData(ip);

                } catch (e) {
                    console.log("Error while parsing IP")
                }

            }
        } else {
            scraped = false;
        }


    })
</script>
<svelte:head>
    <title>{$page.params.domain} Website Report | ScamScan</title>
    <meta property="description"
          content="You want to know if you can trust {$page.params.domain}? Then we can help you with your own personal assessment by providing you with different informations concerning {$page.params.domain}!"/>
</svelte:head>

<Breadcrumb aria-label="Breadcrumb" solid>
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/check">Scam Check</BreadcrumbItem>
    <BreadcrumbItem href="/check/{$page.params.domain}">{$page.params.domain.toUpperCase()}</BreadcrumbItem>
</Breadcrumb>

<div class="flex flex-col lg:flex-row justify-between py-4">
    <h1 class="font-bold text-2xl w-full lg:w-1/4 my-auto ">Is {$page.params.domain} a scam?</h1>
    <div class=" w-full z-20 w-full lg:w-3/4 mt-4 lg:mt-0">
        <DomainWithSuggestionInput suggestionHover={true}></DomainWithSuggestionInput>
    </div>
</div>
{#if scraped === false}
    <UserView>
        <CardView slot="content">
            <div class="">
                <p>The requested page has not yet been scraped. You can request a new scrape by pressing the button
                    below.</p>
                <div class="flex justify-center w-full mt-3">
                    <RequestNewScrape class="" domain={$page.params.domain}></RequestNewScrape>
                </div>
            </div>
        </CardView>
        <div slot="errorNotice">
            <p>The requested page has not yet been scraped. Only authenticated users can request to scrape a page.</p>
        </div>
    </UserView>
{:else if scraped === undefined}
    <LoadingView></LoadingView>
{:else if offline}
    <WebsiteOfflineView domain={$page.params.domain}></WebsiteOfflineView>
{:else }
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
        <div class="md:col-span-3">
            <div class="flex justify-center rounded-lg border border-lg w-full h-full py-4 px-4">
                <div class="">
                    <h3 class="text-xl font-bold">AI Ratings</h3>
                    <p>We developed AIs to automatically analyse gathered information to determine whether a domain is
                        scam or not. These scores are useful in addition to the overall picture but you shouldn't base
                        your whole judgment on these two scores.</p>
                    {#if $pageScamScore !== 0 && $domainScamScore !== 0}
                        <h3 class="mt-4 font-bold">Web Page Analysis</h3>
                        <div class="w-full bg-gray-200 rounded-full">
                            <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-2 leading-none rounded-full"
                                 style="width: {Math.round($pageScamScore * 10000) / 100}%"

                                 class:bg-red-700={$pageScamScore > 0.75}
                                 class:bg-green-400={$pageScamScore < 0.5}
                                 class:bg-yellow-400={0.75 >= $pageScamScore >= 0.5}

                            > {Math.round($pageScamScore * 10000) / 100}%
                            </div>
                        </div>
                        <h3 class="mt-2 font-bold">Domain Name</h3>
                        <div class="w-full bg-gray-200 rounded-full">
                            <div class="bg-blue-600 text-xs font-medium text-blue-50 text-center p-2 leading-none rounded-full"
                                 style="width: {Math.round($domainScamScore * 10000) / 100}%"
                                 class:bg-red-700={$domainScamScore > 0.75}
                                 class:bg-green-400={$domainScamScore < 0.5}
                                 class:bg-yellow-400={0.75 >= $domainScamScore >= 0.5}

                            > {Math.round($domainScamScore * 10000) / 100}%

                            </div>
                        </div>
                    {:else }
                        <div class="flex justify-center h-36 w-full items-center">
                            <Spinner></Spinner>
                        </div>
                    {/if}

                </div>
            </div>
        </div>
        <div class="">
            <div class="flex justify-center rounded-lg border border-lg w-full h-full py-4 px-4">
                <div class="w-full h-full flex flex-col">
                    <h3 class="text-xl font-bold mb-4">Blacklist</h3>
                    <div class="w-full h-36 flex flex-col items-center">
                        {#if $blacklistStatus === 0}
                            <div class="w-36 h-36 flex justify-center ">
                                <div class="my-auto">
                                    <Spinner></Spinner>

                                </div>
                            </div>
                        {:else }
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor"
                                 class="w-36 h-36 text-yellow-400"
                                 class:text-green-700={$blacklistStatus === 2}
                                 class:text-yellow-500={$blacklistStatus === 3}
                                 class:text-red-500={$blacklistStatus === 1}
                            >
                                {#if $blacklistStatus === 1}
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"/>
                                {:else if $blacklistStatus === 2 }
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                                {:else }
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/>
                                {/if}
                            </svg>
                        {/if}
                    </div>
                    <div class="flex justify-center h-full">
                        <p class="my-auto text-lg font-bold">
                            {#if $blacklistStatus === 1}
                                Blacklisted
                            {:else if $blacklistStatus === 2 }
                                Whitelisted
                            {:else if $blacklistStatus === 0 }
                                Loading...

                            {:else }
                                Not Listed
                            {/if}

                        </p>
                    </div>

                </div>

            </div>
        </div>
    </div>
    <CardView>
        <div class="w-full">
            <h3 class="text-xl font-bold mb-4">Metrics</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoCard color="gray">
                    <div class="flex flex-col md:flex-row" slot="value">
                        {#if $whoisStatus === 0}
                            <Spinner></Spinner>
                        {:else if ($whoisStatus !== 2)}
                            <span>No Date available</span>
                        {:else }
                            <div
                                    class:text-red-500={dateDifferenceToNow($whoisData.parsed.date.registration_date) < 60}
                                    class:text-green-700={dateDifferenceToNow($whoisData.parsed.date.registration_date) < 400}>
                                <span>{$whoisData.parsed.date.registration_date}</span>
                                <span class="ml-0 md:ml-0.5">
                            ({dateDifferenceAsString($whoisData.parsed.date.registration_date)})
                        </span>
                            </div>
                        {/if}
                    </div>
                    <div slot="description">Domain Age</div>

                </InfoCard>
                <InfoCard>
                    <div slot="value">
                        {#if $whoisStatus === 0}
                            <Spinner></Spinner>
                        {:else if ($whoisStatus !== 2)}
                            <span>No Date available</span>
                        {:else }
                            {$whoisData.parsed.registrar.name}
                        {/if}
                    </div>
                    <div slot="description">Registrar</div>
                </InfoCard>
                <InfoCard>
                    <div slot="value">
                        {#if $ipStatus === 0}
                            <Spinner></Spinner>
                        {:else if ($ipStatus !== 2)}
                            <span>No Data available</span>
                        {:else }
                            {countryCodeToFlagEmoji(iso.whereAlpha3($ipData.parsed.addresses[0].country).alpha2)} {iso.whereAlpha3($ipData.parsed.addresses[0].country).country}
                        {/if}
                    </div>
                    <div slot="description">Server Location</div>
                </InfoCard>
            </div>

        </div>

    </CardView>
    <CardView>
        <div class="w-full">
            <h3 class="text-xl font-bold mb-4">Screenshot</h3>
            <img class="mx-auto" src="https://registry.scamscan.net/data/get-image?url={$page.params.domain}"
                 alt="{$page.params.domain} screenshot">
        </div>
    </CardView>
    <CardView>
        <div class="w-full">
            <h3 class="text-xl font-bold mb-4">More Informations</h3>
            <div class="grid grid-cols-3 gap-4">
                <Button href="/tools/whois/{$page.params.domain}">
                    Domain Whois
                </Button>
                <Button href="/tools/whois/{ip}" disabled={ip === null}>
                    IP Whois
                </Button>
                <Button href="/tools/registry/{$page.params.domain}">
                    Website Registry
                </Button>

            </div>

        </div>

    </CardView>
    <CardView>
        <div class="flex flex-col mx-auto w-full ">
            <h3 class="text-xl font-bold">FAQ</h3>
            <h2 class="font-bold mt-2">What is all of this information telling me?</h2>
            <p>All the information here will help you to get an overall picture of {$page.params.domain}. If you hover
                with the mouse cursor over the respective fields it will also explain in more detail how you can use the
                information.</p>
            <div class="border w-3/4 mx-auto my-6"></div>
            <p class="font-bold mt-2">I want to report a fraudulent domain!</p>
            <p>We are always happy about reports of fraudulent domains as these are an important source for our
                blacklist. If you want to report {$page.params.domain} or any other website you can use the form on the
                home page to report scam domains to us! It does not matter if the displayed scam score is high or
                low.</p>
            <div class="border w-3/4 mx-auto my-6"></div>
            <h2 class="font-bold mt-2">Who runs {$page.params.domain}?</h2>
            <p>{$page.params.domain} has been registered with REGISTRAR HERE on DATE HERE. If you want to know more
                about the owner you can have a look at the Whpis request for the page. Due to privacy reasons many
                people redact the information in their Whois record which makes it very hard to be able to identify the
                real owner.</p>
        </div>
    </CardView>
{/if}
