const fs = window.require("fs");

export class TileMap {
    background: string;
    layer: string;
    map: HTMLImageElement;
    
    constructor(background: string, layer: string, map: HTMLImageElement) {
        this.background = background;
        this.layer = layer;
        this.map = map;
    }

    load() {
        const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById(this.layer)!;
        const ctx = canvas.getContext("2d")!;
        ctx.imageSmoothingEnabled = false;

        ctx.fillStyle = this.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const startingPositionX = canvas.width / 2 - this.map.width / 2;
        const startingPositionY = canvas.height / 2 - this.map.height / 2;

        ctx.drawImage(this.map, startingPositionX, startingPositionY);
    }

    getBackground() {
        return this.background;
    }

    setBackground(background: string) {
        this.background = background;
    }

    getLayer() {
        return this.layer;
    }

    setLayer(layer: string) {
        this.layer = layer;
    }

    getMap() {
        return this.map;
    }

    setMap(map: HTMLImageElement) {
        this.map = map;
    }
}

export class TmapReader {
    scrapeBackground(contents: string): string {
        if (contents.indexOf("#background") > -1) {
            const ind = contents.indexOf("#background") + "#background".length - 1;
            let color: string = "";

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

    readFile(file: string): TileMap {
        const contents: string = fs.readFileSync(file, "utf-8");

        let background = this.scrapeBackground(contents);
        let layer = "";
        let map = new Image();

        let whitespace = [" ", "\t", "\n"];

        if (contents.indexOf("#key") > -1) {
            const ind = contents.indexOf("#key") + "#key".length - 1;
            if (contents.charAt(ind + 1) != ":") {
                console.error("No colon found for #key tag!");
                return new TileMap(background, layer, map);
            }

            let substr = contents.substring(ind + 1);
            let readInd = 2;
            
            while (substr.charAt(readInd) != "{") {
                console.log(substr.charAt(readInd));
                if (whitespace.indexOf(substr.charAt(readInd)) == -1) {
                    console.error("Missing '{' symbol for #key tag!");
                    return new TileMap(background, layer, map);   
                }
                readInd++;
            }
            readInd++;

            let key = "";
            let sprite = "";

            let isReading = false;
            let currentRead = "sprite";

            let tileKey: Map<string, string> = new Map<string, string>()

            while (substr.charAt(readInd) != "}") {
                console.log(substr.charAt(readInd));

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
                } else {
                    let c: string = substr.charAt(readInd);
                    if (isReading) {
                        if (currentRead == "key") {
                            key += c;
                        } else {
                            sprite += c;
                        }
                    }
                }
                readInd++;
            }
            tileKey.delete("");
            console.log(tileKey);
        } else {
            console.error("No proper #key tag found!");
            return new TileMap(background, layer, map);
        }

        return new TileMap(background, layer, map);
    }
}