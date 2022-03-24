<script setup lang="ts">
import { RoutePaths, routes as rRoutes, routesMap } from "../core/router";

const logoLinkTo = routesMap[RoutePaths.home];
const routes = rRoutes.filter((x) => x.name);
</script>

<template>
    <nav>
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
    @apply hover:bg-primary-500 px-1;
}
</style>
