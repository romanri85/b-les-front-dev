<template>


    <div class="w-full px-4 pt-16">
        <div class="w-full max-w-md p-2 mx-auto bg-white rounded-2xl">
            <Disclosure
                    v-for="(item, idx) in items"
                    :key="item.id"
                    v-slot="{ open, close }"
            >
                <DisclosureButton
                        class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                >
                    <span>{{ item.title }}</span>
                    <ChevronUpIcon
                            :class="open ? 'duration-200' : 'duration-200 rotate-180'"
                            class="w-5 h-5 text-purple-500"
                    />
                </DisclosureButton>
                <DisclosurePanel
                        class="panel transition-all opacity-0 duration-200 max-h-0 overflow-hidden"
                        :class="open && 'max-h-16 opacity-100'"
                        static
                >
                    <div class="px-4 pt-4 pb-4 text-sm text-gray-500">
                        {{ decode(item.content) }}
                    </div>
                </DisclosurePanel>

                <button
                        :ref="(el) => (elements[idx] = el)"
                        :data-id="item.id"
                        v-show="false"
                        @click="doClose(close)"
                ></button>
                <DisclosureStateEmitter :show="open" @show="hideOther(item.id)"/>
            </Disclosure>
        </div>
    </div>

</template>

<script setup>
import {ref} from "vue";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import {ChevronUpIcon} from "@heroicons/vue/solid";
import DisclosureStateEmitter from "./DisclosureStateEmitter.vue";
import {decode} from "html-entities";


const items = [
    {
        id: 1,
        title: "title 1",
        content: "content 1",
    },
    {
        id: 2,
        title: "title 2",
        content: "content 2",
    },
    {
        id: 3,
        title: "title 3",
        content: "content 3 &mdash; &mdash; ",
    },
];

const elements = ref([]);

const hideOther = (id) => {
    const items = elements.value.filter((elm) => {
        return elm.getAttribute("data-id") !== id.toString();
    });
    items.forEach((elm) => elm.click());
    console.log(items);
};

const doClose = (close) => {
    close();
};


</script>