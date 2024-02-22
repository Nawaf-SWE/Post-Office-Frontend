<template>
    <div class="uk-flex uk-flex-center uk-margin-large-top">
        <div class="uk-width-1-3 card">
            <div class="uk-margin-bottom">
                <div class="uk-text-left uk-text-muted">Name</div>
                <div class="uk-text-large uk-text-left uk-text-bold">
                    {{ admin?.name }}
                </div>
            </div>

            <div class="uk-margin-bottom">
                <div class="uk-text-left uk-text-muted">Role</div>
                <div class="uk-text-large uk-text-left uk-text-bold">
                    {{ admin?.role }}
                </div>
            </div>

            <div class="uk-margin-bottom">
                <div class="uk-text-left uk-text-muted">Phone</div>
                <div class="uk-text-large uk-text-left uk-text-bold">
                    {{ admin?.phone }}
                </div>
            </div>

            <div class="uk-margin-bottom">
                <div class="uk-text-left uk-text-muted">Email</div>
                <div class="uk-text-large uk-text-left uk-text-bold">
                    {{ admin?.email }}
                </div>
            </div>

            <div class="uk-flex uk-flex-center">
                <button
                    uk-toggle="target: #modal-example"
                    class="uk-padding-small uk-button uk-button-primary uk-button-small"
                >
                    Change my password
                </button>
            </div>

            <div id="modal-example" uk-modal>
                <div class="uk-modal-dialog uk-modal-body">
                    <form @submit.prevent="changePassword">
                        <div class="uk-margin-bottom">
                            <label class="input-label"> New password </label>
                            <div class="uk-form uk-inline" style="width: 100%">
                                <input
                                    class="uk-input"
                                    :type="showPassword ? 'text' : 'password'"
                                    v-model="form.password"
                                    placeholder="********"
                                    required
                                />
                                <a
                                    class="uk-form-icon uk-form-icon-flip"
                                    @click="toggle"
                                >
                                    <span
                                        :uk-icon="
                                            showPassword ? 'eye' : 'eye-slash'
                                        "
                                    >
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div class="uk-margin-bottom">
                            <label class="input-label">
                                Confirm Password
                            </label>
                            <div class="uk-form">
                                <input
                                    class="uk-input"
                                    type="password"
                                    v-model="form.confirmedPassword"
                                    placeholder="********"
                                    required
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
                                type="submit"
                                class="uk-button uk-button-large uk-width-1-2 uk-button-primary"
                            >
                                Apply
                            </button>
                        </div>
                    </form>
                </div>
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
    },
});
export default {
    name: "ProfileView",
    data: () => ({
        form: {},
        msg: null,
        showPassword: false,
    }),
    computed: {
        admin() {
            return this.$store.getters.admin;
        },
    },
    methods: {
        toggle() {
            this.showPassword = !this.showPassword;
        },
        async changePassword() {
            if (this.form.password !== this.form.confirmedPassword) {
                this.msg = "Passwords do not match";
                return;
            }
            let temp;
            temp = ax.post(
                "localhost:5000/admin/me",
                JSON.stringify(this.form),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            temp = await JSON.parse(temp.data);
            console.log(JSON.stringify(this.form));
            if (temp.success) {
                this.msg = "your password has been changed successfully";
                this.form = {};
            } else {
                this.msg = temp.message;
            }
        },
    },
};
</script>

<style>
/* .card {
    box-shadow: 0px 0px 10px rgba(193, 193, 193, 0.5);
    border-radius: 15px;
    border-collapse: collapse;
    overflow: hidden;
} */
</style>
