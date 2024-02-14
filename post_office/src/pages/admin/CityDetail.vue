<template>
    <div>
        <div
            class="uk-text-left uk-width-1-1 uk-padding-small uk-margin-small uk-margin-small-top uk-flex uk-flex-around"
        >
            <div
                class="uk-form-controls uk-flex uk-width-1-1"
                style="justify-content: space-around"
            >
                <select
                    class="uk-select uk-width-2-3"
                    @change="loadBranches"
                    v-model="city_id"
                    id="form-stacked-select"
                >
                    <option
                        v-for="city in citiesList"
                        :key="city.id"
                        :value="city.id"
                    >
                        {{ city.name_ar }}
                    </option>
                </select>
                <span
                    style="
                        position: relative;
                        border-radius: 500px;
                        background-color: green;
                        color: aliceblue;
                        width: 40px;
                    "
                >
                    <a
                        class="uk-form-icon"
                        style="fill: aliceblue"
                        uk-toggle="target: #modal-example"
                        uk-icon="icon: plus"
                    ></a>
                </span>
            </div>
        </div>
        <div class="uk-grid uk-flex-around uk-flex fc uk-child-width-1-3">
            <BranchComp
                class="uk-margin-bottom card"
                v-for="br in branchesList"
                :key="br.id"
                :lng="br.lng"
                :lat="br.lat"
                :name_en="br.name_en"
                :name_ar="br.name_ar"
                :id="br.id"
            ></BranchComp>
            <a
                uk-toggle="target: #modal-example"
                class="uk-flex uk-flex-center uk-margin-bottom card lc"
                uk-icon="icon: plus; ratio: 2"
            >
            </a>
        </div>

        <!-- Modal -->
        <div id="modal-example" uk-modal>
            <div class="uk-modal-dialog uk-modal-body">
                <h2 class="uk-modal-title" v-if="currentCity">
                    {{ currentCity?.name_ar }}
                </h2>
                <form
                    @submit.prevent="addBranch"
                    class="uk-width-1-1"
                    id="target"
                >
                    <div class="uk-margin-bottom">
                        <label class="input-label"> Name en. </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="text"
                                placeholder=""
                                required
                                v-model="form.name_en"
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Name ar. </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="text"
                                placeholder=""
                                required
                                v-model="form.name_ar"
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Longitude </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="number"
                                step="0.0000001"
                                placeholder=""
                                required
                                v-model="form.lng"
                                min="-90"
                                max="90"
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Latitude </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="number"
                                step="0.0000001"
                                placeholder=""
                                v-model="form.lat"
                                min="-180"
                                max="180"
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom" v-if="msg">
                        <span class="uk-text-danger">{{ msg }}</span>
                    </div>

                    <div class="uk-flex">
                        <button
                            class="uk-button uk-button-default uk-button-large uk-width-1-2 uk-modal-close"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            class="uk-button uk-button-primary uk-button-large uk-width-1-2"
                        >
                            Add Branch
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import BranchComp from "@/components/admin/BranchComp.vue";

import { Axios } from "axios";

const ax = new Axios({
    baseURL: "http://localhost:5000",
    headers: {
        Authorization: "Barrer " + localStorage["token"],
    },
});
export default {
    name: "CityDetail",
    data: () => ({
        citiesList: [],
        branchesList: [],
        form: {},
        msg: null,
        city_id: null,
    }),
    computed: {
        currentCity() {
            return this.citiesList.find((x) => x.id == this.city_id);
        },
    },
    components: { BranchComp },
    async beforeCreate() {
        const resp = await ax.get("/admin/cities?limit=100&offset=0", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        let data = await JSON.parse(resp.data);
        if (data.success) {
            this.citiesList = data.data;
            this.city_id = this.citiesList[0]?.id;
        }
    },
    methods: {
        scroll() {
            document
                .getElementById("target")
                .scrollIntoView({ behavior: "smooth" });
        },
        async loadBranches(e) {
            this.branchesList = [];
            let temp;
            // FIXME: limit and offset
            temp = await ax.get("admin/branches/" + e.target.value);
            temp = await JSON.parse(temp.data);
            if (temp.success) {
                this.branchesList = temp.data;
            }
        },
        async addBranch() {
            this.msg = null;
            let temp;
            this.form.city_id = this.$route.params.id;
            temp = await ax.post("/admin/branches", JSON.stringify(this.form), {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            temp = await JSON.parse(temp.data);
            console.log(JSON.stringify(this.form));
            if (temp.success) {
                this.msg = "New branch added";
                this.branchesList.push(temp.data);
                this.form = {};
            } else {
                this.msg = temp.message;
            }
        },
    },

    // this.$route.params.id
};
</script>

<style scoped>
/* .fc > :first-child {
    margin: 30px 20px 5px;
    @media only screen and (min-width: 1200px) {
        margin: 20px 20px 5px;
        padding: 24px;
    }
} */
.fc > * {
    height: 30rem;
}
.lc:hover {
    background-color: #f8f8f8;
}
</style>
