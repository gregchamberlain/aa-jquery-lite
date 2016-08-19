let MessageStore = require('./message_store');


class Inbox {
  constructor() {
    this.store = new MessageStore();
  }

  render() {
    let ul = document.createElement("ul");
    this.store.getInboxMessages().forEach(message => {
      ul.appendChild(this.renderMessage(message));
    });
    ul.className ="messages";
    return ul;
  }

  renderMessage(message) {
    let li = document.createElement("li");
    li.className = "message";
    let content = `
      <span class="from">${message.from}</span>
      <span class="subject">${message.subject}</span>
      <span class="body">${message.body}</span>
    `;
    li.innerHTML = content;
    return li;
  }

}

module.exports = Inbox;
