<script>

import {page} from "$app/stores";
import CardView from "../../_components/CardView.svelte";
import {Button, Card, Spinner} from "flowbite-svelte";
import InfoCard from "../_components/InfoCard.svelte";
import {onMount} from "svelte";
import {requestPageWhoisData} from "../../../hook/tools/whois";
import {whoisData, whoisStatus} from "../../../store/whois";
import {blacklistStatus} from "../../../store/blacklist";
import {dateDifferenceToNow, dateDifferenceAsString} from "$lib/converter/date";
import {requestBlacklistStatus} from "../../../hook/tools/blacklist";


onMount(async () => {
    await requestPageWhoisData($page.params.domain);
    await requestBlacklistStatus($page.params.domain);

})
</script>
<svelte:head>
    <title>{$page.params.domain} Website Report | ScamScan</title>
    <meta property="description" content="You want to know if you can trust {$page.params.domain}? Then we can help you with your own personal assessment by providing you with different informations concerning {$page.params.domain}!" />
</svelte:head>

<h1 class="font-bold text-2xl">Is {$page.params.domain} a scam?</h1>
<div class="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
    <div class="md:col-span-3">
        <div class="flex justify-center rounded-lg border border-lg w-full h-full py-4 mt-4 px-4">
            <div class="">
                <h3 class="text-xl font-bold">AI Ratings</h3>
                <p>We developed AIs to automatically analyse gathered information to determine whether a domain is scam or not. These scores are useful in addition to the overall picture but you shouldn't base your whole judgment on these two scores.</p>
                <h3 class="mt-4 font-bold">Web Page Analysis</h3>
                <div class="w-full bg-gray-200 rounded-full">
                    <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-2 leading-none rounded-full" style="width: 25%"> 25%</div>
                </div>
                <h3 class="mt-2 font-bold">Domain Name</h3>
                <div class="w-full bg-gray-200 rounded-full">
                    <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-2 leading-none rounded-full" style="width: 25%"> 25%</div>
                </div>

            </div>
        </div>
    </div>
    <div class="">
        <div class="flex justify-center rounded-lg border border-lg w-full h-full py-4 mt-4 px-4">
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                             class="w-36 h-36 text-yellow-400"
                             class:text-green-700={$blacklistStatus === 2}
                             class:text-yellow-500={$blacklistStatus === 3}
                             class:text-red-500={$blacklistStatus === 1}
                        >
                            {#if $blacklistStatus === 1}
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                            {:else if $blacklistStatus === 2 }
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            {:else }
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
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
                <div slot="value">Russia</div>
                <div slot="description">Server Location</div>
            </InfoCard>
        </div>

    </div>

</CardView>
<CardView>
    <div class="w-full">
        <h3 class="text-xl font-bold mb-4">Screenshot</h3>
        <img class="mx-auto" src="https://registry.scamscan.net/data/get-image?url={$page.params.domain}" alt="{$page.params.domain} screenshot">
    </div>
</CardView>
<CardView>
    <div class="w-full">
        <h3 class="text-xl font-bold mb-4">More Informations</h3>
        <div class="grid grid-cols-3 gap-4">
            <Button>
                Domain Whois
            </Button>
            <Button>
                Domain Whois
            </Button>
            <Button>
                Website Registry
            </Button>

        </div>

    </div>

</CardView>
<CardView>
    <div class="flex flex-col mx-auto w-full ">
        <h3 class="text-xl font-bold">FAQ</h3>
        <h2 class="font-bold mt-2">What is all of this information telling me?</h2>
        <p>All the information here will help you to get an overall picture of {$page.params.domain}. If you hover with the mouse cursor over the respective fields it will also explain in more detail how you can use the information.</p>
        <div class="border w-3/4 mx-auto my-6"></div>
        <p class="font-bold mt-2">I want to report a fraudulent domain!</p>
        <p>We are always happy about reports of fraudulent domains as these are an important source for our blacklist. If you want to report {$page.params.domain} or any other website you can use the form on the home page to report scam domains to us! It does not matter if the displayed scam score is high or low.</p>
        <div class="border w-3/4 mx-auto my-6"></div>
        <h2 class="font-bold mt-2">Who runs {$page.params.domain}?</h2>
        <p>{$page.params.domain} has been registered with REGISTRAR HERE on DATE HERE. If you want to know more about the owner you can have a look at the Whpis request for the page. Due to privacy reasons many people redact the information in their Whois record which makes it very hard to be able to identify the real owner.</p>




    </div>
</CardView>

