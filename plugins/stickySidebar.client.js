import ResizeSensor from 'resize-sensor'

import StickySidebar from 'sticky-sidebar'

export default defineNuxtPlugin((nuxtApp) => {
  return { StickySidebar, ResizeSensor }
})
