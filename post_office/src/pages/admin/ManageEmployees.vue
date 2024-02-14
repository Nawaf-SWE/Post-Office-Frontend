<template>
    <div class="uk-margin-large-top">
        <div class="uk-grid uk-flex-around uk-flex fc">
            <div
                v-for="emp in empList"
                :key="emp.id"
                class="uk-margin-bottom card"
            >
                <div class="uk-margin-small">
                    <div class="uk-text-left uk-text-muted">Name</div>
                    <div class="uk-text-large uk-text-left uk-text-bold">
                        {{ emp.name }}
                    </div>
                </div>

                <div class="uk-margin-small">
                    <div class="uk-text-left uk-text-muted">Role</div>
                    <div class="uk-text-large uk-text-left uk-text-bold">
                        {{ emp.role }}
                    </div>
                </div>

                <div class="uk-margin-small">
                    <div class="uk-text-left uk-text-muted">Phone no.</div>
                    <div class="uk-text-large uk-text-left uk-text-bold">
                        {{ emp.phone }}
                    </div>
                </div>

                <div class="uk-margin-small">
                    <div class="uk-text-left uk-text-muted">Email</div>
                    <div class="uk-text-large uk-text-left uk-text-bold">
                        {{ emp.email }}
                    </div>
                </div>
            </div>
            <a
                uk-toggle="target: #modal-example"
                class="uk-flex uk-flex-center card lc"
                uk-icon="icon: plus; ratio: 2"
            >
            </a>
        </div>

        <div id="modal-example" uk-modal>
            <div class="uk-modal-dialog uk-modal-body">
                <form
                    @submit.prevent="addEmployee"
                    class="uk-width-1-1"
                    id="target"
                >
                    <h4>Hire new employees</h4>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Name </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="text"
                                placeholder=""
                                required
                                v-model="form.name"
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Role </label>
                        <div class="uk-form">
                            <select
                                class="uk-select"
                                required
                                v-model="form.role"
                            >
                                <option value="manager">manager</option>
                                <option value="deliveryman">deliveryman</option>
                            </select>
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Phone </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="text"
                                placeholder=""
                                required
                                v-model="form.phone"
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Email </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="email"
                                placeholder=""
                                required
                                v-model="form.email"
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Password </label>
                        <div class="uk-form">
                            <input class="uk-input" disabled value="12345678" />
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
                            Hire
                        </button>
                    </div>
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
    name: "ManageEmployees",
    data: () => ({
        empList: [],
        form: {},
        msg: null,
    }),

    async beforeCreate() {
        this.empList = [];
        let temp;
        // FIXME: limit and offset
        temp = await ax.get("/admin/users?limit=100&offset=0");
        // this.empList = await JSON.parse(temp.data);
        temp = await JSON.parse(temp.data);
        if (temp.success) {
            this.empList = temp.data;
        }
        console.log(this.empList);
    },
    methods: {
        async addEmployee() {
            this.msg = null;
            let temp;
            temp = await ax.post("/admin/users", JSON.stringify(this.form));
            temp = await JSON.parse(temp.data);
            if (temp.success) {
                this.msg =
                    "New employee added. The password is <em>pass@1234</em>";
                this.empList.push(temp.data);
                this.form = {};
            } else {
                this.msg = temp.message;
            }
            console.log(JSON.stringify(this.form));
        },
    },
};
</script>

<style scoped>
.fc > * {
    height: 20rem;
    width: 15rem;
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
