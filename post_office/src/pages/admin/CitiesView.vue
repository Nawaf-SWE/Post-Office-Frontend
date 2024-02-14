<template>
    <div class="uk-margin-large-top">
        <div class="uk-grid uk-flex-around uk-flex fc uk-child-width-1-4">
            <CityComp
                class="uk-margin-bottom card"
                v-for="city in cityList"
                :key="city.id"
                :id="city.id"
                :name_en="city.name_en"
                :name_ar="city.name_ar"
            ></CityComp>
            <!-- <div class="uk-width-1-4 card uk-flex uk-flex-center"> -->
            <a
                uk-toggle="target: #modal-example"
                class="uk-flex uk-flex-center card lc"
                uk-icon="icon: plus; ratio: 2"
            >
            </a>
            <!-- </div> -->
        </div>

        <div id="modal-example" uk-modal>
            <div class="uk-modal-dialog uk-modal-body">
                <form
                    @submit.prevent="addCity"
                    class="uk-width-1-1"
                    id="target"
                >
                    <h4>add new city</h4>

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
                            Add City
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import CityComp from "@/components/admin/CityComp.vue";
import { Axios } from "axios";

const ax = new Axios({
    baseURL: "http://localhost:5000",
    headers: {
        Authorization: "Barrer " + localStorage["token"],
    },
});
export default {
    name: "CitiesView",
    components: { CityComp },
    data: () => ({
        cityList: [],
        form: {},
        msg: null,
    }),
    async beforeCreate() {
        this.cityList = [];
        let temp;
        // FIXME: limit and offset
        temp = await ax.get("/admin/cities?limit=100&offset=0");
        // this.cityList = await JSON.parse(temp.data);
        temp = await JSON.parse(temp.data);
        if (temp.success) {
            this.cityList = temp.data;
        }
        console.log(this.cityList);
    },
    computed: {
        admin() {
            return this.$store.getters.admin;
        },
    },
    methods: {
        async addCity() {
            this.msg = null;
            let temp;
            temp = await ax.post("/admin/cities", JSON.stringify(this.form), {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            temp = await JSON.parse(temp.data);
            console.log(JSON.stringify(this.form));
            if (temp.success) {
                this.msg = "New city added";
                this.cityList.push(temp.data);
                this.form = {};
            } else {
                this.msg = temp.message;
            }
        },
    },
};
</script>

<style scoped>
.fc > * {
    height: 10rem;
}
/* .card {
    box-shadow: 0px 0px 10px rgba(193, 193, 193, 0.5);
    border-radius: 15px;
    border-collapse: collapse;
    overflow: hidden;
} */
.lc:hover {
    background-color: #f8f8f8;
}
</style>
