<script setup>
import {Popover, PopoverButton, PopoverPanel} from "@headlessui/vue";

defineProps({light: {type: Boolean, default: true}})

const textMenuItems = ref([
    {id: 'catalog', name: 'catalog', slug: '/catalog', needToShowDropdown: true},
    {id: 'other-elements', name: 'otherElements', slug: '/other-elements'},
    {id: 'where-to-buy', name: 'whereToBuy', slug: '/where-to-buy'},
    {id: 'doors-in-interiour', name: 'doorsInInterior', slug: '/doors-in-interiour'},
    {id: 'about-us', name: 'aboutUs', slug: '/about-us'}
])

const menuItemsProps = {
    "catalog": [
        {
            name: 'versailles',
            image: "/header-modal-img/versailles-modal-img.jpg",
            slug: "/catalog/versailles"
        },
        {
            name: 'classic',
            image: "/header-modal-img/classic-modal-img.jpg",
            slug: "/catalog/classic"

        },
        {
            name: 'modern',
            image: "/header-modal-img/modern-modal-img.jpg",
            slug: "/catalog/modern"
        },
        {
            name: 'premier',
            image: "/header-modal-img/premier-modal-img.jpg",
            slug: "/catalog/premier"
        },
        {
            name: 'rimini',
            image: "/header-modal-img/rimini-modal-img.jpg",
            slug: "/catalog/rimini"
        },
        {
            name: 'rStyle',
            image: "/header-modal-img/r-style-modal-img.jpg",
            slug: "/catalog/r-style"
        }

    ],
    "other-elements": [
        {
            "name": "doorSystems",
            "image": "/header-modal-img/door-systems.jpg",
            "slug": "/other-items/door-systems"
        },
        {
            "name": "doorHardware",
            "image": "/header-modal-img/door-hardware.jpg",
            "slug": "/other-items/door-hardware"
        },
        {
            "name": "plinth",
            "image": "/header-modal-img/plinth.jpg",
            "slug": "/other-items/plinth"
        },
        {
            "name": "deliveryAndInstallation",
            "image": "/header-modal-img/delivery-installation.jpg",
            "slug": "/other-items/delivery-and-installation"
        },

    ],
    "about-us": [
        {
            "name": "aboutUs",
            "image": "/header-modal-img/about-us.jpg",
            "slug": "/about-us/about-us"
        },
        {
            "name": "promotions",
            "image": "/header-modal-img/promotions.jpg",
            "slug": "/about-us/promotions"
        },
        {
            "name": "toDesigners",
            "image": "/header-modal-img/to-designers.jpg",
            "slug": "/about-us/to-designers"
        },
        {
            "name": "toDealers",
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
            <Popover as="li" v-for="(item, index) in textMenuItems" :key="index" class="h-full flex hover:border-b-2"
                     @mouseenter="() => textMenuHovered && (activeItemIndex = index)" @mouseleave="() => !textMenuHovered && (activeItemIndex = null)">
                <PopoverButton>
                    <h4>{{ $t(item.name) }}</h4>
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
