/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable eol-last, no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require("react");
const _ = require("underscore");

const Changeable = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const InfoTip = require("../components/info-tip.jsx");
const BlurInput = require("react-components/blur-input.jsx");

/**
 * This is the main editor for this widget, to specify all the options.
 */
const InteractiveVideoEditor = React.createClass({
    propTypes: {
        json: React.PropTypes.string,
        onChange: React.PropTypes.func,
    },

    mixins: [Changeable, EditorJsonify],

    getDefaultProps: function() {
        return { json: "", };
    },

    _handleChange: function(encodedVideo) {
        this.props.onChange({json: encodedVideo});
    },

    _handleClick: function() {
        console.log("Opening editor");
        var self = this;
        InteractiveVideoBridge.openEditor(self.props.json, function(encodedVideo) {
            console.log("New: " + encodedVideo);
            self._handleChange(encodedVideo);
        });
    },

    render: function() {
        return  <div>
                    <button className="btn btn-primary"
                            onClick={this._handleClick}>
                            Åben editor
                    </button>
                </div>;
    },
});

module.exports = InteractiveVideoEditor;
