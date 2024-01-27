const fs = window.require("node:fs");
export class TmapReader {
    readFile(file) {
        let f = fs.readFileSync(file, "utf-8");
        console.log(f);
    }
}
