// Creates a new canvas object.
let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("player")!;
let ctx = canvas.getContext("2d")!;
ctx.imageSmoothingEnabled = false;

/** Initializes a new Player object to be rendered on the player layer. */
export class Player {
    /** Creates a new player from the specified image. */
    constructor(w: number, h: number, sc: number) {
        img = new Image();
        img.src = "./assets/lucas.png";

        width = w;
        height = h;
        scale = sc;

        img.onload = function() {
            init();
        };
    }

    /**
     * Sets the collision map of the player. This prevents the player from entering
     * a specific area of the map by converting the present tilemap to ones and zeroes,
     * where players are locked from entering "one" tiles.
     * 
     * @param arr - The array to convert to a collision map.
     * @param code - The sprite code.
     */
    setCollisionMap(arr: string[], code: Map<string, string>) {
        let compressedMap = new Array<string>();

        for (let i = 0; i < arr.length; i++) {
            let row = "";
            for (let j = 0; j < arr[i].length; j++) {
                if (allowedTiles.indexOf(code.get(arr[i].charAt(j))!) == -1) {
                    row += "1";
                } else {
                    row += "0";
                }
            }
            compressedMap.push(row);
        }

        collisionMap = compressedMap;
    }
}

// Defies the scale, width, and height of the sprite element.
// These values are defined when the Player object is initialized.
let scale: number = 3;
let width: number = 32;
let height: number = 32;

// scaled-up values of width and height.
const scaledWidth = scale * width;
const scaledHeight = scale * height;

// Defines where the sprite is at any given point.
let x = canvas.width / 2 - scaledWidth / 2;
let y = canvas.height / 2 - scaledHeight / 2;

// Indicates the current collision map for the player.
let collisionMap: string[] = [];
let allowedTiles = ["grass", "white_flowers", "colored_flowers"];

// A new Image for storing the spritemap of the player.
let img: HTMLImageElement;

/**
 * Draws the specified frame of the animation at the position
 * canvasX, canvasY, cut from the spritesheet of width x height at
 * frameX, frameY. 
 * 
 * @param {number} frameX - The x coordinate of the left-most corner of the frame to render.
 * @param {number} frameY - The y coordinate of the left-most corner of the frame to render.
 * @param {number} canvasX - The x coordinate to render the frame at.
 * @param {number} canvasY - The y coordinate to render the frame at.
 */
function drawFrame(frameX: number, frameY: number, canvasX: number, canvasY: number) {
    ctx.drawImage(
        img,
        // Selects the desired frame to draw.
        frameX * width + 2 * (frameX + 1) + offset, frameY * height +  2 * (frameY + 1), width, height,

        // Positions the frame at the specified x and y value.
        canvasX, canvasY, scaledWidth, scaledHeight
    );
}

let currentFrame = 0; // The current position in the animation.

let row = 0; // The row of the sprite map to pull frame. Determines the direction.
let offset = 0; // Value to shift the top left corner of the sprite map left or right.
let frameCount = 0; // The counter for animating the player sprite.

// Set to store the current keys being pressed.
let keysDown = new Set(); 

// Matches the input value to the row that should be displayed from the spritemap.
const movementKeyRows = new Map([
    ["w", 1], ["a", 2], ["s", 0], ["d", 3]
]);

// Values for checking if the player is jumping / moving during a jump.
let isJumping = false;
let jumpVelocity = 0;

// Matches the prompted keys to their respective functionality.
window.addEventListener("keydown", function(e) {
    if (movementKeyRows.has(e.key.toLowerCase())) {
        row = movementKeyRows.get(e.key.toLowerCase())!;
    }

    // Speeds up the movement of the character and adds new sprites.
    if (e.key.toLowerCase() == "shift") {
        movementSpeed = 2;
        offset = 170;
    }

    // Adds a jump power to the sprite.
    if (e.key.toLowerCase() == " " && !isJumping) {
        isJumping = true;
        jumpVelocity = -3;
    
        for (let i = 0; i <= 4; i++) {
            setTimeout(() => {
                jumpVelocity++;
            }, i * 100);
        }

        setTimeout(() => {
            isJumping = false;
            jumpVelocity = 0;
        }, 500);
    }   

    // Reset the animation cycle when a new key is pressed.
    if (!keysDown.has(e.key.toLowerCase())) frameCount = 0;
    keysDown.add(e.key.toLowerCase());
}, false);

// Removes the effects of any pressed key.
window.addEventListener("keyup", function (e) {
    if (e.key.toLowerCase() == "shift") {
        movementSpeed = 1;
        offset = 0;
    }

    keysDown.delete(e.key.toLowerCase());
    currentFrame = 0;
}, false)

let xVelocity = 0;
let yVelocity = 0;
let movementSpeed = 1;

function updateSpeeds() {
    xVelocity = 0; yVelocity = 0;
    yVelocity += jumpVelocity;

    if (keysDown.has("w")) yVelocity -= movementSpeed;
    if (keysDown.has("s")) yVelocity += movementSpeed;

    if (keysDown.has("a")) xVelocity -= movementSpeed;
    if (keysDown.has("d")) xVelocity += movementSpeed;

    if (x + xVelocity < 0) xVelocity = 0;
    if (x + xVelocity > canvas.width - scaledWidth) xVelocity = 0;

    if (y + yVelocity < 0) yVelocity = 0;
    if (y + yVelocity > canvas.height - scaledHeight) yVelocity = 0;

    if ((keysDown.has("w") || keysDown.has("s")) && (keysDown.has("a") || keysDown.has("d"))) {
        xVelocity /= Math.sqrt(2);
        yVelocity /= Math.sqrt(2);
    }
}
  
function step() {
    frameCount++;
    updateSpeeds();

    console.log(currentFrame);

    if (frameCount < 12) {
        window.requestAnimationFrame(step);
        return;
    }
    frameCount = 0;

    if (Math.abs(xVelocity) > 0 || Math.abs(yVelocity) > 0) {
        currentFrame++;
        if (currentFrame > 3) {
            currentFrame = 0;
        }
    } else {
        currentFrame = 0;
    }

    window.requestAnimationFrame(step);
}

function checkCollisions() {
    for (let i = 0; i < collisionMap.length; i++) {
        for (let j = 0; j < collisionMap[i].length; j++) {
            if (collisionMap[i].charAt(j) == "1") {
                const startingPositionX = canvas.width / 2 - collisionMap[0].length / 2 * 48;
                const startingPositionY = canvas.height / 2 - collisionMap.length / 2 * 48;

                let xDistance = Math.floor((x + width / 4) - (j * 48 + 24)) - startingPositionX + 48;
                let yDistance = Math.floor((y + height / 4) - (i * 48 + 24)) - startingPositionY  + 48;

                let combinedHalfwidth = Math.floor(width / 4 + 48 / 2);
                let combinedHalfheight = Math.floor(height / 4 + 48 / 2);

                if (Math.abs(xDistance) < combinedHalfwidth) {
                    if (Math.abs(yDistance) < combinedHalfheight) {
                        let xOverlap = combinedHalfwidth - Math.abs(xDistance);
                        let yOverlap = combinedHalfheight - Math.abs(yDistance);

                        if (xOverlap >= yOverlap) {
                            y += yDistance > 0 ? yOverlap : -yOverlap;
                        } else {
                            x += xDistance > 0 ? xOverlap : -xOverlap;
                        }
                    }
                }
            }
        }
    }
}

function init() {
    setInterval(function() {
        updateSpeeds();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFrame(currentFrame, row, x, y);

        x += xVelocity;
        y += yVelocity;
        checkCollisions();
    }, 5);
    window.requestAnimationFrame(step);
}

