<script>

import {Card} from "flowbite-svelte";
import {CLIENTS, makeApiRequest} from "$lib/client/request";
import {APIS, PATHS} from "$lib/client/apis";

makeApiRequest(
    CLIENTS.GET,
    APIS.authentication,
    PATHS.authentication.login,
    {},
    {}

)
</script>

<Card href="/cards">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">5</h5>
    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Nodes active
    </p>
</Card>
