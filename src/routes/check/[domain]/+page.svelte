<script>

import {page} from "$app/stores";
import CardView from "../../_components/CardView.svelte";
import {Button, Card} from "flowbite-svelte";
</script>

<h1 class="font-bold text-2xl">Is {$page.params.domain} a scam?</h1>
<CardView>
    <div class="w-full">
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
</CardView>
<CardView>
    <div class="w-full">
        <h3 class="text-xl font-bold mb-4">Blacklist</h3>
        <div class="w-full flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-36 h-36 text-yellow-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>

        </div>
    </div>

</CardView>
<CardView>
    <div class="w-full">
        <h3 class="text-xl font-bold mb-4">Metrics</h3>
        <div class="grid grid-cols-3 gap-4">
            <Card>
                <p class="text-red-700 text-lg">17.02.2022</p>
                <p>Domain age</p>
            </Card>
            <Card>
                <p class="text-gray-900 text-lg">Cloudflare</p>
                <p>Registrar</p>
            </Card>

            <Card>
                <p class="text-gray-900 text-lg">Russia</p>
                <p>Server Location</p>

            </Card>

        </div>

    </div>

</CardView>
<CardView>
    <div class="w-full">
        <h3 class="text-xl font-bold mb-4">Screenshot</h3>
        <img class="" src="https://registry.scamscan.net/data/get-image?url=osmosis.cx" alt="{$page.params.domain} screenshot">
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
                Server IP Whois
            </Button>

        </div>

    </div>

</CardView>
