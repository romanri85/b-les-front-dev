// useViewportSize.js
import { ref, onMounted, onUnmounted } from 'vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export function useViewportSize() {

    const breakpoints = useBreakpoints({
        tablet: 770,
        desktop: 1442,
    })



    const viewport = reactive({
        isMobile: false,
        isTablet: false,
        isDesktop: false
    });

    const updateBreakpoints = () => {
        viewport.isMobile = breakpoints.smaller('tablet');
        viewport.isTablet = breakpoints.between('tablet', 'desktop');
        viewport.isDesktop = breakpoints.greaterOrEqual('desktop');
    };

    onMounted(() => {
        updateBreakpoints();
        window.addEventListener('resize', updateBreakpoints);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updateBreakpoints);
    });

    return viewport;
}
