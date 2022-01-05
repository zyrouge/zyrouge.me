<script setup lang="ts">
import { Constants } from "../tools/constants";
</script>

<template>
    <div class="sticky">
        <div class="flex flex-row justify-center items-center gap-8">
            <button
                class="capitalize"
                @click="x.scroll"
                v-for="x in Object.values(Constants.ids.sections)"
            >
                {{ x.name }}
            </button>
        </div>
    </div>
</template>
