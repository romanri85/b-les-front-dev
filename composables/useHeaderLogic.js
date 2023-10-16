import { onBeforeUnmount, onMounted, ref } from 'vue'

export default function useHeaderLogic() {
  const screenSize = ref('desktop') // default value
  const isMenuOpen = ref(false)

  onMounted(() => {
    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateScreenSize)
  })

  const updateScreenSize = () => {
    const width = window.innerWidth
    if (width <= 640)
      screenSize.value = 'mobile'
    else if (width <= 1024)
      screenSize.value = 'tablet'
    else
      screenSize.value = 'desktop'
  }

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  return {
    screenSize,
    isMenuOpen,
    toggleMenu,
  }
}
