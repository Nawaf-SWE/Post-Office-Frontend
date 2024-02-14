<template>
    <div class="uk-container uk-margin">
        <h2>Send new Package</h2>
        <div class="uk-flex uk-flex-center uk-grid">
            <div
                class="uk-width-1-3@l uk-width-1-3@xl uk-width-1-2@s uk-width-1-1@xs card background"
            >
                <form @submit.prevent="sendPackage" class="uk-width-1-1">
                    <h4 class="divider">Order Specification</h4>
                    <div class="uk-margin-bottom">
                        <label class="input-label"> Weight </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="number"
                                placeholder=""
                                required
                                v-model="form.weight"
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Package Category </label>
                        <div class="uk-form">
                            <select
                                class="uk-select"
                                required
                                v-model="form.package_category"
                            >
                                <option value="Regular">Regular</option>
                                <option value="Fragile">Fragile</option>
                                <option value="Chemical">Chemical</option>
                                <option value="Liquid">Liquid</option>
                            </select>
                        </div>
                    </div>

                    <!-- <div class="uk-margin-bottom">
                        <label class="input-label"> Shipping Type </label>
                        <div class="uk-form">
                            <select
                                class="uk-select"
                                required
                                v-model="form.shipping_type"
                            >
                                <option value="Regular">Regular</option>
                                <option value="Express">Express</option>
                            </select>
                        </div>
                    </div> -->

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Shipping Type </label>
                        <div class="uk-form">
                            <section
                                id="pattern6"
                                class="uk-flex uk-flex-center"
                            >
                                <label
                                    :class="{
                                        'uk-button-primary':
                                            form.shipping_type === 'Regular',
                                    }"
                                >
                                    <input
                                        type="radio"
                                        name="st"
                                        value="Regular"
                                        v-model="form.shipping_type"
                                    />Regular
                                </label>
                                <label
                                    :class="{
                                        'uk-button-primary':
                                            form.shipping_type === 'Express',
                                    }"
                                >
                                    <input
                                        type="radio"
                                        name="st"
                                        value="Express"
                                        v-model="form.shipping_type"
                                    />Express
                                </label>
                            </section>
                        </div>
                    </div>

                    <h4 class="divider">Receiver Address</h4>
                    <div class="uk-margin-bottom">
                        <label class="input-label"> Receiver Name </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="text"
                                placeholder=""
                                required
                                v-model="form.receiver_name"
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Receiver Phone </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="text"
                                placeholder="05xxxxxxxx"
                                required
                                v-model="form.receiver_phone"
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Receiver Email </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="email"
                                placeholder="Example@example.com"
                                v-model="form.receiver_email"
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label">
                            Receiver Building No.
                        </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="number"
                                placeholder=""
                                required
                                v-model="form.receiver_building_no"
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Postal Code </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="number"
                                placeholder=""
                                required
                                v-model="form.receiver_postal_code"
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label">Receiver Street </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="text"
                                placeholder=""
                                required
                                v-model="form.receiver_street"
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Receiver City </label>
                        <div class="uk-form">
                            <select
                                class="uk-select"
                                required
                                v-model="form.receiver_city_id"
                                @change="getBranchesForReceiver"
                            >
                                <option
                                    v-for="city in citiesList"
                                    :value="city.id"
                                    :key="city.id"
                                >
                                    {{ city.name_en }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Receiver Branch </label>
                        <div class="uk-form">
                            <select
                                id="RB"
                                class="uk-select"
                                required
                                v-model="form.receiver_branch_id"
                                disabled
                            >
                                <option
                                    v-for="branch in branchesListForReceiver"
                                    :value="branch.id"
                                    :key="branch.id"
                                >
                                    {{ branch.name_en }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <h4 class="divider">Pickup Address</h4>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> City </label>
                        <div class="uk-form">
                            <select
                                class="uk-select"
                                required
                                v-model="form.sender_city_id"
                                @change="getBranchesForSender"
                            >
                                <option
                                    v-for="city in citiesList"
                                    :value="city.id"
                                    :key="city.id"
                                >
                                    {{ city.name_en }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="uk-margin-bottom">
                        <label class="input-label"> Building No. </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="number"
                                placeholder=""
                                required
                                v-model="form.sender_building_no"
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Postal Code</label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="number"
                                placeholder=""
                                required
                                v-model="form.sender_postal_code"
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Street </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="text"
                                placeholder=""
                                required
                                v-model="form.sender_street"
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom" v-if="msg">
                        <span class="uk-text-danger">{{ msg }}</span>
                    </div>

                    <button
                        class="uk-button uk-button-large uk-width-1-1 uk-button-primary"
                    >
                        Send Package
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { Axios } from "axios";

const ax = new Axios({
    baseURL: "http://localhost:5000",
    headers: {
        Authorization: "Barrer " + localStorage["token"],
        "Content-Type": "application/json",
    },
});
export default {
    name: "SendPackage",
    data: () => ({
        form: {
            shipping_type: "Regular",
        },
        msg: null,
        citiesList: [],
        branchesList: [],
        branchesListForReceiver: [],
    }),

    async mounted() {
        this.citiesList = [];
        let temp;

        temp = await ax.get("/admin/cities?limit=100&offset=0");
        temp = await JSON.parse(temp.data);
        if (temp.success) {
            this.citiesList = temp.data;
        }

        this.branchesList = [];
        temp = await ax.get("/admin/branches?limit=100&offset=0");
        temp = await JSON.parse(temp.data);
        if (temp.success) {
            this.branchesList = temp.data;
        }
    },

    methods: {
        async sendPackage() {
            this.msg = null;
            let temp;
            console.log(typeof this.form);
            temp = await ax.post(
                "/customers/packages",
                JSON.stringify(this.form)
            );
            temp = await JSON.parse(temp.data);

            if (temp.success) {
                this.msg = "Your package has been placed successfully";
            } else {
                this.msg = temp.message;
            }
            console.log(JSON.stringify(this.form));
        },
        async getBranchesForReceiver() {
            document.getElementById("RB").removeAttribute("disabled");

            this.branchesListForReceiver = this.branchesList.filter(
                (branch) => branch.city_id === this.form.receiver_city_id
            );
        },
    },
};
</script>
<style scoped>
/* .card {
    box-shadow: 0px 0px 10px rgba(193, 193, 193, 0.5);
    border-radius: 15px;
    border-collapse: collapse;
    padding: 1.5rem;
    overflow: hidden;
} */
.background {
    background-color: #f8f8f8;
}
#pattern6 label {
    height: 40px;
    width: 50%;
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
}
#pattern6 input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: none;
}
#pattern6 {
    border-radius: 1rem;
    overflow: hidden;
}
</style>
