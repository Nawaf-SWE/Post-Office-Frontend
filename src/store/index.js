import { createStore } from "vuex";
import { Axios } from "axios";

const ax = new Axios({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    },
});

export default createStore({
    state: {
        user: null,
        admin: null,
    },
    getters: {
        user(state) {
            return state.user;
        },
        admin(state) {
            return state.admin;
        },
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setAdmin(state, payload) {
            state.admin = payload;
        },
    },
    actions: {
        async login({ commit }, payload) {
            const resp = await ax.post("/customers/login", payload);
            const res = await JSON.parse(resp.data);
            if (res.success) {
                localStorage.setItem("token", res.token);
                const resp1 = await ax.get("/customers/me", {
                    headers: {
                        Authorization: "Barrer " + res.token,
                    },
                });
                const res1 = await JSON.parse(resp1.data);
                if (res1.success) {
                    commit("setUser", res1.data);
                    return null;
                } else {
                    return res1.message;
                }
            } else {
                return res.message;
            }
        },

        async me({ commit }) {
            const resp1 = await ax.get("/customers/me", {
                headers: {
                    Authorization: "Barrer " + localStorage["token"],
                },
            });
            const res1 = await JSON.parse(resp1.data);
            if (res1.success) {
                commit("setUser", res1.data);
            }
        },

        async adminMe({ commit }) {
            const resp1 = await ax.get("/admin/me", {
                headers: {
                    Authorization: "Barrer " + localStorage["token"],
                },
            });
            const res1 = await JSON.parse(resp1.data);
            if (res1.success) {
                commit("setAdmin", res1.data);
            }
        },

        async signup({ commit }, payload) {
            console.log(payload);
            const resp = await ax.post("/customers/signup", payload);
            const res = await JSON.parse(resp.data);
            if (res.success) {
                localStorage.setItem("token", res.token);
                const resp1 = await ax.get("/customers/me", {
                    headers: {
                        Authorization: "Barrer " + res.token,
                    },
                });
                const res1 = await JSON.parse(resp1.data);
                if (res1.success) {
                    commit("setUser", res1.data);
                    return null;
                } else {
                    return res1.message;
                }
            } else {
                return res.message;
            }
        },

        async logout({ commit }) {
            commit("setUser", null);
            commit("setAdmin", null);
            localStorage.setItem("token", null);
            localStorage.clear();
        },

        async isAdmin({ commit }, payload) {
            const resp = await ax.post("/admin/login", payload);
            const res = await JSON.parse(resp.data);
            if (res.success) {
                localStorage.setItem("token", res.token);
                const resp1 = await ax.get("/admin/me", {
                    headers: {
                        Authorization: "Barrer " + res.token,
                    },
                });
                const res1 = await JSON.parse(resp1.data);
                if (res1.success) {
                    commit("setAdmin", res1.data);
                    return null;
                } else {
                    return res1.message;
                }
            } else {
                return res.message;
            }
        },
    },
    modules: {},
});
