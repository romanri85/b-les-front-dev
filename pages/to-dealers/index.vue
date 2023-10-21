<script setup lang="ts">
import BaseHeroWithoutDescription from '~/components/base/BaseHeroWithoutDescription.vue'

const heroName = 'toDealersPageHeader'
const heroImage = '/toDealers/toDealers-bg.webp'
</script>

<template>
  <Head>
    <title>Брянский лес - Дилерам</title>
  </Head>
  <BaseHeroWithoutDescription :hero-name="heroName" :hero-image="heroImage" />
  <section class="main-container">
    <div class="lg:px-[255px] mdLg:px-52 md:px-16  lg:pt-24 pt-16 lg:pb-32 pb-20">
      <h5 class="lg:pb-6 pb-4">
        {{ $t('toDealersPageDescription') }}
      </h5>
      <h5 class="lg:pb-10 pb-8">
        {{ $t('toDealersInvitation') }}
      </h5>
      <h3 class="flex justify-center pb-8">
        {{ $t('toDealersContactsTitle') }}
      </h3>

      <h5 class="bold pb-2">
        {{ $t('toDealersPhoneNumber') }}
      </h5>
      <h5 class="bold">
        e-mail: ponamarev@b-les.com
      </h5>
    </div>
  </section>
</template>

<style scoped>
.bold{
  font-weight: normal;
}
</style>
