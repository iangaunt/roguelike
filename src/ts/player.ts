// File location prefixes.
let assets: string = "./assets";

// Loads the appropriate image.
const img = new Image();
img.src = assets + "/lucas.png";
img.onload = function() {
    init();
};

// Creates a new canvas object.
let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("main")!;
let ctx = canvas.getContext("2d")!;
ctx.imageSmoothingEnabled = false;

// Defies the scale, width, and height of the sprite element.
const scale = 3;
const width = 32;
const height = 32;

// Scaled-up values of width and height.
const scaledWidth = scale * width;
const scaledHeight = scale * height;

// Defines where the sprite is at any given point.
let x = canvas.width / 2 - scaledWidth / 2;
let y = canvas.height / 2 - scaledHeight / 2;

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

const cycleLoop = [0, 1, 2, 3]; // The loop of indexing frames to move through to animate the player.
let currentLoopIndex = 0; // The current position in the animation.

let row = 0; // The row of the sprite map to pull frame. Determines the direction.
let offset = 0; // Value to shift the top left corner of the sprite map left or right.
let frameCount = 0; // The counter for animating the player sprite.

let keysDown = new Set(); // Set to store the current keys being pressed.

// Matches the input value to the row that should be displayed from the spritemap.
const movementKeyRows = new Map([
    ["w", 1], ["a", 2], ["s", 0], ["d", 3]
]);

// Values for checking if the player is jumping / moving during a jump.
let isJumping = false;
let jumpV = 0;

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
        jumpV = -3;
    
        for (let i = 0; i <= 4; i++) {
            setTimeout(() => {
                jumpV++;
            }, i * 100);
        }

        setTimeout(() => {
            isJumping = false;
            jumpV = 0;
        }, 500);
    }   

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
    currentLoopIndex = 0;
}, false)

let xv = 0;
let yv = 0;
let movementSpeed = 1;

function updateSpeeds() {
    xv = 0; yv = 0;
    yv += jumpV;

    if (keysDown.has("w")) yv -= movementSpeed;
    if (keysDown.has("s")) yv += movementSpeed;

    if (keysDown.has("a")) xv -= movementSpeed;
    if (keysDown.has("d")) xv += movementSpeed;

    if (x + xv < 0) xv = 0;
    if (x + xv > canvas.width - scaledWidth) xv = 0;

    if (y + yv < 0) yv = 0;
    if (y + yv > canvas.height - scaledHeight) yv = 0;
}
  
function step() {
    frameCount++;
    updateSpeeds();

    if (frameCount < 15) {
        window.requestAnimationFrame(step);
        return;
    }
    frameCount = 0;

    if (Math.abs(xv) > 0 || Math.abs(yv) > 0) {
        currentLoopIndex++;
        if (currentLoopIndex >= cycleLoop.length) {
            currentLoopIndex = 0;
        }
    } else {
        currentLoopIndex = 0;
    }

    window.requestAnimationFrame(step);
}
  
function init() {
    setInterval(function() {
        updateSpeeds();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFrame(cycleLoop[currentLoopIndex], row, x, y);

        x += xv;
        y += yv;
        console.log(jumpV);
    }, 5);
    window.requestAnimationFrame(step);
}