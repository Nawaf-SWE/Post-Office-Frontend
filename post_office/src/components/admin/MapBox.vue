<template>
    <div :id="`map` + this.id"></div>
</template>

<script>
const L = require("leaflet");
import "leaflet/dist/leaflet.css";

export default {
    props: {
        latitude: String,
        longitude: String,
        id: Number,
    },
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            const map = L.map("map" + this.id).setView(
                [this.latitude, this.longitude],
                16
            );

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "Map data &copy; OpenStreetMap contributors",
            }).addTo(map);
            L.marker([this.latitude, this.longitude]).addTo(map);
        },
    },
    created() {
        L.Marker.prototype.options.icon = L.icon({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41],
        });
    },
};
</script>
