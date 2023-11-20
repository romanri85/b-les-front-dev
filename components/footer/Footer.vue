<script setup lang="js">
import collections from '~/data/SliderCollectionsWithRiminiRomani.json'
import BaseLogo from '~/components/base/BaseLogo.vue'
import { useTagsStore } from '~/stores/tagsStore'
import {useRouter} from "vue-router";
import tagsIds from "~/data/tags.json";
import {useQuery} from "@tanstack/vue-query";
import {baseURL} from "~/config";

defineProps({ light: { type: Boolean, default: true } })

const { locale, setLocale } = useI18n()
const router = useRouter()

// function toggleLocale() {
//   const newLocale = locale.value === 'en' ? 'ru' : 'en'
//   setLocale(newLocale)
// }
const {data: tags, isLoading: tagsLoading} = useQuery({
  queryKey: ['tags'],
  queryFn: async () => {
    return await $fetch(`${baseURL}/api/projects/tags`)
  }, select: (data) => {
    return data.filter((tag) => {
      return tagsIds.includes(tag.id)
    })
  }
})




const xlLgMenu = [
  // {
  //     "name": "searchPhotoByTag",
  //     "image": "/header-modal-img/delivery-installation.jpg",
  //     "slug": "/other-items/delivery-and-installation"
  // },
  {
    name: 'ourProjects',
    image: '/header-modal-img/delivery-installation.jpg',
    slug: '/interior',
  },

  {
    name: 'deliveryAndInstallation',
    image: '/header-modal-img/delivery-installation.jpg',
    slug: '/delivery-and-installation',
  },
  {

    name: 'aboutUs',
    image: '/header-modal-img/about-us.jpg',
    slug: '/about-us',
  },
  {
    name: 'promotions',
    image: '/header-modal-img/promotions.jpg',
    slug: '/sale',
  },
  {
    name: 'toDesigners',
    image: '/header-modal-img/to-designers.jpg',
    slug: '/to-designers',
  },
  {
    name: 'toDealers',
    image: '/header-modal-img/to-dealers.jpg',
    slug: '/to-dealers',
  },
]

const mdSmMenu = [
  {
    name: 'catalog',
    image: '/header-modal-img/delivery-installation.jpg',
    slug: '/catalog',
  },
  // {
  //     "name": "collections",
  //     "image": "/header-modal-img/delivery-installation.jpg",
  //     "slug": "/collections"
  // },

  {
    name: 'doorSystems',
    image: '/header-modal-img/delivery-installation.jpg',
    slug: '/systems/swing',
  },
  {
    name: 'doorHardware',
    image: '/header-modal-img/door-hardware.jpg',
    slug: '/door-hardware',
  },
  {
    name: 'plinth',
    image: '/plinth.jpg',
    slug: '/plinth',
  },
  {
    name: 'toDesigners',
    image: '/header-modal-img/to-designers.jpg',
    slug: '/to-designers',
  },
  {
    name: 'toDealers',
    image: '/header-modal-img/to-dealers.jpg',
    slug: '/to-dealers',
  },
  {
    name: 'promotions',
    image: '/header-modal-img/promotions.jpg',
    slug: '/sale',
  },
  {
    name: 'deliveryAndInstallation',
    image: 'delivery-installation.jpg',
    slug: '/delivery-and-installation',
  },
  {
    name: 'whereToBuy',
    image: '/where-to-buy.jpg',
    slug: '/where-to-buy',
  },
  {
    name: 'searchPhotoByTag',
    image: '/delivery-installation.jpg',
    slug: '/search-tags',
  },
  {
    name: 'ourProjects',
    image: '/header-modal-img/delivery-installation.jpg',
    slug: '/interior',
  },
  {

    name: 'aboutUs',
    image: '/header-modal-img/about-us.jpg',
    slug: '/about-us',
  },

]
</script>

<template>
  <div class="bg-black ">
    <div class="main-container">
      <div class=" flex md:flex-row flex-col justify-between xl:pt-24 lg:pt-16 pt-12 md:items-start items-center md:pb-24 pb-12">
        <div class="lg:pr-16">
          <BaseLogo light class=" xl:mb-16 lg:mb-12 mb-5" />
          <div class="md:block hidden ">
            <nuxt-link to="/catalog">
              <buttons-secondary-button
                class="bg-white xl:w-72 xl:h-20 lg:h-16 md:h-16 lg:w-64 md:w-52 lg:flex sm:block sm:border-0 "
              >
                {{ $t('catalog') }}
              </buttons-secondary-button>
            </nuxt-link>
            <div class="pt-24 h-24 md:justify-end lg:block hidden  items-start">
              <nuxt-link to="https://www.instagram.com/dveri_b_les/">
                <div class="w-36">
                  <img src="/insta.svg" />
                </div>
              </nuxt-link>
            </div>
          </div>

          <!--                    <button type="button" class="md:block hidden font-mono text-sm py-12" -->
          <!--                            @click="toggleLocale"><h3 -->
          <!--                            :class="light ? 'text-white' : 'text-black'">{{ locale === 'en' ? "EN" : "RU" }}</h3> -->
          <!--                    </button> -->
        </div>
        <nuxt-link to="/catalog">
          <p class="md:hidden text-white w-36 ml-12">
            {{ $t('catalog') }}
          </p>
        </nuxt-link>

        <!--            lgMenu -->

        <div class="lg:block hidden">
          <h3 class="text-white mt-5 mb-5">
            {{ $t('collections') }}
          </h3>
          <div v-for="collection in collections" :key="collection.name" class="mt-[10px]">
            <nuxt-link :to="`/catalog?collection=${collection.id}`">
              <p class="text-normalGrey cursor-pointer">
                {{ $t(collection.name) }}
              </p>
            </nuxt-link>
          </div>
        </div>
        <div class="lg:block hidden">
          <h3 class="text-white mt-5  mb-5">
            Поиск фото по тегам
          </h3>
          <div v-for="(tag, index) in tags" v-if="tags" :key="tag.name" class="mt-2">
            <nuxt-link :to="`/search-tags?tags=${tag.id}`">
              <p class="text-normalGrey">
                {{ tag.name }}
              </p>
            </nuxt-link>
          </div>

          <!--                  <pre class="text-white">tags{{tags}}</pre> -->
        </div>
        <div class="text-white lg:block hidden">
          <nuxt-link to="where-to-buy">
            <h3 class="mb-12 mt-5 ">
              {{ $t('whereToBuy') }}
            </h3>
          </nuxt-link>
          <nuxt-link to="/door-hardware">
            <h3 class="mb-5">
              {{ $t('doorHardware') }}
            </h3>
          </nuxt-link>
          <div>
            <!--                        <div class="mt-2"> -->
            <!--                          <nuxt-link :to="''"><p class="text-normalGrey ">{{ $t('handles') }}</p></nuxt-link> -->
            <!--                        </div> -->
            <!--                        <div class="mt-2"> -->
            <!--                            <a href=""><p class="text-normalGrey ">{{ $t('hinges') }}</p></a> -->
            <!--                        </div> -->
            <div class="mt-12">
              <nuxt-link to="/plinth">
                <h3>{{ $t('plinth') }}</h3>
              </nuxt-link>
            </div>
          </div>
          <div class="mt-12">
            <nuxt-link to="/systems/swing">
              <h3>{{ $t('doorSystems') }}</h3>
            </nuxt-link>
          </div>
        </div>
        <div class="text-white lg:block hidden">
          <h3 class="text-white mb-5 mt-5 ">
            {{ $t('information') }}
          </h3>
          <div v-for="menuItem in xlLgMenu" :key="menuItem.name" class="mt-2">
            <nuxt-link :to="menuItem.slug">
              <p class="text-normalGrey">
                {{ $t(menuItem.name) }}
              </p>
            </nuxt-link>
          </div>
        </div>

        <!--        menu -->

        <div class="lg:hidden w-36 ml-12">
          <div v-for="menuItem in mdSmMenu.slice(1, 5)" :key="menuItem.name">
            <div class="text-white  pt-4">
              <nuxt-link :to="menuItem.slug">
                <p class="">
                  {{ $t(menuItem.name) }}
                </p>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="lg:hidden w-36 ml-12">
          <div v-for="menuItem in mdSmMenu.slice(5, 8)" :key="menuItem.name">
            <div class="text-white pt-4">
              <nuxt-link :to="menuItem.slug">
                <p class=" ">
                  {{ $t(menuItem.name) }}
                </p>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="lg:hidden w-36 ml-12">
          <div v-for="menuItem in mdSmMenu.slice(8)" :key="menuItem.name" class="lg:hidden">
            <div class="text-white pt-4">
              <nuxt-link :to="menuItem.slug">
                <p class="whitespace-nowrap">
                  {{ $t(menuItem.name) }}
                </p>
              </nuxt-link>
            </div>
          </div>
        </div>

      </div>
      <div class="border-b border-primaryGrey hidden md:block" />
      <div class="h-24 flex md:justify-end justify-center lg:hidden md:items-center items-start">
        <nuxt-link to="https://www.instagram.com/dveri_b_les/">
          <div class="w-36 ml-12">
            <img src="/insta.svg" />
          </div>
        </nuxt-link>
      </div>
      <div class="w-full flex justify-center">
        <!--                <div class="w-36 ml-12"> -->
        <!--                    <button type="button" class="md:hidden font-mono text-sm pb-12" -->
        <!--                            @click="toggleLocale"><h3 -->
        <!--                            :class="light ? 'text-white' : 'text-black'">{{ locale === 'en' ? "EN" : "RU" }}</h3> -->
        <!--                    </button> -->
        <!--                </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
