<script setup lang="js">
import {Popover, PopoverButton, PopoverPanel} from "@headlessui/vue";
import TextMenuItems from "@/data/TextMenuItems.json"
import menuItemsProps from "@/data/MenuItemsProps.json"
import {ChevronDownIcon} from '@heroicons/vue/24/solid'
import {ref} from "vue";
import {useRoute} from "vue-router";

defineProps({light: {type: Boolean, default: true}})


const textMenuItems = ref(TextMenuItems)

const activeItemIndex = ref(null)

const textMenuHovered = ref(false)

const borderedItemIndex = ref(null);

const route = useRoute()

watch(
    () => route.path,
    (newValue, oldValue) => {
      activeItemIndex.value = null
    })

function onTextMenuMouseLeave() {
  textMenuHovered.value = false
  activeItemIndex.value = null
}

const currentMenuItems = computed(() => {
  if (activeItemIndex.value === null) {
    return [];
  }
  const activeMenuItemKey = textMenuItems.value[activeItemIndex.value].id;
  return menuItemsProps[activeMenuItemKey] || [];
});


</script>
<template>
  <nav>
    <ul ref="menuRef" :class="light ? 'text-white' : 'text-black'"
        class="menu lg:flex xl:40px lg:gap-x-[30px] xl:h-[100px] lg:h-[86px] h-[60px] justify-between hidden  items-center"
        @mouseenter="textMenuHovered = true" @mouseleave="onTextMenuMouseLeave">
      <Popover v-for="(item, index) in textMenuItems" :key="item.name" as="li"
               class="h-full flex menu-item">
        <PopoverButton class="">
          <div class="flex justify-center items-center h-full cursor-default border-b-2 border-transparent"
               :class="[
      borderedItemIndex === index ? 'border-white' : '',
      activeItemIndex === index ? '[&>span]:rotate-180' : '',
      activeItemIndex === index ? '[&>span]:duration-200' : '[&>span]:duration-200',
      light ? 'text-shadow' : ''
    ]">
            <NuxtLink
                v-if="item.name !== 'otherElements' && item.name !== 'aboutUs'"
                :to="item.slug"
                @click.native="activeItemIndex = null">
              <h4 class="inline-block pr-2 py-1"
                  @mouseenter="() => { textMenuHovered && (activeItemIndex = index); borderedItemIndex = index; }"
                  @mouseleave="() => { !textMenuHovered && (activeItemIndex = null); borderedItemIndex = null; }">
                {{ $t(item.name) }}
              </h4>
            </NuxtLink>

            <h4 v-else class="inline-block pr-2"
                @mouseenter="() =>{ textMenuHovered && (activeItemIndex = index); borderedItemIndex = index;}"
                @mouseleave="() => {!textMenuHovered && (activeItemIndex = null); borderedItemIndex = null;}">
              {{ $t(item.name) }}
            </h4>

            <span v-if="item.name === 'otherElements' || item.name === 'aboutUs'">
                <ChevronDownIcon class="w-5 h-5"/>
            </span>
          </div>
        </PopoverButton>

        <div v-if="activeItemIndex === index && currentMenuItems.length !== 0">
                      <client-only>

          <PopoverPanel static>
            <transition enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
            <modals-header-modal :currentMenuItems="currentMenuItems"
                                 :light="light"

                                 :menuItemsProps="menuItemsProps"
                                 :activeMenuItemKey="item.itemHeader"/>
            </transition>
          </PopoverPanel>
                                    </client-only>

        </div>
      </Popover>


    </ul>
    <div v-for="menuItem in menuItemsProps.catalog" :key="menuItem.name">
      <nuxt-img :src="menuItem.image" :alt="menuItem.name" class="hidden"/>
    </div>
    <div v-for="menuItem in menuItemsProps['other-elements']" :key="menuItem.name">
      <nuxt-img :src="menuItem.image" :alt="menuItem.name" class="hidden"/>
    </div>
    <div v-for="menuItem in menuItemsProps['about-us']" :key="menuItem.name">
      <nuxt-img :src="menuItem.image" :alt="menuItem.name" class="hidden"/>
    </div>



  </nav>
</template>
<style scoped>


.menu-item:hover .arrow {
  position: relative;
  top: 0.15rem;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

</style>
