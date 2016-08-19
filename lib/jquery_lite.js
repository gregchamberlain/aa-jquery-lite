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

	const DOMNodeCollection = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {

	  constructor(elements) {
	    this.elements = elements;
	  }

	  html(string) {
	    if (typeof string === "undefined") {
	      return this.elements[0].innerHTML;
	    } else {
	      this.elements.forEach( el => {
	        el.innerHTML = string;
	      });
	    }
	    return this;
	  }

	  empty() {
	    this.html("");
	    return this;
	  }

	  append(argument) {
	    if (!argument instanceof DOMNodeCollection) {
	      argument = new DOMNodeCollection(argument);
	    }

	    this.each( el1 => {
	      argument.each(el2 => {
	        el1.innerHTML = el1.innerHTML + el2.innerHTML;
	      });
	    });
	    return this;
	  }


	  each(callback) {
	    this.elements.forEach(callback);
	  }

	  attr(key, val) {
	    if (typeof val === "undefined") {
	      return this.elements[0].attributes[key].value;
	    } else {
	      this.elements[0].attributes[key].value = val;
	    }
	    return this;
	  }

	  addClass(arg) {
	    this.each( el => {
	      el.classList.add(arg);
	    });
	    return this;
	  }

	  removeClass(arg) {
	    this.each( el => {
	      el.classList.remove(arg);
	    });
	    return this;
	  }

	  children() {
	    let result = [];
	    this.each( el => {
	      result = result.concat(el.children);
	    });
	    return new DOMNodeCollection(result);
	  }

	  parent() {
	    let result = [];
	    this.each( el => {
	      result.push(el.parentElement);
	    });
	    return new DOMNodeCollection(result);
	  }

	  find(selector) {
	    let result = [];
	    this.each( el => {
	      result = result.concat(window.$l(selector, el).elements);
	    });
	    return new DOMNodeCollection(result);
	  }

	  remove() {
	    this.each( el => {
	      el.remove();
	    });
	    this.elements = [];
	    return this;
	  }

	  on(event, callback) {
	    this.each( el => {
	      el.addEventListener(event, callback);
	    });
	    return this;
	  }

	  off(event, callback) {
	    this.each( el => {
	      el.removeEventListener(event, callback);
	    });
	    return this;
	  }

	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);