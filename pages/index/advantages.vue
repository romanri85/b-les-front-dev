<script setup lang="ts">

</script>

<template>
    <div class=" main-container mt-32">
        <h2 class="text-center xl:mb-10 lg:mb-7 md:mb-4 mb-5">{{ $t('doorsBeauty') }}</h2>
<!--        <h3 class="text-center lg:mb-[15px] md:mb-[10px] mb-[15px]">{{$t('doorsBeauty') }}</h3>-->
        <div class="xl:mx-12 lg:mx-48 md:mx-12 xl:mb-9 md:mb-7 mb-5">
            <h5 class="text-center text-primaryDark ">{{ $t('doorsBeautyDescription') }}</h5>
        </div>
        <nuxt-img placeholder class=" w-full lg:h-96 h-60 object-cover" src="/advantages.jpg" />


    </div>
</template>

<style scoped>

</style>