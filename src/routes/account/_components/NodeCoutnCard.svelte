<script>

import {Card} from "flowbite-svelte";
import {nodes} from "../../../store/account/nodes";



</script>

<Card href="">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{$nodes.length}</h5>
    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Nodes active
    </p>
</Card>
