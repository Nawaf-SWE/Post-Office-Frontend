<template>
    <div>
        <div class="uk-margin-large"></div>
        <div class="uk-flex uk-flex-around">
            <table
                class="uk-table uk-table-striped uk-table-hover uk-width-1-2 table_background"
            >
                <th>
                    <div class="uk-text-bold uk-text-center">Name</div>
                </th>
                <th>
                    <div class="uk-text-bold uk-text-center">Value</div>
                </th>
                <tbody>
                    <tr v-for="fee in feesList" :key="fee.id">
                        <td>
                            <span class="uk-text-center">
                                {{
                                    fee.name
                                        .toLowerCase()
                                        .replace(/_/g, " ")
                                        .replace(/\b\w/g, (c) =>
                                            c.toUpperCase()
                                        )
                                }}
                            </span>
                        </td>
                        <td>
                            <span class="uk-text-center">
                                {{ Number(fee.factor).toFixed(2) }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="uk-width-1-3 card background">
                <form @submit.prevent="alterFee" class="uk-width-1-1">
                    <h4 class="divider">Change pricing</h4>
                    <div class="uk-margin-bottom">
                        <label class="input-label"> Select fee </label>
                        <div class="uk-form">
                            <select
                                class="uk-select"
                                required
                                v-model="form.id"
                                @change="fillFactor"
                            >
                                <option
                                    v-for="fee in feesList"
                                    :value="fee.factor"
                                    :key="fee.id"
                                >
                                    {{
                                        fee.name
                                            .toLowerCase()
                                            .replace(/_/g, " ")
                                            .replace(/\b\w/g, (c) =>
                                                c.toUpperCase()
                                            )
                                    }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="uk-margin-bottom">
                        <label class="input-label"> Enter new value </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="number"
                                placeholder=""
                                required
                                v-model="form.factor"
                                step="0.01"
                            />
                        </div>
                    </div>
                    <div class="uk-margin-bottom" v-if="msg">
                        <span class="uk-text-danger">{{ msg }}</span>
                    </div>
                    <button
                        class="uk-button uk-button-large uk-width-1-1 uk-button-primary"
                    >
                        Apply
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
    name: "ManageFees",
    data: () => ({
        feesList: [],
        form: {},
        msg: null,
    }),
    async beforeCreate() {
        this.feesList = [];
        let temp;
        temp = await ax.get("admin/fees");
        temp = await JSON.parse(temp.data);
        if (temp.success) {
            this.feesList = temp.data;
        }
    },
    computed: {
        name() {
            return this.name;
        },
    },
    methods: {
        async alterFee() {
            let temp;
            temp = await ax.put(
                "admin/fees/" + this.form.id,
                JSON.stringify(this.form)
            );
            temp = await JSON.parse(temp.data);
            if (temp.success) {
                this.msg = "Saved";
                for (let i = 0; i < this.feesList.length; i++) {
                    if (this.feesList[i].id == temp.data.id) {
                        this.feesList[i] = temp.data;
                        console.log(this.feesList);
                        return;
                    }
                }
            }
        },
        fillFactor(e) {
            this.form.factor = e.target.value;
        },
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
