//import $ from "../../../node_modules/jquery";

const ws = new WebSocket("ws://localhost:3000");

ws.onopen = function (event) {
  alert("Web socket is connected!");
  // todo: Replace above alert with this (once working): $(".mob-status").append("<p>Web socket server is connected.</p>");
};
