<template>
    <div class="uk-container">
        <h1>Sign Up Page</h1>
        <div class="uk-flex uk-flex-center uk-grid">
            <div
                class="uk-width-1-3@l uk-width-1-3@xl uk-width-1-2@s uk-width-1-1@xs card background"
            >
                <form @submit.prevent="onSubmit" class="uk-width-1-1">
                    <div class="uk-margin-bottom">
                        <label class="input-label"> Name </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="text"
                                v-model="form.name"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Email </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="email"
                                v-model="form.email"
                                placeholder="Example@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Phone </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="text"
                                v-model="form.phone"
                                placeholder="05xxxxxxxx"
                                required
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Password </label>
                        <div class="uk-form">
                            <input
                                class="uk-input"
                                type="password"
                                v-model="form.password"
                                placeholder="********"
                                required
                            />
                        </div>
                    </div>

                    <div class="uk-margin-bottom">
                        <label class="input-label"> Confirm Password </label>
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

                    <button
                        type="submit"
                        class="uk-button uk-button-large uk-width-1-1 uk-button-primary"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SignUpPage",
    data: () => ({
        form: {},
        msg: null,
    }),
    methods: {
        async onSubmit() {
            if (this.form.password !== this.form.confirmedPassword) {
                this.msg = "Passwords do not match";
                console.log("Passwords do not match", this.msg);
            } else {
                this.msg = null;
                const message = await this.$store.dispatch(
                    "signup",
                    JSON.stringify(this.form)
                );
                if (message) {
                    this.msg = message;
                } else {
                    this.$router.push("/customer");
                }
            }
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
