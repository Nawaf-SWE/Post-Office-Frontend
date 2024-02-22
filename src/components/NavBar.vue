<template>
    <div>
        <nav class="uk-navbar-container">
            <div class="uk-container uk-hidden@m">
                <div uk-navbar="target: !.uk-navbar; align: center">
                    <span
                        class="uk-icon-button uk-margin-top uk-margin-bottom"
                        uk-icon="icon: menu; ratio: 2"
                        uk-toggle="target: #offcanvas-nav-primary"
                    ></span>

                    <div class="uk-navbar-right" v-if="isLoggedIn">
                        <!-- <li class="name"> -->
                        <h5 style="height: 100%" class="name rm-m">
                            {{ user.name }}
                        </h5>
                        <div class="avatar name">
                            {{ user.name[0].toUpperCase() }}
                        </div>
                        <!-- </li> -->
                    </div>

                    <div
                        id="offcanvas-nav-primary"
                        uk-offcanvas="overlay: true"
                    >
                        <div class="uk-offcanvas-bar uk-flex uk-flex-column">
                            <ul
                                class="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical"
                            >
                                <li>
                                    <router-link
                                        to="/"
                                        uk-toggle="target: #offcanvas-nav-primary"
                                        >Home</router-link
                                    >
                                </li>
                                <li v-if="isLoggedIn">
                                    <router-link
                                        to="/package"
                                        uk-toggle="target: #offcanvas-nav-primary"
                                    >
                                        My Packages</router-link
                                    >
                                </li>
                                <li v-if="isLoggedIn">
                                    <router-link
                                        to="/package/new"
                                        uk-toggle="target: #offcanvas-nav-primary"
                                    >
                                        Send a Package
                                    </router-link>
                                </li>
                                <li v-if="isLoggedIn">
                                    <router-link
                                        to="/me"
                                        uk-toggle="target: #offcanvas-nav-primary"
                                    >
                                        My information
                                    </router-link>
                                </li>
                                <li v-else>
                                    <router-link
                                        to="/about"
                                        uk-toggle="target: #offcanvas-nav-primary"
                                        >About</router-link
                                    >
                                </li>

                                <li
                                    v-if="isLoggedIn"
                                    @click="logout"
                                    class="uk-button uk-button-danger"
                                    uk-toggle="target: #offcanvas-nav-primary"
                                >
                                    <span uk-icon="sign-out"> Log out </span>
                                </li>
                                <li v-if="!isLoggedIn">
                                    <router-link
                                        to="/signup"
                                        uk-toggle="target: #offcanvas-nav-primary"
                                        >Signup</router-link
                                    >
                                </li>
                                <li v-if="!isLoggedIn">
                                    <router-link
                                        to="/login"
                                        uk-toggle="target: #offcanvas-nav-primary"
                                        >Login</router-link
                                    >
                                </li>
                                <li class="uk-margin-top">
                                    <form
                                        @submit.prevent="submit"
                                        class="uk-inline"
                                    >
                                        <button
                                            type="submit"
                                            class="uk-form-icon uk-form-icon-flip uk-button uk-button-link"
                                        >
                                            <span uk-icon="search"></span>
                                            <button
                                                id="closer"
                                                uk-toggle="target: #offcanvas-nav-primary"
                                                type="button"
                                                style="display: none"
                                            ></button>
                                        </button>
                                        <input
                                            required
                                            v-model="tracking_no"
                                            class="uk-input"
                                            type="text"
                                            placeholder="tracking no."
                                            aria-label="Clickable icon"
                                        />
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="uk-container uk-visible@m">
                <div uk-navbar="target: !.uk-navbar; align: center">
                    <div class="uk-navbar-left">
                        <ul class="uk-navbar-nav">
                            <li>
                                <router-link to="/">Home</router-link>
                            </li>
                            <li v-if="isLoggedIn">
                                <router-link to="/package">
                                    My Packages</router-link
                                >
                            </li>
                            <li v-if="isLoggedIn">
                                <router-link to="/package/new">
                                    Send a Package
                                </router-link>
                            </li>

                            <li v-if="isLoggedIn">
                                <router-link to="/me">
                                    My information
                                </router-link>
                            </li>
                            <li v-else>
                                <router-link to="/about">About</router-link>
                            </li>
                        </ul>
                    </div>

                    <div class="uk-navbar-right">
                        <ul class="uk-navbar-nav" v-if="isLoggedIn || isAdmin">
                            <li class="name">
                                <h5 class="rm-m">
                                    {{ user?.name ?? admin?.name }}
                                </h5>
                            </li>
                        </ul>
                        <ul class="uk-navbar-nav" v-if="isLoggedIn || isAdmin">
                            <li>
                                <div class="avatar">
                                    {{
                                        user
                                            ? user.name[0].toUpperCase()
                                            : admin.name[0].toUpperCase()
                                    }}
                                </div>
                            </li>
                        </ul>
                        <ul class="uk-navbar-nav" v-if="isLoggedIn || isAdmin">
                            <li>
                                <button
                                    @click="logout"
                                    class="uk-button uk-button-muted"
                                >
                                    <span uk-icon="sign-out"> Log out </span>
                                </button>
                            </li>
                        </ul>
                        <ul
                            class="uk-navbar-nav"
                            v-if="!isLoggedIn && !isAdmin"
                        >
                            <li>
                                <router-link to="/signup">Signup</router-link>
                            </li>
                        </ul>
                        <ul
                            class="uk-navbar-nav"
                            v-if="!isLoggedIn && !isAdmin"
                        >
                            <li>
                                <router-link to="/login">Login</router-link>
                            </li>
                        </ul>
                        <ul
                            class="uk-navbar-nav"
                            v-if="!isLoggedIn && !isAdmin"
                        >
                            <li>
                                <form
                                    @submit.prevent="submit"
                                    class="uk-inline"
                                >
                                    <button
                                        type="submit"
                                        class="uk-form-icon uk-form-icon-flip uk-button uk-button-link"
                                    >
                                        <span uk-icon="search"> </span>
                                    </button>

                                    <input
                                        id="fi"
                                        required
                                        v-model="tracking_no"
                                        class="uk-input"
                                        type="text"
                                        placeholder="tracking no."
                                        aria-label="Clickable icon"
                                    />
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: "NavBar",
    data: () => ({
        tracking_no: null,
    }),
    computed: {
        user() {
            return this.$store.getters.user;
        },
        isLoggedIn() {
            return this.$store.getters.user != null;
        },
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
        submit() {
            document.getElementById("closer").click();
            this.$router.push("/tracking/" + this.tracking_no);
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
