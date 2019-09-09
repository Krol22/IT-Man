const { html, createStore } = require('./innerself');
const reducer = require('./state');

const { attach, connect, dispatch } = createStore(reducer);
const OuterUI = require('./OuterUI');
const BackingUpModal = require('./BUM');
const ComputerIndicator = require('./ComputerIndicator');
const PasswordIndicator = require('./PasswordIndicator');
const StatusLine = require('./StatusLine');
const Menu = require('./Menu');
const HTP = require('./HowToPlay');

window.connect = connect;
window.dispatch = dispatch;

function GameUI() {
  return html`
    ${connect(OuterUI)()} 
    ${connect(BackingUpModal)()} 
    ${connect(ComputerIndicator)()} 
    ${connect(PasswordIndicator)()} 
    ${connect(StatusLine)()}
    ${connect(Menu)()}
    ${connect(HTP)()}
  `;
}

attach(GameUI, document.querySelector('#root'));

