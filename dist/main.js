// Global variables among game scripts.
import { Player } from "./sprites/Player.js";
import { TileKey } from "./sprites/TileKey.js";
import { TmapReader } from "./sprites/TmapReader.js";
/** The header file path for image files. */
const assets = "./assets";
const spritemaps = assets + "/spritemaps";
const maps = assets + "/maps";
// Creates a new player sprite.
let player = new Player(32, 32, 3);
let tmap = new TmapReader();
let island = tmap.readFile(maps + "/square.tmap");
let islandNames = [
    "island_top_left", "island_top", "island_top_right", "pond_top_left", "pond_top", "pond_top_right",
    "island_left", "island_middle", "island_right", "pond_left", "water", "pond_right",
    "island_bottom_left", "island_bottom", "island_bottom_right", "pond_bottom_left", "pond_bottom", "pond_bottom_right",
    "bush", "colored_flowers", "white_flowers", "grass", "shrub"
];
let islandKey = new TileKey(spritemaps + "/island.png", islandNames);
setTimeout(() => {
    tmap.load(island, islandKey);
    player.setCollisionMap(island.map.get("map"), island.key);
    console.log(island.map);
}, 1000);
