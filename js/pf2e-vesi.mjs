import * as CONST from "./const.mjs";
import { default as ZONES } from "./zones.mjs";
import VesiHex from "./region-hex.mjs";
import { VesiJournalSheet, addDescriptionButtons } from "./journal-sheet.mjs";
import VesiRegion from "./region.mjs";
import VesiState from "./region-state.mjs";
import VesiHexHUD from "./hex-hud.mjs";
import VesiKingdomLayer from "./kingdom-layer.mjs";
import { onImportAdventure, onRenderAdventureImporter } from "./importer.mjs";

/**
 * The ID of the Vesi Modeul
 * @type {string}
 */
const MODULE_ID = "pf2e-vesi-tools";
/**
 * The id of the compendium package containing the adventure
 * @type {string}
 */
const PACK_ID = "vodari";
/**
 * The ID of the Adventure document
 * @type {string}
 */
const ADVENTURE_ID = "jtNnOr2WsquMeywR";
/**
 * journalFlag
 */
const JOURNAL_FLAG = "isWM";

/**
 * @tyoedef {Module} Vesi
 * @property {object} CONST
 * @property {string} CSS_CLASS
 * @property {object} api
 * @property {VesiRegion} region
 * @property {VesiState} state
 */

/* ------------------------------------ */
/* Initialization                       */
/* ------------------------------------ */

Hooks.once("init", function () {
  /**
   * Global reference to the modeul
   * @type {Vesi}
   */
  globalThis.vesi = game.modules.get(MODULE_ID);

  /**
   * Constants used by the module
   * @type {object}
   */
  vesi.CONST = CONST;
  vesi.ZONES = ZONES;

  /**
   * The CSS class used to identify vesi applications
   * @type {string}
   */
  vesi.CSS_CLASS = "pf2e-vesi";

  /**
   * Public API for the Vesi module
   * @type {object}
   */
  vesi.api = {
    VesiHex,
    VesiHexHUD,
    VesiRegion,
    VesiState,
    VesiKingdomLayer,
  };

  // Register Sheets
  DocumentSheetConfig.registerSheet(JournalEntry, MODULE_ID, VesiJournalSheet, {
    types: ["base"],
    label: "Vesi Journal",
    makeDefault: false,
    canConfigure: true
  });

  // Register game settings
  game.settings.register(MODULE_ID, "state", {
    name: "Vesi Region State",
    scope: "world",
    config: false,
    requiresReload: false,
    type: VesiState,
    default: {},
    onChange: (value) => {
      vesi.state = value;
      vesi.region.onUpdateState();
    },
  });

  // One-time startup prompt
  // Is it needed?
  game.settings.register(MODULE_ID, "startup", {
    name: "One-Time Startup Prompt",
    scope: "world",
    config: false,
    type: Boolean,
    default: false,
  });

  // Allow disableing of the "send to chat" feature
  game.settings.register(MODULE_ID, "descriptiveTextButton", {
    name: '"Send To Chat" button',
    hint: 'Adds a button to the Vesi journals that can be used to send the "readaloud" blocks of descriptions, as well as speech texts, as chat messages.',
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(MODULE_ID, "fogExplorationRadius", {
    name: "Fog of War Reveal Radius",
    hint: "Configures how many hexes are revealed when the party token moves on the world map. Default: The party's hex and adjacent hexes are revealed. Limited: Only the hex that the party has entered is revealed.",
    scope: "world",
    config: true,
    type: String,
    choices: {
      "default": "Default (Adjacent Hexes)",
      "limited": "Limited (Single Hex)",
    },
    default: "default",
  });
});

Hooks.once("ready", async function () {
  game.settings.set("pf2e", "campaignType", "vesi");

  // Imported state
  game.settings.register(MODULE_ID, "imported", {
    scope: "world",
    type: Boolean,
    config: false,
    default: game.journal.has(""), //  the startup journal
  });

  const firstStartup = game.settings.get(MODULE_ID, "startup") === false;
  if (firstStartup) {
    const adventure = await game.packs.get(`${MODULE_ID}.${PACK_ID}`).getDocument(`${ADVENTURE_ID}`)
    adventure.sheet.render(true);

    if (game.actors.party.prototypeToken.texture.src === "system/pf2e/icons/default-icons/party.svg") {
      await game.actors.party?.update({
        prototypeToken: {
          texture: {
            src: "modules/pf2e-vesi-tools/assets/actor-tokens/party/salty-dogs.webp"
          }
        }
      });
    }

    game.settings.set(MODULE_ID, "startup", true);
  }
});

/* ------------------------------------ */

Hooks.once("setup", function () {
  /**
   * A singltone reference to the VesiState game state instance
   * @type {VesiState}
   */
  vesi.state = VesiState.load();

  /**
   * A singleton reference to the VesiRegion instance.
   * @type {VesiRegion}
   */
  vesi.region = new VesiRegion();
});

/* ------------------------------------ */
/* Canvas Events                        */
/* ------------------------------------ */

Hooks.on("canvasConfig", () => vesi.region._onConfig());
Hooks.on("canvasInit", () => vesi.region._onInit());
Hooks.on("canvasDraw", () => vesi.region._onDraw());
Hooks.on("canvasReady", () => vesi.region._onReady());
Hooks.on("canvasTearDown", () => vesi.region._onTearDown());
Hooks.on("getSceneControlButtons", (buttons) =>
  vesi.region._extendSceneControlButtons(buttons),
);

/* ------------------------------------ */
/* Journal Rendering                    */
/* ------------------------------------ */
Hooks.on("renderJournalPageSheet", (app, html) => {
  const doc = app.document;
  const journalFlag = doc.parent.getFlag("core", "isWM");

  if (!journalFlag) return;
  doc.parent._sheet._element[0].classList.add(vesi.CSS_CLASS);

  if (game.settings.get(MODULE_ID, "descriptiveTextButton"))
    addDescriptionButtons(doc);
});

/**
 * Ensure that the editing page is also styled, so we can see the effects immediate.
 */
Hooks.on("renderJournalTextPageSheet", (app, html) => {
  const doc = app.document;
  const journalFlag = doc.parent.getFlag("core", "isWM");

  if (journalFlag) html[0].classList.add(vesi.CSS_CLASS);
});

Hooks.on("renderAdventureImporter", onRenderAdventureImporter);
Hooks.on("importAdventure", onImportAdventure);
