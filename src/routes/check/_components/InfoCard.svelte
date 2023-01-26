<script>
    export let color = "gray";
</script>

<div class="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md flex w-full flex-col p-4 sm:p-6">

    <div class="my-auto">
        <p class="text-{color}-700 text-lg my-auto">
            <slot name="value"></slot>
        </p>
        <slot name="description"></slot>

    </div>
</div>