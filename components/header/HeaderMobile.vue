<script setup lang="ts">
// import Header from "~/components/header/Header.vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { onClickOutside } from '@vueuse/core'
import BaseLogo from '~/components/base/BaseLogo.vue'
import IconsMenuItems from '~/components/header/IconsMenuItems.vue'
import TabletMobileMenu from '~/components/header/TabletMobileMenu.vue'
import { useIsContactUsOpenStore } from '~/stores/isContactUsOpenStore'
import BurgerWhite from '~/components/header/BurgerWhite.vue'
import BurgerBlack from '~/components/header/BurgerBlack.vue'

const props = defineProps({ light: { type: Boolean } })

const isContactUsOpenStore = useIsContactUsOpenStore()

const burgerComponent = computed(() => (!open.value && props.light) ? BurgerWhite : BurgerBlack)
const route = useRoute()
const target = ref(null)
const disclosureNumber = ref(0)
const isOpen = ref(false)

function closeBurger() {
  isOpen.value = false
  disclosureNumber.value++
}

onClickOutside(target, () => {
  if (isOpen.value && !isContactUsOpenStore.isContactUsModalOpen) {
    disclosureNumber.value++
    isOpen.value = false
  }
})

watch(
  () => route.path,
  () => {
    isOpen.value = false
  },
)

// function handleBurgerMenuOpen(value: boolean) {
//   isOpen.value = value;
// }
</script>

<template>
  <!-- <header class="header relative z-30"> -->
  <client-only>
    <div class="" :class="{ overlay: isOpen }" /> <!-- Add this line -->

    <Disclosure :key="disclosureNumber + route.path" ref="target" v-slot="{ open }" class="z-20" as="div">
      <div :class="{ 'bg-white': open }">
        <div
          :class="{ 'bg-white': open }"
          class=" main-container font-mono whitespace-nowrap flex  justify-between items-center"
        >
          <div class="w-[32px]">
            <DisclosureButton @click="isOpen = !isOpen">
              <component :is="burgerComponent" />
            </DisclosureButton>
          </div>
          <NuxtLink to="/">
            <BaseLogo :light="!open && props.light" />
          </NuxtLink>
          <!--        <pre>{{burgerComponent}}</pre> -->
          <IconsMenuItems :light="!open && props.light" />
        </div>
        <!--    thin line between header and content -->
        <div class="border-b w-full" :class="open ? '' : 'border-white'" />
        <!--            burger menu mobile and tablet -->
        <transition
          enter-active-class="transition ease-out duration-500"
          enter-from-class="-translate-y-20 opacity-0"
          enter-to-class=" translate-y-0 opacity-100"
          leave-active-class="transition ease-in duration-500"
          leave-from-class=" translate-y-0 opacity-100"
          leave-to-class=" -translate-y-20 opacity-0"
        >
          <DisclosurePanel class=" w-full">
            <TabletMobileMenu @close-burger="closeBurger" />
          </DisclosurePanel>
        </transition>
      </div>
    </Disclosure>
  </client-only>
  <!-- </header> -->
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
.translate-y--100 {
  transform: translateY(-100%);
}
.translate-y-0 {
  transform: translateY(0);
}
</style>
