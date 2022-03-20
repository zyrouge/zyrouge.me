import { execSync } from "child_process";
import path from "path";
import { promises as fs } from "fs";
import readdirp from "readdirp";

const start = async () => {
    const root = path.resolve(__dirname, "../..");
    const pOutput = path.join(root, "dist");
    const pApiOutput = path.join(pOutput, "api");
    const pBackend = path.join(root, "backend");
    const pBackendOutput = path.join(pBackend, "dist");
    const pFrontend = path.join(root, "frontend");
    const pFrontendOutput = path.join(pFrontend, "dist");

    await fs.rm(pOutput, {
        recursive: true,
        force: true,
    });

    await fs.mkdir(pOutput, {
        recursive: true,
    });

    execSync("yarn run build", {
        cwd: pBackend,
    });
    console.log("backend: Build succeeded");

    execSync("yarn run build", {
        cwd: pFrontend,
    });
    console.log("frontend: Build succeeded");

    await copyRecursive(pFrontendOutput, pOutput);
    await copyRecursive(pBackendOutput, pApiOutput);
    await fs.copyFile(
        path.join(pOutput, "index.html"),
        path.join(pOutput, "404.html")
    );
    await fs.writeFile(path.join(pOutput, ".nojekyll"), "");
    console.log("main: Build succeeded");
};

start();

async function copyRecursive(src: string, dest: string) {
    for await (const x of readdirp(src, { type: "files" })) {
        const to = path.join(dest, path.relative(src, x.fullPath));
        await fs.mkdir(path.dirname(to), {
            recursive: true,
        });
        await fs.copyFile(x.fullPath, to);
    }
}
