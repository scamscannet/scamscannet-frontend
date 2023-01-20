<script>
    import {Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from "flowbite-svelte";
    import {nodes} from "../../../store/account/nodes";
    import {CLIENTS, makeApiRequest} from "$lib/client/request";
    import {APIS, PATHS} from "$lib/client/apis";
    import {loadNodesStore} from "../../../hook/account/nodes";
    console.log($nodes);

    async function deactivateNode(ident){
        await makeApiRequest(
            CLIENTS.POST,
            APIS.registry,
            PATHS.registry.nodes.deactivate,
            {},
            {
                body: JSON.stringify({ident: ident}),
                contentType: "application/json"
            },
            true
        );

        loadNodesStore();

    }
</script>
<Table>
    <TableHead>
        <TableHeadCell>Ident</TableHeadCell>
        <TableHeadCell>Deactivate</TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
        {#each $nodes as node}
            <TableBodyRow>
                <TableBodyCell>{node}</TableBodyCell>
                <TableBodyCell>
                    <Button on:click={() => deactivateNode(node)}>Deactivate Node</Button>
                </TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
</Table>
