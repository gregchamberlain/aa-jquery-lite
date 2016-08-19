/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Router = __webpack_require__(1);
	const Inbox = __webpack_require__(2);
	const Sent = __webpack_require__(4);
	const Compose = __webpack_require__(5);
	document.addEventListener("DOMContentLoaded", () => {

	  document.getElementById("compose").addEventListener("click", () => {
	    window.location.hash = "#compose";
	  });

	  let node = document.querySelector(".content");
	  let router = new Router(node, routes);
	  router.start();

	});

	const routes = {
	  inbox: new Inbox,
	  sent: new Sent,
	  compose: new Compose,
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Router {

	  constructor(node, routes) {
	    this.node = node;
	    this.routes = routes;
	  }

	  start() {
	    window.addEventListener("hashchange", this.render.bind(this));
	    this.render();
	  }

	  activeRoute() {
	    let current = window.location.hash.slice(1);
	    return this.routes[current];
	  }

	  render() {
	    this.node.innerHTML = "";
	    let component = this.activeRoute();
	    if (component === undefined) return;
	    console.log(component);
	    this.node.appendChild(component.render());

	  }


	}

	module.exports = Router;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	let MessageStore = __webpack_require__(3);


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


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	let MessageStore = __webpack_require__(3);


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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	let MessageStore = __webpack_require__(3);


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


/***/ }
/******/ ]);