<script setup lang="ts">

import VTypical from "vue-typical";
</script>

<template>
  <!--    <div class=" main-container mt-32">-->

  <!--      <div class="bg-blend-difference bg-black">-->
  <!--        <nuxt-img placeholder class=" w-full lg:h-96 h-60 object-cover" src="/advantages.jpg" />-->
  <!--      </div>-->


  <!--    </div>-->

  <main class="cd-main-content">

    <!--    <div class="cd-scrolling-bg cd-color-4 bg-white text-primaryDark">-->
    <!--      <div class="cd-container">-->
    <!--        <h2 class="text-center xl:mb-10 lg:mb-7 md:mb-4 mb-5">{{ $t('doorsBeauty') }}</h2>-->
    <!--        &lt;!&ndash;        <h3 class="text-center lg:mb-[15px] md:mb-[10px] mb-[15px]">{{$t('doorsBeauty') }}</h3>&ndash;&gt;-->
    <!--        <div class="xl:mx-12 lg:mx-48 md:mx-12 xl:mb-9 md:mb-7 mb-5">-->
    <!--          <h5 class="text-center text-primaryDark ">{{ $t('doorsBeautyDescription') }}</h5>-->
    <!--        </div>-->
    <!--      </div> &lt;!&ndash; cd-container &ndash;&gt;-->
    <!--    </div> &lt;!&ndash; cd-scrolling-bg &ndash;&gt;-->

    <!--    <div class="cd-fixed-bg cd-bg-1">-->
    <!--&lt;!&ndash;      <h1>Alternating fixed/scrolling backgrounds Pure CSS</h1>&ndash;&gt;-->
    <!--    </div> &lt;!&ndash; cd-fixed-bg &ndash;&gt;-->

    <!--    <div class="cd-scrolling-bg cd-color-2 bg-white text-primaryDark">-->
    <!--      <div class="cd-container">-->
    <!--        <h2 class="text-center xl:mb-10 lg:mb-7 md:mb-4 mb-5">{{ $t('doorsBeauty') }}</h2>-->
    <!--        &lt;!&ndash;        <h3 class="text-center lg:mb-[15px] md:mb-[10px] mb-[15px]">{{$t('doorsBeauty') }}</h3>&ndash;&gt;-->
    <!--        <div class="xl:mx-12 lg:mx-48 md:mx-12 xl:mb-9 md:mb-7 mb-5">-->
    <!--          <h5 class="text-center text-primaryDark ">{{ $t('doorsBeautyDescription') }}</h5>-->
    <!--        </div>-->
    <!--      </div> &lt;!&ndash; cd-container &ndash;&gt;-->
    <!--    </div> &lt;!&ndash; cd-scrolling-bg &ndash;&gt;-->

    <!--    <div class="cd-fixed-bg cd-bg-2">-->
    <!--&lt;!&ndash;      <h2>The guy in the white leathers is me.</h2>&ndash;&gt;-->
    <!--    </div> &lt;!&ndash; cd-fixed-bg &ndash;&gt;-->

    <!--    <div class="cd-scrolling-bg cd-color-3 bg-white text-primaryDark">-->
    <!--      <div class="cd-container">-->
    <!--        <p>In the authors presentation of the code, the default setting for the height of both the fixed and scrolling backgrounds is 100%. That min height can be what ever you want. If you add more text, the container grows but will always fill the viewport to the degree that min-height is defined.</p>-->
    <!--        <p>I have chosen to reduce this value to something less than 100% because at 100%, upon initial page load, the user has no visual indication that there is anything below the fold. My settings for these values, contained in the classes .cd-fixed-bg and .cd-scrolling-bg are 75% and 50% respectively.</p>-->
    <!--        <p>I suppose you could ad ID's to the individual scrolling-bg's and have them at different sizes for different purposes but that's up to you.-->
    <!--        </p>-->
    <!--      </div> &lt;!&ndash; cd-container &ndash;&gt;-->
    <!--    </div> &lt;!&ndash; cd-scrolling-bg &ndash;&gt;-->

    <!--    <div class="cd-fixed-bg cd-bg-3">-->
    <!--&lt;!&ndash;      <h2>There I go again, leaning it over.</h2>&ndash;&gt;-->
    <!--    </div> &lt;!&ndash; cd-fixed-bg &ndash;&gt;-->

    <div class="cd-scrolling-bg cd-color-1 bg-white text-primaryDark">
      <div class="cd-container">
        <div
            class=" flex flex-col justify-center items-center  lg:px-52 md:px-12">

          <h2 class="text-18-mono font-mono font-regular tracking-wider mb-7 text-center">
            <client-only>
              <v-typical
                  class="blink"
                  :steps="[$t('michelangeloQuote'), 1000]"

                  :loop="1"
                  :speed="1"
                  :wrapper="'h2'"
              ></v-typical>
            </client-only>

          </h2>
          <h3 class="mickelangelo tracking-wide">{{ $t('michelangelo') }}</h3>
        </div>
      </div> <!-- cd-container -->
    </div> <!-- cd-scrolling-bg -->

    <div class="cd-fixed-bg cd-bg-4">
      <!--      <h2>Last shot is a knee dragger!</h2>-->
    </div> <!-- cd-fixed-bg -->
  </main> <!-- cd-main-content -->

</template>

<style scoped>

.cd-container {
  /* this class is used to give a max-width to the element it is applied to, and center it horizontally when it reaches that max-width */
  width: 90%;
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
//min-height: 75%; min-height: 400px;
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
  background-image: url("/sebastian-unrau-sp-p7uuT0tw-unsplash.jpg");
}

.cd-fixed-bg.cd-bg-2 {
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/181085/track_riders_bg02.jpg");
}

.cd-fixed-bg.cd-bg-3 {
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/181085/track_riders_bg03.jpg");
}

.cd-fixed-bg.cd-bg-4 {
  background-image: url("/gabriella-clare-marino-KYwErCnu8J4-unsplash.jpg");
}

@media only screen and (min-width: 480px) {
  .cd-fixed-bg {
    background-attachment: fixed;
  }
}

.cd-scrolling-bg {
  position: relative;
//min-height: 50%; //padding: 4em 0; //box-shadow: 0 0 50px rgba(0, 0, 0, 0.5); z-index: 2;
}

@media only screen and (min-width: 480px) {
  .cd-scrolling-bg {
    padding: 8em 0;
  }
}


.mickelangelo {
  transform: translateY(3rem);
  animation: fadeInUp 2s ease 3.5s forwards;
  opacity: 0;
}

.blink::after {
  content: '|';
  animation: blink 1s infinite step-start;
  opacity: .5;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

</style>