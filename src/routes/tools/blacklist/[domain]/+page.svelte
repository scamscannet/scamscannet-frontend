<script>
    import {Input, Button, Spinner, Progressbar, Breadcrumb, BreadcrumbItem} from "flowbite-svelte";
    import {onMount} from "svelte";
    import {page} from "$app/stores";

    let loading = {
        blacklistCheck: false
    };
    let inputDomain = null;
    const analysis = {
        domain: null,
        isFraud: null,
        scamScore: null
    }

    function handleInput(){
        let domainToCheck = inputDomain
        loading.blacklistCheck = true
        fetch("https://blacklist.scamscan.net/blacklist/lookup?domain=" + domainToCheck)
            .then(response => response.json())
            .then(data => {
                analysis.domain = domainToCheck;
                analysis.isFraud = !!data.blacklist;
                loading.blacklistCheck = false;
            }).catch(error => {
            console.log(error);
            loading.blacklistCheck = false;
        });
        fetch("https://blacklist.scamscan.net/score?domain=" + domainToCheck)
            .then(response => response.json())
            .then(data => {
                analysis.scamScore = data.score;
            }).catch(error => {
            console.log(error);
        });
    }

    onMount(() => {
        inputDomain = $page.params.domain;
        handleInput();
    })

</script>

<svelte:head>
    <meta name="description" content="The ScamScan blacklist check takes the domain name and creates a scam rating according to the name. This is the first step in our scam detection flow. The blacklist check is the first step towards detecting whether {inputDomain} is a scam."/>
    <title>Is {inputDomain} a scam?</title>

    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:title" content="Is {inputDomain} a scam?"/>
    <meta name="twitter:description" content="The ScamScan blacklist check takes the domain name and creates a scam rating according to the name."/>
</svelte:head>
<Breadcrumb aria-label="Default breadcrumb example" solid>
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/tools">Tools</BreadcrumbItem>
    <BreadcrumbItem href="/tools/blacklist">Blacklist</BreadcrumbItem>
    <BreadcrumbItem href="/tools/blacklist/{$page.params.domain}">{$page.params.domain.toUpperCase()}</BreadcrumbItem>
</Breadcrumb>
<h1 class="text-3xl font-bold mt-4 mb-2">ScamScan Blacklist Check</h1>


<div class='my-6'>
    <Input bind:value={inputDomain} placeholder="domain.tld" />
    <Button on:click={() => window.location = `/tools/blacklist/${inputDomain}`} class="mt-2">
        Check Domain
    </Button>
</div>
{#if loading.blacklistCheck}
    <div class="flex flex-col items-center border py-6">
        <Spinner />
    </div>
{:else if analysis.domain}


    <div class="flex flex-col items-center border py-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class:text-yellow-400={!analysis.isFraud} class:text-red-500={analysis.isFraud} class="w-36 h-36">
            {#if !analysis.isFraud}
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            {:else }
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            {/if}
                </svg>


        <h2 class="font-bold text-3xl text-center">{analysis.domain.toUpperCase()}<br> is {analysis.isFraud ? '' : 'not'} blacklisted</h2>

        <div class="w-4/5 md:w-1/2 lg:w-2/5 mx-10 mx-8">
            {#if analysis.scamScore === null}
                <div class="flex justify-center w-full">
                    <Spinner />
                </div>

            {:else }
                <div class="flex justify-between w-full text-2xl font-semibold">
                    <h4>AI scam score</h4>
                    <p>{Math.round(analysis.scamScore * 10000) / 100}%</p>
                </div>
                <Progressbar  progress={analysis.scamScore * 100}></Progressbar>
            {/if}
        </div>

        <Button href={"/tools/registry/" + $page.params.domain} class="mt-6">Get more informations by visiting our {analysis.domain} page report -></Button>
    </div>

{/if}

