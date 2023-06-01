<template>
    <div v-show="false"></div>
</template>
<script setup>
import {watch} from "vue";

const emit = defineEmits(["show", "hide"]);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
});

watch(
    () => props.show,
    (show) => {
        if (show) {
            emit("show");
        } else {
            emit("hide");
        }
    }
);
</script>