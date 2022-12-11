import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { RenderTimes } from "../tools/non-constants";
import { Eventer } from "../tools/utils";

export class RoutePaths {
    static home = "/";
    static articles = "/articles";
    static articlesRead = `${RoutePaths.articles}/read`;
    static redirect = "/redirect";
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
        path: `${RoutePaths.redirect}/:key`,
        component: () => import("../pages/Redirect.vue"),
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

export const progress = {
    value: 0,
    onUpdate: new Eventer<number>(),
    _timer: null as NodeJS.Timer | null,
    _timeout: null as NodeJS.Timeout | null,
    _update: (value: number) => {
        progress.value = value;
        progress.onUpdate.dispatch(value);
    },
    start: () => {
        progress.reset(0);
        progress._timer = setInterval(() => {
            let nValue = progress.value;
            if (nValue < 40) nValue += 3;
            else if (nValue < 70) nValue += 2;
            else if (nValue < 90) nValue += 1;
            progress._update(nValue);
        }, 50);
    },
    stop: () => {
        progress.reset(100);
        progress._timeout = setTimeout(() => {
            progress.reset(0);
        }, 750);
    },
    reset: (value: number) => {
        if (progress._timer != null) {
            clearInterval(progress._timer);
            progress._timer = null;
        }
        if (progress._timeout != null) {
            clearInterval(progress._timeout);
            progress._timeout = null;
        }
        progress._update(value);
    },
};

router.beforeEach((_, __, next) => {
    progress.start();
    RenderTimes.start();
    next();
});

router.afterEach(() => {
    progress.stop();
    RenderTimes.stop();
});
