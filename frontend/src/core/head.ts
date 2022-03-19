import { createHead, HeadAttrs, useHead } from "@vueuse/head";

export * from "@vueuse/head";

export const head = createHead();

export const resetHeadMeta = (attributes: HeadAttrs[]) => {
    attributes.forEach((x) => {
        document
            .querySelector(
                `meta${Object.entries(x)
                    .map(([k, v]) => `[${k}="${v}"]`)
                    .join("")}`
            )
            ?.remove();
    });
};
