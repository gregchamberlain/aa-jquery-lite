const Router = require('./router');
const Inbox = require('./Inbox');
const Sent = require('./Sent');
const Compose = require('./Compose');
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
