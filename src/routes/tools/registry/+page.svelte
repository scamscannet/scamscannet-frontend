<script>
    import {Breadcrumb, BreadcrumbItem, Button, Input} from "flowbite-svelte";
    import {redirect} from "@sveltejs/kit";

    let inputDomain = null;

    function handleInput(){
        // Simulate a mouse click:
        window.location.href =  '/tools/registry/' + inputDomain.toLowerCase();

    }
</script>
<Breadcrumb aria-label="Default breadcrumb example" solid>
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/tools">Tools</BreadcrumbItem>
    <BreadcrumbItem href="/tools/registry">Registry</BreadcrumbItem>
</Breadcrumb>
<h1 class="text-3xl font-bold mt-8 mb-2">ScamScan Domain Registry</h1>
<div class='my-6'>
    <Input bind:value={inputDomain} placeholder="domain.tld"/>
    <Button on:click={handleInput} class="mt-2">
        Check Domain
    </Button>
</div>

