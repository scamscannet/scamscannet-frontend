<script>
    import {Breadcrumb, BreadcrumbItem, Button, Input} from "flowbite-svelte";
    import DomainInputForm from "../_components/DomainInputForm.svelte";

</script>
<Breadcrumb aria-label="Breadcrumb" solid>
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/tools">Tools</BreadcrumbItem>
    <BreadcrumbItem href="/tools/registry">Registry</BreadcrumbItem>
</Breadcrumb>
<h1 class="text-3xl font-bold mt-4 mb-2">ScamScan Domain Registry</h1>
<DomainInputForm redirectURL="/tools/registry/" ></DomainInputForm>


