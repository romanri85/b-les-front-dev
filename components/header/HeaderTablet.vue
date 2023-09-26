<script setup lang="ts">

// import Header from "~/components/header/Header.vue";
import BaseLogo from "~/components/base/BaseLogo.vue";
import IconsMenuItems from "~/components/header/IconsMenuItems.vue";
import TabletMobileMenu from "~/components/header/TabletMobileMenu.vue";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import {useIsBurgerOpenStore} from "~/stores/isBurgerOpenStore";
import BurgerWhite from "~/components/header/BurgerWhite.vue";
import BurgerBlack from "~/components/header/BurgerBlack.vue";
import { onClickOutside } from '@vueuse/core'

const props = defineProps({light: {type: Boolean}})
const burgerComponent = computed(() => (!open.value && props.light) ? BurgerWhite : BurgerBlack);
const route = useRoute()
const target = ref(null)
const disclosureNumber = ref(0);
const isOpen = ref(false);



onClickOutside(target, (event) =>{
  disclosureNumber.value++
  isOpen.value = false;
})

watch(
  () => route.path,
  (newValue, oldValue) => {
    isOpen.value = false;
  }
)


// function handleBurgerMenuOpen(value: boolean) {
//   isOpen.value = value;
// }

</script>
<template>
  <!--<header class="header relative z-30">-->
  <client-only>
  <div class=""  :class="{ 'overlay': isOpen }"></div> <!-- Add this line -->

<!--  <client-only>-->
    <Disclosure class="z-20" :key="disclosureNumber + route.path" ref="target" as="div" v-slot="{open, close}">

      <div :class="{ 'bg-white': open }">
      <div
          :class="{'bg-white': open}"
          class=" main-container font-mono whitespace-nowrap flex  justify-between items-center">
        <div class="w-[32px]">
          <DisclosureButton @click="isOpen=!isOpen">
            <component :is="burgerComponent" />
          </DisclosureButton>
        </div>
        <NuxtLink to="/">
          <base-logo :light="!open && props.light"/>
        </NuxtLink>
<!--        <pre>{{burgerComponent}}</pre>-->
        <icons-menu-items :light="!open && props.light"/>
      </div>
      <!--    thin line between header and content-->
      <div class="border-b w-full" :class="open ? '' : 'border-white'"></div>
      <!--            burger menu mobile and tablet-->
      <DisclosurePanel class=" w-full">

        <tablet-mobile-menu/>
      </DisclosurePanel>
      </div>
    </Disclosure>
  </client-only>
  <!--</header>-->
</template>

<style scoped>
.overlay {
  position: fixed; /* Fixed position */
  //top: 50%;
  //left: 0;
  width: 100vw; /* Full width */
  height: 100vh; /* Full height */
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: -1; /* Sit on top */
}


</style>