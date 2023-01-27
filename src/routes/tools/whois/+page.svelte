<script>
    import {Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
    import DomainInputForm from "../_components/DomainInputForm.svelte";
    import CardView from "../../_components/CardView.svelte";
    import WhoisHistory from "./_components/WhoisHistory.svelte";



</script>
<Breadcrumb aria-label="Breadcrumb" solid>
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/tools">Tools</BreadcrumbItem>
    <BreadcrumbItem href="/tools/whois">Whois</BreadcrumbItem>
</Breadcrumb>
<h1 class="text-3xl font-bold mt-4 mb-2">Whois Lookup</h1>
<DomainInputForm redirectURL="/tools/whois/" placeholder="domain.tld or ip address" ip></DomainInputForm>
<CardView class="p-2">
    Whois lookups can help you to gather information about domains or ip addresses.
    By looking up an ip address you can get informations like the location or the according ISP.
    <br>
    The whois record for domains includes the registration and expiration date, the registrar and maybe even data about the registrant.
    <br>
    Due to privacy laws the whois data for domains varies a lot between the different TLDs. Especially European domains are very restrictive about the data they show.
    Therefore you won't be able to gather much informations about domains like .de.
</CardView>

<WhoisHistory></WhoisHistory>