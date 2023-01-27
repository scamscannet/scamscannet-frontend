<script>
    import {Input, Button, Spinner, Progressbar, Breadcrumb, BreadcrumbItem} from "flowbite-svelte";
    import DomainInputForm from "../_components/DomainInputForm.svelte";
    import CardView from "../../_components/CardView.svelte";

    let loading = {
        blacklistCheck: false
    };

    let inputDomain = null;
</script>
<Breadcrumb aria-label="Breadcrumb" solid>
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/tools">Tools</BreadcrumbItem>
    <BreadcrumbItem href="/tools/blacklist">Blacklist</BreadcrumbItem>
</Breadcrumb>
<h1 class="text-3xl font-bold mt-4 mb-2">ScamScan Blacklist Check</h1>


<DomainInputForm redirectURL="/tools/blacklist/" ></DomainInputForm>
<CardView>
    <div class="flex flex-col mx-auto w-full md:w-4/5 xl:w-2/3">
        <h3 class="text-xl font-bold">About the ScamScan Doman Blacklist</h3>
        The ScamScan Domain Blacklist contains all known fraudulent domains/websites. In addition, we have trained an AI model based on our data that can predict whether a domain name appears to be fraudulent or not. Unfortunately, the blacklist is limited to subdomains so far. We are already working on an extension. Our blacklist is already successfully used in the Keplr cryptocurrency wallet to protect users from fraud. If you would like to integrate the blacklist, you can contact us at any time.
    </div>
</CardView>