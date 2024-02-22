<template>
    <nav class="uk-navbar-container">
        <div class="uk-container">
            <div uk-navbar="target: !.uk-navbar; align: center">
                <div class="uk-navbar-left" v-if="isAdmin">
                    <ul class="uk-navbar-nav" v-if="isAdmin">
                        <li class="name">
                            <router-link to="/admin/me/">
                                <h5
                                    class="rm-m"
                                    style="text-decoration: underline"
                                >
                                    {{ admin.name }}
                                </h5>
                            </router-link>
                        </li>
                    </ul>
                    <ul class="uk-navbar-nav" v-if="isAdmin">
                        <li>
                            <div class="avatar">
                                {{ admin.name[0].toUpperCase() }}
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="uk-navbar-right">
                    <ul class="uk-navbar-nav" v-if="isAdmin">
                        <li>
                            <button
                                @click="logout"
                                class="uk-button uk-button-muted"
                            >
                                <span uk-icon="sign-out"> Log out </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "AdminNav",
    computed: {
        admin() {
            return this.$store.getters.admin;
        },
        isAdmin() {
            return this.$store.getters.admin != null;
        },
    },
    methods: {
        async logout() {
            await this.$store.dispatch("logout");
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
.avatar {
    background-color: #303134;
    color: aliceblue;
    width: 50px;
    height: 50px;
    border-radius: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: x-large;
}
.rm-m {
    margin: unset !important;
}
.name {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
