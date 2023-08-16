<script setup lang="ts">

import {useIsBurgerOpenStore} from "~/stores/isBurgerOpenStore";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import TabletMobileMenu from "~/components/header/TabletMobileMenu.vue";
import IconsMenuItems from "~/components/header/IconsMenuItems.vue";
import Logo from "~/components/base/Logo.vue";
import Burger from "~/components/header/Burger.vue";

const isBurgerOpenStore = useIsBurgerOpenStore()

const {locale, setLocale} = useI18n()


</script>

<template>
  <!--  <header class="header relative z-30">-->

<!--  <client-only>-->
    <Disclosure v-slot="{open}">
      <div
          :class="{'bg-white': open}"
          class="lg:bg-transparent main-container font-mono whitespace-nowrap flex  justify-between items-center">
        <!--            logo-->
        <NuxtLink to="/" class="block lg:hidden">
          <logo :light="!open"/>
        </NuxtLink>
        <!--            contact us, favourite, search menu items-->
        <div class="flex gap-8 items-center">
          <icons-menu-items :light="!open"/>
          <!--            burger menu-->
          <div class="w-[25px]  ">
            <DisclosureButton>
              <burger @click="isBurgerOpenStore.toogleIsBurgerOpen"/>
            </DisclosureButton>
          </div>
        </div>
      </div>
      <!--    thin line between header and content-->
      <div class="border-b w-full" :class="open ? '' : 'border-white'"></div>

      <!--            burger menu mobile and tablet-->

      <DisclosurePanel class=" w-full">
        <tablet-mobile-menu/>
      </DisclosurePanel>
    </Disclosure>
<!--  </client-only>-->
  <!--  </header>-->
</template>

<style scoped>

</style>