<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import sugar from "sugar";
import { RoutePaths } from "../../core/router";
import { IArticleMetadata, Articles } from "../../core/api/articles";
import { setTitle } from "../../core/head";
import { SiteMetadata } from "../../tools/constants";
import { States } from "../../tools/stated";
import { Utils } from "../../tools/utils";

import Loader from "../../components/Loader.vue";
import Message from "../../components/Message.vue";

setTitle(SiteMetadata.getTitle("Articles"));

const state = ref(States.processing);
const articles = ref<IArticleMetadata[]>([]);

const fetchArticles = async () => {
    try {
        state.value = States.processing;
        articles.value = await Articles.getAllArticles();
        state.value = States.done;
    } catch (_) {
        state.value = States.failed;
    }
};

const SortBy = [
    "Recent (Ascending)",
    "Recent (Descending)",
    "A-Z (Ascending)",
    "A-Z (Descending)",
] as const;
type SortByType = typeof SortBy[number];

const sortBy = ref<SortByType>(SortBy[0]);
const sortedArticles = computed(() => {
    return [
        () => articles.value.sort((a, b) => a.publishedAt - b.publishedAt),
        () => articles.value.sort((a, b) => b.publishedAt - a.publishedAt),
        () => articles.value.sort((a, b) => a.title.localeCompare(b.title)),
        () => articles.value.sort((a, b) => b.title.localeCompare(a.title)),
    ][SortBy.indexOf(sortBy.value)]();
});

const getArticleRouteURL = (slug: string) =>
    `${RoutePaths.articlesRead}/${slug}`;

onMounted(fetchArticles);
</script>

<template>
    <div>
        <hr />

        <div class="u-container u-container-h">
            <div class="flex flex-col sm:flex-row justify-between">
                <p class="text-lg pb-1 sm:pb-0">Recent Articles</p>

                <div class="u-flex !justify-start">
                    <p class="mr-2 sm:hidden text-secondary-500">Sort by:</p>
                    <select
                        class="bg-secondary-900 px-1 outline-none"
                        v-model="sortBy"
                        :disabled="state !== States.done"
                    >
                        <option v-for="x in SortBy" :value="x">
                            {{ x }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="u-flex py-10 min-h-[50vh]" v-if="state !== States.done">
                <Loader v-if="state === States.processing" />
                <div v-else>
                    <Message>
                        <template v-slot:header>
                            <p>500</p>
                        </template>

                        <template v-slot:body>
                            <p>
                                Unfortunately, couldn't fetch all the articles.
                            </p>
                        </template>

                        <template v-slot:footer>
                            <button
                                class="text-primary-500 hover:text-secondary-500"
                                @click="fetchArticles"
                            >
                                🔄 Retry
                            </button>
                        </template>
                    </Message>
                </div>
            </div>
            <div class="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4" v-else>
                <router-link
                    class="group bg-secondary-900 hover:bg-primary-500 px-4 py-2"
                    v-for="x in sortedArticles"
                    :to="getArticleRouteURL(x.slug)"
                >
                    <p class="text-xs pb-0.5">
                        <span class="text-primary-500 group-hover:text-white">{{
                            sugar.Date.relative(new Date(x.publishedAt))
                        }}</span>
                        <span class="text-secondary-400 group-hover:text-white">
                            / {{ x.readingTime }} mins. read</span
                        >
                    </p>

                    <p>{{ x.title }}</p>
                    <p
                        class="text-sm text-secondary-400 group-hover:text-white pb-0.5"
                        v-html="Utils.getSafeHtml(x.description)"
                    ></p>

                    <p
                        class="text-xs group-hover:text-white text-secondary-400"
                    >
                        {{ x.tags.map((x) => `#${x}`).join(" ") }}
                    </p>
                </router-link>
            </div>
        </div>
    </div>
</template>
