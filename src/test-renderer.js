require('./perseus-env.js');

let RendererComponent = null;
window.Khan = {
    Util: KhanUtil,
    error: function() {},
    query: {debug: ""},
    imageBase: "/images/",
    scratchpad: {
        _updateComponent: function() {
            if (RendererComponent) {
                RendererComponent.forceUpdate();
            }
        },
        enable: function() {
            Khan.scratchpad.enabled = true;
            this._updateComponent();
        },
        disable: function() {
            Khan.scratchpad.enabled = false;
            this._updateComponent();
        },
        enabled: true,
    },
};

const Perseus = window.Perseus = require('./editor-perseus.js');
const ReactDOM = window.ReactDOM = React.__internalReactDOM;

const TekRenderer = require('./tek-renderer.jsx');

const question = window.question;
const problemNum = Math.floor(Math.random() * 100);

// React router v20XX
const path = window.location.search.substring(1);
const component = [TekRenderer, {question, problemNum}];

Perseus.init({skipMathJax: false}).then(function() {
    RendererComponent = ReactDOM.render(
        React.createElement(...(component)),
        document.getElementById("perseus-container")
    );
}).then(function() {
}, function(err) {
    console.error(err); // @Nolint
});
