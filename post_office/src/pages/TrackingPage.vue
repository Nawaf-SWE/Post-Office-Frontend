<template>
    <div class="uk-margin">
        <div class="uk-margin" v-if="trackingList.length == 0">
            <h3 class="uk-text-danger">Invalid tracking number</h3>
        </div>

        <div v-else>
            <h1>Tracking for: {{ this.$route.params.tracking_no }}</h1>

            <div class="uk-margin">
                <div class="uk-flex uk-flex-center" uk-grid>
                    <table
                        class="uk-table uk-table-striped uk-table-hover uk-width-1-2 table_background"
                    >
                        <th>
                            <div class="uk-text-bold uk-text-center">
                                Date (DD/MM/YYYY)
                            </div>
                        </th>
                        <th>
                            <div class="uk-text-bold uk-text-center">City</div>
                        </th>
                        <th>
                            <div class="uk-text-bold uk-text-center">
                                Delivery Status
                            </div>
                        </th>
                        <tbody>
                            <TrackingRow
                                v-for="(tracking, index) in trackingList"
                                :key="index"
                                :createdAt="tracking.createdAt"
                                :branch="tracking.branch_id"
                                :status="tracking.delivery_status"
                            >
                            </TrackingRow>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TrackingRow from "@/components/TrackingRow.vue";
// import { inject } from "vue";
// import asyncHandler from "@/middlewares/asyncHandler";
import axiosHanlder from "@/middlewares/axiosHandler";

export default {
    name: "TrackingPage",
    components: {
        TrackingRow,
    },
    data: () => ({
        trackingList: [],
        // ax: inject("$axios"),
    }),
    watch: {
        "$route.params.tracking_no": {
            handler: "fetchTrackingData",
        },
    },
    methods: {
        async fetchTrackingData() {
            if (!this.$route.path.includes("/tracking")) {
                return;
            }
            this.trackingList = [];

            // FIXME: limit and offset
            let temp = await axiosHanlder(
                "GET",
                `customers/trackings/${this.$route.params.tracking_no}?limit=100&offset=0`
            );
            if (temp?.success) {
                this.trackingList = temp.data;
            }
        },
    },
    async beforeCreate() {
        this.trackingList = [];

        // FIXME: limit and offset
        let temp = await axiosHanlder(
            "GET",
            `customers/trackings/${this.$route.params.tracking_no}?limit=100&offset=0`
        );
        if (temp?.success) {
            this.trackingList = temp.data;
        }
    },
};
</script>

<style scoped>
.table_background {
    background-color: white;
    box-shadow: 0px 0px 10px rgba(114, 114, 113, 0.5);
    border-radius: 15px;
}

table {
    font-weight: 400;
    font-style: normal;
    border-collapse: collapse;
    border-radius: 15px;
    overflow: hidden;
}
</style>
