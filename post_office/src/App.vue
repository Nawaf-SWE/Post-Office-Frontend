<template>
    <div class="main">
        <router-view></router-view>
        <progress-bar></progress-bar>
    </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import ProgressBar from "@/components/ProgressBar.vue";
export default {
    name: "App",
    components: {
        ProgressBar,
    },

    async beforeCreate() {
        if (localStorage["token"]) {
            if ((await jwt_decode(localStorage["token"]).role) === "admin") {
                await this.$store.dispatch("adminMe");
                console.log("ADMIN ENCOUNTERED!");
            } else await this.$store.dispatch("me");
        }
    },
};
</script>

<style>
:root {
    --uk-breakpoint-s: unset !important;
    --uk-breakpoint-m: unset !important;
    --uk-breakpoint-l: unset !important;
    --uk-breakpoint-xl: unset !important;
    --primary-color: #1e87f0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
}
html {
    background: #f8f8f8;
}
body {
    height: 100vh;
}
.main {
    height: 100vh;
}
.card {
    box-shadow: 0px 0px 10px rgba(193, 193, 193, 0.5);
    border-radius: 15px;
    border-collapse: collapse;
    overflow: hidden;
    background: white;
    padding: 1em;
}
/* Scroll bar styles */
::-webkit-scrollbar {
    width: 20px;
    position: absolute;
    z-index: 1000;
    display: none;
}

::-webkit-scrollbar-track {
    background-color: transparent;
}

::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
    z-index: 1001;
}
::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
}
.input-label {
    display: block;
    font-size: medium;
    font-weight: bold;
    text-align: start;
    width: 100%;
}
.uk-input::placeholder {
    font-size: medium;
}
.uk-input {
    border-radius: 500px;
    font-size: medium;
}
.uk-select {
    border-radius: 500px;
    font-size: medium;
}
.success-bg {
    background-color: rgb(0, 227, 0) !important;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
}
html {
    overflow-y: scroll;
}
</style>
