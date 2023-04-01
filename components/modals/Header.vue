<template>
    <div class="header__dropdown bg-white p-[24px] max-w-[1500px] w-[100%] fixed top-[100px] left-[50%] -translate-x-[50%] z-10">
        <div class="grid grid-cols-3 gap-x-8 gap-y-8">
            <div v-for="item in items" :key="item.name" class="flex flex-col items-center">
                <img :src="item.image" alt="item.name" class="w-24 h-24">
                <span class="text-center">{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({items: Array})


</script>
<style scoped>

</style>