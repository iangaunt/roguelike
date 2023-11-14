var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _MapBuilder_files;
let map = new Map();
console.log(map);
// Creates a new canvas object.
let canvas = document.getElementById("map");
let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
export class Sprite {
    constructor(file, x, y) {
        this.file = file;
        this.x = x;
        this.y = y;
    }
    getFile() {
        return this.file;
    }
}
export class MapBuilder {
    constructor(name, tiles, code) {
        this.background = "rgb(0, 0, 0)";
        _MapBuilder_files.set(this, void 0);
        this.name = name;
        this.tiles = tiles;
        this.code = code;
        __classPrivateFieldSet(this, _MapBuilder_files, new Map(), "f");
    }
    setBackground(background) {
        this.background = background;
    }
    load(img) {
        ctx.fillStyle = this.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const startingPositionX = canvas.width / 2 - this.tiles[0].length / 2 * 48;
        const startingPositionY = canvas.height / 2 - this.tiles.length / 2 * 48;
        for (let row = 0; row < this.tiles.length; row++) {
            for (let col = 0; col < this.tiles[0].length; col++) {
                const key = this.code.get(this.tiles[row].charAt(col));
                let spr = map.get(key);
                ctx.drawImage(img, spr.x, spr.y, 16, 16, startingPositionX + col * 48, startingPositionY + row * 48, 48, 48);
            }
        }
    }
    addToSpriteSet(path, arr) {
        const img = new Image();
        img.addEventListener("load", (() => {
            if (arr.length > (img.width / 16 * img.height / 16)) {
                console.log("WARNING: " + path + " has an incorrectly sized path array!");
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
_MapBuilder_files = new WeakMap();
