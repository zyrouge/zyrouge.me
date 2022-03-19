import path from "path";

export class Paths {
    static base = path.resolve(__dirname, "..");
    static root = path.dirname(Paths.base);
    static articles = path.resolve(Paths.root, "articles");
    static output = path.resolve(Paths.base, "dist");
}
