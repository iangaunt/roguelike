// Global variables among game scripts.
import { MapBuilder } from "./sprites/MapBuilder.js";
import { Player } from "./sprites/Player.js";
import { TmapReader } from "./sprites/TmapReader.js";

/** The header file path for image files. */
const assets: string = "./assets";
const spritemaps: string = assets + "/spritemaps";

// Creates a new player sprite.
let player: Player = new Player();

let tmap: TmapReader = new TmapReader();
tmap.readFile("./maps/island.tmap");

/*
let island_tiles = [
    "@@@@@@@<^^^>@@@",
    "@@<^^^^dggg]@@",
    "@@[gwgcggwc]@@",
    "@@[gggcgggg]@@",
    "@@[cgwggggg]@@",
    "@@[gcgggwgg]@@",
    "@@[ggggp8qc]@@",
    "@@[gwgg]@[g]@@",
    "@@[gcgg]@[g]@@",
    "@@{....}@{.}@@",
    "@@@@@@@@@@@@@@"
]

let island_deco = [
    "              ",
    "              ",
    "     s  s     ",
    "         s    ",
    "              ",
    "   s   s      ",
    "              ",
    "              ",
    "    s         ",
    "              ",
    "              "
]

let island_code = new Map<string, string>();
island_code.set("g", "grass");
island_code.set("w", "white_flowers");
island_code.set("c", "colored_flowers");
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
island_code.set("d", "pond_bottom_right");
island_code.set("8", "pond_top");
island_code.set("s", "bush");

player.setCollisionMap(island_tiles, island_code);
let islandImg = "./assets/spritemaps/island.png";
let spriteArr = [
    "island_top_left", "island_top", "island_top_right", "pond_top_left", "pond_top", "pond_top_right", 
    "island_left", "island_middle", "island_right", "pond_left", "water", "pond_right", 
    "island_bottom_left", "island_bottom", "island_bottom_right", "pond_bottom_left", "pond_bottom", "pond_bottom_right",
    "bush", "colored_flowers", "white_flowers", "grass", "shrub"
];

let island: MapBuilder = new MapBuilder("island", island_tiles, island_code);
island.setBackground("rgb(120, 192, 248)");
island.build("map", islandImg, spriteArr);

island = new MapBuilder("island", island_deco, island_code);
island.setBackground("transparent");
island.build("deco", islandImg, spriteArr);
*/