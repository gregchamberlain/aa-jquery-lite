let MessageStore = require('./message_store');


class Sent {
  constructor() {
    this.store = new MessageStore();
  }

  render() {
    let ul = document.createElement("ul");
    this.store.getSentMessages().forEach(message => {
      ul.appendChild(this.renderMessage(message));
    });
    ul.className ="messages";
    return ul;
  }

  renderMessage(message) {
    let li = document.createElement("li");
    li.className = "message";
    let content = `
      <span class="to">To: ${message.to}</span>
      <span class="subject">${message.subject}</span>
      <span class="body">${message.body}</span>
    `;
    li.innerHTML = content;
    return li;
  }

}

module.exports = Sent;
