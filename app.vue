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
    <NuxtLoadingIndicator color="#000000" />
    <NuxtPage />
  </NuxtLayout>
</template>
