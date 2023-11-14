// Global variables among game scripts.
import { MapBuilder } from "./sprites/mapbuilder.js";
import { SpriteSet } from "./sprites/spriteset.js";
/** The header file path for image files. */
const assets = "./assets";
const spritemaps = assets + "/spritemaps";
/** The canvas object for  */
const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
// Creates a new player sprite.
// let player: Player = new Player();
// Preloads a spriteset to use in map construction.
let sprites = new SpriteSet();
sprites.addToSpriteSet(spritemaps + "/island.png", [
    "island_top_left", "island_top", "island_top_right", "pond_top_left", "pond_top", "pond_top_right",
    "island_left", "island_middle", "island_right", "pond_left", "pond_middle", "pond_right",
    "island_bottom_left", "island_bottom", "island_bottom_right", "pond_bottom_left", "pond_bottom", "pond_bottom_right",
    "bush", "colored_flowers", "white_flowers", "grass", "shrub"
]);
let island_tiles = [
    "sssssssss",
    "sssssssss"
];
let island_code = new Map();
island_code.set("s", "grass");
let island = new MapBuilder("island", island_tiles, island_code, sprites);
island.load();
