<script setup lang="ts">
import { ref } from "vue";
import { SiteMetadata } from "../tools/constants";
import { RenderTimes } from "../tools/non-constants";

const lastCompiled = new Date(__META_LAST_COMPILED__);
const lastRenderTime = ref(RenderTimes.latest);

RenderTimes.stream.listen((ms) => {
    lastRenderTime.value = ms;
});
</script>

<template>
    <footer>
        <hr class="border-secondary-500/50" />

        <div class="u-container py-4 text-center text-sm">
            <p class="mb-1">
                Made by
                <span class="text-primary-500">{{ SiteMetadata.title }}</span>
                with ❤️
            </p>

            <div class="text-xs text-secondary-500">
                <p class="mb-0.5">Last rendered in {{ lastRenderTime }}ms</p>
                <p>Last built at {{ lastCompiled }}</p>
            </div>
        </div>
    </footer>
</template>
