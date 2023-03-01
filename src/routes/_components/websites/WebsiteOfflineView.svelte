<script>
    import UserView from "../UserView.svelte";
    import CardView from "../CardView.svelte";
    import RequestNewScrape from "../../tools/registry/[domain]/_components/RequestNewScrape.svelte";

    export let domain;
</script>

<UserView>
    <CardView slot="content">
        <div class="">
            <p>The requested page was offline during the last scrape attempt. You can request a new try by pressing the button below.</p>
            <div class="flex justify-center w-full mt-3">
                <RequestNewScrape class="" domain={domain} ></RequestNewScrape>
            </div>
        </div>
    </CardView>
    <div slot="errorNotice">
        <p>The requested page was offline during the last scrape attempt. Please sign in if you believe it is online to submit a new scrape request. </p>
    </div>
</UserView>
