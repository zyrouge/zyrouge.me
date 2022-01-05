<script setup lang="ts">
export type ColoredTextGroup = [string, string];

defineProps<{
    items: ColoredTextGroup[];
}>();
</script>

<template>
    <div
        :class="[
            'flex items-center rounded overflow-hidden cursor-pointer',
            y,
            'transition duration-200',
            i % 2 === 0 ? 'hover:bg-primary-500' : 'hover:bg-secondary-500',
        ]"
        v-for="([x, y], i) in items"
    >
        <p class="px-4 py-2 text-center w-full">{{ x }}</p>
    </div>
</template>
