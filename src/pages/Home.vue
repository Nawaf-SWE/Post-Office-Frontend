<template>
    <div uk-scrollspy="cls:uk-animation-fade">
        <div style="position: relative">
            <img :src="require('@/assets/home2.jpg')" class="heroimg" />
            <div class="uk-overlay uk-position-center-left">
                <h1 class="uk-heading-large">Post Office</h1>
                <p class="uk-text-default@l uk-text-xsmall@xsmall">
                    Reliable and efficient transportation services for a
                    cost-effective, fast delivery
                </p>
            </div>
        </div>

        <br />
        <br />
        <br />

        <div class="uk-container">
            <div class="uk-grid uk-child-width-1-4@m uk-flex uk-flex-around">
                <!-- Item 1 -->
                <div
                    class="card uk-flex uk-flex-column uk-flex-middle uk-margin-right-small uk-margin-left-small uk-margin-top"
                >
                    <h3 class="uk-margin-small">No more damaged packages</h3>
                    <img
                        :src="require('@/assets/handled.svg')"
                        alt="No more damaged packages"
                        class="uk-width-small uk-margin-top@s"
                    />
                </div>

                <!-- Item 2 -->
                <div
                    class="card uk-flex uk-flex-column uk-flex-middle uk-margin-right-small uk-margin-left-small uk-margin-top"
                >
                    <h3 class="uk-margin-small">Fragile-proof packaging</h3>
                    <img
                        :src="require('@/assets/fragile.svg')"
                        alt="Fragile-proof packaging"
                        class="uk-width-small uk-margin-top@s"
                    />
                </div>

                <!-- Item 3 -->
                <div
                    class="card uk-flex uk-flex-column uk-flex-middle uk-margin-right-small uk-margin-left-small uk-margin-top"
                >
                    <h3 class="uk-margin-small">
                        Your packages are in safe hands !
                    </h3>
                    <img
                        :src="require('@/assets/nextgen.svg')"
                        alt="Your packages are in safe hands !"
                        class="uk-width-small uk-margin-top@s"
                    />
                </div>
            </div>
        </div>

        <div
            class="uk-grid uk-flex uk-flex-around uk-child-width-1-3@m uk-child-width-1-1"
        >
            <div
                class="card uk-margin-right-small uk-margin-left-small uk-margin-top"
                uk-scrollspy="cls: uk-animation-slide-left; repeat: true"
            >
                <h1 class="uk-heading-medium">Vision</h1>
                <p class="uk-text-large uk-text-left">
                    To exceed our customers’ expectations and to become the
                    leading logistics provider in the industry.
                </p>
            </div>

            <div
                class="card uk-margin-right-small uk-margin-left-small uk-margin-top"
                uk-scrollspy="cls: uk-animation-slide-right; repeat: true"
            >
                <h1 class="uk-heading-medium">Mision</h1>
                <p class="uk-text-large uk-text-left">
                    To provide reliable and cost-effective local logistics
                    solutions to our customers, with a wide network of branches
                    and clients.
                </p>
            </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    </div>
</template>

<script>
export default {
    name: "HomePage",
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

<style scoped>
/* .card {
    box-shadow: 0px 0px 10px rgba(193, 193, 193, 0.5);
    border-radius: 15px;
    border-collapse: collapse;
    overflow: hidden;
    background-color: white;
    padding: 1em;
} */
.heroimg {
    /* transform: scale(0.9); */
    object-fit: cover;
    height: max(100vh, 50vw);
}
.uk-overlay > * {
    font-family: inherit;
    font-weight: 900;
}
.heading {
    font-family: inherit;
    font-weight: 700;
}
</style>
