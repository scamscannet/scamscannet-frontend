<script lang="ts">
    import {isUserLoggedIn} from "../../hook/auth";
    import {userStore} from "../../store/user";

    let loggedIn: boolean = isUserLoggedIn();

    userStore.subscribe(value => loggedIn = isUserLoggedIn());
</script>

{#if (loggedIn)}
    <slot name="content"></slot>
{:else }
<div class="flex justify-center border border-lg w-full py-6 my-4">
    <slot name="errorNotice">
        <p class="text-center">
            The content/features located here are only available to authenticated users.
        </p>
    </slot>
</div>
{/if}