<script setup lang="ts">
import { useRoute } from "vue-router";
import { RoutePaths } from "../core/router";
import { ExternalURLs } from "../tools/constants";

import Message from "../components/Message.vue";

const route = useRoute();
const key = route.params.key;

const keys: Record<string, string> = {
    discord: ExternalURLs.discord,
    github: ExternalURLs.github,
    instagram: ExternalURLs.instagram,
    twitter: ExternalURLs.twitter,
    source: ExternalURLs.ghRepo,
};

const redirect = typeof key === "string" ? keys[key.toLowerCase()] : undefined;
if (redirect) {
    location.href = redirect;
}
</script>

<template>
    <div>
        <div class="u-container u-container-h u-flex py-10 min-h-[60vh]">
            <Message>
                <template v-slot:header>
                    <p v-if="redirect">302</p>
                    <p v-else>418</p>
                </template>

                <template v-slot:body>
                    <p v-if="redirect">Taking you to the right place asap.</p>
                    <p v-else>I don't even think this is a valid thing.</p>
                </template>

                <template v-slot:footer v-if="!redirect">
                    <router-link
                        class="text-primary-500 hover:text-secondary-500"
                        :to="RoutePaths.home"
                    >
                        👉 Go home
                    </router-link>
                </template>
            </Message>
        </div>
    </div>
</template>
