<script>
    import {Breadcrumb, BreadcrumbItem, Button, Input} from "flowbite-svelte";
    import DomainInputForm from "../_components/DomainInputForm.svelte";
    import CardView from "../../_components/CardView.svelte";

</script>
<Breadcrumb aria-label="Breadcrumb" solid>
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/tools">Tools</BreadcrumbItem>
    <BreadcrumbItem href="/tools/takedown">Registry</BreadcrumbItem>
</Breadcrumb>
<h1 class="text-3xl font-bold mt-4 mb-2">ScamScan Domain Takedown</h1>
<CardView>
    <p>The ScamScan domain takedown is a transparent way to track our efforts to shut down fraudulent websites.
        We cover the whole workflow from the first report to the abuse request with the provider and describe each step here on the website.
        Every domain that is reported and identified as scam will automatically trigger a takedown attempt. Unfortunately, we can't guarantee the success as the outcome depends on the hosting provider/registrar.</p>
</CardView>
<DomainInputForm redirectURL="/tools/takedown/" ></DomainInputForm>


