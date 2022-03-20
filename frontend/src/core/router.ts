import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

export class RoutePaths {
    static home = "/";
    static articles = "/articles";
    static articlesRead = `${RoutePaths.articles}/read`;
}

export const routes: RouteRecordRaw[] = [
    {
        name: "Home",
        path: RoutePaths.home,
        component: () => import("../pages/Home.vue"),
    },
    {
        name: "Articles",
        path: RoutePaths.articles,
        component: () => import("../pages/articles/Home.vue"),
    },
    {
        path: `${RoutePaths.articlesRead}/:slug(.*)`,
        component: () => import("../pages/articles/Read.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("../pages/_404.vue"),
    },
];

export const routesMap = Object.fromEntries(routes.map((x) => [x.path, x]));

export const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});
