<template>
    <div class="main">
        <nav-bar></nav-bar>
        <router-view></router-view>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
    name: "HomeLayout",
    components: {
        NavBar,
    },
};
</script>
