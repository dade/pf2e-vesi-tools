import VesiHex from "./region-hex.mjs";

/**
 * The default settings for each zone in the region
 * @enum {ReadOnly<{ id: string, label: string, level: number, terrain: string, travel: string, polygon: array }>}
 */

// The zones work by taking a starting coordinate, and then applying directions
// to draw lines across it. These lines are predefined by the grid sizes, so they're
// hard-coded in. dr, dd, dl are "donw right", "down down", and "down left" for
// the pointy-top hex evens (I think)
export default Object.freeze({
  NA: {
    id: "NA",
    label: "VESI.ZONES.NA",
    travel: "water",
    color: "#FFFFFF",
    polygon: [],
  },
  AR: {
    id: "AR",
    label: "VESI.ZONES.AR",
    travel: "open",
    color: "#FFFFFF",
    polygon: VesiHex.drawRegion([3300, 4677], "top", [
      "uu", "ur", "uu", "ur", "dr", "ur", "dr", "dd",
      "dr", "dd", "dl", "dd", "dl", "dd", "dl", "ul",
      "dl", "ul", "uu", "ul", "uu", "ur"
    ])
  },
  VE: {
    id: "VE",
    label: "VESI.ZONES.VE",
    trabel: "open",
    color: "#c1a401",
    polygon: VesiHex.drawRegion([3825, 4807], "bottom", [
      "ul", "uu", "ul", "uu", "ur", "uu", "ur", "dr",
      "ur", "dr", "ur", "uu", "ur", "dr", "dd", "dr",
      "dd", "dl", "dd", "dr", "dd", "dl", "ul", "dl",
      "dd", "dl", "ul", "uu", "ul", "dl"
    ])
  },
  TV: {
    id: "TV",
    label: "VESI.ZONES.TV",
    travel: "open",
    color: "#fff000",
    polygon: VesiHex.drawRegion([3150, 4677], "bottomright", [
      "uu", "ur", "uu", "ul", "uu", "ul", "uu", "ul",
      "dl", "ul", "dl", "ul", "uu", "ul", "dl", "dd",
      "dl", "dd", "dr", "dd", "dl", "dd", "dl", "dd",
      "dr", "ur", "dr", "ur", "dr", "ur", "dr", "dd",
      "dr", "ur", "uu", "ur"
    ])
  },
  XO: {
    id: "XO",
    label: "VESI.ZONES.XO",
    travel: "difficult",
    color: "#fff000",
    polygon: VesiHex.drawRegion([2475, 4287], "bottomright", [
      "uu", "ur", "uu", "ur", "uu", "ul", "uu", "ur",
      "uu", "ul", "dl", "ul", "dl", "ul", "dl", "ul",
      "dl", "dd", "dl", "dd", "dl", "dd", "dl", "dd",
      "dr", "dd", "dr", "ur", "dr", "dd", "dr", "ur",
      "uu", "ur", "dr", "ur"
    ])
  },
  SV: {
    id: "SV",
    label: "VESI.ZONES.SV",
    travel: "difficult",
    color: "#c1e029",
    polygon: VesiHex.drawRegion([2100, 3638], "bottomright", [
      "dl", "dd", "dl", "dd", "dl", "dd", "dl", "dd", 
      "dl", "dd", "dl", "ul", "dl", "ul", "dl", "dd",
      "dl", "dd", "dl", "dd", "dl", "ul", "dl", "ul",
      "uu", "ul", "dl", "ul", "uu", "ul", "uu", "ur",
      "uu", "ur", "dr", "ur", "dr", "ur", "dr", "ur",
      "uu", "ul", "uu", "ul", "dl", "ul", "uu", "ul",
      "uu", "ur", "uu", "ur", "uu", "ur", "uu", "ur",
      "uu", "ul", "uu", "ur", "dr", "ur", "dr", "dd",
      "dr", "ur", "dr", "ur", "dr", "dd", "dr", "ur",
      "dr", "ur", "dr", "dd", "dr", "dd", "dl", "dd"
    ])
  },
  ZV: {
    id: "ZV",
    label: "VESI.ZONES.ZV",
    travel: "open",
    color: "#ffffff",
    polygon: VesiHex.drawRegion([2100, 4417], "top", [
      "dr", "dd", "dr", "dd", "dr", "dd", "dr", "ur",
      "dr", "dd", "dl", "ul", "dl", "dd", "dl", "ul",
      "dl", "ul", "dl", "ul", "uu", "ul", "uu", "ul",
      "uu", "ur", "uu", "ur", "uu", "ur", "dr", "ur"
    ])
  },
  NO: {
    id: "NO",
    label: "VESI.ZONES.NO",
    color: "#ffffff",
    polygon: VesiHex.drawRegion([1800, 3118], "bottom", [
      "ul", "dl", "ul", "uu", "ul", "dl", "ul", "uu",
      "ur", "uu", "ur", "uu", "ul", "uu", "ur", "uu",
      "ur", "uu", "ul", "uu", "ur", "uu", "ur", "dr",
      "ur", "uu", "ur", "dr", "ur", "dr", "ur", "dr", 
      "ur", "dr", "ur", "dr", "dd", "dr", "dd", "dr",
      "ur", "dr", "dd", "dl", "dd", "dl", "ul", "dl",
      "ul", "dl", "dd", "dr", "dd", "dl", "dd", "dl",
      "dd", "dl", "ul", "dl", "dd", "dl", "ul", "dl",
      "dd", "dl", "ul"
    ])
  },
  ST: {
    id: "ST",
    label: "VESI.ZONES.ST",
    color: "#ffffff",
    polygon: VesiHex.drawRegion([2550, 1819], "bottom", [
      "ul", "dl", "ul", "dl", "ul", "dl", "ul", "uu",
      "ul", "dl", "ul", "uu", "ur", "uu", "ur", "uu",
      "ur", "dr", "ur", "dr", "ur", "dr", "ur", "uu",
      "ur", "uu", "ur", "uu", "ur", "uu", "ur", "dr",
      "ur", "dr", "dd", "dl", "dd", "dl", "dd", "dr",
      "dd", "dr", "dd", "dr", "dd", "dl", "dd", "dl",
      "dd", "dl", "ul", "dl", "ul", "dl", "ul"
    ])
  },
  PI: {
    id: "PI",
    terrain: "islands",
    travel: "water",
    label: "VESI.ZONES.PI",
    color: "#ffffff",
    polygon: VesiHex.drawRegion([2625, 5067], "top", [
      "uu", "ur", "dr", "ur", "dr", "ur", "dr", "ur",
      "dr", "dd", "dr", "ur", "dr", "dd", "dr", "ur",
      "dr", "dd", "dr", "ur", "dr", "ur", "dr", "dd",
      "dr", "dd", "dl", "dd", "dl", "ul", "uu", "ul",
      "dl", "dd", "dl", "ul", "dl", "ul", "uu", "ul",
      "dl", "ul", "dl", "ul", "dl", "ul", "dl", "ul",
      "uu", "ul", "dl", "ul", "dl", "ul", "uu", "ul",
      "uu", "ul", "uu", "ur", "dr", "ur", "dr", "ur"
    ])
  },
  LC: {
    id: "LC",
    label: "VESI.ZONES.LC",
    terrain: "islands",
    travel: "water",
    color: "#ffffff",
    polygon: VesiHex.drawRegion([4125, 5327], "top", [
      "uu", "ur", "uu", "ur", "dr", "ur", "dr", "ur",
      "dr", "dd", "dr", "ur", "dr", "dd", "dr", "ur",
      "dr", "dd", "dr", "dd", "dr", "dd", "dl", "ul",
      "dl", "ul", "uu", "ul", "dl", "ul", "dl", "ul",
      "dl", "ul", "dl", "ul", "uu", "ul", "dl", "ul",
      "uu", "ur"
    ])
  },
  VC: {
    id: "VC",
    label: "VESI.ZONES.VC",
    terrain: "mountains",
    travel: "greater",
    color: "#ffffff",
    polygon: VesiHex.drawRegion([4725, 5067], "top", [
      "uu", "ul", "uu", "ur", "dr", "ur", "uu", "ur",
      "dr", "dd", "dl", "dd", "dr", "ur", "dr", "dd",
      "dl", "dd", "dl", "ul", "dl", "ul", "dl", "ul",
      "uu", "ur"
    ])
  },
  FC: {
    id: "FC",
    label: "VESI.ZONES.FC",
    terrain: "islands",
    travel: "water",
    color: "#ffffff",
    polygon: VesiHex.drawRegion([5550, 5197], "top", [
      "uu", "ur", "uu", "ur", "uu", "ur", "dr", "ur",
      "dr", "ur", "uu", "ur", "uu", "ur", "dr", "ur",
      "dr", "dd", "dl", "ul", "dl", "dd", "dl", "dd",
      "dl", "dd", "dl", "ul", "dl", "dd", "dl", "dd",
      "dl", "ul", "dl", "ul", "uu", "ur", "uu"
    ])
  },
  SC: {
    id: "SC",
    label: "VESI.ZONES.SC",
    terrain: "ocean",
    travel: "water",
    color: "#ffffff",
    polygon: VesiHex.drawRegion([7200, 4677], "top", [
      "dr", "dd", "dl", "dd", "dr", "dd", "dl", "dd",
      "dr", "dd", "dl", "dd", "dl", "dd", "dl", "ul",
      "uu", "ul", "dl", "dd", "dl", "ul", "uu", "ul",
      "uu", "ul", "uu", "ur", "uu", "ur", "uu", "ur",
      "uu", "ur", "dr", "ur", "dr", "ur", "uu", "ur"
    ])
  },
  SN: {
    id: "SN",
    label: "VESI.ZONES.SN",
    terrain: "plains",
    travel: "open",
    color: "#ffffff",
    polygon: VesiHex.drawRegion([7125, 4547], "top", [
      "uu", "ur", "uu", "ul", "uu", "ur", "dr", "ur",
      "uu", "ur", "uu", "ur", "dr", "ur", "uu", "ur",
      "dr", "dd", "dl", "dd", "dl", "dd", "dl", "dd",
      "dr", "dd", "dl", "dd", "dl", "ul", "dl", "ul",
      "dl", "dd", "dl", "ul", "uu", "ur"
    ])
  },
  MO: {
    id: "MO",
    label: "VESI.ZONES.MO",
    terrain: "mountains",
    travel: "greater",
    color: "#ffffff",
    polygon: VesiHex.drawRegion([6225, 4028], "bottom", [
      "ul", "uu", "ul", "uu", "ur", "uu", "ur", "uu",
      "ul", "uu", "ul", "uu", "ur", "dr", "ur", "dr",
      "ur", "dr", "ur", "dr", "ur", "dr", "ur", "dr",
      "dd", "dl", "dd", "dl", "dd", "dl", "dd", "dr",
      "dd", "dl", "dd", "dr", "dd", "dr", "dd", "dl",
      "ul", "dl", "ul", "dl", "ul", "uu", "ul", "uu",
      "ul", "dl", "ul"
    ])
  },
  RA: {
    id: "RA",
    label: "VESI.ZONES.RA",
    terrain: "islands",
    travel: "difficult",
    color: "#ffffff",
    polygon: VesiHex.drawRegion([5625, 4287], "bottom", [
      "ul", "uu", "ur", "uu", "ur", "uu", "ur", "dr",
      "ur", "uu", "ur", "dr", "dd", "dl", "dd", "dl",
      "dd", "dl", "ul", "dl", "dd", "dl"
    ])
  },
  DR: {
    id: "DR",
    label: "VESI.ZONES.DR",
    terrain: "coast",
    travel: "difficult",
    color: "#ffffff",
    polygon: VesiHex.drawRegion([5925, 3768], "bottom", [
      "ul", "dl", "ul", "uu", "ul", "dl", "ul", "uu",
      "ur", "uu", "ur", "dr", "ur", "dr", "ur", "dr",
      "ur", "dr", "dd", "dr", "dd", "dl", "dd", "dl",
      "ul", "dl"
    ])
  },
  TG: {
    id: "TG",
    label: "VESI.ZONES.TG",
    terrain: "islands",
    travel: "water",
    color: "#ffffff",
    polygon: VesiHex.drawRegion([6075, 4028], "top", [
      "dr", "dd", "dr", "ur", "dr", "dd", "dr", "dd",
      "dl", "ul", "dl", "dd", "dl", "ul", "dl", "dd",
      "dl", "dd", "dl", "ul", "dl", "ul", "uu", "ur",
      "uu", "ul", "uu", "ur", "uu", "ur", "dr", "ur", 
      "uu", "ur", "uu", "ur"
    ])
  },
  GH: {
    id: "GH",
    label: "VESI.ZONES.GH",
    terrain: "plains",
    travel: "open",
    color: "#ffffff",
    polygon: VesiHex.drawRegion([6375, 3248], "bottom", [
      "ul", "dl", "ul", "uu", "ul", "uu", "ul", "uu",
      "ur", "uu", "ur", "uu", "ur", "dr", "ur", "uu",
      "ur", "dr", "dd", "dr", "ur", "uu", "ur", "dr",
      "dd", "dr", "dd", "dl", "dd", "dr", "dd", "dl", 
      "dd", "dl", "dd", "dl", "ul", "dl", "ul", "dl"
    ])
  },
  KH: {
    id: "KH",
    label: "VESI.ZONES.KH",
    terrain: "islands",
    travel: "water",
    color: "#ffffff",
    polygon: VesiHex.drawRegion([6300, 2599], "bottom", [
      "ul", "dl", "ul", "uu", "ul", "dl", "ul", "uu",
      "ul", "dl", "ul", "uu", "ur", "uu", "ur", "uu",
      "ul", "uu", "ul", "uu", "ul", "dl", "ul", "uu",
      "ur", "uu", "ur", "uu", "ur", "uu", "ur", "dr",
      "ur", "dr", "dd", "dr", "dd", "dr", "dd", "dr",
      "dd", "dr", "dd", "dr", "ur", "dr", "dd", "dl",
      "dd", "dr", "dd", "dr", "ur", "dr", "dd", "dr",
      "ur", "dr", "ur", "dr", "dd", "dl", "ul", "dl",
      "ul", "dl", "dd", "dl", "ul", "uu", "ul", "dl",
      "dd", "dl"
    ])
  },
  IS: {
    id: "IS",
    label: "VESI.ZONES.IS",
    terrain: "coast",
    travel: "water",
    color: "#ffffff",
    polygon: VesiHex.drawRegion([5550, 1300], "bottom", [
      "dd", "dl", "ul", "dl", "ul", "uu", "ul", "uu",
      "ul", "dl", "ul", "dl", "dd", "dl", "ul", "dl",
      "ul", "dl", "ul", "uu", "ul", "dl", "ul", "dl",
      "dd", "dl", "dd", "dl", "ul", "dl", "dd", "dl",
      "dd", "dl", "dd", "dl", "ul", "dl", "ul", "dl",
      "ul", "uu", "ul", "uu", "ur", "dr", "ur", "dr",
      "ur", "dr", "ur", "uu", "ur", "uu", "ul", "uu",
      "ul", "dl", "dd", "dl", "dd", "dl", "ul", "uu",
      "ul", "uu", "ul", "dl", "ul", "uu", "ur", "uu",
      "ur", "uu", "ur", "dr", "ur", "uu", "ur", "dr",
      "dd", "dr", "dd", "dr", "ur", "uu", "ur", "dr",
      "ur", "uu", "ur", "dr", "ur", "dr", "ur", "uu",
      "ur", "dr", "ur", "dr", "dd", "dr", "dd", "dr",
      "ur", "dr", "dd", "dr", "ur", "dr", "ur", "dr",
      "ur", "dr", "dd", "dr", "dd", "dr", "dd", "dl"
    ])
  }
});
