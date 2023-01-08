<script>
    import {onMount} from "svelte";
    import {Button} from "flowbite-svelte";
    let url;
    const isValidUrl = urlString=> {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
            '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
        return !!urlPattern.test(urlString);
    }
    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);

        if(!urlParams.has('url') && isValidUrl(urlParams.get('url'))){
            window.location = "/";
        }
        url = urlParams.get('url');
    })
</script>
<div class="flex-col items-center w-full rounded-lg py-6 px-4 shadow text-center">
    <div class="flex justify-center w-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-48 h-48 text-yellow-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
    </div>
    <h2 class="text-3xl font-bold">You are leaving ScamScan.net</h2>
    <p>Given the nature of the links we are displaying on scamscan.net it is possible that you will be redirected to a fraudulent page.</p>
    <p>We strongly recommend you to be aware of the link you are now going to visit. Feel free to use our tools such as the blacklist or the domain registry at any time.</p>

    {#if (url)}
        <div class="py-4 px-2 rounded-lg w-96 md:w-1/3 border my-2 font-semibold mx-auto" >
            Link you will be taken to:<br/>{url}
        </div>
        <div class="flex justify-center w-full">
            <Button href={url} class="w-18">Continue</Button>
            <Button href="/" color="red" class="ml-4 px-6">Cancel</Button>
        </div>
    {/if}
</div>