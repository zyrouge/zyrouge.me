<script setup lang="ts">
import escapeHtml from "escape-html";
import { Constants } from "./tools/constants";
import { IProjectsFetchReturnType, Projects } from "./tools/projects";
import Hero from "./components/Hero.vue";
import Section from "./components/Section.vue";
import SplittedGrid from "./components/SplittedGrid.vue";
import HoverColoredTextGroup, {
    ColoredTextGroup,
} from "./components/HoverColoredTextGroup.vue";
import { ref } from "vue";

const skills: ColoredTextGroup[] = [
    ["JavaScript", "bg-yellow-500"],
    ["TypeScript", "bg-blue-600"],
    ["Dart", "bg-blue-900"],
    ["HTML", "bg-orange-500"],
    ["CSS", "bg-sky-600"],
];

const frameworks: ColoredTextGroup[] = [
    ["Vue", "bg-emerald-600"],
    ["Vite", "bg-purple-500"],
    ["Flutter", "bg-sky-500"],
    ["Tailwind CSS", "bg-sky-500"],
    ["Bulma", "bg-emerald-400"],
];

const tools: ColoredTextGroup[] = [
    ["MongoDB", "bg-green-600"],
    ["SQL", "bg-blue-700"],
    ["Git", "bg-zinc-700"],
    ["Visual Studio Code", "bg-cyan-600"],
];

const projects = ref<IProjectsFetchReturnType | null>(null);
Projects.fetch().then((x) => {
    projects.value = x;
    console.log(projects.value);
});

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
};

const toStylizedHtml = (code: string) => {
    const boldRegex = /\*\*([\S\s]+)\*\*/;

    return escapeHtml(code).replace(
        new RegExp(boldRegex, "g"),
        (match) => `<b>${match.match(boldRegex)![1]}</b>`
    );
};
</script>

<template>
    <Hero />

    <div class="c-x c-y" :id="Constants.ids.startContent.value">
        <Section title="Known Languages">
            <SplittedGrid class="pt-3">
                <HoverColoredTextGroup :items="skills" />
            </SplittedGrid>
        </Section>

        <Section class="mt-12" title="Known Frameworks">
            <SplittedGrid class="pt-3">
                <HoverColoredTextGroup :items="frameworks" />
            </SplittedGrid>
        </Section>

        <Section class="mt-12" title="Known Tools">
            <SplittedGrid class="pt-3">
                <HoverColoredTextGroup :items="tools" />
            </SplittedGrid>
        </Section>

        <Section class="mt-12" title="My Projects">
            <SplittedGrid class="pt-3" v-if="projects != null">
                <div v-for="x in projects.apps">
                    <a class="group" :href="x.href" target="_blank">
                        <div class="rounded-md overflow-hidden">
                            <img
                                class="aspect-[16/9] object-center object-cover"
                                :src="x.image"
                            />

                            <div class="relative">
                                <div
                                    class="absolute -bottom-8 w-full h-16 bg-gradient-to-b from-transparent to-primary-500/50 group-hover:to-secondary-500/50 transition duration-200"
                                ></div>
                            </div>

                            <div
                                class="relative z-10 px-4 py-2 bg-primary-500 group-hover:bg-secondary-500 transition duration-200"
                            >
                                <p class="font-bold text-lg">{{ x.name }}</p>
                                <p
                                    class="text-white/80"
                                    v-html="toStylizedHtml(x.description)"
                                ></p>

                                <div
                                    class="text-white/80 pt-1 flex flex-wrap gap-1 text-xs"
                                >
                                    <a
                                        class="bg-white/20 rounded px-1 underline"
                                        :href="y.href"
                                        target="_blank"
                                        v-for="y in x.links"
                                    >
                                        {{ y.name }}
                                    </a>

                                    <p
                                        class="bg-white/20 rounded px-1"
                                        v-for="y in x.tags"
                                    >
                                        {{ y }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </SplittedGrid>
        </Section>
    </div>

    <div class="flex justify-end">
        <button
            class="px-4 py-2 text-primary-500/80 hover:text-secondary-500 transition duration-200"
            @click="scrollToTop"
        >
            ☝️ Scroll to top
        </button>
    </div>
</template>
