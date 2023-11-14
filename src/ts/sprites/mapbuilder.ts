import { Sprite, SpriteSet } from "./spriteset";

// Creates a new canvas object.
let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("main")!;
let ctx = canvas.getContext("2d")!;
ctx.imageSmoothingEnabled = false;

export class MapBuilder {
    name: string;
    background: string = "rgb(0, 0, 0)";

    tiles: Array<string>;
    code: Map<string, string>;
    sprites: SpriteSet;

    #files: Map<string, HTMLImageElement>;

    constructor(name: string, tiles: Array<string>, code: Map<string, string>, sprites: SpriteSet) {
        this.name = name;
        this.tiles = tiles;
        this.code = code;
        this.sprites = sprites;

        this.#files = new Map<string, HTMLImageElement>();
    }

    setBackground(background: string) {
        this.background = background;
    }

    load() {
        ctx.fillStyle = this.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const startingPositionX = canvas.width / 2 - this.tiles[0].length / 2 * 96;
        const startingPositionY = canvas.height / 2 - this.tiles.length / 2 * 96;

        for (let row = 0; row < this.tiles.length; row++) {
            for (let col = 0; col < this.tiles[0].length; col++) {
                const key = this.code.get(this.tiles[row].charAt(col))!;
                let spr: Sprite = this.sprites.map.get(key)!;
                let src = spr.file;

                let img = new Image();
                
                if (this.#files.has(src)) {
                    img = this.#files.get(src)!;
                } else {
                    img.src = src;
                    this.#files.set(src, img);
                }

                img.onload = (() => {
                    drawImage(img!, startingPositionX + row * 16, startingPositionY + col * 16, spr.x, spr.y)
                })
            }
        }
    }
}


function drawImage(img: HTMLImageElement, imgX: number, imgY: number, canvasX: number, canvasY: number) {
    ctx.drawImage(
        img,
        imgX, imgY, 16, 16,
        canvasX, canvasY, 96, 96
    );
}
   
