/**
 * A simple data model which stores the map regions game state data
 */
export default class VesiState extends foundry.abstract.DataModel {
  /** @override */
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      hexes: new fields.ObjectField(),
    };
  }

  /**
   * Initialize state by loading from the world settings.
   * @returns {VesiState}
   */
  static load() {
    const data = game.settings.get("pf2e-vesi-tools", "state");
    return this.fromSource(data);
  }

  /**
   * Save the region state to the world setting
   * @returns {Promise<void>}
   */
  async save() {
    await game.settings.set("pf2e-vesi-tools", "state", this.toObject());
  }

  /**
   * Reset the region state back to initial values
   * @returns {Promise<void>}
   */
  async reset() {
    // Prepare initial state
    const hexes = {};
    for (const [hexString, { state }] of Object.entries(vesi.CONST.HEXES)) {
      if (!state) continue;
      const [row, col] = hexString.split(".").map(Number);
      // key = vesi.api.VesiHex.getKey({ row, col });
      const key = (row * 1000) + col
      hexes[key] = state;
    }

    // Save state
    this.updateSource({ hexes }, { recursive: false });
    await this.save();

    // Replace Token on the Region Map
    if (game.actors.party && vesi.region.scene) {
      const token = await game.actors.party?.getTokenDocument({
        _id: game.actors.party.id,
        x: 3075,
        y: 4547,
        texture: {
          src: "modules/pf2e-vesi-tools/assets/actor-tokens/party/salty-dogs.webp",
          scaleX: 1.2,
          scaleY: 1.2
        },
      });

      await game.actors.party?.update({
        prototypeToken: {
          texture: {
            src: "modules/pf2e-vesi-tools/assets/actor-tokens/party/salty-dogs.webp",
            scaleX: 1.2,
            scaleY: 1.2
          },
        },
      });

      await vesi.region.scene.update(
        { tokens: [token.toObject()] },
        { recursive: false, noHook: true },
      );
    }
  }
}
