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

export class SpriteSet {
    map: Map<string, Sprite>;

    constructor() {
        this.map = new Map<string, Sprite>();
    }

    addToSpriteSet(path: string, arr: string[]) {
        const img = new Image();
        img.src = path;
        img.onload = (() => {
            if (arr.length > (img.width / 16 * img.height / 16)) {
                console.log("WARNING: " + path + " has an incorrectly sized path array!")
            }
            
            for (let i = 0; i < img.width / 16; i++) {
                for (let j = 0; j < img.height / 16; j++) {
                    let spr = new Sprite(img.src, j * 16, i * 16);
                    this.map.set(arr[i * img.width / 16 + j], spr);
                }
            }
        })
    }

    cloneMap(): Map<string, Sprite> {
        let m = new Map<string, Sprite>();
        this.map.forEach((value, key) => console.log(key));

        return m;
    }
}

