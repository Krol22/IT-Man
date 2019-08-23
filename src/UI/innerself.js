function html([first, ...strings], ...values) {
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    ).filter(value => value != null)
    .join('');
}

function createStore(reducer) {
    let state = reducer();
    const roots = new Map();
    const prevs = new Map();

    function render() {
        for (const [root, component] of roots) {
            const output = component();

            if (output !== prevs.get(root)) {
                prevs.set(root, output);
                root.innerHTML = output;
                const event = new CustomEvent('render', { detail: state });
                root.dispatchEvent(event);
            }
        }
    };

    return {
        attach(component, root) {
            roots.set(root, component);
            render();
        },
        connect(component) {
            return (...args) => component(state, ...args);
        },
        dispatch(action, ...args) {
            state = reducer(state, action, args);
            render();
        },
    };
}

console.log(html, createStore);

module.exports = {
  html, 
  createStore,
};
