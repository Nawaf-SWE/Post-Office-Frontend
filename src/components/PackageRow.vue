<template>
    <tr>
        <td>
            <span class="uk-text-center">
                {{ property }}
            </span>
        </td>
        <td>
            <span class="uk-text-center">
                {{ value }}
            </span>
        </td>
    </tr>
</template>

<script>
export default {
    name: "PackageRow",
    props: {
        property: String,
        value: String,
    },
};
</script>
