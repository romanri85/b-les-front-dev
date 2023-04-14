<template>
    <div ref="masonry" class="grid">
        <div class="grid-sizer"></div>
        <div v-for="(image, index) in images" :key="index">
            <div class="grid-item">
                <img :src="image" @load="onImageLoad" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useMasonry } from '~/composables/useMasonry';

const props = defineProps({
    images: {
        type: Array,
        required: true,
    },
});

const masonry = ref(null);
let loadedImages = ref(0);

const onGridMounted = async () => {
    await useMasonry(masonry, {
        itemSelector: '.grid-item',
        columnWidth: 100,
        percentPosition: true,
    });
};

const onImageLoad = () => {
    console.log('Image loaded');
    loadedImages.value++;

    if (loadedImages.value === props.images.length) {
        onGridMounted();
    }
};

onMounted(() => {
    if (props.images.length === 0) {
        onGridMounted();
    }
});
</script>

<!-- Стили сохранены без изменений -->


<style scoped>



.grid {
    background: #DDD;
}

/* clear fix */
.grid:after {
    content: '';
    display: block;
    clear: both;
}

/* ---- .grid-item ---- */

.grid-sizer,
.grid-item {
    width: 33.333%;
}

.grid-item {
    float: left;
}

.grid-item img {
    display: block;
    max-width: 100%;
}


</style>
