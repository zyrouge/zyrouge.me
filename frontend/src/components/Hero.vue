<script setup lang="ts">
import XSvg from "./XSvg.vue";

import { ExternalURLs, StaticAssets } from "../tools/constants";

const links: [string, string][] = [
    [ExternalURLs.github, StaticAssets.github],
    [ExternalURLs.instagram, StaticAssets.instagram],
    [ExternalURLs.twitter, StaticAssets.twitter],
];
</script>

<template>
    <div class="relative bg-gradient-to-br from-primary-500 to-primary-800">
        <div class="u-container u-flex !flex-col">
            <p class="text-xl text-center md:px-16 py-20 md:py-28">
                A passionate full-stack && ui designer && software developer &&
                open-source lover.
            </p>
        </div>

        <div class="absolute bottom-0 right-0">
            <div class="u-flex !justify-end gap-3 p-3">
                <a v-for="x in links" :href="x[0]" target="_blank">
                    <XSvg class="hero-footer-icon" :src="x[1]" />
                </a>
            </div>
        </div>
    </div>
</template>

<style>
.hero-footer-icon {
    @apply aspect-square w-5;
}

.hero-footer-icon path {
    @apply fill-white opacity-60 transition duration-200;
}

.hero-footer-icon:hover path {
    @apply opacity-100;
}
</style>
