<script setup lang="ts">
import BaseHeroWithoutDescription from "~/components/base/BaseHeroWithoutDescription.vue";

const heroName = "deliveryInstallationPageHeader"
const heroDescription = "toDesignersPageDescription"
const heroImage = "/delivery-and-installation/delivery-installation-bg.webp"
</script>

<template>
  <base-hero-without-description :heroName="heroName" :heroImage="heroImage"/>
  <section class="main-container">
    <div class="lg:px-[255px] mdLg:px-52 md:px-16 lg:pt-24 pt-16 lg:pb-32 pb-20">
      <div class="  ">
        <h3 class="flex pb-4">{{ $t('deliveryInstallationMeasurementTitle') }}</h3>
        <h6 class="lg:pb-10 pb-8">{{ $t('deliveryInstallationMeasurementContent') }}</h6>
      </div>
      <div >
        <h3 class="flex pb-4">{{ $t('deliveryInstallationDeliveryTitle') }}</h3>
        <h6 class="lg:pb-6 pb-4">{{ $t('deliveryInstallationDeliveryContent') }}</h6>
        <h6 class="lg:pb-10 pb-8 otsel">{{ $t('deliveryInstallationDeliveryPrice') }}</h6>
      </div>
      <div>
        <h3 class="flex pb-4">{{ $t('deliveryInstallationInstallationTitle') }}</h3>
        <h6 class="lg:pb-10 pb-8">{{ $t('deliveryInstallationInstallationContent') }}</h6>
      </div>

    </div>

  </section>

</template>

<style scoped>
ol {
  list-style-type: decimal; /* Use decimal numbers for list items */
}

li {
  padding-bottom: 24px
}

.otsel {
  font-weight: normal;
}
</style>