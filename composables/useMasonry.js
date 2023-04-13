import { onMounted } from 'vue';

export async function useMasonry(element, options) {
    if (typeof window === 'undefined') return;

    const [Masonry, imagesLoaded] = await Promise.all([
        import('masonry-layout'),
        import('imagesloaded')
    ]);

    onMounted(() => {
        const msnry = new Masonry.default(element.value, options);

        imagesLoaded.default(element.value, () => {
            msnry.layout();
        });
    });
}

