<script setup lang="ts">
import { onMounted, ref } from "vue";

const { src } = defineProps<{
    src: string;
}>();

const data = ref("");

const fetchSvg = async () => {
    try {
        const resp = await fetch(src);
        const content = await resp.text();
        const parser = new DOMParser();
        const result = parser.parseFromString(content, "text/xml");
        data.value = result.getElementsByTagName("svg")[0].outerHTML;
    } catch (err) {
        console.error(err);
    }
};

onMounted(fetchSvg);
</script>

<template>
    <svg v-html="data"></svg>
</template>
