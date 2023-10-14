<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="#000000" />
    <NuxtPage />
  </NuxtLayout>
</template>
<script lang="ts" setup>
const { $sentryCaptureException } = useNuxtApp();

onMounted(() => {
  $sentryCaptureException("Test exception");
});
</script>