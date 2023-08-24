<template>
    <button class="burger-button" @click="toggleBurger">
        <span v-if="!isOpen" class="burger-bar burger-bar-one bg-white"></span>
        <span
                v-else
                class="burger-bar burger-bar-one burger-bar-one--active bg-black"
        ></span>
        <span v-if="!isOpen" class="burger-bar burger-bar-two bg-white"></span>
        <span
                v-else
                class="burger-bar burger-bar-two burger-bar-two--active bg-black"
        ></span>
        <span v-if="!isOpen" class="burger-bar burger-bar-three bg-white"></span>
        <span
                v-else
                class="burger-bar burger-bar-three burger-bar-three--active bg-black"
        ></span>
    </button>
</template>







<script setup lang="ts">


const isOpen = ref(false);
const props = defineProps({light: {type: Boolean}})
function toggleBurger() {
    isOpen.value = !isOpen.value;

}

</script>

<style scoped>

.burger-button {
    all: unset;
    position: relative;
    width: 30px;
    height: 40px;
    background-color: transparent;
}

.burger-bar {
    height: 2px;
    width: 100%;
    position: absolute;
    border-radius: 5px;
}

.burger-bar-three {
    left: 0px;
    top: 66%;
}

.burger-bar-two {
    left: 0px;
    top: 33%;
}

.burger-bar-one {
    left: 0px;
}

.burger-bar-one--active {
    transform: rotate(45deg);
}

.burger-bar-two--active {
    top: 50%;
    transform: rotate(135deg);
}

.burger-bar-three--active {
    display: none;
}

</style>
