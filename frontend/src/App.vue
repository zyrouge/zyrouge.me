<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

import NavBar from "./components/NavBar.vue";
import Fade from "./components/transitions/Fade.vue";
import Footer from "./components/Footer.vue";

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
};

const isScrollBarVisible = ref(false);

let onResize: ResizeObserver | undefined;
onMounted(() => {
    const element = document.scrollingElement!;
    onResize = new ResizeObserver(() => {
        isScrollBarVisible.value = element.scrollHeight > element.clientHeight;
    });
    onResize.observe(document.scrollingElement!);
});

onUnmounted(() => {
    onResize?.disconnect();
    onResize = undefined;
});
</script>

<template>
    <NavBar />

    <main>
        <router-view v-slot="{ Component }">
            <Fade>
                <component :is="Component" />
            </Fade>
        </router-view>
    </main>

    <div class="flex justify-end" v-if="isScrollBarVisible">
        <button
            class="px-4 py-2 text-primary-500/80 hover:text-secondary-500 transition duration-200"
            @click="scrollToTop"
        >
            ☝️ Scroll to top
        </button>
    </div>

    <Footer />
</template>
