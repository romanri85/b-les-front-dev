<script setup lang="ts">

</script>

<template>
    <div class=" main-container mt-[130px]">
        <h2 class="text-center xl:mb-[40px] lg:mb-[30px] md:mb-[25px] mb-[20px]">{{ $t('ourAdvantages') }}</h2>
        <h3 class="text-center lg:mb-[15px] md:mb-[10px] mb-[15px]">{{ $t('doorsBeauty') }}</h3>
        <div class="xl:mx-[50px] lg:mx-[200px] md:mx-[50px] xl:mb-[35px] md:mb-[30px] mb-[20px]">
            <p class="text-center text-primaryGrey">{{ $t('doorsBeautyDescription') }}</p>
        </div>
        <nuxt-img class=" w-full lg:h-[400px] h-[240px] object-cover" src="/advantages.jpg" />


    </div>
</template>

<style scoped>

</style>