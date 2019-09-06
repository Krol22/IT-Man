const { html, createStore } = require('./innerself');
const reducer = require('./state');

const { attach, connect, dispatch } = createStore(reducer);
const OuterUI = require('./OuterUI');
const BackingUpModal = require('./BUM');
const ComputerIndicator = require('./ComputerIndicator');
const Timer = require('./Timer');

window.connect = connect;
window.dispatch = dispatch;

function GameUI() {
  return html`
    ${connect(OuterUI)()} 
    ${connect(BackingUpModal)()} 
    ${connect(ComputerIndicator)()} 
    ${connect(Timer)()} 
  `;
}

attach(GameUI, document.querySelector('#root'));

