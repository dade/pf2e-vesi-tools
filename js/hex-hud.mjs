/**
 * An application instance that renders a HUD for a single hex on the map
 */
export default class VesiHexHUD extends Application {
  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "vesi-hex-hud",
      classes: [vesi.CSS_CLASS],
      template: "modules/pf2e-vesi-tools/templates/hex-hud.hbs",
      popOut: false,
      width: 760,
      height: "auto",
    });
  }

  /**
   * The target hex that the HUD describes
   * @type {VesiHex}
   */
  hex;

  /**
   * Is the hex HUD enabled?
   * @type {boolean}
   */
  enabled = false;

  /* -------------------------------------------- */

  /** @override */
  _injectHTML(html) {
    this._element = html;
    document.getElementById("hud").appendChild(html[0]);
  }

  /* -------------------------------------------- */

  toggle(enabled) {
    enabled ??= !this.enabled;
    this.enabled = enabled;
    if (enabled) vesi.region.kingdomLayer.visible = true;
    else {
      vesi.region.kingdomLayer.visible = false;
      this.clear();
    }
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData(options = {}) {
    const data = this.hex.data;
    return {
      id: this.options.id,
      cssClass: this.options.classes.join(" "),
      hex: this.hex,
      commodity: vesi.CONST.COMMODITIES[data.commodity],
      camp: vesi.CONST.CAMPS[data.camp],
      displayEncounter: data.page && (game.user.isGM || data.showEncounter),
      displayResources:
        (data.camp || data.commodity) && (game.user.isGM || data.showResources),
      explored: data.exploration > 0,
      zone: this.hex.zone,
      features: data.features.reduce((arr, f) => {
        if (game.user.isGM || f.discovered) arr.push({
            name: f.name || game.i18n.localize(vesi.CONST.FEATURES[f.type]?.label),
            discovered: f.discovered,
            img: game.i18n.localize(vesi.CONST.FEATURES[f.type]?.img) || "modules/pf2e-vesi-tools/assets/map-regions/vesi/features/default.webp",
          });
        return arr;
      }, []),
    };
  }

  /** @inheritdoc */
  setPosition({ left, top } = {}) {
    const position = {
      height: undefined,
      left: left,
      top: top,
      width: this.options.width,
    };
    this.element.css(position);
  }

  /**
   * Activate this HUD element, binding it to a specific hex.
   * @param {VesiHex} hex
   * @returns {Promise<*>}
   */
  async activate(hex) {
    this.hex = hex;

    if (vesi.region.zoneGraphics.visible) {
      const zoneKey = hex.zone.id;
      const polygon = vesi.ZONES[zoneKey]?.polygon;
      if (polygon !== undefined) {
        vesi.region.zoneGraphics
          .clear()
          .lineStyle(12, 0x606060, 1, 0.5)
          .drawPolygon(polygon);
      }
    }

    if (this.enabled) {
      const { x, y } = hex.topLeft;
      // const options = { left: x + hex.config.width + 20, top: y };
      const options =  { left: x + (game.release.generation >= 12 ? hex.grid.sizeX : hex.config.width) + 20, top: y };
      const grid = game.release.generation >= 12 ? canvas.interface.grid : canvas.grid;

      grid.clearHighlightLayer("VesiRegion");
      grid.highlightPosition("VesiRegio", { x, y, color: Color.from(hex.color) });
      return this._render(true, options);
    }
  }

  /**
   * Clear the HUD
   */
  clear() {
    let states = this.constructor.RENDER_STATES;
    const grid = game.release.generation >= 12 ? canvas.interface.grid : canvas.grid;
    grid.clearHighlightLayer("VesiRegion");
    if (this._state <= states.NONE) return;
    this._state = states.CLOSING;
    this.element.hide();
    this._element = null;
    this._state = states.NONE;
  }
}
