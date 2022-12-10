<script lang="ts" setup>
interface Props {
    percent: number;
}

const { percent } = defineProps<Props>();
</script>

<template>
    <div class="w-full h-0.5">
        <div
            class="h-full bg-primary-500 rounded"
            :style="{
                width: `${percent}%`,
                transition: 'width 0.2s ease-in-out',
            }"
        ></div>
    </div>
</template>
