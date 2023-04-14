import { onMounted } from 'vue';

export async function useMasonry(element, options) {
    if (typeof window === 'undefined') return;

    console.log('Inside useMasonry onMounted');

    const [Masonry, imagesLoaded] = await Promise.all([
        import('masonry-layout'),
        import('imagesloaded'),
    ]);

    console.log('After async imports');

    const msnry = new Masonry.default(element.value, options);

    imagesLoaded.default(element.value, () => {
        msnry.layout();
    });
}



