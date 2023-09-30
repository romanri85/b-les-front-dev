<template>
<!--<client-only>-->
<!--    collections if catalog chosen-->

  <div ref="menuRef"  class="text-black lg:absolute lg:top-[85px] lg:left-[50%] lg:-translate-x-[50%] w-[100%] h-[65px] flex justify-center items-center">
    <h3 :class="{'lg:text-white': props.light, 'lg:text-black': !props.light}">
      {{ $t(props.activeMenuItemKey) }}
    </h3>
  </div>
<!--    <div v-else ref="menuRef"  class=" lg:fixed top-[85px] left-[50%] -translate-x-[50%] w-[100%] h-[65px] " ></div>-->

<!--    modal-->
    <div  class="pb-10 lg:pb-0 lg:bg-lightGrey lg:p-[48px] lg:absolute  lg:top-[150px] lg:left-[50%] lg:shadow-md lg:shadow-primaryDark lg:-translate-x-[50%] lg:w-1/2 w-full" >
        <div class="pb-10 md:pb-0 lg:pb-10 lg:grid lg:grid-cols-3 flex flex-wrap justify-start gap-x-5 gap-y-8  w-full max-w-full">
            <div v-for="item in props.currentMenuItems" :key="item.name" class="lg:flex lg:max-w-screen-lg text-center max-w-[30%] lg:flex-col items-center">
              <NuxtLink :to="props.activeMenuItemKey === 'collections' ? `/catalog?collection=${item.id}` : item.slug">
                <nuxt-img sizes="sm:100vw md:20vw lg:100vw" quality="50" :src="item.image" placeholder alt="collection" class="h-auto object-contain"/>
                <primary-button-small class="text-center text-black mt-8"><h4>{{ $t(item.name) }}</h4></primary-button-small>
              </NuxtLink>
            </div>
        </div>
    </div>
<!--</client-only>-->
</template>

<script setup lang="ts">
import PrimaryButtonSmall from "~/components/buttons/PrimaryButtonSmall.vue";
const props = defineProps({
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
    light: {
        type: Boolean,
    },


});



</script>
