<script setup lang="ts">
import { ref } from "vue";

const max = 3;
const current = ref(0);
const duration = 250;

setInterval(() => {
    current.value = current.value + 1 > max ? 0 : current.value + 1;
}, duration);
</script>

<template>
    <div>
        <div class="u-flex gap-1">
            <p
                v-for="i in Array.from(
                    {
                        length: max,
                    },
                    (_, i) => i
                )"
                :class="[
                    'w-2 h-2 bg-primary-500 rounded-full',
                    current === i && 'bg-opacity-50',
                ]"
                :style="{
                    transition: `${duration}ms`,
                }"
            ></p>
        </div>
    </div>
</template>
