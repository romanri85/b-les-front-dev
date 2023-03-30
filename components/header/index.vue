<script setup>
defineProps({light: Boolean})
</script>
<template>
  <header class="header">
    <div class="container font-mono text-sm h-[100px] grid grid-cols-[228px_15fr_1fr_50px] gap-x-[80px] items-center">
      <img v-if="!light" src="/logo-black.svg" alt="logo" class="header__logo mb-1 hover:cursor-pointer">
      <img v-else src="/logo-white.svg" alt="logo" class="header__logo mb-1 hover:cursor-pointer">
      <nav class="nav">
        <ul class="menu flex justify-between">
          <li class="menu__item">
            <NuxtLink to="/catalog" class="menu__item-link" :class="{ 'text-white': light }">Catalog</NuxtLink>
          </li>
          <li class="menu__item">
            <NuxtLink to="/other-elements" class="menu__item-link" :class="{ 'text-white': light }">Other Elements
            </NuxtLink>
          </li>
          <li class="menu__item">
            <NuxtLink to="/where-to-buy" class="menu__item-link" :class="{ 'text-white': light }">Where To Buy
            </NuxtLink>
          </li>
          <li class="menu__item">
            <NuxtLink to="/doors-in-interiour" class="menu__item-link" :class="{ 'text-white': light }">Doors in
              Interiour
            </NuxtLink>
          </li>
          <li class="menu__item">
            <NuxtLink to="/about-us" class="menu__item-link" :class="{ 'text-white': light }">About Us</NuxtLink>
          </li>
        </ul>

      </nav>
      <ul class="menu-icons flex gap-x-[42px] justify-between">
        <li class="menu-icons__item w-5">
          <img v-if="!light" src="/icons/phone-icon-black.svg" alt="phone icon">
          <img v-else src="/icons/phone-icon-white.svg" alt="phone icon">
        </li>
        <li class="menu-icons__item w-5">
          <img v-if="!light" src="/icons/heart-icon-black.svg" alt="favourite">
          <img v-else src="/icons/heart-icon-white.svg" alt="favourite">
        </li>
        <li class="menu-icons__item w-5">
          <img v-if="!light" src="/icons/search-icon-black.svg" alt="scope icon">
          <img v-else src="/icons/search-icon-white.svg" alt="scope icon">
        </li>
      </ul>
      <p class="block font-mono text-sm" :class="{ 'text-white': light }">RU</p>
    </div>
  </header>
  <div class="border-b w-full"></div>
</template>

<style scoped>
.menu__item {
  @apply inline-block h-[100px] pt-[39px] hover:border-b-2;
}

.menu__item-link {
  @apply relative hover:top-1 hover:cursor-pointer
}

.menu-icons__item {
  @apply inline-block h-[92px] pt-[35px] hover:border-b-2 hover:cursor-pointer relative hover:top-1;
}

</style>