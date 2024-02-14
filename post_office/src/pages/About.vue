<template>
    <div>
        <h1>About Page</h1>
    </div>
</template>

<script>
export default {
    name: "AboutPage",
    data: () => ({
        users: [],
    }),
    created() {},
    mounted() {},
    methods: {
        goToUser() {},
    },
    watch: {
        user(n, o) {
            if (n != o) {
                console.log(n, o);
            }
        },
    },
};
</script>
