const { html, createStore } = require('./innerself');
const reducer = require('./state');

const { attach, connect, dispatch } = createStore(reducer);
const OuterUI = require('./OuterUI');
const BackingUpModal = require('./BUM');
const ComputerIndicator = require('./ComputerIndicator');
const PasswordIndicator = require('./PasswordIndicator');
const Menu = require('./Menu');
const HTP = require('./HowToPlay');
const GOM = require('./GOM');

window.connect = connect;
window.dispatch = dispatch;

function GameUI() {
  return html`
    ${connect(OuterUI)()} 
    ${connect(BackingUpModal)()} 
    ${connect(ComputerIndicator)()} 
    ${connect(PasswordIndicator)()} 
    ${connect(Menu)()}
    ${connect(HTP)()}
    ${connect(GOM)()}
  `;
}

attach(GameUI, document.querySelector('#root'));

