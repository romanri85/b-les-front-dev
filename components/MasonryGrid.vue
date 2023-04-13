<!-- components/MasonryGrid.vue -->
<template>
    <div ref="masonry" class="viewer">
        <div class="grid-sizer"></div>
        <div
                v-for="(image, index) in images"
                :key="index"
                class="item"
        >
            <img :src="image.path" />
            <div v-if="image.meta.title" class="image-desc">
                {{ image.meta.title }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMasonry } from '~/composables/useMasonry';
import { useNuxtApp } from '#app'; // Updated import statement

const props = defineProps({
    images: {
        type: Array,
        required: true,
    },
});

const masonry = ref(null);
const nuxtApp = useNuxtApp();

onMounted(() => {
    useMasonry(masonry, {
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 10,
        itemSelector: '.item',
    });
});
</script>

<style scoped>
/* Ваши стили из примера */
.viewer {
    display: flex;
    flex-wrap: wrap;
    margin: -5px; /* половина значения gutter */
}

.grid-sizer,
.item {
    width: calc(33.333% - 10px); /* расчет ширины элемента с учетом gutter */
    margin: 5px; /* половина значения gutter */
    box-sizing: border-box;
}

.item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    border-radius: 5px;
    overflow: hidden;
}

.item img {
    width: 100%;
    height: auto;
    display: block;
}

.image-desc {
    padding: 10px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}

</style>
