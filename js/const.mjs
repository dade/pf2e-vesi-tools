export { default as HEXES } from "./region-hexes.mjs";

/**
 * The progression of exploration states for an individual hex
 * @type {ReadOnly<{NONE: number, RECON: number, MAP: number}>}
 */
export const EXPLORATION_STATES = Object.freeze({
  NONE: { value: 0, label: "VESI.EXPLORATION_STATES.NONE" },
  RECON: { value: 1, label: "VESI.EXPLORATION_STATES.RECON" },
  MAP: { value: 2, label: "VESI.EXPLORATION_STATES.MAP" },
});

/**
 * The terrain types which exist in the region
 * @enum {ReadOnly<{ id: string, label: string, img: string }>}
 */
export const TERRAIN = Object.freeze({
  plains: {
    id: "plains",
    label: "VESI.TERRAIN.PLAINS",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/terrain/plains.webp",
  },
  forest: {
    id: "forest",
    label: "VESI.TERRAIN.FOREST",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/terrain/forest.webp",
  },
  hills: {
    id: "hills",
    label: "VESI.TERRAIN.HILLS",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/terrain/hills.webp",
  },
  mountains: {
    id: "mountains",
    label: "VESI.TERRAIN.MOUNTAINS",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/terrain/mountains.webp",
  },
  wetlands: {
    id: "wetlands",
    label: "VESI.TERRAIN.WETLANDS",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/terrain/wetlands.webp",
  },
  swamp: {
    id: "swamp",
    label: "VESI.TERRAIN.SWAMP",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/terrain/swamp.webp",
  },
  lake: {
    id: "lake",
    label: "VESI.TERRAIN.LAKE",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/terrain/lake.webp",
  },
  coast: {
    id: "coast",
    label: "VESI.TERRAIN.COAST",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/terrain/coast.webp",
  },
  ocean: {
    id: "ocean",
    label: "VESI.TERRAIN.OCEAN",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/terrain/ocean.webp",
  },
  islands: {
    id: "islands",
    label: "VESI.TERRAIN.ISLANDS",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/terrain/islands.webp"
  },
  glacier: {
    id: "glacier",
    label: "VESI.TERRAIN.GLACIER",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/terrain/glacier.webp"
  },
  volcano: {
    id: "volcano",
    label: "VESI.TERRAIN.VOLCANO",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/terrain/volcano.webp"
  },
});

/**
 * The overalnd travel speeds encountered in the region
 * @enum {ReadOnly<{ id: string, label: string, multiplier: number }>}
 */
export const TRAVEL = Object.freeze({
  open: {
    id: "open",
    label: "VESI.TRAVEL.OPEN",
    multiplier: 1,
  },
  difficult: {
    id: "difficult",
    label: "VESI.TRAVEL.DIFFICULT",
    multiplier: 2,
  },
  greater: {
    id: "greater",
    label: "VESI.TRAVEL.GREATER",
    multiplier: 1,
  },
  water: {
    id: "water",
    label: "VESI.TRAVEL.WATER",
    multiplier: 1,
  },
  impassable: {
    id: "impassable",
    label: "VESI.TRAVEL.IMPASSABLE",
    multiplier: Infinity,
  },
});

/**
 * The encounter trait that indicates how easy it is to detect a feature while exploring
 */
export const DISCOVERY_TRAITS = Object.freeze({
  landmark: {
    id: "landmark",
    label: "VESI.DISCOVERY_TRAITS.LANDMARK",
  },
  standard: {
    id: "standard",
    label: "VESI.DISCOVERY_TRAITS.STANDARD",
  },
  secret: {
    id: "secret",
    label: "VESI.DISCOVERY_TRAITS.SECRET",
  },
});

/**
 * The types of special "terrain features" that can exist on a hex in the region
 * @type {ReadOnly<{ id: string, label: string, img: string }>}
 */
export const FEATURES = Object.freeze({
  landmark: {
    id: "landmark",
    label: "VESI.FEATURES.LANDMARK",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/landmark.webp",
  },
  ruin: {
    id: "ruin",
    label: "VESI.FEATURES.RUIN",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/ruins.webp",
  },
  structure: {
    id: "structure",
    label: "VESI.FEATURES.STRUCTURE",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/structure.webp",
  },
  farmland: {
    id: "farmland",
    label: "VESI.FEATURES.FARMLAND",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/farmland.webp",
  },
  ford: {
    id: "ford",
    label: "VESI.FEATURES.FORD",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/ford.webp",
  },
  waterfall: {
    id: "waterfall",
    label: "VESI.FEATURES.WATERFALL",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/waterfall.webp",
  },
  hazard: {
    id: "hazard",
    label: "VESI.FEATURES.HAZARD",
    img: "modules/pf2e-vesi-tools/assets/actor-portraits/hazards/default.webp",
  },
  village: {
    id: "village",
    label: "VESI.FEATURES.VILLAGE",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/village.webp",
  },
  town: {
    id: "town",
    label: "VESI.FEATURES.TOWN",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/town.webp",
  },
  city: {
    id: "city",
    label: "VESI.FEATURES.CITY",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/city.webp",
  },
  metropolis: {
    id: "metropolis",
    label: "VESI.FEATURES.METROPOLIS",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/metropolis.webp",
  },
});

/**
 * The resources which may exist in a particular hex of the region
 * @enum {ReadOnly<{ id: string, label: string }>}
 */
export const COMMODITIES = Object.freeze({
  food: {
    id: "food",
    label: "VESI.COMMODITIES.FOOD",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/food.webp",
  },
  ore: {
    id: "ore",
    label: "VESI.COMMODITIES.ORE",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/ore.webp",
  },
  lumber: {
    id: "lumber",
    label: "VESI.COMMODITIES.LUMBER",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/lumber.webp",
  },
  luxuries: {
    id: "luxuries",
    label: "VESI.COMMODITIES.LUXURIES",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/luxuries.webp",
  },
  stone: {
    id: "stone",
    label: "VESI.COMMODITIES.STONE",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/stone.webp",
  },
});

/**
 * The types of work camps that exist in the region
 * @enum {ReadOnly<{ id: string, label: string }>}
 */
export const CAMPS = Object.freeze({
  quarry: {
    id: "quarry",
    label: "VESI.CAMPS.QUARRY",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/quarry.webp",
  },
  mine: {
    id: "mine",
    label: "VESI.CAMPS.MINE",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/mine.webp",
  },
  lumber: {
    id: "lumber",
    label: "VESI.CAMPS.LUMBER",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/lumber.webp",
  },
  fishing: {
    id: "fishing",
    label: "VESI.CAMPS.FISHING",
    img: "modules/pf2e-vesi-tools/assets/maps-regions/vesi/features/fishing.webp"
  }
});
