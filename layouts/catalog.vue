<template>
  <Header :light="true"/>
  <slot/>
</template>

<script>

// const data = await $fetch(`${baseURL}/api/product/collections`)
// const collections = data.results
</script>
<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 1s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>