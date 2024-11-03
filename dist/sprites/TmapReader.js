const fs = window.require("fs");
export class TileMap {
    constructor(background, key, map) {
        this.background = background;
        this.key = key;
        this.map = map;
    }
}
export class TmapReader {
    /**
     * Scrapes the background color of a .tmap file.
     *
     * @param contents - The string of contents read in from a .tmap file.
     * @returns - The background color of the map.
     */
    scrapeBackground(contents) {
        if (contents.indexOf("#background") > -1) {
            const ind = contents.indexOf("#background") + "#background".length - 1;
            let color = "";
            if (contents.charAt(ind + 1) != ":") {
                console.error("No colon found for #background tag!");
                return "";
            }
            let readInd = ind + 2;
            while (contents.charAt(readInd) != ";") {
                color += contents.charAt(readInd);
                readInd++;
            }
            color.replace("\"", "");
            return color;
        }
        return "";
    }
    /**
     * Fetches the key decoder from a .tmap file. Keys are used to
     * encode singular characters into their tile names for convenience
     * in map creation.
     *
     * @param contents - The string of contents read in from a .tmap file.
     * @returns - A map of characters, connected to their respective tile names.
     */
    scrapeKey(contents) {
        let whitespace = [" ", "\t", "\n"];
        if (contents.indexOf("#key") > -1) {
            const ind = contents.indexOf("#key") + "#key".length - 1;
            if (contents.charAt(ind + 1) != ":") {
                console.error("No colon found for #key tag!");
                return new Map();
            }
            let substr = contents.substring(ind + 1);
            let readInd = 2;
            while (substr.charAt(readInd) != "{") {
                if (whitespace.indexOf(substr.charAt(readInd)) == -1) {
                    console.error("Missing '{' symbol for #key tag!");
                    return new Map();
                }
                readInd++;
            }
            readInd++;
            let key = "";
            let sprite = "";
            let isReading = false;
            let currentRead = "sprite";
            let tileKey = new Map();
            while (substr.charAt(readInd) != "}") {
                if (substr.charAt(readInd) == "\"") {
                    isReading = !isReading;
                    if (isReading) {
                        currentRead = currentRead == "key" ? "sprite" : "key";
                    }
                    if (isReading && currentRead == "key") {
                        tileKey.set(key, sprite);
                        key = "";
                        sprite = "";
                    }
                }
                else {
                    let c = substr.charAt(readInd);
                    if (isReading) {
                        if (currentRead == "key") {
                            key += c;
                        }
                        else {
                            sprite += c;
                        }
                    }
                }
                readInd++;
            }
            tileKey.set(key, sprite);
            tileKey.delete("");
            return tileKey;
        }
        else {
            console.error("No proper #key tag found!");
            return new Map();
        }
    }
    /**
     * Constructs a map of each grid of tiles linked to the layer they
     * are supposed to appear on in the hierarchy.
     *
     * @param contents - The string of contents read in from a .tmap file.
     * @returns - The encoded grid of each layer of the map.
     */
    scrapeMaps(contents) {
        let maps = new Map();
        while (contents.indexOf("#{layer=") > -1) {
            contents = contents.substring(contents.indexOf("#{layer="));
            let layerName = "";
            let readInd = 0;
            while (contents.charAt(readInd) != "=")
                readInd++;
            readInd++;
            while (contents.charAt(readInd) != "}") {
                layerName += contents.charAt(readInd);
                readInd++;
            }
            contents = contents.substring(readInd);
            readInd = 0;
            if (contents.charAt(readInd + 1) != ":") {
                console.error("Missing : in definition of map layer!");
                return new Map();
            }
            readInd++;
            readInd = contents.indexOf("{");
            let layerRows = new Array();
            let row = "";
            let reading = false;
            let toggleReader = false;
            while (contents.charAt(readInd) != "}") {
                if (contents.charAt(readInd) == "\"") {
                    reading = !reading;
                    if (!reading) {
                        layerRows.push(row);
                        row = "";
                        toggleReader = true;
                    }
                }
                else {
                    if (reading && toggleReader)
                        row += contents.charAt(readInd);
                    toggleReader = !toggleReader;
                }
                readInd++;
            }
            maps.set(layerName, layerRows);
        }
        return maps;
    }
    /**
     * Reads a .tmap file and constructs a new tilemap.
     *
     * @param file - The .tmap file to read from.
     * @returns - The tilemap of the .tmap file.
     */
    readFile(file) {
        const contents = fs.readFileSync(file, "utf-8");
        let background = this.scrapeBackground(contents);
        let key = this.scrapeKey(contents);
        let map = this.scrapeMaps(contents);
        return new TileMap(background, key, map);
    }
    load(map, key) {
        let arr = Array.from(map.map.keys());
        for (let i = 0; i < arr.length; i++) {
            let layer = arr[i];
            let canvas = document.getElementById(layer);
            let ctx = canvas.getContext("2d");
            ctx.imageSmoothingEnabled = false;
            if (layer == "map") {
                ctx.fillStyle = map.background;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            let grid = map.map.get(layer);
            const startingPositionX = canvas.width / 2 - grid[0].length / 2 * 48;
            const startingPositionY = canvas.height / 2 - grid.length / 2 * 48;
            for (let row = 0; row < grid.length; row++) {
                for (let col = 0; col < grid[0].length; col++) {
                    if (grid[row].charAt(col) == " ")
                        continue;
                    const k = grid[row].charAt(col);
                    const spr = key.key.get(map.key.get(k));
                    ctx.drawImage(spr.image, spr.x, spr.y, 16, 16, startingPositionX + col * 48, startingPositionY + row * 48, 48, 48);
                }
            }
        }
    }
}
