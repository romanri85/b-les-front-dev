<script setup lang="ts">

const props = defineProps({
  value: String,
  door: Object
})


</script>

<template>
  <div class="flex flex-col items-center pb-12">
    <div class="relative pb-8">
      <nuxt-img width="200px" height="auto" :src="props.value" class="h-auto w-48"></nuxt-img>
      <nuxt-img width="200px" height="auto"
                src="/leafOakEnamelBeige/PNG/Дуб брашированный Бежевый - ДП Калина Г21-8.png"
                class="h-auto w-48 absolute top-0"></nuxt-img>
    </div>

    <div class="flex flex-col items-center">
      <h2 class="pb-3">ALPHA</h2>
<!--      <h2>{{props.door.name}}</h2>-->
      <p class="pb-3 uppercase">Коллекция Rossa</p>
      <!--        collection can be defined by color at frontend-->
<!--      <h6>{{props.door.collection}}</h6>-->
      <div class="pb-3 flex">
        <p>Массив,</p>
<!--        material can be defined by color at frontend-->
<!--        <p>{{props.door.material + "," + " "}}</p>-->
        <p>&nbsp; Светлый дуб</p>
<!--        <p>{{props.door.color}}</p>-->
      </div>
<!--      not necessary at first-->
      <p class="pb-3">Сатинато бронза</p>
<!--      <p>{{props.door.glass}}</p>-->
      <p class="font-regular">54100 R</p>
<!--      <h6>{{props.door.price}}</h6>-->
    </div>
  </div>
</template>

<style scoped>

</style>