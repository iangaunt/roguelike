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
var _Sprite_file, _Sprite_x, _Sprite_y, _MapBuilder_files;
let map = new Map();
/** A "sprite" value containing a link to an image and its x-y coordinates of the rip. */
export class Sprite {
    constructor(file, x, y) {
        _Sprite_file.set(this, void 0);
        _Sprite_x.set(this, void 0);
        _Sprite_y.set(this, void 0);
        __classPrivateFieldSet(this, _Sprite_file, file, "f");
        __classPrivateFieldSet(this, _Sprite_x, x, "f");
        __classPrivateFieldSet(this, _Sprite_y, y, "f");
    }
    getFile() {
        return __classPrivateFieldGet(this, _Sprite_file, "f");
    }
    getX() {
        return __classPrivateFieldGet(this, _Sprite_x, "f");
    }
    getY() {
        return __classPrivateFieldGet(this, _Sprite_y, "f");
    }
}
_Sprite_file = new WeakMap(), _Sprite_x = new WeakMap(), _Sprite_y = new WeakMap();
/** A class for constructing maps based on tile and collision maps. */
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
    setTiles(tiles) {
        this.tiles = tiles;
    }
    load(layer, img) {
        let canvas = document.getElementById(layer);
        let ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx.fillStyle = this.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const startingPositionX = canvas.width / 2 - this.tiles[0].length / 2 * 48;
        const startingPositionY = canvas.height / 2 - this.tiles.length / 2 * 48;
        for (let row = 0; row < this.tiles.length; row++) {
            for (let col = 0; col < this.tiles[0].length; col++) {
                if (this.tiles[row].charAt(col) == " ")
                    continue;
                const key = this.code.get(this.tiles[row].charAt(col));
                let spr = map.get(key);
                ctx.drawImage(img, spr.getX(), spr.getY(), 16, 16, startingPositionX + col * 48, startingPositionY + row * 48, 48, 48);
            }
        }
    }
    build(layer, path, arr) {
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
            this.load(layer, img);
        }));
        img.src = path;
    }
}
_MapBuilder_files = new WeakMap();
