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

export interface IProjectsResponse {
    lastUpdated: number;
    apps: IProject[];
}

export class Projects {
    static url = "https://zyrouge.github.io/projects/api.json";

    static cache?: IProjectsResponse;

    static async getAll() {
        if (!Projects.cache) {
            const resp = await fetch(this.url);
            Projects.cache = (await resp.json()) as IProjectsResponse;
        }

        return Projects.cache;
    }
}
