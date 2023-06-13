<script setup lang="ts">
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
const props = defineProps({
  value: {
    type: Array,
  },
  designs: {
    type: Array,
  }
})

const emit = defineEmits(['change'])


let chosenDesigns = reactive(props.value)
function chooseDesign(name){
  if(!chosenDesigns.includes(name)){
    chosenDesigns.push(name)
  } else {
    chosenDesigns.splice(chosenDesigns.indexOf(name), 1)
  }
  emit('change', chosenDesigns)
}
</script>

  <template class="filter-container ">
    <Disclosure default-open>
      <DisclosureButton class=" w-full">
        <filter-type filterName="Дизайн"/>
      </DisclosureButton>
      <DisclosurePanel class="mb-[80px]">
        <div v-for="design in props.designs" :key=design.id class="flex gap-x-[15px] items-center mb-3">
          <h5 class="cursor-pointer underline-offset-4" @click="chooseDesign(design.name)" :class="{'underline':chosenDesigns.includes(design.name)}">{{design.name}}</h5>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </template>

<style scoped>

</style>