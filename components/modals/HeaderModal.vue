<template>
<!--    <div class="container fixed z-10 top-[100px] left-[50%] -translate-x-[50%] w-[100%] h-[50px]"></div>-->
    <div class="bg-white p-[24px] container fixed top-[100px] left-[50%] -translate-x-[50%] z-10">
        <div class="grid grid-cols-3 gap-x-[20px] gap-y-8">
            <div v-for="item in items" :key="item.name" class="flex flex-col items-center">

<!--                Collection image-->

                <img :src="item.image" alt="collection" class="xl:w-[416px] xl:h-[236px] lg:w-[407px] lg:h-[235px]">

<!--                Collection name-->

                <h3 class="text-center underline">{{ item.name }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    items: {
        type: Array,
    },
})


</script>
<style scoped>

</style>