<script lang="ts" setup>
// const { $sentryCaptureException } = useNuxtApp();
//
// onMounted(() => {
//   $sentryCaptureException("Test exception");
//   throw new Error("Test error")
// });

useHead({
  script: [
    {
      src: `//code.jivo.ru/widget/NHih7Ka8k8`,
      async: true,
    },
  ],
  link: [{ rel: 'icon', type: 'image/png', href: 'favicon.ico' }]
})
</script>

<template>
  <NuxtLayout>
    <v-app id="app">
      <NuxtLoadingIndicator color="#000000"/>
      <NuxtPage/>
    </v-app>
  </NuxtLayout>
</template>
<style>
#app {
  outline: none;
}
</style>