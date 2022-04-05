<script setup lang="ts">
import { onMounted, ref } from "vue";
import { XSvgImpact, XSvgUtils } from "../tools/utils";

const { src, impact = XSvgUtils.defaultXSvgImpact } = defineProps<{
    src: string;
    impact?: XSvgImpact;
}>();

const data = ref("");

const fetchSvg = async () => {
    try {
        const resp = await fetch(src);
        const content = await resp.text();
        const parser = new DOMParser();
        const result = parser.parseFromString(content, "text/xml");
        data.value = impact(result.getElementsByTagName("svg")[0]).outerHTML;
    } catch (err) {
        console.error(err);
    }
};

onMounted(fetchSvg);
</script>

<template>
    <svg v-html="data"></svg>
</template>
