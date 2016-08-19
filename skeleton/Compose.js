let MessageStore = require('./message_store');


class Compose {
  constructor() {
    this.store = new MessageStore();
  }

  render() {
    let div = document.createElement("div");
    div.className = "new-message";
    div.innerHTML = this.renderForm();
    div.addEventListener("change", (e) => {
      this.store.updateDraftField(e.target.name, e.target.value);
    });
    div.addEventListener("submit", e => {
      e.preventDefault();
      this.store.sendDraft();
      window.location.hash = "inbox";
    });
    return div;
  }

  renderForm() {
    let draft = this.store.getMessageDraft();
    let form = `
      <p class="new-message-header">
        <form class="compose-form">
          <input type="text" placeholder="Recipient" name="to" value="${draft.to}">
          <input type="text" placeholder="Subject" name="subject" value="${draft.subject}">
          <textarea name="body" rows="20">${draft.body}</textarea>
          <button type="submit" class="btn btn-primary submit-message">Send</button>
        </form>
      </p>
    `;
    return form;
  }

}

module.exports = Compose;
