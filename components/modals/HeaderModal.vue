<template>

<!--    collections if catalog chosen-->
    <div v-if="currentMenuItems.length === 6" ref="menuRef"  class=" fixed z-10 top-[85px] left-[50%] -translate-x-[50%] w-[100%] h-[65px] flex justify-center items-center" >Collections</div>
    <div v-else ref="menuRef"  class=" fixed z-10 top-[85px] left-[50%] -translate-x-[50%] w-[100%] h-[65px] " ></div>

<!--    modal-->
    <div ref="menuRef" class="bg-white p-[16px] fixed top-[150px] left-[50%] -translate-x-[50%] z-10" >
        <div class="grid grid-cols-3 gap-x-[20px] gap-y-4">
            <div v-for="item in currentMenuItems" :key="item.name" class="flex flex-col items-center">
                <img :src="item.image" alt="collection" class="xl:w-[416px] lg:w-[407px] lg:h-auto object-contain">
                <h3 class="text-center underline text-black mt-2">{{ item.name }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    currentMenuItems: {
        type: Array,
        default: () => [],
    },
    menuItemsProps: {
        type: Object,
        default: () => ({}),
    },
    menuRef: {
        type: Object,
    },


});

const menuWidth = computed(() => {
    return menuRef.value?.$el.offsetWidth || 0;
});

</script>
<style scoped>

</style>