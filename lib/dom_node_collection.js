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
  }

  append(argument) {
    if (!argument instanceof DOMNodeCollection) {
      argument = new DOMNodeCollection(argument);
    }

    this.elements.forEach( el1 => {
      argument.elements.forEach(el2 => {
        el1.innerHTML = el1.innerHTML + el2.innerHTML;
      });
    });
  }


  attr() {

  }

  addClass() {

  }

  removeClass() {
    
  }



}

module.exports = DOMNodeCollection;
