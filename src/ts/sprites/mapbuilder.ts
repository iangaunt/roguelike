let map: Map<string, Sprite> = new Map<string, Sprite>()

/** A "sprite" value containing a link to an image and its x-y coordinates of the rip. */
export class Sprite {
    #file: string;
    #x: number;
    #y: number;

    constructor(file: string, x: number, y: number) {
        this.#file = file;
        this.#x = x;
        this.#y = y;
    }

    getFile(): string {
        return this.#file;
    }

    getX(): number {
        return this.#x;
    }

    getY(): number {
        return this.#y;
    }
}

/** A class for constructing maps based on tile and collision maps. */
export class MapBuilder {
    name: string;
    background: string = "rgb(0, 0, 0)";
    tiles: Array<string>;
    code: Map<string, string>;

    #files: Map<string, HTMLImageElement>;

    constructor(name: string, tiles: Array<string>, code: Map<string, string>) {
        this.name = name;
        this.tiles = tiles;
        this.code = code;

        this.#files = new Map<string, HTMLImageElement>();
    }

    setBackground(background: string) {
        this.background = background;
    }

    setTiles(tiles: Array<string>) {
        this.tiles = tiles;
    }

    load(layer: string, img: HTMLImageElement): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById(layer)!;
        let ctx = canvas.getContext("2d")!;
        ctx.imageSmoothingEnabled = false;

        ctx.fillStyle = this.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const startingPositionX = canvas.width / 2 - this.tiles[0].length / 2 * 48;
        const startingPositionY = canvas.height / 2 - this.tiles.length / 2 * 48;

        for (let row = 0; row < this.tiles.length; row++) {
            for (let col = 0; col < this.tiles[0].length; col++) {
                if (this.tiles[row].charAt(col) == " ") continue;
                const key = this.code.get(this.tiles[row].charAt(col))!;
                let spr = map.get(key)!;

                ctx.drawImage(
                    img,
                    spr.getX(), spr.getY(), 16, 16,
                    startingPositionX + col * 48, startingPositionY + row * 48, 48, 48
                );
            }
        }
    }

    build(layer: string, path: string, arr: string[]) {
        const img = new Image();
        img.addEventListener("load", (() => {
            if (arr.length > (img.width / 16 * img.height / 16)) {
                console.log("WARNING: " + path + " has an incorrectly sized path array!")
            }
            
            for (let i = 0; i < img.width / 16 + 2; i++) {
                for (let j = 0; j < img.height / 16 + 2; j++) {
                    let spr = new Sprite(img.src, j * 16, i * 16);
                    map.set(arr[i * img.width / 16 + j], spr);
                }
            }
            this.load(layer, img);
        }));

        img.src = path;
    }
}