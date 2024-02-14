<template>
    <div class="uk-grid uk-flex-around uk-flex">
        <PackageCard
            v-for="(pkg, index) in packageList"
            :key="index"
            :receiver_name="pkg.receiver_name"
            :receiver_phone="pkg.receiver_phone"
            :receiver_email="pkg.receiver_email ?? 'not provided'"
            :receiver_building_no="pkg.receiver_building_no"
            :receiver_postal_code="pkg.receiver_postal_code"
            :receiver_street="pkg.receiver_street"
            :receiver_branch_id="pkg.receiver_branch_id"
            :trackingNo="pkg.tracking_no"
            :weight="pkg.weight"
            :shipping_type="pkg.shipping_type"
            :cost="pkg.cost"
            :package_category="pkg.package_category"
            :createdAt="pkg.createdAt"
        ></PackageCard>
    </div>
</template>

<script>
import PackageCard from "@/components/Customer/PackageCard.vue";
import axiosHandler from "@/middlewares/axiosHandler";
export default {
    name: "CustomerPackages",
    components: {
        PackageCard,
    },
    data: () => ({
        packageList: [],
    }),

    async beforeCreate() {
        this.packageList = [];
        // FIXME: limit and offset
        let temp = await axiosHandler(
            "GET",
            `customers/packages?limit=100&offset=0`
        );
        if (temp?.success) {
            this.packageList = temp.data;
        }
    },
};
</script>
