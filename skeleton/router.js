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
