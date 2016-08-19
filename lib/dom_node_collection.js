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
