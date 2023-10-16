export function classifyImageLayout(image: { height: number; width: number }) {
  const aspectRatio = image.height / image.width
  if (aspectRatio > 1)
    return { ...image, layout: 'narrow' } // Portrait images (taller than wide)
  else
    return { ...image, layout: 'wide' } // Landscape images (wider than tall)
}

export function handleThreeDivisibleCase(images: any[]) {
  const wideIndices = images.map((image, index) => image.layout === 'wide' ? index : -1).filter(index => index !== -1)
  if (wideIndices.length >= 3 && wideIndices.length % 2 === 1) {
    for (let i = 0; i < 3; i++)
      images[wideIndices[wideIndices.length - 1 - i]].layout = 'narrow'
  }
}

export function handleOneRemainderCase(images: any[]) {
  const wideIndices = images.map((image, index) => image.layout === 'wide' ? index : -1).filter(index => index !== -1)

  // Check if the number of wide images is odd
  if (wideIndices.length % 2 === 1) {
    const wideIndex = images.findIndex(image => image.layout === 'wide')
    if (wideIndex !== -1) {
      images[wideIndex].layout = ''
      images[wideIndex].square = true
    }
  }
  // If the number of wide images is even
  else {
    if (wideIndices.length >= 2) {
      images[wideIndices[0]].layout = 'narrow' // Set the first wide image's layout to 'narrow'
      images[wideIndices[1]].layout = 'narrow' // Set the second wide image's layout to 'narrow'
    }
  }
}

export function handleTwoRemainderCase(images: any[]) {
  const wideIndex = images.findIndex(image => image.layout === 'wide')
  if (wideIndex !== -1)
    images[wideIndex].layout = 'narrow'
}

export function adjustLayoutForNarrowImages(images: any[], numberOfNarrowImages: number) {
  if (numberOfNarrowImages % 3 === 0)
    handleThreeDivisibleCase(images)
  else if (numberOfNarrowImages % 3 === 1)
    handleOneRemainderCase(images)
  else if (numberOfNarrowImages % 3 === 2)
    handleTwoRemainderCase(images)
}
