const DOMNodeCollection = require('./dom_node_collection');

window.$l = function(arg) {

  if (arg instanceof String) {
    this.el = Array.from(document.querySelectorAll(arg));
    return new DOMNodeCollection(this.el);
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  }

};


};
