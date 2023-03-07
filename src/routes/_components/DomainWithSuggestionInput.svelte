<script lang="ts">
    import {Button, Input} from "flowbite-svelte";
    import {CLIENTS, makeApiRequest} from "$lib/client/request";
    import {APIS, PATHS} from "$lib/client/apis";

    export let suggestionHover = false;
    let domainInput: String;
    let suggestions = [];
    async function requestSuggestions() {
        let response = await makeApiRequest(
            CLIENTS.GET,
            APIS.blacklist,
            PATHS.blacklist.search.complete,
            {'query': domainInput.toLowerCase()},
            {}
        )
        suggestions = response.content.suggestions;
    }
</script>


<div class='w-full flex '>
    <Input class="rounded-r-none" bind:value={domainInput} placeholder="domain.tld" on:input={requestSuggestions}/>
    {#if !domainInput}
        <Button class="w-64 rounded-l-none" disabled>Please enter a domain</Button>
    {:else }
        <Button on:click={() => {window.location.replace("/check/" + domainInput)}} class="w-64 rounded-l-none">Check for scam</Button>
    {/if}
</div>
{#if suggestions.length > 0}
    <div class='w-full w-full mt-2 text-gray-500' class:absolute={suggestionHover}>
        <div class="flex flex-col w-full rounded-lg border overflow-hidden">
            {#each suggestions as suggestion, id}
                <button on:click={() => {window.location.replace("/check/" + suggestion.full_domain)}} class="text-left py-2 px-2 hover:bg-blue-500 hover:text-gray-50" class:bg-gray-200={id % 2} class:bg-white={!(id % 2)}>{suggestion.full_domain}</button>
            {/each}
        </div>
    </div>
{/if}
