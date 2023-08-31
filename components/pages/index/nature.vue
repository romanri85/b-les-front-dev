<script setup lang="ts">

</script>

<template>
  <!--    <div class=" main-container mt-32">-->
  <!--    </div>-->

  <main class="cd-main-content">

    <div class="cd-scrolling-bg cd-color-4 bg-white text-primaryDark lg:mx-48 md:mx-10">
      <div class="cd-container">
        <h2 class="text-center">{{ $t('doorsBeauty') }}</h2>
        <div class="  lg:mb-12 md:mb-8 mb-5  lg:mt-4 md:mt-3 mt-5 main-container">
          <h5 class="md:text-center text-primaryDark ">{{ $t('doorsBeautyDescription') }}</h5>
        </div>
      </div> <!-- cd-container -->
    </div> <!-- cd-scrolling-bg -->

    <div class="cd-fixed-bg cd-bg-1 lg:min-h-[400px] md:min-h-[250px] min-h-[200px]">
      <!--      <h1>Alternating fixed/scrolling backgrounds Pure CSS</h1>-->
    </div> <!-- cd-fixed-bg -->


  </main> <!-- cd-main-content -->

</template>

<style scoped>

.cd-container {
  /* this class is used to give a max-width to the element it is applied to, and center it horizontally when it reaches that max-width */
  width: 100%;
  margin: 0 auto;
}
.cd-container::after {
  /* clearfix */
  content: '';
  display: table;
  clear: both;
}

.cd-main-content {
  /* you need to assign a min-height to the main content so that the children can inherit it*/
  height: 100%;
  position: relative;
  z-index: 1;


}

.cd-fixed-bg {
  position: relative;
//min-height: 75%;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  z-index: 1;
}
.cd-fixed-bg h1, .cd-fixed-bg h2 {
  position: absolute;
  left: 50%;
  top: 50%;
  bottom: auto;
  right: auto;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  -o-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  width: 90%;
  max-width: 1170px;
  text-align: center;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  color: white;
}
.cd-fixed-bg.cd-bg-1 {
  background-image: url("/sebastian-unrau-sp-p7uuT0tw-unsplash.jpeg");
}



@media only screen and (min-width: 280px) {
  .cd-fixed-bg {
    background-attachment: fixed;
  }
}

.cd-scrolling-bg {
  position: relative;
  z-index: 2;
}

</style>