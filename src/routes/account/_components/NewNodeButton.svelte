<script>
    import {CLIENTS, makeApiRequest} from "$lib/client/request";
    import {APIS, PATHS} from "$lib/client/apis";
    import {Alert, Button, Modal} from "flowbite-svelte";
    import {loadNodesStore} from "../../../hook/account/nodes";

    let error = false;
    let token = null;

    async function registerNode() {
        token = null;
        error = false;
        let response = await makeApiRequest(
            CLIENTS.POST,
            APIS.registry,
            PATHS.registry.nodes.register,
            {},
            {},
            true
        );

        if (response.error){
            error = true;
        } else {
            token = response.content.nodeid;
            loadNodesStore();
        }



    }
</script>
<div class="flex">
    {#if error}
        <Alert color="red">
            <span class="font-medium">Error! There was an issue while creating a new node. Please try again later.</span>
        </Alert>
    {/if}

    <Modal title="New Node Created" bind:open={token} autoclose>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Thank you for registering a new node. The following nodeid will allow you to start your scraping node and receive new scraping jobs. This is the only time you will be able to see the nodeid so please safe it somewhere safe. Furthermore, do not share the nodeid.
        </p>
        <p class="bg-blue-200 p-2 rounded-lg border-blue-500 text-base leading-relaxed text-gray-500 dark:text-gray-400">
            NodeID: {token}
        </p>
        <svelte:fragment slot='footer'>
            <Button on:click={() => token=null}>Understood</Button>
        </svelte:fragment>
    </Modal>
</div>
<Button on:click={registerNode}>Create new Node</Button>