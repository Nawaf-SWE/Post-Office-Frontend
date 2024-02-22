<template>
    <div class="uk-container">
        <h1>Login Page</h1>
        <div class="uk-flex uk-flex-center uk-grid">
            <div
                class="uk-width-1-3@l uk-width-1-3@xl uk-width-1-2@s uk-width-1-1@xs card background"
            >
                <form @submit.prevent="onSubmit" class="uk-width-1-1">
                    <div class="uk-margin-bottom">
                        <label class="input-label"> Email </label>
                        <input
                            class="uk-input"
                            type="email"
                            v-model="form.email"
                            placeholder="example@example.com"
                            required
                        />
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Password </label>
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

                    <div class="uk-margin-bottom" v-if="msg">
                        <span class="uk-text-danger">{{ msg }}</span>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label">
                            <input
                                type="checkbox"
                                class="uk-checkbox"
                                id="admin"
                            />
                            Admin
                        </label>
                    </div>
                    <button
                        type="submit"
                        class="uk-button uk-button-large uk-width-1-1 success-bg"
                    >
                        Log in
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoginPage",
    data: () => ({
        form: {},
        msg: null,
        showPassword: false,
    }),
    methods: {
        async onSubmit() {
            this.msg = null;
            if (document.getElementById("admin").checked) {
                const message = await this.$store.dispatch(
                    "isAdmin",
                    JSON.stringify(this.form)
                );
                if (message) {
                    this.msg = message;
                } else {
                    await this.$router.push("/admin/");
                    this.$router.go(0);
                }
            } else {
                const message = await this.$store.dispatch(
                    "login",
                    JSON.stringify(this.form)
                );
                if (message) {
                    this.msg = message;
                } else {
                    await this.$router.push("/");
                    this.$router.go(0);
                }
            }
        },
        async toggle() {
            this.showPassword = !this.showPassword;
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
</style>
