<script setup lang="ts">
import { setTitle } from "../core/head";
import { ExternalAssets, SiteMetadata, StaticAssets } from "../tools/constants";
import { Utils } from "../tools/utils";

import Hero from "../components/Hero.vue";

setTitle(SiteMetadata.getTitle("Home"));

const langs: [string, string, string][] = [
    ["Javascript", StaticAssets.javascript, "Language"],
    ["Typescript", StaticAssets.typescript, "Language"],
    ["HTML", StaticAssets.html, "Language"],
    ["CSS", StaticAssets.css, "Language"],
    ["Dart", StaticAssets.dart, "Language"],
    ["Electron", StaticAssets.electron, "App Framework"],
    ["Flutter", StaticAssets.flutter, "App Framework"],
    ["Vue", StaticAssets.vue, "UI Framework"],
    ["Tailwind CSS", StaticAssets.tailwindcss, "CSS Framework"],
    ["MongoDB", StaticAssets.mongodb, "Database"],
    ["SQL", StaticAssets.sqlite, "Database"],
];

const projects: {
    name: string;
    href: string;
    description: string;
    image: string;
    tags: string[];
}[] = [
    {
        name: "Genius Lyrics",
        href: "https://genius-lyrics.js.org",
        description:
            "Just a simple lyrics fetcher that uses Genius. Also has official API implementations.",
        image: StaticAssets.genius,
        tags: ["typescript"],
    },
    {
        name: "UprightQuotes",
        href: "https://github.com/zyrouge/upright-quotes",
        description: "✨ Curated list of deep-meaning quotes as text or image.",
        image: ExternalAssets.uprightQuotesLogo,
        tags: ["vue", "typescript", "rest"],
    },
];
</script>

<template>
    <div>
        <Hero />

        <div class="u-container u-container-h">
            <div class="mb-10">
                <p class="text-lg">What do I usually use?</p>

                <div
                    class="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    <div
                        class="bg-secondary-900 u-flex gap-4 px-4 py-2"
                        v-for="x in langs"
                    >
                        <img
                            class="h-auto w-8"
                            :src="x[1]"
                            :alt="`${x[0]}'s logo`"
                        />
                        <p class="h-full w-[1px] bg-secondary-800"></p>
                        <div class="w-full">
                            <p>{{ x[0] }}</p>
                            <p class="text-secondary-500 text-sm">{{ x[2] }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <p class="text-lg">Some of my projects</p>

                <div
                    class="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    <div v-for="x in projects">
                        <a
                            class="block group bg-secondary-900 hover:bg-primary-500"
                            :href="x.href"
                            target="_blank"
                        >
                            <img
                                class="aspect-video w-full object-cover"
                                :src="x.image"
                                :alt="`${x.name}'s logo`"
                            />

                            <div class="px-4 py-2">
                                <p class="text-md mb-0.5">{{ x.name }}</p>
                                <p
                                    class="text-secondary-500 group-hover:text-white text-sm mb-0.5"
                                    v-html="
                                        Utils.renderSimpleMarkdown(
                                            x.description
                                        )
                                    "
                                ></p>

                                <div
                                    class="u-flex flex-wrap !justify-start text-xs text-primary-500 group-hover:text-white"
                                >
                                    <p class="mr-2" v-for="y in x.tags">
                                        #{{ y }}
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
