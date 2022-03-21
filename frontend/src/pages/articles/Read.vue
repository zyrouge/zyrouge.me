<script setup lang="ts">
import { computed, reactive, ref, onMounted, onUnmounted } from "vue";
import sugar from "sugar";
import { IArticle, Articles } from "../../core/api/articles";
import { HeadAttrs, useHead, resetHeadMeta } from "../../core/head";
import { RoutePaths, router } from "../../core/router";
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

interface ITocElement {
    id: string;
    title: string;
}

const toc = reactive<ITocElement[]>([]);

const getRenderedHtml = (content: string) => {
    toc.splice(0, Infinity);

    const element = document.createElement("div");
    element.id = `ac-${Utils.random(8).join("")}`;
    element.innerHTML = Utils.getSafeHtml(content);

    for (const x of Array.from(
        element.querySelectorAll(":is(h1, h2, h3, h4, h5, h6)")
    )) {
        const cTitle = x.textContent!;
        const cId = `h-${Utils.getHtmlSafeId(cTitle)}`;

        x.id = cId;
        x.setAttribute("onclick", `window.toggleCurrentHeading(this.id);`);
        toc.push({
            id: cId,
            title: cTitle,
        });
    }

    onContentLoaded(element.id);
    return element.outerHTML;
};

const currentHeading = ref<string | null>(null);

(window as any).toggleCurrentHeading = (id: string) => {
    const dataActiveKey = "data-active";

    if (currentHeading.value) {
        const previous = document.getElementById(currentHeading.value);
        previous?.removeAttribute(dataActiveKey);

        if (currentHeading.value === id) {
            currentHeading.value = null;
            return;
        }
    }

    const current = document.getElementById(id);
    if (current) {
        history.replaceState(undefined, "", `#${id}`);
        current.setAttribute(dataActiveKey, "");
        current.scrollIntoView({ behavior: "smooth" });
        currentHeading.value = id;
    }
};

const onContentLoaded = (contentElementId: string) => {
    const watcher = setInterval(() => {
        const element = document.getElementById(contentElementId);
        if (element) {
            (window as any).toggleCurrentHeading(location.hash.slice(1));
            clearInterval(watcher);
        }
    }, 100);
};

onMounted(fetchArticle);

onUnmounted(() => {
    delete (window as any).toggleCurrentHeading;
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
            <article v-else>
                <div class="mb-3">
                    <p class="text-3xl font-bold mb-1">
                        {{ article.meta.title }}
                    </p>
                    <p class="mb-1">
                        {{ article.meta.description }}
                    </p>

                    <p class="text-sm mb-1 text-secondary-400 mb-1">
                        {{ article.meta.tags.map((x) => `#${x}`).join(" ") }}
                    </p>
                    <p class="text-xs text-primary-500">
                        {{ sugar.Date.relative(new Date(article.meta.time)) }}
                    </p>
                </div>

                <hr class="mb-8" />

                <div
                    class="u-stylify"
                    v-html="getRenderedHtml(article.content)"
                ></div>
            </article>
        </div>
    </div>
</template>
