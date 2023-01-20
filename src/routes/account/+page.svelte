<script>
import NodeCountCard from "./_components/NodeCoutnCard.svelte";
import {loadNodesStore} from "../../hook/account/nodes";
import NodesTable from "./_components/NodesTable.svelte";
import {redirectToLoginIfNotAuthenticated} from "../../hook/auth";
import NewNodeButton from "./_components/NewNodeButton.svelte";
import {nodes} from "../../store/account/nodes";

redirectToLoginIfNotAuthenticated();
loadNodesStore();

</script>


<NodeCountCard></NodeCountCard>
<div class="w-full flex justify-end mt-2">
    <NewNodeButton></NewNodeButton>

</div>
{#if $nodes.length}
    <div class="rounded-lg shadow border overflow-hidden mt-2 ">
        <NodesTable></NodesTable>
    </div>
{/if}