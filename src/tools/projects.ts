export interface IProjectLink {
    name: string;
    href: string;
}

export interface IProject {
    name: string;
    href: string;
    description: string;
    image: string;
    tags: string[];
    links: IProjectLink[];
}

export interface IProjectsFetchReturnType {
    lastUpdated: number;
    apps: IProject[];
}

export class Projects {
    static url = "https://zyrouge.github.io/projects/api.json";

    static async fetch() {
        const resp = await window.fetch(this.url);
        return (await resp.json()) as IProjectsFetchReturnType;
    }
}
