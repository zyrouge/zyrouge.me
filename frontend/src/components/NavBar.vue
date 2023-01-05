<script setup lang="ts">
import { onMounted, ref } from "vue";
import ProgressBar from "./ProgressBar.vue";
import {
    RoutePaths,
    routes as rRoutes,
    routesMap,
    progress,
} from "../core/router";

const logoLinkTo = routesMap[RoutePaths.home];
const routes = rRoutes.filter((x) => x.name);

const loadingProgress = ref(progress.value);

onMounted(() => {
    progress.onUpdate.listen((value) => {
        loadingProgress.value = value;
    });
});
</script>

<template>
    <nav>
        <ProgressBar :percent="loadingProgress" />
        <div class="py-4 md:py-6">
            <div
                class="u-flex !flex-col md:!flex-row !justify-around gap-4 md:gap-8"
            >
                <router-link class="s-link font-bold" :to="logoLinkTo">
                    <span class="opacity-50">{</span> zyrouge
                    <span class="opacity-50">}</span>
                </router-link>

                <div class="u-flex gap-8">
                    <router-link
                        class="s-link"
                        active-class="text-primary-500 hover:text-white"
                        :to="x.path"
                        v-for="x in routes"
                    >
                        {{ x.name }}
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped lang="scss">
.s-link {
    @apply px-1 relative transition duration-150;
    @apply after:content-[""] after:transition-all after:duration-150 after:ease-in-out;
    @apply after:absolute after:left-0 after:bottom-0 after:bg-primary-500 after:-z-10;
    @apply after:h-0 after:w-full hover:after:h-full;
}
</style>
