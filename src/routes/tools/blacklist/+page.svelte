<script>
    import {Input, Button, Spinner, Progressbar, Breadcrumb, BreadcrumbItem} from "flowbite-svelte";

    let loading = {
        blacklistCheck: false
    };

    let inputDomain = null;
</script>
<Breadcrumb aria-label="Default breadcrumb example" solid>
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/tools">Tools</BreadcrumbItem>
    <BreadcrumbItem href="/tools/blacklist">Blacklist</BreadcrumbItem>
</Breadcrumb>
<h1 class="text-3xl font-bold mt-4 mb-2">ScamScan Blacklist Check</h1>


<div class='my-6'>
    <Input bind:value={inputDomain} placeholder="domain.tld" />
    <Button on:click={() => window.location = `/tools/blacklist/${inputDomain}`} class="mt-2">
        Check Domain
    </Button>
</div>
