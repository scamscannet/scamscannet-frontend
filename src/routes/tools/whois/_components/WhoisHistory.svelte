<script>

    import {CLIENTS, makeApiRequest} from "$lib/client/request";
    import {APIS, PATHS} from "$lib/client/apis";
    import {Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from "flowbite-svelte";
    import CardView from "../../../_components/CardView.svelte";


    let whoisHistory = {
        domain: [],
        ip: []
    }
    makeApiRequest(
        CLIENTS.GET,
        APIS.whois,
        PATHS.whois.history,
        {},
        {},
        false
    ).then(
        response => whoisHistory = response.content
    )
</script>
{#if whoisHistory.ip.length || whoisHistory.domain.length}
    <h2 class="pl-1 text-xl font-semibold">Last Requests</h2>
{/if}
{#if whoisHistory.domain.length}
    <div class="border rounded-lg overflow-hidden mt-2">
        <Table>
            <TableHead>
                <TableHeadCell>Domain</TableHeadCell>
                <TableHeadCell>Whois</TableHeadCell>
            </TableHead>
            <TableBody class="divide-y">
                {#each whoisHistory.domain as domain}
                    <TableBodyRow>
                        <TableBodyCell>{domain}</TableBodyCell>
                        <TableBodyCell><a class="text-blue-500" href="/tools/whois/{domain}">Click here</a> </TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    </div>
{/if}
{#if whoisHistory.ip.length}
    <div class="border rounded-lg overflow-hidden mt-2">
        <Table>
            <TableHead>
                <TableHeadCell>IP</TableHeadCell>
                <TableHeadCell>Whois</TableHeadCell>
            </TableHead>
            <TableBody class="divide-y">
                {#each whoisHistory.ip as ip}
                    <TableBodyRow>
                        <TableBodyCell>{ip}</TableBodyCell>
                        <TableBodyCell><a class="text-blue-500" href="/tools/whois/{ip}">Click here</a> </TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>

    </div>
{/if}