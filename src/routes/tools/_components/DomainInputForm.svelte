<script>
    import {Button, Input} from "flowbite-svelte";

    export let redirectURL;
    let inputDomain = null;

    function handleInput(){
        // Simulate a mouse click:
        window.location.href =  redirectURL + inputDomain.toLowerCase();

    }
</script>

<div class='my-6'>
    <Input bind:value={inputDomain} placeholder="domain.tld"/>
    <Button on:click={handleInput} class="mt-2">
        Check Domain
    </Button>
</div>