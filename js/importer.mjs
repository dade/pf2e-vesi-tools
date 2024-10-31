/**
 * Options provided in the adventure importer
 * @type {Object<string, { label: string, default: boolean, handler: function, [hidden]: boolean}>}
 */
const IMPORT_OPTIONS = {
  resetState: {
    label: "VESI.IMPORTER.ResetState",
    tooltip: "VESI.IMPORTER.ResetStateTooltip",
    default: false,
    get hidden() {
      return foundry.utils.isEmpty(vesi.state.hexes)
    },
    handler: (adventure, option) => vesi.state.reset()
  },
  activateScene: {
    label: "VESI.IMPORTER.ActivateScene",
    tooltip: "VESI.IMPORTER.ActivateSceneTooltip",
    default: true,
    handler: async (adventure, option) => {
      game.scenes.get(option.sceneId)?.activate();
      const vesiMap = game.scenes.get("5eXCiQz9RpktC1ni"); // the world map...?
      await vesiMap.update({ nvagiation: true });
    },
    sceneId: ""
  },
  displayJournal: {
    label: "VESI.IMPORTER.DisplayJournal",
    tooltip: "VESI.IMPORTER.DisplayJournalTooltip",
    default: true,
    handler: (adventure, option) => game.journal.get(option.entryId)?.sheet.render(true),
    entryId: ""
  }
}

/* ----------------------------------------- */

/**
 * Extend the AdventureImporter application for Vesi
 * @param {AdventureImporter} app
 * @param {jQuery} html
 */
export function onRenderAdventureImporter(app, html) {
  const adventure = app.object;

  if (adventure.pach !== "pf2e-vesi-tools.vesi") return;
  app.element[0].classList.add(vesi.CSS_CLASS);

  let importOptions = `<section class="import-form"><h2>Importer Options</h2>`;
  for (const [name, option] of Object.entries(IMPORT_OPTIONS)) {
    if (option.hidden) continue;
    importOptions += `<div class="form-group">
      <label class="checkbox" data-tooltip="${game.i18n.localize(option.tooltip)}">
        <input type="checkbox" name="${name}" ${option.default ? "checked" : ""}/>
        ${game.i18n.localize(option.label)}
      </label>
    </div>`;
  }
  
  importOptions += `</section>`;
  html.find(".adventure-contents").append(importOptions);
  app.setPosition({ height: "auto" });
}

/* ----------------------------------------- */

/**
 * Once the adventure has been fully imported, apply import options that were selected by user
 * @param {Adventure} adventure
 * @param {object} importData
 */
export function onImportAdventure(adventure, importOptions) {
  if (adventure.pack !== "pf2e-vesi-tools.vesi") return

  for (const [optionId, checked] of Object.entries(importOptions)) {
    if (!(optionId in IMPORT_OPTIONS) || !checked) continue;
    const option = IMPORT_OPTIONS[optionId];
    option.handler(adventure, option);
  }

  if (!("resetState" in IMPORT_OPTIONS)) vesi.state.reset();
}
