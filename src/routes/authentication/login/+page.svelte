<script>

import LoginComponent from "../../../components/auth/LoginComponent.svelte";
import {Card} from "flowbite-svelte";
</script>

<svelte:head>
    <title>Login | ScamScan</title>
</svelte:head>
<div class="w-full rounded-lg border shadow">
    <div class="bg-gray-100">
        <h1 class="text-2xl mb-2 px-4 py-4 font-semibold">Login</h1>
    </div>
    <div class="p-4">
        <LoginComponent></LoginComponent>
    </div>
</div>
