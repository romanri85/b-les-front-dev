<script setup lang="ts">
import BaseHeroWithoutDescription from '~/components/base/BaseHeroWithoutDescription.vue'

const heroName = 'toDesignersHeader'
const heroDescription = 'toDesignersPageDescription'
const heroImage = '/to-designers/to-designers-bg.webp'
</script>

<template>
  <BaseHeroWithoutDescription :hero-name="heroName" :hero-image="heroImage" />
  <section class="main-container">
    <div class="lg:px-[255px] mdLg:px-52 md:px-16  lg:pt-24 pt-16 lg:pb-32 pb-20">
      <h6 class="lg:pb-10 pb-8">
        {{ $t('toDesignersPageDescription') }}
      </h6>
      <h3 class="flex justify-center pb-8">
        {{ $t('advantagesTitle') }}
      </h3>
      <ul>
        <!-- Ordered List Starts Here -->
        <li>
          <h3 class="pb-2 md:pb-4">
            1. {{ $t('personalManagerTitle') }}
          </h3>
          <h5>{{ $t('personalManagerContent') }}</h5>
        </li>
        <li>
          <h3 class="pb-2 md:pb-4">
            2. {{ $t('nonStandartOrdersTitle') }}
          </h3>
          <h5>{{ $t('nonStandartOrdersContent') }}</h5>
        </li>
        <li>
          <h3 class="pb-2 md:pb-4">
            3. {{ $t('workWithoutMiddlemenTitle') }}
          </h3>
          <h5>{{ $t('workWithoutMiddlemenContent') }}</h5>
        </li>
        <li>
          <h3 class="pb-2 md:pb-4">
            4. {{ $t('shopsPlacementTitle') }}
          </h3>
          <h5>{{ $t('shopsPlacementContent') }}</h5>
        </li>
        <li>
          <h3 class="pb-2 md:pb-4">
            5. {{ $t('POSmaterialsTitle') }}
          </h3>
          <h5>{{ $t('POSmaterialsContent') }}</h5>
        </li>
        <li>
          <h3 class="pb-2 md:pb-4">
            6. {{ $t('commonAdvertisingTitle') }}
          </h3>
          <h5>{{ $t('commonAdvertisingContent') }}</h5>
        </li>
      </ul> <!-- Ordered List Ends Here -->

      <h5 class="pt-4 pb-4">
        {{ $t('conditionsTitle') }}
      </h5>
      <h5 class="otsel pb-2">
        {{ $t('conditionsPerson') }}
      </h5>
      <h5 class="otsel">
        otsel@b-les.com
      </h5>
    </div>
  </section>
</template>

<style scoped>
ol {
  list-style-type: decimal; /* Use decimal numbers for list items */
}
li{
  padding-bottom: 48px
}
@media (max-width: 768px) {
  li{
    padding-bottom: 24px
  }
}
@media (max-width: 1440px) {
  li{
    padding-bottom: 36px
  }
}
.otsel{
  font-weight: normal;
}
</style>
