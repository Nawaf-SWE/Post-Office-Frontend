<template>
    <tr>
        <td>
            <span class="uk-text-center">
                {{ dateOnly }}
            </span>
        </td>
        <td>
            <span class="uk-text-center">
                {{ branch }}
            </span>
        </td>
        <td>
            <label
                class="uk-text-center uk-label"
                :class="{
                    'uk-label-success':
                        status === 'Delivered' || status === 'Initiated',
                }"
            >
                {{ status }}
            </label>
        </td>
    </tr>
</template>

<script>
export default {
    name: "TrackingRow",
    props: {
        createdAt: String,
        status: String,
        branch: String,
    },

    computed: {
        dateOnly() {
            return this.createdAt.slice(0, 10);
        },
    },
};
</script>
