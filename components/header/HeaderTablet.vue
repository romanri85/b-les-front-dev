<script setup lang="ts">

// import Header from "~/components/header/Header.vue";
import Logo from "~/components/base/Logo.vue";
import IconsMenuItems from "~/components/header/IconsMenuItems.vue";
import TabletMobileMenu from "~/components/header/TabletMobileMenu.vue";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import Burger from "~/components/header/Burger.vue";
import {useIsBurgerOpenStore} from "~/stores/isBurgerOpenStore";

const isBurgerOpenStore = useIsBurgerOpenStore()


</script>
<template>

  <!--<header class="header relative z-30">-->

<!--  <client-only>-->
    <Disclosure v-slot="{open}">
      <div
          :class="{'bg-white': open}"
          class=" main-container font-mono whitespace-nowrap flex  justify-between items-center">
        <div class="w-[32px]">
          <DisclosureButton>
            <Burger @click="isBurgerOpenStore.toogleIsBurgerOpen"/>
          </DisclosureButton>
        </div>
        <NuxtLink to="/">
          <logo :light="!open"/>
        </NuxtLink>

        <icons-menu-items :light="!open"/>
      </div>
      <!--    thin line between header and content-->
      <div class="border-b w-full" :class="open ? '' : 'border-white'"></div>
      <!--            burger menu mobile and tablet-->
      <DisclosurePanel class=" w-full">
        <tablet-mobile-menu/>
      </DisclosurePanel>
    </Disclosure>
<!--  </client-only>-->
  <!--</header>-->
</template>

<style scoped>

</style>