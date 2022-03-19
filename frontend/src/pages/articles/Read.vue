<script setup lang="ts">
import { computed, reactive, ref, onUnmounted, onMounted } from "vue";
import sugar from "sugar";
import { IArticle, Articles } from "../../core/api/articles";
import { HeadAttrs, useHead, resetHeadMeta } from "../../core/head";
import { RoutePaths } from "../../core/router";
import { SiteMetadata } from "../../tools/constants";
import { States } from "../../tools/stated";
import { Utils } from "../../tools/utils";
import { useRoute } from "vue-router";

import Loader from "../../components/Loader.vue";
import Message from "../../components/Message.vue";

const hTitle = ref("Loading...");
const hMeta = reactive<HeadAttrs[]>([]);
useHead({
    title: computed(() => SiteMetadata.getTitle(`${hTitle.value} | Article`)),
    meta: hMeta,
});

const route = useRoute();

const state = ref(States.processing);
const article = ref<IArticle | null>(null);
const isUnknownArticle = computed(
    () => state.value === States.failed && hTitle.value === "404"
);

const writtenAt = computed(() =>
    article.value
        ? sugar.Date.relative(new Date(article.value.meta.writtenAt))
        : null
);

const updatedAt = computed(() =>
    article.value?.meta.updatedAt
        ? sugar.Date.relative(new Date(article.value.meta.updatedAt))
        : null
);

const fetchArticle = async () => {
    hTitle.value = "Loading...";

    const slug =
        typeof route.params.slug === "string"
            ? route.params.slug
            : Array.isArray(route.params.slug) && route.params.slug.length === 1
            ? route.params.slug[0]
            : null;

    if (!slug) {
        state.value = States.failed;
        hTitle.value = "404";
        return;
    }

    try {
        article.value = await Articles.getArticleFromSlug(slug);
        state.value = States.done;

        hTitle.value = article.value.meta.title;
        hMeta.push(
            {
                name: "description",
                content: article.value.meta.description,
            },
            {
                name: "keywords",
                content: article.value.meta.tags.join(", "),
            }
        );
    } catch (_) {
        state.value = States.failed;
        hTitle.value = "500";
    }
};

onMounted(fetchArticle);

onUnmounted(() => {
    resetHeadMeta(hMeta);
});
</script>

<template>
    <div>
        <hr />

        <div class="u-container u-container-h">
            <div
                class="u-flex py-10 min-h-[50vh]"
                v-if="state !== States.done || !article"
            >
                <Loader v-if="state === States.processing" />
                <div v-else>
                    <Message v-if="isUnknownArticle">
                        <template v-slot:header>
                            <p>404</p>
                        </template>

                        <template v-slot:body>
                            <p>
                                I know you could read, but this isn't the place
                                for it.
                            </p>
                        </template>

                        <template v-slot:footer>
                            <router-link
                                class="text-primary-500 hover:text-secondary-500"
                                :to="RoutePaths.articles"
                                >👉 Go to articles</router-link
                            >
                        </template>
                    </Message>
                    <Message v-else>
                        <template v-slot:header>
                            <p>500</p>
                        </template>

                        <template v-slot:body>
                            <p>Unfortunately, couldn't fetch the article.</p>
                        </template>

                        <template v-slot:footer>
                            <button
                                class="text-primary-500 hover:text-secondary-500"
                                @click="fetchArticle"
                            >
                                🔄 Retry
                            </button>
                        </template>
                    </Message>
                </div>
            </div>
            <div v-else>
                <div class="mb-3">
                    <p class="text-3xl font-bold mb-1">
                        {{ article.meta.title }}
                    </p>
                    <p class="mb-1">
                        {{ article.meta.description }}
                    </p>

                    <p class="text-sm mb-1 text-secondary-400">
                        {{ article.meta.tags.map((x) => `#${x}`).join(" ") }}
                    </p>
                    <p class="text-xs text-primary-500">
                        <span>
                            {{ writtenAt }}
                        </span>
                        <span v-if="updatedAt && writtenAt !== updatedAt">
                            ({{ updatedAt }})
                        </span>
                    </p>
                </div>

                <hr class="mb-8" />

                <div
                    class="u-stylify"
                    v-html="Utils.getSafeHtml(article.content)"
                ></div>
            </div>
        </div>
    </div>
</template>
