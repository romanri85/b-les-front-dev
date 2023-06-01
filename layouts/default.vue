<template>
    <div id="app">
        <Header/>
        <slot/>
        <Footer/>
    </div>
</template>

<script>
import {baseURL} from "~/config";

// const data = await $fetch(`${baseURL}/api/product/collections`)
// const collections = data.results
</script>

