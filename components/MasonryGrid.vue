<template>
    <div ref="masonry" class="grid">
        <div class="grid-sizer"></div>
        <ul>
            <li v-for="(image, index) in images" :key="index" class="grid-item">
                <img :src="image" @load="onImageLoad" />
            </li>
        </ul>
    </div>
</template>

<!--<script setup>-->
<!--import { ref, onMounted, watch } from 'vue';-->


<!--const props = defineProps({-->
<!--    images: {-->
<!--        type: Array,-->
<!--        required: true,-->
<!--    },-->
<!--});-->

<!--const masonry = ref(null);-->
<!--let loadedImages = ref(0);-->

<!--</script>-->

<!-- Стили сохранены без изменений -->


<!--<style scoped>-->



<!--.grid {-->
<!--    background: #DDD;-->
<!--}-->

<!--/* clear fix */-->
<!--.grid:after {-->
<!--    content: '';-->
<!--    display: block;-->
<!--    clear: both;-->
<!--}-->

<!--/* &#45;&#45;&#45;&#45; .grid-item &#45;&#45;&#45;&#45; */-->

<!--.grid-sizer,-->
<!--.grid-item {-->
<!--    width: 33.333%;-->
<!--}-->

<!--.grid-item {-->
<!--    float: left;-->
<!--}-->

<!--.grid-item img {-->
<!--    display: block;-->
<!--    max-width: 100%;-->
<!--}-->


<!--</style>-->

<style lang="scss">

</style>
