<template>
    <div
        class="uk-child-width-1-2@m uk-child-width-1-2@s uk-flex uk-flex-center pad card uk-margin-top uk-margin-bottom"
        style="padding: 30px"
    >
        <div class="pad">
            <div class="uk-margin-small">
                <div class="uk-text-left uk-text-muted">Tracking Number</div>
                <div class="uk-text-large uk-text-left uk-text-bold">
                    {{ trackingNo }}
                </div>
            </div>
            <div class="uk-margin-small">
                <div class="uk-text-left uk-text-muted">Cost</div>
                <div class="uk-text-large uk-text-left uk-text-bold">
                    {{ cost }}
                </div>
            </div>
            <div class="uk-margin-small">
                <div class="uk-text-left uk-text-muted">Created At</div>
                <div class="uk-text-large uk-text-left uk-text-bold">
                    {{ dateOnly }}
                </div>
            </div>
            <div class="uk-margin-small">
                <router-link
                    target="_blank"
                    :to="`/tracking/${this.trackingNo}`"
                >
                    <div class="uk-text-medium uk-text-left uk-text-bold">
                        Track your package here
                    </div>
                </router-link>
            </div>
        </div>

        <div class="pad">
            <div class="uk-margin-small">
                <div class="uk-text-left uk-text-muted">Receiver Name</div>
                <div class="uk-text-large uk-text-left uk-text-bold">
                    {{ receiver_name }}
                </div>
            </div>
            <div class="uk-margin-small">
                <div class="uk-text-left uk-text-muted">Receiver Phone</div>
                <div class="uk-text-large uk-text-left uk-text-bold">
                    {{ receiver_phone }}
                </div>
            </div>

            <div class="uk-margin-small">
                <div class="uk-text-left uk-text-muted">Receiver Branch id</div>
                <div class="uk-text-large uk-text-left uk-text-bold">
                    {{ receiver_branch_id }}
                </div>
            </div>
        </div>

        <!-- FIXME: font sizes -->
        <!-- <div class="pad">
            <h4 class="uk-text-left">Package Detail:</h4>
            <div>
                <div class="uk-margin-small">
                    <div class="uk-text-left uk-text-muted">
                        Tracking Number
                    </div>
                    <div class="uk-text-large uk-text-left uk-text-bold">
                        {{ trackingNo }}
                    </div>
                </div>
                <div class="uk-margin-small">
                    <div class="uk-text-left uk-text-muted">Cost</div>
                    <div class="uk-text-large uk-text-left uk-text-bold">
                        {{ cost }}
                    </div>
                </div>
                <div class="uk-margin-small">
                    <div class="uk-text-left uk-text-muted">
                        Created At
                    </div>
                    <div class="uk-text-large uk-text-left uk-text-bold">
                        {{ dateOnly }}
                    </div>
                </div>
            </div>
        </div>

        <div class="pad">
            <h4 class="uk-text-left">Package Recipient Detail:</h4>
            <div>
                <div class="uk-margin-small">
                    <div class="uk-text-left uk-text-muted">
                        Receiver Name
                    </div>
                    <div class="uk-text-large uk-text-left uk-text-bold">
                        {{ receiver_name }}
                    </div>
                </div>
                <div class="uk-margin-small">
                    <div class="uk-text-left uk-text-muted">
                        Receiver Phone
                    </div>
                    <div class="uk-text-large uk-text-left uk-text-bold">
                        {{ receiver_phone }}
                    </div>
                </div>

                <div class="uk-margin-small">
                    <div class="uk-text-left uk-text-muted">
                        Receiver Branch id
                    </div>
                    <div class="uk-text-large uk-text-left uk-text-bold">
                        {{ receiver_branch_id }}
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    name: "PackageCard",
    props: {
        sender_name: String,
        sender_phone: String,
        sender_email: String,
        sender_building_no: Number,
        sender_postal_code: Number,
        sender_street: String,
        sender_branch_id: Number,

        receiver_name: String,
        receiver_phone: String,
        receiver_email: String,
        receiver_building_no: Number,
        receiver_postal_code: Number,
        receiver_street: String,
        receiver_branch_id: Number,

        trackingNo: String,
        weight: String,
        shipping_type: String,
        cost: Number,
        package_category: String,
        createdAt: String,
    },
    computed: {
        dateOnly() {
            return this.createdAt.slice(0, 10);
        },
    },
};
</script>

<style>
.uk-text-large,
.uk-text-left {
    font-size: 18px;
}
@media only screen and (max-width: 750px) {
    .uk-text-large,
    .uk-text-left {
        font-size: 14px;
    }
}
.pad {
    /* padding-left: 0 !important; */
    padding: 10px 15px !important;
}
.card {
    /* margin: 2%; */
    box-shadow: 0px 0px 10px rgba(193, 193, 193, 0.5);
    border-radius: 15px;
    border-collapse: collapse;
    overflow: hidden;
    /* max-width: 90%; */
    /* min-width: 40%; */
    /* font-size: 24px; */
    padding: 1em;
    /* flex: 1; */
    margin: 5px 20px;
}
.uk-grid {
    padding-left: 30px !important;
}
</style>
