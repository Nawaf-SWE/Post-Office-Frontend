<template>
    <div class="main">
        <admin-nav></admin-nav>
        <div class="view">
            <ul class="uk-tab">
                <li :class="{ 'uk-active': $route.name == 'CitiesView' }">
                    <router-link :to="{ name: 'CitiesView' }"
                        >Manage Cities</router-link
                    >
                </li>
                <li :class="{ 'uk-active': $route.name == 'Branches' }">
                    <router-link :to="{ name: 'Branches' }"
                        >Manage Branches</router-link
                    >
                </li>
                <li :class="{ 'uk-active': $route.name == 'ManageFees' }">
                    <router-link :to="{ name: 'ManageFees' }"
                        >Manage Fees</router-link
                    >
                </li>
                <li :class="{ 'uk-active': $route.name == 'ManageEmployees' }">
                    <router-link :to="{ name: 'ManageEmployees' }"
                        >Manage Employees</router-link
                    >
                </li>
                <li :class="{ 'uk-active': $route.name == 'ManagePackages' }">
                    <router-link :to="{ name: 'ManagePackages' }"
                        >Manage Packages</router-link
                    >
                </li>
            </ul>
            <router-view style="width: 100%"></router-view>
        </div>
    </div>
</template>

<script>
import AdminNav from "@/components/admin/AdminNav.vue";
export default {
    name: "AdminLayout",
    components: {
        AdminNav,
    },
};
</script>

<style scoped>
.main {
    height: 100%;
}
.view {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
}
.uk-tab {
    display: flex;
    flex-direction: column;
    height: calc(100% - 1rem);
    margin-top: 1rem;
}
</style>
