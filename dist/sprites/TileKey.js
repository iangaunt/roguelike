class Tile {
    constructor(image, x, y) {
        this.image = image;
        this.x = x;
        this.y = y;
    }
}
export class TileKey {
    constructor(path, names) {
        this.key = new Map();
        this.path = path;
        const img = new Image();
        img.addEventListener("load", (() => {
            if (names.length > (img.width / 16 * img.height / 16)) {
                console.log("WARNING: " + path + " has an incorrectly sized path array!");
            }
            for (let i = 0; i < img.width / 16 + 2; i++) {
                for (let j = 0; j < img.height / 16 + 2; j++) {
                    let spr = new Tile(img, j * 16, i * 16);
                    this.key.set(names[i * img.width / 16 + j], spr);
                }
            }
        }));
        img.src = path;
    }
}
