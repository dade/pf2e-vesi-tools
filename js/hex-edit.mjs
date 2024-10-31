import { VesiHexData } from "./region-hex.mjs";

export default class VesiHexEdit extends FormApplication {
  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "vesi-hex-edit",
      classes: [vesi.CSS_CLASS],
      template: "modules/pf2e-vesi-tools/templates/hex-edit.hbs",
      width: 420,
      height: "auto",
      popOut: true,
      closeOnSubmit: true,
    });
  }

  static featurePartial =
    "modules/pf2e-vesi-tools/templates/hex-edit-features.hbs";

  get title() {
    return `Edit Hex: ${this.object.toString()}`;
  }

  /* -------------------------------------------- */

  async _render(force, options) {
    await loadTemplates([this.constructor.featurePartial]);
    vesi.hexConfig = this;
    return super._render(force, options);
  }

  /* -------------------------------------------- */

  async close(options) {
    await super.close(options);
    vesi.hexConfig = null;
  }

  /* -------------------------------------------- */

  async getData(options) {
    return Object.assign(await super.getData(options), {
      camps: vesi.CONST.CAMPS,
      commodities: vesi.CONST.COMMODITIES,
      explorationStates: vesi.CONST.EXPLORATION_STATES,
      hex: this.object.data,
      features: vesi.CONST.FEATURES,
      featurePartial: this.constructor.featurePartial,
    });
  }

  /* -------------------------------------------- */

  /** @override */
  async _updateObject(event, formData) {
    formData = foundry.utils.expandObject(formData);
    formData.features = formData.features
      ? Object.values(formData.features)
      : [];
    const state = VesiHexData.cleanData(formData, { partial: true });
    vesi.state.updateSource({
      hexes: {
        [this.object.key]: state,
      },
    });
    await vesi.state.save();
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  activateListeners(html) {
    super.activateListeners(html);
    html.on("click", "[data-action]", this.#onClickAction.bind(this));
  }

  /* -------------------------------------------- */

  async #onClickAction(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const action = button.dataset.action;

    switch (action) {
      case "addFeature": {
        const html = await renderTemplate(this.constructor.featurePartial, {
          id: foundry.utils.randomID(),
          type: "landmark",
          features: vesi.CONST.FEATURES,
        });
        const fieldset = button.closest("fieldset");
        fieldset.insertAdjacentHTML("beforeend", html);
        this.setPosition({ height: "auto" });
        break;
      }
      case "removeFeature": {
        const div = button.closest("div.form-group");
        div.remove();
        this.setPosition({ height: "auto" });
        break;
      }
    }
  }
}
