let map: Map<string, Sprite> = new Map<string, Sprite>()
console.log(map);

// Creates a new canvas object.
let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("map")!;
let ctx = canvas.getContext("2d")!;
ctx.imageSmoothingEnabled = false;

export class Sprite {
    file: string;
    x: number;
    y: number;

    constructor(file: string, x: number, y: number) {
        this.file = file;
        this.x = x;
        this.y = y;
    }

    getFile(): string {
        return this.file;
    }
}

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

    load(img: HTMLImageElement): void {
        ctx.fillStyle = this.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const startingPositionX = canvas.width / 2 - this.tiles[0].length / 2 * 48;
        const startingPositionY = canvas.height / 2 - this.tiles.length / 2 * 48;

        for (let row = 0; row < this.tiles.length; row++) {
            for (let col = 0; col < this.tiles[0].length; col++) {
                const key = this.code.get(this.tiles[row].charAt(col))!;
                let spr = map.get(key)!;

                ctx.drawImage(
                    img,
                    spr.x, spr.y, 16, 16,
                    startingPositionX + col * 48, startingPositionY + row * 48, 48, 48
                );
            }
        }
    }

    addToSpriteSet(path: string, arr: string[]) {
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
            this.load(img);
        }));

        img.src = path;
    }
}