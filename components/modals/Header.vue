<template>
    <div class="header__dropdown bg-white p-[24px] container fixed top-[150px] left-[50%] -translate-x-[50%] z-10">
        <div class="grid grid-cols-3 gap-x-8 gap-y-8">
            <div v-for="item in items" :key="item.name" class="flex flex-col items-center">
                <img :src="item.image.replace(/^http:\/\/localhost:8000/, 'http://64.225.66.244')" alt="collection" class="xl:w-[416px] xl:h-[236px] lg:w-[407px] lg:h-[235px]">
                <h3 class="text-center underline">{{item.name}}</h3>
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