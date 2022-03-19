<script setup lang="ts">
import { RoutePaths } from "../core/router";

import Message from "../components/Message.vue";
</script>

<template>
    <div>
        <hr />

        <div class="u-container u-container-h u-flex py-10 min-h-[60vh]">
            <Message>
                <template v-slot:header>
                    <p>404</p>
                </template>

                <template v-slot:body>
                    <p>As far as I know, you shouldn't be here.</p>
                </template>

                <template v-slot:footer>
                    <router-link
                        class="text-primary-500 hover:text-secondary-500"
                        :to="RoutePaths.home"
                        >👉 Go home</router-link
                    >
                </template>
            </Message>
        </div>
    </div>
</template>
