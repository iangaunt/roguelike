// Global variables among game scripts.
import { MapBuilder } from "./sprites/mapbuilder.js";
import { Player } from "./sprites/player.js";
/** The header file path for image files. */
const assets = "./assets";
const spritemaps = assets + "/spritemaps";
// Creates a new player sprite.
let player = new Player();
let island_tiles = [
    "@@@@@@@@@@@@@@",
    "@@<^^^^^^^^>@@",
    "@@[gwgcggwc]@@",
    "@@[gggcgggg]@@",
    "@@[cgwggggg]@@",
    "@@[gcgggwgg]@@",
    "@@[ggggp8qc]@@",
    "@@[gwgg]@[g]@@",
    "@@[gcgg]@[g]@@",
    "@@{....}@{.}@@",
    "@@@@@@@@@@@@@@"
];
let island_code = new Map();
island_code.set("g", "grass");
island_code.set("w", "white_flowers");
island_code.set("c", "colored_flowers");
island_code.set("s", "bush");
island_code.set("<", "island_top_left");
island_code.set("^", "island_top");
island_code.set(">", "island_top_right");
island_code.set("[", "island_left");
island_code.set("*", "island_middle");
island_code.set("]", "island_right");
island_code.set("{", "island_bottom_left");
island_code.set(".", "island_bottom");
island_code.set("}", "island_bottom_right");
island_code.set("@", "water");
island_code.set("p", "pond_top_left");
island_code.set("q", "pond_top_right");
island_code.set("8", "pond_top");
player.setCollisionMap(island_tiles, island_code);
let island = new MapBuilder("island", island_tiles, island_code);
island.setBackground("rgb(120, 192, 248)");
island.addToSpriteSet("./assets/spritemaps/island.png", [
    "island_top_left", "island_top", "island_top_right", "pond_top_left", "pond_top", "pond_top_right",
    "island_left", "island_middle", "island_right", "pond_left", "water", "pond_right",
    "island_bottom_left", "island_bottom", "island_bottom_right", "pond_bottom_left", "pond_bottom", "pond_bottom_right",
    "bush", "colored_flowers", "white_flowers", "grass", "shrub"
]);
