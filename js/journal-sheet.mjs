/**
 * The custom Journal Sheet used for Vesi's tools
 */
export class VesiJournalSheet extends JournalSheet {
  constructor(doc, options) {
    super(doc, options);
    this.options.classes.push(vesi.CSS_CLASS);
  }
}

/**
 * The "post description to chat" functionality
 */
function postDescToChat(description, doc) {
  ChatMessage.create({
    flavor: `<div class="page" data-visibility="gm"><p>@UUID[${doc.uuid}]</p></div>`,
    content: description.outerHTML,
    speaker: {
      alias: "Description",
    },
  });
}

/**
 * The "post as speaker" functionality
 */
async function speechToChat(speech, doc) {
  let nameNode = speech.children[1].children[0];
  let speakerData = {};
  let actor;
  let token;
  let text = "";
  let alias = speech.children[1].innerText || "GM";

  if (nameNode != null && nameNode.dataset != null) {
    actor = await fromUuid(nameNode.dataset.uuid);
  }

  for (let i = 2; i < speech.children.length; i++) {
    text += speech.children[i].outerHTML;
  }

  if (actor.getActiveTokens() !== null) {
    for (let a of actor.getActiveTokens()) {
      if (a.scene._id == canvas.scene.id) {
        token = a.id;
      }
    }
  }

  if (!actor) {
    speakerData = {
      alias: alias,
    };
  } else {
    speakerData = {
      actor: actor,
      alias: alias != actor.name ? alias : actor.name,
      token: token,
      scene: canvas.scene._id
    };
  }

  ChatMessage.create({
    flavor: `<div class="page" data-visibility="gm"><p>@UUID[${doc.uuid}]</p></div>`,
    content: text,
    speaker: speakerData,
  });
}

export function addDescriptionButtons(doc) {
  const descriptions = document.querySelectorAll(
    ".journal-sheet section.description:not(.readout)",
  );
  descriptions.forEach((desc) => {
    desc.classList.add("readout");

    const readoutBtn = document.createElement("i");
    readoutBtn.className = "fa-regular fa-comment-alt readoutButton";
    readoutBtn.setAttribute("data-tooltip", "Send To Chat");
    readoutBtn.setAttribute("aria-label", "Send To Chat");
    readoutBtn.onclick = () => postDescToChat(desc, doc);
    desc.prepend(readoutBtn);
  });

  const speakers = document.querySelectorAll(
    ".journal-sheet section.speaker:not(.speakout)",
  );
  speakers.forEach((speech) => {
    speech.classList.add("speakout");

    const speakBtn = document.createElement("i");
    speakBtn.className = "fa-regular fa-comment-alt speakButton"
    speakBtn.setAttribute("data-tooltip", "Speak");
    speakBtn.setAttribute("aria-label", "Speak");
    speakBtn.onclick = () => speechToChat(speech, doc);
    speech.prepend(speakBtn);
  });
}
