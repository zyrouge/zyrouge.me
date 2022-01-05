<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <div>
        <p class="c-text text-3xl font-bold">{{ title }}.</p>
        <!-- <hr class="border-teal-900/50" /> -->

        <slot></slot>
    </div>
</template>
