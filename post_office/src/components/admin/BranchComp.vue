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
        <div class="">
            <div class="uk-text-left uk-text-muted">Location</div>

            <map-box
                style="
                    width: 300px !important;
                    height: 300px !important;
                    transform: unset !important;
                "
                :latitude="this.lat"
                :longitude="this.lng"
                :id="this.id"
            ></map-box>
        </div>
    </div>
    <!-- </div>
    <div class="card uk-child-width-1-1 uk-margin">
        <div class="uk-text-left uk-text-muted">English name</div>

        <div class="uk-text-large uk-text-left uk-text-bold">
            {{ name_en }}
        </div>
        <div class="uk-text-left uk-text-muted">Arabic name</div>
        <div class="uk-text-large uk-text-left uk-text-bold">
            {{ name_ar }}
        </div>
    </div> -->
</template>

<script>
import MapBox from "./MapBox.vue";
export default {
    name: "BranchComp",
    props: {
        name_en: String,
        name_ar: String,
        id: Number,
        lng: String,
        lat: String,
    },
    components: {
        MapBox,
    },
};
</script>
