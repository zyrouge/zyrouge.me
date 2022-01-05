<script setup lang="ts">
import { Constants } from "../tools/constants";
</script>

<template>
    <div
        class="min-h-[25rem] h-screen flex flex-col justify-center items-center"
    >
        <p class="text-xl">Hello there!</p>
        <p class="pt-2 text-4xl md:text-5xl">
            I'm
            <b
                class="c-text decoration-primary-500/70 hover:decoration-secondary-500/70 underline decoration-wavy decoration-4 transition duration-200 cursor-pointer"
                >Zyrouge</b
            >.
        </p>

        <div class="pt-20">
            <button
                class="c-bg text-3xl rounded-full flex justify-center items-center w-12 h-12 cursor-pointer transition duration-200"
                @click="Constants.ids.startContent.scroll"
            >
                👇
            </button>
        </div>
    </div>
</template>
