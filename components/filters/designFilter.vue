<script setup lang="ts">
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
const props = defineProps({
  value: {
    type: Array,
  },
  design: {
    type: Array,
  }
})

const emit = defineEmits(['change'])


let chosenDesigns = reactive(props.value || [])
function chooseDesign(id){
  if(!chosenDesigns.includes(id)){
    chosenDesigns.push(id)
  } else {
    chosenDesigns.splice(chosenDesigns.indexOf(id), 1)
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
        <div v-for="design in props.design" :key=design.id class="flex gap-x-[15px] items-center mb-3">
          <h5 class="cursor-pointer underline-offset-4" @click="chooseDesign(design.id)" :class="{'underline':chosenDesigns.includes(design.id)}">{{design.name}}</h5>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </template>

<style scoped>

</style>