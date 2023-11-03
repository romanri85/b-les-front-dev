<script setup lang="js">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Pagination from '~/components/base/pagination/Pagination.vue'
import { baseURL } from '~/config'
import ImageModal from '~/components/pop-ups/ImageModal.vue'

import { adjustLayoutForNarrowImages, classifyImageLayout } from '~/services/imageLayoutService'

definePageMeta({ layout: 'dark-header' })

const route = useRoute()

const router = useRouter()

const tagsBlock = ref(null)
function scrollToTagsBlock() {
  tagsBlock.value.scrollIntoView({ behavior: 'smooth' })
}

const initialTags = ref([])
const imgModal = ref(null)
const selectedImage = ref(null) // this will store the selected/clicked image data
const selectedTags = ref([])
const selectedImages = ref([])
const total = ref(0)
const pagesCount = ref(0)
const page_size = 9
const page = ref(1)
const tags = ref([])
const tagsForForm = ref([])
const taglistKey = ref(0)

onMounted(
  async () => {
    await getTags()
    await transformTags()

    await (async () => {
      if (route.query.tags) {
        initialTags.value = [String(route.query.tags)] // assuming tags is a single value. If it's multiple values separated by commas, split it: route.query.tags.split(',')
        selectedTags.value = initialTags.value
        taglistKey.value++
        await getImagesByTags(selectedTags.value)
        return
      }
      if (!selectedTags.value[0]) {
        selectedTags.value = [String(tags.value[0].id)]
        taglistKey.value++
        await getImagesByTags(selectedTags.value)
      }
    })()

    await getImagesByTags(selectedTags.value)
  },
)

const layoutImages = computed(() => {
  if (selectedImages.value && selectedImages.value.results) {
    const images = selectedImages.value.results.map(classifyImageLayout)

    // Get the number of narrow images
    const numberOfNarrowImages = images.filter(image => image.layout === 'narrow').length

    adjustLayoutForNarrowImages(images, numberOfNarrowImages)

    return images
  }
  return []
})

async function getTags() {
  tags.value = await $fetch(`${baseURL}/api/projects/tags`)
}

async function transformTags() {
  if (tags.value.length > 0) {
    tagsForForm.value = tags.value.map((tag) => {
      return {
        label: tag.name,
        value: String(tag.id),
      }
    })
    tagsForForm.value.sort((a, b) => a.label.localeCompare(b.label))
  }
}

async function getImagesByTags(tagIds, page = 1) {
  // Join the tagIds into a query string
  const tagsQueryString = new URLSearchParams({
    tags: tagIds.join(','),
  }).toString()
  const url = `${baseURL}/api/projects/images?${tagsQueryString}&page=${page}`

  selectedImages.value = await $fetch(url)
  total.value = selectedImages.value.count
  pagesCount.value = selectedImages.value.page_links.length
}

function onChangePage(page) {
  getImagesByTags(selectedTags.value, page)
  scrollToTagsBlock()
}

// function selectTag(tag) {
//   // getImagesByTags(tag, 1)
//   console.log(tag, 'tag')
//   selectedTags.value = tag
//   page.value = 1
//   getImagesByTags(tag, 1)
//
// }

function selectTag(tag) {
  taglistKey.value++
  // if (selectedTags.value == tag) {
  //   return;
  // }
  // get the last element from the tag array
  const lastTag = tag.slice(-1)[0]

  // Log the entire tag array and the last element

  // set selectedTags.value to the last element of tag array
  selectedTags.value = [lastTag]

  page.value = 1
  getImagesByTags([lastTag], 1)
}

watch(selectedTags, (newValue, oldValue) => {
  if (!newValue[0])
    selectedTags.value = oldValue
}, { deep: true })
function triggerModal(image) {
  selectedImage.value = image
  if (imgModal.value && imgModal.value.openModal)
    imgModal.value.openModal()
  else
    console.error('Method not available or component not initialized.')
}

watch(() => router.currentRoute.value.query.tags, (newValue) => {
  if (newValue) {
    initialTags.value = [String(newValue)] // assuming tags is a single value. If it's multiple values separated by commas, split it: route.query.tags.split(',')
    selectedTags.value = initialTags.value
    taglistKey.value++
    getImagesByTags(selectedTags.value)
  }
  // if(!selectedTags.value[0]){
  //   selectedTags.value = [String(tags.value[1].id)];
  //   taglistKey.value++
  //   getImagesByTags(selectedTags.value)
  //   return
  // }
})

function handleChooseTag(tag) {
  const tagId = String(tag.id)

  // Convert the array to a Set to remove duplicates, then convert it back to an array
  selectedTags.value = [...new Set([tagId])]

  getImagesByTags(selectedTags.value)
  page.value = 1
  taglistKey.value++
}
</script>

<template>
  <div class="overflow-auto">
    <div class="mt-10 lg:pr-72 main-container">
      <div class=" flex justify-start items-end">
        <h4>Главная / Поиск фото</h4>
      </div>
    </div>
    <!--    <hero-interiour :heroName="heroName" :hero-description="heroDescription" :heroImage="heroImage" :buttons="buttons"/> -->

    <div class="flex justify-center pt-10 pb-16">
      <FormKit

        v-slot="{ value }"
        type="form"
        :actions="false"
      >
        <FormKit
          :key="taglistKey"
          type="taglist"
          name="taglist"
          label="Поиск фото по тегам"
          :options="tagsForForm"
          max="10"
          :value="selectedTags"
          select-icon="add"
          help='Все фото сделаны на проектах компании "Брянский лес". Все теги на фото активны.'
          prefix-icon="tag"
          open-on-click
          placeholder="Выберите тег"

          :filter="(option, search) =>
            option.label.toLowerCase().startsWith(search.toLowerCase())"
          @input="selectTag"
        />
        <!--      <pre wrap>{{ value }}</pre> -->
      </FormKit>
    </div>
    <div ref="tagsBlock" class="layout-images pb-10">
      <div class="image-container">
        <div
          v-for="(image, index) in layoutImages" :key="index"
          :class="`image-wrapper ${image.layout}${image.square ? ' square' : ''}`"
        >
          <nuxt-img
            :src="image.image" class="object-cover cursor-pointer" :alt="image.project_name"
            @click="triggerModal(image)"
          />
        </div>
      </div>
    </div>
    <Pagination
      v-if="page" v-model:current-page="page" class="flex justify-center"
      :total="total"
      :page_size="page_size"
      :pages-count="pagesCount"
      @page-change="onChangePage"
    />
    <ImageModal
      ref="imgModal" class="absolute z-50 lg:overflow-visible overflow-auto"
      :image="selectedImage" @chooseTag="handleChooseTag"
    />
  </div>
</template>

<style scoped>
/* Add to your scoped styles */
</style>
