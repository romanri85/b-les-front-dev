<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ref, toRefs, watch } from 'vue'
import { baseURL } from '~/config'
import { useIsContactUsOpenStore } from '~/stores/isContactUsOpenStore.js'

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
// let cityLookup = {};

async function fetchCities() {
  cities.value = await $fetch(`${baseURL}/api/shops`)
  cities.value = cities.value.cities.map((city) => {
    // cityLookup[city.name] = String(city.id);
    return city.name
  })
}

// fetchCities()

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

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
    }
    else {
      closeModal()
    }
  }
  catch (error) {
    throw new Error(error.message)
  }
}
const { shouldOpenModal } = toRefs(props)

watch(shouldOpenModal, (newValue) => {
  if (newValue)
    openModal()
})

const isOpen = ref(false)

function closeModal() {
  isContactUsOpenStore.isContactUsModalOpen = false
  isOpen.value = false
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
          <div class="fixed inset-0 bg-black modal-background" />
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
                class="w-full  h-auto overflow-visible max-h-screen md:max-w-md transform  bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Заказать двери - это легко
                </DialogTitle>
                <div class="flex justify-between mt-8 mb-8">
                  <h3><a href="tel:+74951500032">+ 7 495 150-00-32</a></h3>
                  <div class="">
                    <div class="">
                      <button
                          type="button"
                          class="inline-flex justify-center border border-transparent bg-primaryDark px-4 py-2 text-xs font-mono  text-white  focus:outline-none "
                          @click="closeModal"
                      >
                        Закрыть
                      </button>
                    </div>
                  </div>
                </div>
                <div>
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
                      validation="max:200"
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
</style>
