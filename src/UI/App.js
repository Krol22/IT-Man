const { html, createStore } = require('./innerself');
const reducer = require('./state');

const { attach, connect, dispatch } = createStore(reducer);
const OuterUI = require('./OuterUI');
const BackingUpModal = require('./BUM');
const ComputerIndicator = require('./ComputerIndicator');

window.connect = connect;
window.dispatch = dispatch;

function GameUI() {
  return html`
    ${connect(OuterUI)()} 
    ${connect(BackingUpModal)()} 
    ${connect(ComputerIndicator)()} 
  `;
}

attach(GameUI, document.querySelector('#root'));

