let messages = {
  sent: [
    {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
    {to: "person@mail.com", subject: "zzz", body: "so booring"}
  ],
  inbox: [
    {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body:
  "Stay at home mom discovers cure for leg cramps. Doctors hate her"},
    {from: "person@mail.com", subject: "Questionnaire",
    body: "Take this free quiz win $1000 dollars"}
  ]
};

class Message {
  constructor() {
    this.to = "";
    this.subject = "";
    this.body = "";
  }

  toJson() {
    return {
      to: this.to,
      subject: this.subject,
      body: this.body,
    };
  }
}

module.exports = class MessageStore {

  getInboxMessages() {
    return messages.inbox;
  }

  getSentMessages() {
    return messages.sent;
  }

  getMessageDraft() {
    this.messageDraft = this.messageDraft || new Message();
    return this.messageDraft;
  }

  updateDraftField(field, value) {
    this.messageDraft[field] = value;

  }

  sendDraft() {
    messages.sent.push(this.messageDraft.toJson());
    this.messageDraft = new Message();
  }


};
