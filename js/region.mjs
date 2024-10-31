import VesiHex from "./region-hex.mjs";
import VesiHexHUD from "./hex-hud.mjs";
import VesiHexEdit from "./hex-edit.mjs";
import VesiHexSightPolygon from "./hex-sight.mjs";
import VesiKingdomLayer from "./kingdom-layer.mjs";
import VesiZoneEffects from "./zone-effects.mjs";

/**
 * A manager class responsible for orchestrating display and events on the map
 */
export default class VesiRegionMap {
  constructor() {
    this.#initializeHexes();
    this.#initializeHUD();
  }

  /**
   * The Scene ID used for the map
   * @type {string}
   */
  static SCENE_ID = "xY5wWfNniUDahmqx"; // TODO: make this a setting that can be defined in app

  /**
   * A reference to the region map scene
   * @type {Scene}
   */
  get scene() {
    return game.scenes.get(VesiRegionMap.SCENE_ID);
  }

  /**
   * Is the Vesi region map actively viewed on the canvas?
   * @type {boolean}
   */
  get active() {
    return canvas.scene?.id === VesiRegionMap.SCENE_ID;
  }

  /**
   * A mapping of hexes present in the region map
   * @type {Collection<number, VesiHex>}
   */
  hexes = new Collection();

  /**
   * The currently hovered hex.
   * @type {VesiHex|null}
   */
  hoveredHex = null;

  /**
   * The singleton HUD element used to tooltip a hex.
   * @type {VesiHexHUD}
   */
  hud;

  /**
   * The hex hover and edit tool.
   * @type {SceneControlTool}
   */
  #hexTool;

  /**
   * The tool to toggle display of the zone overlay (zoneGraphics).
   * @type {SceneControlTool}
   */
  #zoneTool;

  /**
   * Reset Tool
   * @type {VesiState}
   */
  #resetTool;

  /**
   * The overlay for the kingdom's borders
   * @type {VesiKingdomLayer}
   */
  kingdomLayer;

  /**
   * The overlay for a zone's borders
   * @type {PIXI.Graphics}
   */
  zoneGraphics = new PIXI.Graphics();

  /**
   * The blur filter applied to the zone overlay
   * @type {PIXI.Filter}
   */
  filterBlur;

  /**
   * The outline filter applied to the zone overlay
   * @type {KingdomZoneEffects}
   */
  filterOutline;

  /* -------------------------------------------- */
  /*  Initialization                              */
  /* -------------------------------------------- */

  #initializeHexes() {
    // 1 is hex rows odd
    // 3 is hex rows even
    // const config = HexagonalGrid.getConfig(3, 150);
    // for (let row = 0; row < 48; row++) {
    //   for (let col = 0; col < 55; col++) {
    //     const hex = new VesiHex({ row, col }, config);
    //     this.hexes.set(hex.key, hex);
    //   }
    // }
    const grid = game.release.generation >= 12
      ? new foundry.grid.HexagonalGrid({ size: 150, even: true }) : HexagonalGrid.getConfig(2, 150)
    for (let i = 0; i < 48; i++) {
      for (let j = 0; j < 55; j++) {
        const hex = new VesiHex(game.release.generation >= 12 ? { i, j } : { i: i, j: i }, grid);
        this.hexes.set(hex.key, hex);
      }
    }
  }

  #initializeHUD() {
    this.hud = new VesiHexHUD();
  }

  /**
   * Initialize the zone filters
   */
  #initializeZoneFilters() {
    if (this.filterBlur || this.filterOutline) return;
    const blur = this.filterBlur = new PIXI.BlurFilter(0.5);
    const outline = this.filterOutline = VesiZoneEffects.create();
    outline.blendMode = blur.blendMode = PIXI.BLEND_MODES.SCREEN;
    this.zoneGraphics.filters = [outline, blur];
  }

  /* -------------------------------------------- */

  /**
   * Update display of the region map when Vesi state data changes.
   */
  onUpdateState() {
    this.#initializeHexes();
    if (canvas.id === this.constructor.SCENE_ID) this.kingdomLayer.draw();
  }

  /* -------------------------------------------- */

  getHexFromPoint(point) {
    // const [row, col] = canvas.grid.grid.getGridPositionFromPixels(
    //   point.x,
    //   point.y,
    // );
    // return this.hexes.get(VesiHex.getKey({ row, col }));
    let offset;
    if (game.release.generation >= 12) offset = canvas.grid.getOffset(point);
    else {
      const [ row, col ] = canvas.grid.grid.getGridPositionFromPixels(point.x, point.y);
      offset = { row, col };
    }
    return this.hexes.get(VesiHex.getKey(offset));
  }

  /* -------------------------------------------- */
  /*  Canvas Lifecycle Hooks                      */
  /* -------------------------------------------- */

  /**
   * Canvas configuration.
   * @internal
   */
  _onConfig() {
    if (!this.active) return;
  }

  /* -------------------------------------------- */

  /**
   * Canvas initialization.
   * @internal
   */
  _onInit() {
    if (!this.active) return;
    if (canvas.visibilityOptions)
      canvas.visibilityOptions.persistentVision = true;

    // Initialize zone filters
    this.#initializeZoneFilters();
  }

  /* -------------------------------------------- */

  /**
   * Canvas drawing.
   * @internal
   */
  _onDraw() {
    if (!this.active) return;
    CONFIG.Canvas.polygonBackends.sight = VesiHexSightPolygon;
  }

  /* -------------------------------------------- */

  /**
   * Canvas ready.
   * @internal
   */
  _onReady() {
    if (!this.active) return;

    // Draw Kingdom Layer
    this.kingdomLayer = new VesiKingdomLayer();
    // canvas.grid.addChildAt(
    //   this.kingdomLayer,
    //   canvas.grid.children.indexOf(canvas.grid.borders),
    // );
    if (game.release.generation >= 12) {
      canvas.interface.grid.addChild(this.kingdomLayer);
    } else {
      canvas.grid.addChildAt(this.kingdomLayer, canvas.grid.children.indexOf(canvas.grid.borders));
    }
    this.kingdomLayer.draw();

    // Activate canvas events
    this.#mousemove = this.#onMouseMove.bind(this);
    canvas.stage.on("mousemove", this.#mousemove);
    if (game.user.isGM) {
      this.#mousedown = this.#onMouseDown.bind(this);
      canvas.stage.on("mousedown", this.#mousedown);
    }

    // Activate highlight layer
    const grid = game.release.generation >= 12 ? canvas.interface.grid : canvas.grid;
    grid.addHighlightLayer("VesiRegion");

    // Add the zone border highlights
    canvas.interface.addChild(this.zoneGraphics);
  }

  /* -------------------------------------------- */

  /**
   * Canvas tear-down.
   * @internal
   */
  _onTearDown() {
    if (!this.active) return;

    // Remove the zone border highlights
    canvas.interface.removeChild(this.zoneGraphics);

    // Unset certain variables
    this.hoveredHex = null;
    this.hud.clear();

    // Deactivate canvas events
    canvas.stage.off(this.#mousemove);
    this.#mousemove = undefined;
    canvas.stage.off(this.#mousedown);
    this.#mousedown = undefined;

    // Reset sight polygon backend
    CONFIG.Canvas.polygonBackends.sight = ClockwiseSweepPolygon;

    // Activate highlight layer
    const grid = game.release.generation >= 12 ? canvas.interface.grid : canvas.grid;
    grid.destroyHighlightLayer("VesiRegion");
  }

  /* -------------------------------------------- */

  /**
   * Add special buttons to the scene controls palette when we are on the region map.
   * @param buttons
   * @internal
   */
  _extendSceneControlButtons(buttons) {
    if (canvas.id !== this.constructor.SCENE_ID) return;
    const tokens = buttons.find((b) => b.name === "token");
    this.#hexTool = {
      name: "hex",
      title: "VESI.ToggleHexTool",
      icon: "fa-solid fa-hexagon-image",
      visible: true,
      toggle: true,
      active: this.hud.enabled ?? false,
      onClick: () => this.hud.toggle(),
    };
    this.#zoneTool = {
      name: "zones",
      title: "VESI.ToggleZoneBoundaries",
      icon: "fa-solid fa-chart-area",
      visible: true,
      toggle: true,
      active: this.zoneGraphics.visible ?? false,
      onClick: () => (this.zoneGraphics.visible = !this.zoneGraphics.visible),
    };
    this.#resetTool = {
      name: "reset",
      title: "Reset Map Data",
      icon: "fa-solid fa-cancel",
      visible: false,
      toggle: false,
      onClick: () => vesi.state.reset()
    }
    tokens.tools.push(this.#hexTool, this.#zoneTool);
    tokens.tools.push(this.#resetTool);
  }

  /* -------------------------------------------- */
  /*  Canvas Event Handlers                       */
  /* -------------------------------------------- */

  /**
   * A bound event handler function
   * @type {function}
   */
  #mousemove;

  /**
   * A bound mousedown handler function
   * @type {function}
   */
  #mousedown;

  /**
   * Track the last left-click time to detect double-clicks
   * @type {number}
   */
  #clickTime = 0;

  /* -------------------------------------------- */

  /**
   * Handle mousemove events to display hex data.
   * @param {PIXI.InteractionEvent} event
   * @private
   */
  #onMouseMove(event) {
    let hex = null;
    if (
      (this.hud.enabled || this.zoneGraphics.visible) &&
      (event.srcElement?.id === "board")
    ) {
      hex = this.getHexFromPoint(event.data.getLocalPosition(canvas.stage));
    }
    if (!hex) this.hud.clear();
    else if (hex !== this.hoveredHex) this.hud.activate(hex);
    this.hoveredHex = hex || null;
  }

  /* -------------------------------------------- */

  /**
   * Handle mousedown events to edit a specific hex data.
   * @param {PIXI.InteractionEvent} event
   */
  #onMouseDown(event) {
    // if (!this.hoveredHex || event.target !== canvas.stage) return;
    if (!this.hud.enabled || !this.hoveredHex || ![canvas.stage, canvas.activeLayer].includes(event.target)) return;
    const t0 = this.#clickTime;
    const t1 = (this.#clickTime = Date.now());
    if ((t1 - t0) > 250) return;
    const hex = this.hoveredHex;
    const app = new VesiHexEdit(hex);
    app.render(true, { left: event.x + 100, top: event.y - 50 });
  }
}
