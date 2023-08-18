import Fuse from "fuse.js";
import { Routes } from "~/core/routes";

interface ArticleMinifiedData {
    title: string;
    description: string;
    url: string;
}

type ArticleSeatchDataState = "waiting" | "loading" | "loaded";

class ArticleSearch {
    dialogId = "article-search-dialog";
    dialogDismissableId = "article-search-dialog-dismissable";
    activeAttribute = "data-active";
    stateAttribute = "data-state";
    dialogTextInputId = "article-search-input";
    dialogDataIsLoadingId = "article-search-data-loading";
    dialogToggleButtonId = "article-search-dialog-button";
    dialogSearchStatusId = "article-search-status";
    dialogSearchResultsId = "article-search-results";
    dialogSearchCloseId = "article-search-close";

    dialogVisible = false;
    articlesState: ArticleSeatchDataState = "waiting";
    articles = new Map<string, ArticleMinifiedData>();
    searcher = new Fuse<ArticleMinifiedData>([], {
        keys: ["title", "description"],
        includeScore: true,
    });

    initialize() {
        this.attachDialogTextInput();
        this.attachDialogToggleButton();
        this.attachDialogDismissable();
        this.attachDialogCloseButton();
        this.attachEscapeKeypress();
    }

    attachEscapeKeypress() {
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.dialogVisible) {
                this.toggleDialog();
            }
        });
    }

    attachDialogTextInput() {
        const element = document.getElementById(this.dialogTextInputId);
        element?.addEventListener("input", () => {
            this.search();
        });
    }

    search() {
        const inputElement = document.getElementById(this.dialogTextInputId);
        const resultsElement = document.getElementById(
            this.dialogSearchResultsId
        );
        if (!inputElement || !resultsElement) {
            return;
        }
        const astroId =
            [...resultsElement.classList].find((x) => x.startsWith("astro-")) ??
            "";
        resultsElement.innerHTML = "";
        const text = (inputElement as HTMLInputElement).value;
        const matches = this.searcher.search(text);
        matches.reverse();
        matches.forEach(({ score, item }) => {
            const itemElement = document.createElement("a");
            itemElement.href = item.url;
            itemElement.id = "article-search-item";
            itemElement.classList.add(astroId);
            const itemScoreElement = document.createElement("p");
            itemScoreElement.id = "asi-score";
            const scorePercent = Math.floor(score! * 100);
            itemScoreElement.textContent = `${scorePercent}% Match`;
            itemScoreElement.classList.add(astroId);
            const itemTitleElement = document.createElement("p");
            itemTitleElement.id = "asi-title";
            itemTitleElement.textContent = item.title;
            itemTitleElement.classList.add(astroId);
            const itemDescriptionElement = document.createElement("p");
            itemDescriptionElement.id = "asi-description";
            itemDescriptionElement.textContent = item.description;
            itemDescriptionElement.classList.add(astroId);
            itemElement.append(
                itemScoreElement,
                itemTitleElement,
                itemDescriptionElement
            );
            resultsElement.appendChild(itemElement);
        });
    }

    attachDialogToggleButton() {
        const element = document.getElementById(this.dialogToggleButtonId);
        element?.addEventListener("click", () => {
            this.toggleDialog();
        });
    }

    attachDialogDismissable() {
        const element = document.getElementById(this.dialogDismissableId);
        element?.addEventListener("click", (e) => {
            if (e.target === element) {
                this.toggleDialog();
            }
        });
    }

    attachDialogCloseButton() {
        const element = document.getElementById(this.dialogSearchCloseId);
        element?.addEventListener("click", () => {
            this.toggleDialog();
        });
    }

    toggleDialog() {
        this.ensureArticlesData();
        this.dialogVisible = !this.dialogVisible;
        const element = document.getElementById(this.dialogId);
        element?.setAttribute(
            this.activeAttribute,
            this.dialogVisible ? "true" : ""
        );
        if (this.dialogVisible) {
            document.getElementById(this.dialogTextInputId)?.focus();
        }
    }

    async ensureArticlesData() {
        if (this.articlesState === "waiting") {
            this.setArticlesState("loading");
            await this.fetchSearchData();
            this.setArticlesState("loaded");
        }
    }

    setArticlesState(state: ArticleSeatchDataState) {
        this.articlesState = state;
        const element = document.getElementById(this.dialogSearchStatusId);
        element?.setAttribute(this.stateAttribute, state);
        const isLoading = state === "loading";
        if (isLoading || state === "loaded") {
            const element = document.getElementById(this.dialogDataIsLoadingId);
            element?.setAttribute(
                this.activeAttribute,
                isLoading ? "true" : ""
            );
        }
    }

    async fetchSearchData() {
        const body = await fetch(Routes.articles.searchJson);
        const json: [[string, string, string]] = await body.json();
        json.forEach(([title, description, url]) => {
            const item = { title, description, url };
            this.articles.set(item.url, item);
            this.searcher.add(item);
        });
    }
}

const articleSearch = new ArticleSearch();
articleSearch.initialize();

export {};
