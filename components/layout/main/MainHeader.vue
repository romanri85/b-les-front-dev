<script setup>
import {Popover, PopoverButton, PopoverPanel} from '@headlessui/vue';
import { baseURL } from "~/config.js";

// set light layout

const props = defineProps({light: {type: Boolean, default: true}})


const collections = await $fetch(`${baseURL}/api/product/collections`).results


const menuRef = ref(null);

const { locale, setLocale } = useI18n()

const textMenuItems = ref([
  {id: 'catalog', title: 'catalog', to: '/catalog', needToShowDropdown: true},
  {id: 'other-elements', title: 'otherElements', to: '/other-elements'},
  {id: 'where-to-buy', title: 'whereToBuy', to: '/where-to-buy'},
  {id: 'doors-in-interiour', title: 'doorsInInterior', to: '/doors-in-interiour'},
  {id: 'about-us', title: 'aboutUs', to: '/about-us'}
])

const iconsMenuItems = [
  {
    id: 'contact-us',
    to: '/search',
    whiteIconPath: '/icons/phone-icon-white.svg',
    blackIconPath: '/icons/phone-icon-black.svg',
    alt: 'phone'
  },
  {
    id: 'favourite',
    to: '/cart',
    whiteIconPath: '/icons/heart-icon-white.svg',
    blackIconPath: '/icons/heart-icon-black.svg',
    alt: 'heart'
  },
  {
    id: 'search',
    to: '/cart',
    whiteIconPath: '/icons/search-icon-white.svg',
    blackIconPath: '/icons/search-icon-black.svg',
    alt: 'search'
  },
]

// props sent to headerModal
const menuItemsProps = {
  "catalog": [
    {
      name: "Versailles",
      image: "/header-modal-img/versailles-modal-img.jpg",
      slug: "/catalog/versailles"
    },
    {
      name: "Classic",
      image: "/header-modal-img/classic-modal-img.jpg",
      slug: "/catalog/classic"

    },
    {
      name: "Modern",
      image: "/header-modal-img/modern-modal-img.jpg",
      slug: "/catalog/modern"
    },
    {
      name: "Premier",
      image: "/header-modal-img/premier-modal-img.jpg",
      slug: "/catalog/premier"
    },
    {
      name: "Rimini",
      image: "/header-modal-img/rimini-modal-img.jpg",
      slug: "/catalog/rimini"
    },
    {
      name:"R-Style",
      image: "/header-modal-img/r-style-modal-img.jpg",
      slug: "/catalog/r-style"
    }

  ],

  "other-elements": [
    {
      name: "Door systems",
      image: "/header-modal-img/door-systems.jpg",
      slug: "/other-items/door-systems"
    },
    {
      "name": "Door hardware",
      "image": "/header-modal-img/door-hardware.jpg",
      "slug": "/other-items/door-hardware"
    },
    {
      "name": "Plinth",
      "image": "/header-modal-img/plinth.jpg",
      "slug": "/other-items/plinth"
    },
    {
      "name": "Delivery and installation",
      "image": "/header-modal-img/delivery-installation.jpg",
      "slug": "/other-items/delivery-and-installation"
    },

  ],
  "about-us": [
    {
      "name": "about us",
      "image": "/header-modal-img/about-us.jpg",
      "slug": "/about-us/about-us"
    },
    {
      "name": "promotions",
      "image": "/header-modal-img/promotions.jpg",
      "slug": "/about-us/promotions"
    },
    {
      "name": "to designers",
      "image": "/header-modal-img/to-designers.jpg",
      "slug": "/about-us/to-designers"
    },
    {
      "name": "to dealers",
      "image": "/header-modal-img/to-dealers.jpg",
      "slug": "/about-us/to-dealers"
    }]
}


const activeItemIndex = ref(null)


const textMenuHovered = ref(false)

function onTextMenuMouseEnter() {
  textMenuHovered.value = true
}

function onTextMenuMouseLeave() {
  textMenuHovered.value = false
  activeItemIndex.value = null
}

function onItemMouseOver(index) {
  if (textMenuHovered.value) {
    activeItemIndex.value = index
  }
}

function onItemMouseLeave() {
  if (!textMenuHovered.value) {
    activeItemIndex.value = null
  }
}

const currentMenuItems = computed(() => {
  if (activeItemIndex.value === null) {
    return [];
  }
  const activeMenuItemKey = true ? textMenuItems.value[activeItemIndex.value].id : null;

  return menuItemsProps[activeMenuItemKey] || [];
});

const switchLocalePath = useSwitchLocalePath()
function toggleLocale() {
  const newLocale = locale.value === 'en' ? 'ru' : 'en'
  setLocale(newLocale)
  // locale.value = locale.value === 'en' ? 'ru' : 'en'

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

      <nav class="nav lg:order-2 lg:block hidden">
        <ul ref="menuRef" :class="light ? 'text-white' : 'text-black'"
            class="menu lg:flex xl:40px lg:gap-x-[30px] xl:h-[100px] lg:h-[86px] h-[60px] justify-between hidden items-center"
            @mouseenter="onTextMenuMouseEnter" @mouseleave="onTextMenuMouseLeave">

          <Popover as="li" v-for="(item, index) in textMenuItems" :key="index"
                   @mouseenter="() => onItemMouseOver(index)" @mouseleave="() => onItemMouseLeave()">
            <PopoverButton>
              <h4>{{ $t(item.title) }}</h4>
            </PopoverButton>

            <div v-if="activeItemIndex === index && currentMenuItems.length !== 0">
              <PopoverPanel static>
                <modals-header-modal :currentMenuItems="currentMenuItems"
                                     :menuItemsProps="menuItemsProps" :menuRef="menuRef"/>
              </PopoverPanel>
            </div>
          </Popover>


        </ul>
      </nav>

      <!--            contact us, favourite, search menu items-->

      <ul  class="flex  xl:gap-[40px] lg:gap-x-[35px] gap-[30px] justify-between   md:order-3 order-2">
        <li v-for="(item, index) in iconsMenuItems" :key="index"
            :class="item.id !== 'favourite' ? 'hidden' : ''" class=" md:inline-block hover:border-b-2 hover:cursor-pointer relative lg:w-[25px] lg:h-[25] md:w-[22px] sm:w-[22px]">
          <img :src="light ? item.whiteIconPath : item.blackIconPath" :alt="item.alt">
        </li>
      </ul>

      <!--            change language menu item-->

      <button type="button" class="lg:block lg:order-4 font-mono text-sm hidden" @click="toggleLocale"><h3  :class="light ? 'text-white' : 'text-black'">{{locale==='en' ? "EN" : "RU" }}</h3></button>
    </div>

  </header>

  <!--    thin line between header and content-->

  <div class="border-b w-full" :class="light ? 'border-white' : 'border-black'"></div>
</template>

<style scoped>

</style>
