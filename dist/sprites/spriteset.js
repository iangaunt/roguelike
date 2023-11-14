export class SpriteSet {
    constructor() {
        this.map = new Map();
    }
    addToSpriteSet(path, arr) {
        const img = new Image();
        img.src = path;
        img.onload = (() => {
            if (arr.length > (img.width / 16 * img.height / 16)) {
                console.log("WARNING: " + path + " has an incorrectly sized path array!");
            }
            console.log(arr.length + " " + (img.width / 16 * img.height / 16));
            for (let i = 0; i < img.width / 16; i++) {
                for (let j = 0; j < img.height / 16; j++) {
                    const values = [path, j * 16, i * 16];
                    this.map.set(arr[i * img.width / 16 + j], values);
                }
            }
        });
    }
}
