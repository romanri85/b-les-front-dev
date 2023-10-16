import { defineStore } from 'pinia'

export const useIsContactUsOpenStore = defineStore('isContactUsOpen', () => {
  const isContactUsModalOpen = ref(false)
  return {
    isContactUsModalOpen,
  }
})
