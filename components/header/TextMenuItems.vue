<script setup lang="js">
import {Popover, PopoverButton, PopoverPanel} from '@headlessui/vue'
import {ChevronDownIcon} from '@heroicons/vue/24/solid'
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import menuItemsProps from '@/data/MenuItemsProps.json'
import TextMenuItems from '@/data/TextMenuItems.json'

defineProps({light: {type: Boolean, default: true}})

const textMenuItems = ref(TextMenuItems)

const activeItemIndex = ref(null)

const textMenuHovered = ref(false)

const borderedItemIndex = ref(null)

const route = useRoute()
const router = useRouter()


const handleClick = async (slug) => {
  activeItemIndex.value = null
  await router.push(slug)

}
watch(
    () => route.path,
    () => {
      activeItemIndex.value = null
    },
)

function onTextMenuMouseLeave() {
  textMenuHovered.value = false
  activeItemIndex.value = null
}

const currentMenuItems = computed(() => {
  if (activeItemIndex.value === null)
    return []

  const activeMenuItemKey = textMenuItems.value[activeItemIndex.value].id
  return menuItemsProps[activeMenuItemKey] || []
})
</script>

<template>
  <nav>
    <ul
        :class="light ? 'text-white' : 'text-black'"
        class="menu lg:flex xl:40px lg:gap-x-[30px] xl:h-[100px] lg:h-[86px] h-[60px] justify-between hidden  items-center"
        @mouseenter="textMenuHovered = true" @mouseleave="onTextMenuMouseLeave"
    >
      <Popover
          v-for="(item, index) in textMenuItems" :key="item.name" as="li"
          class="h-full flex menu-item"
      >
        <PopoverButton class="">
          <div
              class="flex justify-center items-center h-full cursor-default border-b-2 border-transparent"
              :class="[
              borderedItemIndex === index ? 'border-white' : '',
              activeItemIndex === index ? '[&>span]:rotate-180' : '',
              activeItemIndex === index ? '[&>span]:duration-200' : '[&>span]:duration-200',
              light ? 'text-shadow' : '',
            ]"
          >
            <nuxt-link :to="item.slug"
                v-if="item.name !== 'otherElements' && item.name !== 'aboutUs'"

                class="cursor-pointer"
            >
              <h4
                  class="inline-block pr-2 py-1"
                  @mouseenter="() => { textMenuHovered && (activeItemIndex = index); borderedItemIndex = index; }"
                  @mouseleave="() => { !textMenuHovered && (activeItemIndex = null); borderedItemIndex = null; }"
              >
                {{ $t(item.name) }}
              </h4>
            </nuxt-link>


            <h4
                v-else class="inline-block pr-2"
                @mouseenter="() => { textMenuHovered && (activeItemIndex = index); borderedItemIndex = index; }"
                @mouseleave="() => { !textMenuHovered && (activeItemIndex = null); borderedItemIndex = null; }"
            >
              {{ $t(item.name) }}
            </h4>

            <span v-if="item.name === 'otherElements' || item.name === 'aboutUs'">
              <ChevronDownIcon class="w-5 h-5"/>
            </span>
          </div>
        </PopoverButton>
        <!--        <transition -->
        <!--            enter-active-class="transition duration-200 ease-out" -->
        <!--            enter-from-class="-translate-y-full  opacity-0" -->
        <!--            enter-to-class="translate-y-full opacity-100" -->
        <!--            leave-active-class="transition duration-150 ease-in" -->
        <!--            leave-from-class="translate-y-full opacity-100" -->
        <!--            leave-to-class="-translate-y-full opacity-0" -->
        <!--        > -->
        <div v-show="activeItemIndex === index && currentMenuItems.length !== 0">
          <!--          <client-only> -->

          <PopoverPanel static>
            <div class="modal-center">
              <modals-header-modal

                  :light="light"
                  :item-name="item.id"
                  :menu-items-props="menuItemsProps"
                  :active-menu-item-key="item.itemHeader"
              />
            </div>
          </PopoverPanel>

          <!--          </client-only> -->
        </div>
        <!--        </transition> -->
      </Popover>
    </ul>
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
