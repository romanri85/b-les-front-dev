<script setup>
import TextMenuItems from "~/components/header/TextMenuItems.vue";
import IconsMenuItems from "~/components/header/IconsMenuItems.vue";

// set light layout

defineProps({light: {type: Boolean, default: true}})

const menuRef = ref(null);

const {locale, setLocale} = useI18n()

function toggleLocale() {
    const newLocale = locale.value === 'en' ? 'ru' : 'en'
    setLocale(newLocale)
}
</script>
<template>
    <header class="header relative z-20">
        <div class="font-mono main-container whitespace-nowrap flex  justify-between lg:gap-x-[55px] xl:gap-x-[80px] mt-1 items-center">

            <!--            burger menu-->

            <img src="/icons/burger-menu-icon.svg" class="lg:hidden md:w-[32px] w-[25px]  md:order-1 order-3"
                 alt="burger-menu">

            <!--            logo-->

            <img :src="light ? '/logo-white.svg' : '/logo-black.svg'" alt="logo"
                 class="hover:cursor-pointer xl:w-[246px] lg:w-[232px]  md:w-[182px] sm:w-[166px] lg:order-1 md:order-2 order-1">

            <!--                main menu items-->
            <text-menu-items/>

            <!--            contact us, favourite, search menu items-->

            <icons-menu-items/>

            <!--            change language menu item-->

            <button type="button" class="lg:block lg:order-4 font-mono text-sm hidden" @click="toggleLocale"><h3
                    :class="light ? 'text-white' : 'text-black'">{{ locale === 'en' ? "EN" : "RU" }}</h3></button>
        </div>

    </header>

  <!--    thin line between header and content-->

    <div class="border-b w-full" :class="light ? 'border-white' : 'border-black'"></div>
</template>
