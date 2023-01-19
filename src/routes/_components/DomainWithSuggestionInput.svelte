<script lang="ts">
    import CardView from "./CardView.svelte";
    import {Button, Input} from "flowbite-svelte";
    import {CLIENTS, makeApiRequest} from "$lib/client/request";
    import {APIS, PATHS} from "$lib/client/apis";

    let domainInput: String;
    let suggestions = [];
    async function requestSuggestions() {
        let response = await makeApiRequest(
            CLIENTS.GET,
            APIS.blacklist,
            PATHS.blacklist.search.complete,
            {'query': domainInput},
            {}
        )
        suggestions = response.content.suggestions;
        console.log(suggestions);
    }
</script>


<div class='w-full flex '>
    <Input class="rounded-r-none" bind:value={domainInput} placeholder="domain.tld" on:input={requestSuggestions}/>
    {#if !domainInput}
        <Button class="w-64 rounded-l-none" disabled>Please enter a domain</Button>
    {:else }
        <Button class="w-64 rounded-l-none">Check for scam</Button>
    {/if}
</div>
{#if suggestions.length > 0}
    <div class='w-full w-full mt-2 text-gray-500'>
        <div class="flex flex-col w-full rounded-lg border overflow-hidden">
            {#each suggestions as suggestion, id}
                <a href="/insight/{suggestion.full_domain}" class="py-2 px-2 hover:bg-blue-500 hover:text-gray-50" class:bg-gray-200={id % 2}>{suggestion.full_domain}</a>
            {/each}
        </div>
    </div>
{/if}
