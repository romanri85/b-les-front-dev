<script lang="ts" setup>
// const { $sentryCaptureException } = useNuxtApp();
//
// onMounted(() => {
//   $sentryCaptureException("Test exception");
//   throw new Error("Test error")
// });
</script>

<template>
  <NuxtLayout>
    <v-app>
    <NuxtLoadingIndicator color="#000000" />
    <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>
