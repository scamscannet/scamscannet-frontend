<script>
    import {Button, Input} from "flowbite-svelte";

    export let redirectURL;
    export let placeholder = "domain.tld";
    let inputDomain = null;

    function handleInput(){
        // Simulate a mouse click:
        if (inputDomain){
            window.location.href =  redirectURL + inputDomain.toLowerCase();
        }
    }

    async function insertCurrentIp(){
        let response = await fetch(
            "https://api.ipify.org?format=json"
        )
        let ipdata = await response.json();
        inputDomain = ipdata.ip;

    }
</script>

<div class='my-6'>
    <Input bind:value={inputDomain} placeholder={placeholder}/>
    <div class="flex justify-between">
        <Button on:click={handleInput} class="mt-2" disabled={inputDomain === null}>
            Check Domain or IP
        </Button>
        <Button color="green" on:click={insertCurrentIp} class="mt-2">
            Insert current IP
        </Button>
    </div>

</div>