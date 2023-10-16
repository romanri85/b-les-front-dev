import { onBeforeUnmount, onMounted, ref } from 'vue'

export default function useHeaderLogic() {
  const screenSize = ref('desktop') // default value
  const isMenuOpen = ref(false)
  function updateScreenSize() {
    const width = window.innerWidth
    if (width <= 640)
      screenSize.value = 'mobile'
    else if (width <= 1024)
      screenSize.value = 'tablet'
    else
      screenSize.value = 'desktop'
  }
  onMounted(() => {
    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateScreenSize)
  })

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  return {
    screenSize,
    isMenuOpen,
    toggleMenu,
  }
}
