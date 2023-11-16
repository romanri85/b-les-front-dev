
import { ref, computed } from 'vue';
import { usePointer, useWindowScroll } from '@vueuse/core';

export function usePrompt() {
    const { x, y } = usePointer();
    const { x: scrollX, y: scrollY } = useWindowScroll();
    const show = ref(false);
    const promptText = ref('');

    const showPrompt = (text) => {
        promptText.value = text;
        show.value = true;
    };

    const hidePrompt = () => {
        show.value = false;
    };

    const promptStyle = computed(() => {
        // Adjust position to account for scroll
        const adjustedX = x.value + scrollX.value;
        const adjustedY = y.value + scrollY.value;

        return {
            position: 'absolute',
            top: `${adjustedY}px`,
            left: `${adjustedX}px`,
            transform: 'translateY(-200%)',
            zIndex: 1000
        };
    });

    return { show, promptText, showPrompt, hidePrompt, promptStyle };
}

