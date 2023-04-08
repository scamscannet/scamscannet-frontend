<script>
    import { authenticate, isUserLoggedIn, logout } from "../../../../hook/auth.ts";
    import { userStore} from "../../../../store/user.ts";
    import {Button, Input, Label} from "flowbite-svelte";
    import {page} from "$app/stores";
    import {goto} from "$app/navigation";

    let username = null;
    let password = null;
    let error = null;
    let urlSearchParams = new URLSearchParams($page.url.search);
    const destination = urlSearchParams.source === undefined ? "/" : "/" + urlSearchParams.source;
    console.log(destination)
    let authenticated = isUserLoggedIn();
    userStore.subscribe(value => authenticated = isUserLoggedIn())
    async function login(){
        let loggedIn = await authenticate(username, password);
        if(loggedIn){
            await goto(destination);

        }
    }
</script>
{#if !authenticated}
    {#if error}
        <div class="my-3 w-full border border-red-700 text-red-700 py-3 px-2 rounded-lg shadow ">
            {error}
        </div>
    {/if}
    <form on:submit|preventDefault={login} class="">
        <div class='mb-6'>
            <Label for='large-input' class='block mb-2'>Username</Label>
            <Input bind:value={username} id="large-input" placeholder="Username" required/>
        </div>
        <div class='mb-6'>
            <Label for='large-input' class='block mb-2'>Password</Label>
            <Input type="password" bind:value={password} id="large-input" placeholder="•••••••••" required />
        </div>
        <Button type="submit">Login</Button>
    </form>
{:else}
    <div class="my-3 w-full border border-green-700 text-green-700 py-3 px-2 rounded-lg shadow ">
        You are logged in!
    </div>
    <Button class="mt-2" on:click={logout}>Logout</Button>
{/if}