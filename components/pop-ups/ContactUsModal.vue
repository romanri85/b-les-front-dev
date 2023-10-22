<script setup>
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import {ref, toRefs, watch} from 'vue'
import {baseURL} from '~/config'
import {useIsContactUsOpenStore} from '~/stores/isContactUsOpenStore.js'

const props = defineProps({
  isOpen: Boolean,
  shouldOpenModal: Number,
  city: Object,
  cities: Array,
})
const isContactUsOpenStore = useIsContactUsOpenStore()

const formData = ref({
  form_type: 'Заказать замер',
  name: '',
  phone: '',
  email: '',
  comment: '',
  city: 'Москва',
})
const cities = ref([])
const isSubmitted = ref(false)

// let cityLookup = {};

async function fetchCities() {
  cities.value = await $fetch(`${baseURL}/api/shops`)
  cities.value = cities.value.cities.map((city) => {
    // cityLookup[city.name] = String(city.id);
    return city.name
  })
}

async function handleSubmit(data) {
  try {
    const response = await fetch(`${baseURL}/api/shops/contactusforms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Make sure to set the content type
        // 'X-CSRFTOKEN':getCookie('csrftoken'),
      },
      credentials: 'include', // Important
      body: JSON.stringify(data), // Make sure to stringify the data object
    })

    if (!response.ok) {
      // Log the response if it's not OK
      const responseData = await response.json()
      throw new Error(responseData.detail)
    } else {
      isSubmitted.value = true
      // closeModal()
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

const {shouldOpenModal} = toRefs(props)

watch(shouldOpenModal, (newValue) => {
  if (newValue)
    openModal()
})

const isOpen = ref(false)

function closeModal() {
  isContactUsOpenStore.isContactUsModalOpen = false
  isOpen.value = false
  setTimeout(() => {
        isSubmitted.value = false
      }, 500
  )
}

function openModal() {
  isContactUsOpenStore.isContactUsModalOpen = true
  isOpen.value = true
  fetchCities()
}
</script>

<template>
  <client-only>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" class="relative z-30" @close="closeModal">
        <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black modal-background"/>
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
              class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enter-from="-translate-y-full"
                enter-to="translate-y-0"
                leave="transition ease-in-out duration-300 transform"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
              <DialogPanel
                  class="w-full md:min-w-[500px] md:min-h-[300px]  h-auto overflow-visible max-h-screen md:max-w-md transform  bg-white p-6 text-left align-middle shadow-xl transition-all"
                  :class="isSubmitted ? 'black' : 'white'"
              >
                <DialogTitle v-if="!isSubmitted"
                             as="h3"
                             class="text-lg font-medium leading-6 text-gray-900"
                ><h2>
                  Оставить заявку
                </h2>
                </DialogTitle>
                <div v-if="!isSubmitted" class="flex justify-center mt-8 mb-8">
                  <h2 class="font-light"><a href="tel:+74951500032">+ 7 495 150-00-32</a></h2>

                </div>
                <div class="flex justify-end w-full pb-8">
                  <div class="ml-auto">
                    <button
                        type="button"
                        class="inline-flex justify-center border border-transparent bg-primaryDark px-4 py-2 text-xs font-mono  text-white  focus:outline-none "
                        @click="closeModal"
                    >
                      Закрыть
                    </button>
                  </div>
                </div>
                <div class="flex justify-center text-center md:w-[400px] md:h-[200px]" v-if="isSubmitted">
                  <h1 class="w-full "
                      :class="isSubmitted ? 'text-white' : 'text-black'"
                  >Спасибо за Вашу заявку</h1>
                </div>
                <div v-else>
                  <FormKit type="form" :value="formData" @submit="handleSubmit">
                    <FormKit
                        type="text" name="name"
                        prefix-icon="people"
                        help="Введите Ваше имя"
                        validation="required|length:2,30|alpha_spaces"
                        validation-visibility="blur"
                    />
                    <FormKit
                        type="dropdown"
                        name="form_type"
                        prefix-icon="tools"
                        select-icon="caretDown"
                        validation="required"
                        :options="['Заказать замер', 'Заказать звонок', 'Другое']"
                        help="Выберите тип заявки"
                    />
                    <FormKit
                        type="dropdown"
                        name="city"
                        prefix-icon="radio"
                        select-icon="caretDown"
                        validation="required"
                        :options="cities"
                        help="Выберите Ваш город"
                    />
                    <!--                <pre wrap>{{ value }}</pre> -->

                    <FormKit
                        type="mask"
                        name="phone"
                        mask="+7 (###) ###-####"
                        prefix-icon="telephone"
                        :validation="[['required', 'matches', /^\+7\s\(\d{3}\)\s\d{3}-\d{4}$/]]"
                        validation-visibility="blur"

                        help="Введите Ваш номер телефона"
                    />
                    <!--                  <pre wrap>{{ value }}</pre> -->
                    <FormKit
                        type="email"
                        name="email"
                        prefix-icon="email"
                        help="Введите адрес Вашей почты"
                        validation="email"
                        validation-visibility="blur"
                        placeholder="ivanov@mail.ru"
                    />
                    <FormKit
                        type="textarea"
                        name="comment"
                        rows="3"
                        placeholder="Комментарий"
                        help="Введите текст"
                    />
                  </FormKit>

                  <!--                <FormKit -->
                  <!--                    type="file" -->
                  <!--                    prefixIcon="file" -->
                  <!--                    :key="files" -->
                  <!--                    accept=".pdf,.doc,.docx,.xml,.md,.csv, .jpeg, .jpg, .png, .webp" -->
                  <!--                    help="Прикрепите файлы, если это необходимо." -->
                  <!--                    file-remove-icon="trash" -->
                  <!--                    multiple="true" -->
                  <!--                /> -->
                  <!--                <p>{{files}}</p> -->
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </client-only>
</template>
<style scoped>
.modal-background {
  opacity: 25%;
}

button {

}

.white {
  background-color: white !important;
}

.black {
  background-color: black !important;
}
</style>
