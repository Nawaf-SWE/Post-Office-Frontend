<template>
    <div class="">
        <div class="">
            <div class="uk-text-left uk-text-muted">English name</div>
            <div class="uk-text-large uk-text-left uk-text-bold">
                {{ name_en }}
            </div>
        </div>
        <div class="">
            <div class="uk-text-left uk-text-muted">Arabic name</div>
            <div class="uk-text-large uk-text-left uk-text-bold">
                {{ name_ar }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CityComp",
    props: {
        name_en: String,
        name_ar: String,
        id: Number,
    },
};
</script>
<style scoped>
@media only screen and (max-width: 750px) {
    .uk-text-large,
    .uk-text-left {
        font-size: 14px;
    }
}
.pad {
    /* padding-left: 0 !important; */
    padding: 10px 15px !important;
}
.uk-grid {
    padding-left: 30px !important;
}
</style>
