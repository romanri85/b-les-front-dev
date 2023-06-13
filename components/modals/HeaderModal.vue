<template>

<!--    collections if catalog chosen-->
    <div ref="menuRef"  class="lg:absolute  lg:top-[85px] lg:left-[50%] lg:-translate-x-[50%] w-[100%] h-[65px] flex justify-center items-center" >
        <h3 class="lg:text-white text-black">{{ $t(activeMenuItemKey) }}</h3></div>
<!--    <div v-else ref="menuRef"  class=" lg:fixed top-[85px] left-[50%] -translate-x-[50%] w-[100%] h-[65px] " ></div>-->

<!--    modal-->
    <div  class=" lg:bg-lightGrey lg:p-[48px] lg:absolute  lg:top-[150px] lg:left-[50%] lg:shadow-md lg:shadow-primaryDark lg:-translate-x-[50%] lg:w-1/2 w-full" >
        <div class="lg:grid lg:grid-cols-3 flex flex-wrap justify-start gap-x-5 gap-y-8  w-full max-w-full">
            <div v-for="item in currentMenuItems" :key="item.name" class="lg:flex lg:max-w-screen-lg text-center max-w-[30%] lg:flex-col items-center">
                <nuxt-img pref sizes="sm:100vw md:20vw lg:100vw" quality="50" :src="item.image" alt="collection" class="  h-auto object-contain"/>
                <primary-button-small class="text-center text-black mt-2">{{ $t(item.name) }}</primary-button-small>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import PrimaryButtonSmall from "~/components/buttons/PrimaryButtonSmall.vue";

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
    activeMenuItemKey: {
        type: String,
    },


});



</script>
