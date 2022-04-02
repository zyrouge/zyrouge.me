<script setup lang="ts">
import { ref } from "vue";
import { ApiURLs } from "../core/api/base";
import { SiteMetadata, ExternalURLs } from "../tools/constants";
import { RenderTimes } from "../tools/non-constants";

const lastCompiled = new Date(__META_LAST_COMPILED__);
const lastRenderTime = ref(RenderTimes.latest);

const links: (string | [string, string])[] = [
    ["Source Code", ExternalURLs.ghRepo],
    ["Articles RSS", ApiURLs.articlesRss],
];

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

            <div class="mb-1 text-xs flex flex-wrap justify-center">
                <p
                    class="text-primary-500 hover:text-secondary-400 border-l border-secondary-500 first:border-l-0 pl-3 pr-3"
                    v-for="x in links"
                >
                    <a :href="x[1]" target="_blank">{{ x[0] }}</a>
                </p>
            </div>

            <div class="text-xs text-secondary-500">
                <p class="mb-0.5">Last rendered in {{ lastRenderTime }}ms</p>
                <p>Last built at {{ lastCompiled }}</p>
            </div>
        </div>
    </footer>
</template>
