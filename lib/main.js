const DOMNodeCollection = require('./dom_node_collection');

window.$l = function(arg, parent = document) {

  let documentReady = false;
  let waitingFunctions = [];
  document.addEventListener("DOMContentLoaded", callWaitingFunctions);

  if (typeof arg === "string") {
    this.el = Array.from(parent.querySelectorAll(arg));
    return new DOMNodeCollection(this.el);
  } else if (arg instanceof "HTMLElement") {
    return new DOMNodeCollection([arg]);
  } else if (arg instanceof "function") {
    if (documentReady){
      arg();
    } else {
      waitingFunctions.push(arg);
    }
  }

  function callWaitingFunctions() {
    documentReady = true;
    waitingFunctions.forEach( el => {
      el();
    });
  }

};

window.$l.extend = function(...objects) {
  return Object.assign(...objects);
};

const defaults = {
  success: function() {},
  error: function() {},
  url: "/",
  method: 'GET',
  data: {},
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
};



window.$l.ajax = function(object) {

  object = window.$l.extend(defaults, object);
  //step 1 - create xhr object
  const xhr = new XMLHttpRequest();

  // step 2 - specify path and verb
  xhr.open(object.method, object.url);
  xhr.setRequestHeader("Content-type", object.contentType);

  // step 3 - register a callback
  xhr.onload = function () {
    if (xhr.status === 200) {
      object.success(JSON.parse(xhr.response));
    } else {
      object.error(xhr.response);
    }
  };

  // step 4 - send off the request with optional data
  const optionalData =  object.data;
  xhr.send(optionalData);
};
