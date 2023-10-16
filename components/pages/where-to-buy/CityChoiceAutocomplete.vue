<script setup>
const props = defineProps({
  city: Object,
  cities: Array,
})
function createCitiesList(cities) {
  return cities.map((city) => {
    return {
      label: city.name,
      value: city.id,
    }
  })
}

const citiesList = computed(() => createCitiesList(props.cities))
</script>

<template>
  <div>
    <FormKit
      v-slot="{ value }"
      type="form"
      :actions="false"
    >
      <FormKit
        type="autocomplete"
        :options="citiesList"

        placeholder="Например: Москва"
        selection-appearance="option"
        select-icon="caretDown"
      />
      <pre wrap>{{ value }}</pre>
    </FormKit>
  </div>
</template>
