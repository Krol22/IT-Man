import html from 'innerself';

const { createStore } = html;

function reducer({}, action, args) {
  return {};
}

const { attach } = createStore(reducer);

function MainUI() {
  return html`
    <div>TestComponent</div>
  `
}

attach(MainUI, document.querySelector('#root'));
console.log('attach');

