<script setup lang="js">
import certificates from "~/data/serts.json";
import CertificateImageModal from "~/components/pop-ups/CertificateImageModal.vue";

const heroName = 'Сертификаты'
const heroImage = '/certificates/certificates-bg.webp'
const imgModal = ref(null)

const selectedCertificate = ref(null)

function triggerModal(certificate) {
  selectedCertificate.value = certificate;
  if (imgModal.value && imgModal.value.openModal)
    imgModal.value.openModal();
  else
    console.error('Method not available or component not initialized.');
}
</script>

<template>
  <Head>
    <title>Брянский лес - Сертификаты</title>
  </Head>
  <BaseHeroWithoutDescription :hero-name="heroName" :hero-image="heroImage"/>
  <section class="pb-20 lg:pb-32 main-container">
    <div class="lg:px-[255px] mdLg:px-52 md:px-16 lg:pt-24 pt-16 lg:pb-32 pb-20">
      <h5>
        {{ $t('certificatesPageDescription') }}
      </h5>
    </div>
    <div class="main-container">
      <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        <div v-for="certificate in certificates" class="cursor-pointer" :key="certificate">
          <nuxt-img placeholder :src="certificate" @click="() => triggerModal(certificate)" alt="certificate" class="w-full"/>
        </div>
      </div>
    </div>
  </section>
  <certificate-image-modal ref="imgModal" :image="selectedCertificate"/>
</template>


<style scoped>
</style>