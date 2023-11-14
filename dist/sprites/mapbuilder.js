var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MapBuilder_files;
// Creates a new canvas object.
let canvas = document.getElementById("main");
let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
export class MapBuilder {
    constructor(name, tiles, code, sprites) {
        this.background = "rgb(0, 0, 0)";
        _MapBuilder_files.set(this, void 0);
        this.name = name;
        this.tiles = tiles;
        this.code = code;
        this.sprites = sprites;
        __classPrivateFieldSet(this, _MapBuilder_files, new Map(), "f");
    }
    setBackground(background) {
        this.background = background;
    }
    load() {
        ctx.fillStyle = this.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const startingPositionX = canvas.width / 2 - this.tiles[0].length / 2 * 96;
        const startingPositionY = canvas.height / 2 - this.tiles.length / 2 * 96;
        for (let row = 0; row < this.tiles.length; row++) {
            for (let col = 0; col < this.tiles[0].length; col++) {
                const key = this.code.get(this.tiles[row].charAt(col));
                let spr = this.sprites.map.get(key);
                let src = spr[0].toString();
                let img = new Image();
                if (__classPrivateFieldGet(this, _MapBuilder_files, "f").has(src)) {
                    img = __classPrivateFieldGet(this, _MapBuilder_files, "f").get(src);
                }
                else {
                    img.src = src;
                    __classPrivateFieldGet(this, _MapBuilder_files, "f").set(src, img);
                }
                img.onload = (() => {
                    drawImage(img, startingPositionX + row * 16, startingPositionY + col * 16, parseInt(spr[1].toString()), parseInt(spr[2].toString()));
                });
            }
        }
    }
}
_MapBuilder_files = new WeakMap();
function drawImage(img, imgX, imgY, canvasX, canvasY) {
    ctx.drawImage(img, imgX, imgY, 16, 16, canvasX, canvasY, 96, 96);
}
