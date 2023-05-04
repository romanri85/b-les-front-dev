<script setup>
import {Popover, PopoverButton, PopoverPanel} from "@headlessui/vue";

defineProps({light: {type: Boolean, default: true}})

const textMenuItems = ref([
    {id: 'catalog', title: 'catalog', to: '/catalog', needToShowDropdown: true},
    {id: 'other-elements', title: 'otherElements', to: '/other-elements'},
    {id: 'where-to-buy', title: 'whereToBuy', to: '/where-to-buy'},
    {id: 'doors-in-interiour', title: 'doorsInInterior', to: '/doors-in-interiour'},
    {id: 'about-us', title: 'aboutUs', to: '/about-us'}
])

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
function onTextMenuMouseLeave() {
    textMenuHovered.value = false
    activeItemIndex.value = null
}

const currentMenuItems = computed(() => {
    if (activeItemIndex.value === null) {
        return [];
    }
    const activeMenuItemKey = true ? textMenuItems.value[activeItemIndex.value].id : null;

    return menuItemsProps[activeMenuItemKey] || [];
});
</script>
<template>
    <nav class="nav lg:order-2 lg:block hidden">
        <ul ref="menuRef" :class="light ? 'text-white' : 'text-black'"
            class="menu lg:flex xl:40px lg:gap-x-[30px] xl:h-[100px] lg:h-[86px] h-[60px] justify-between hidden items-center"
            @mouseenter="textMenuHovered = true" @mouseleave="onTextMenuMouseLeave">
            <Popover as="li" v-for="(item, index) in textMenuItems" :key="index"
                     @mouseenter="() => textMenuHovered && (activeItemIndex = index)" @mouseleave="() => !textMenuHovered && (activeItemIndex = null)">
                <PopoverButton>
                    <h4>{{ $t(item.title) }}</h4>
                </PopoverButton>

                <div v-if="activeItemIndex === index && currentMenuItems.length !== 0">
                    <PopoverPanel static>
                        <modals-header-modal :currentMenuItems="currentMenuItems"
                                             :menuItemsProps="menuItemsProps"/>
                    </PopoverPanel>
                </div>
            </Popover>
        </ul>
    </nav>
</template>
