<script setup lang="ts">
import TextMenuItems from "~/components/header/TextMenuItems.vue";
import IconsMenuItems from "~/components/header/IconsMenuItems.vue";
import Burger from "~/components/header/Burger.vue";
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/vue'
import {useIsBurgerOpenStore} from "~/stores/isBurgerOpenStore";
import TabletMobileMenu from "~/components/header/TabletMobileMenu.vue";
import Logo from "~/components/base/Logo.vue";

const isBurgerOpenStore = useIsBurgerOpenStore()


// set light layout

defineProps({light: {type: Boolean, default: true}})


const {locale, setLocale} = useI18n()


async function toggleLocale() {

  const newLocale = locale.value === 'en' ? 'ru' : 'en'
  setLocale(newLocale)
  await nextTick()

}


</script>
<template>
  <header class="header relative z-30">
    <client-only>
      <Disclosure v-slot="{open}">
        <div
            :class="{'bg-white': open}"
            class="lg:bg-transparent main-container font-mono whitespace-nowrap flex  justify-between items-center">


          <!--            burger menu-->

          <div class="lg:hidden md:w-[32px] w-[25px]  md:order-1 order-3">
            <DisclosureButton>
              <burger @click="isBurgerOpenStore.toogleIsBurgerOpen"/>
            </DisclosureButton>
          </div>

          <!--            logo-->
          <div class="md:order-2">
            <NuxtLink to="/" class="block lg:hidden">
              <logo :light="!open"/>
            </NuxtLink>
            <NuxtLink to="/" class="hidden lg:block">
              <logo :light="true"/>
            </NuxtLink>
          </div>                <!--                main menu items-->
          <text-menu-items/>

          <!--            contact us, favourite, search menu items-->

          <icons-menu-items class="block lg:hidden" :light="!open"/>
          <icons-menu-items class="hidden lg:flex " :light="true"/>

          <!--            change language menu item-->

          <button type="button" class="lg:block lg:order-4 font-mono text-sm hidden" @click="toggleLocale">
            <h3 :class="light ? 'text-white' : 'text-black'">
              {{ locale === 'en' ? "EN" : "RU" }}
            </h3>
          </button>
        </div>
        <!--    thin line between header and content-->

        <div class="border-b w-full" :class="open ? '' : 'border-white'"></div>

        <!--            burger menu mobile and tablet-->

        <DisclosurePanel class=" w-full lg:hidden">
          <tablet-mobile-menu/>
        </DisclosurePanel>
      </Disclosure>
    </client-only>
  </header>


</template>
<style>

</style>
