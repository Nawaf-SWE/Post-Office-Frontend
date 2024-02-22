<template>
    <div class="progress-bar" ref="progressBar"></div>
</template>

<script>
export default {
    name: "ProgressBar",
    mounted() {
        window.addEventListener("scroll", this.updateProgressBar);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.updateProgressBar);
    },
    methods: {
        updateProgressBar() {
            const pageHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (window.pageYOffset / pageHeight) * 100;
            this.$refs.progressBar.style.width = `${scrollProgress}%`;
        },
    },
};
</script>

<style scoped>
.progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background-color: #007bff;
    z-index: 9999;
    transition: width 0.2s;
}
</style>
