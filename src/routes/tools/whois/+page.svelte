<script>
    import {Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
    import DomainInputForm from "../_components/DomainInputForm.svelte";



</script>
<Breadcrumb aria-label="Default breadcrumb example" solid>
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/tools">Tools</BreadcrumbItem>
    <BreadcrumbItem href="/tools/whois">Whois</BreadcrumbItem>
</Breadcrumb>
<h1 class="text-3xl font-bold mt-4 mb-2">Whois Lookup</h1>
<DomainInputForm redirectURL="/tools/whois/" ></DomainInputForm>
