import { createApp } from "vue";
import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit";
const UIkit = require("uikit");
const Icons = require("uikit/dist/js/uikit-icons");

UIkit.use(Icons);
import App from "./App.vue";
import router from "./router";
import store from "./store";

// // import Vue from "vue";
// import Axios from "axios";

// // Create a shared Axios instance with common configuration
// const ax = Axios.create({
//     baseURL: "http://localhost:5000",
//     headers: {
//         Authorization: "Bearer " + localStorage["token"],
//     },
// });
// console.warn("main.js", localStorage);

createApp(App).use(store).use(router).mount("#app");
