/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require("react");
var _ = require("underscore");

var Changeable = require("../mixins/changeable.jsx");

/**
 * Interactive video renderer.
 */
var InteractiveVideo = React.createClass({
    propTypes: {
        alignment: React.PropTypes.string,
        location: React.PropTypes.string,
    },

    mixins: [Changeable],

    simpleValidate: function(rubric) {
        return InteractiveVideo.validate(null, rubric);
    },

    _playVideo: function() {
        var json = this.props.json;
        if (json) {
            var parsed = JSON.parse(json);
            InteractiveVideoBridge.beginPlayback(parsed);
            console.log("Playing video: ", parsed);
        }
    },

    render: function() {
        var json = this.props.json;
        if (!json) {
            return <div/>;
        }

        return  <div className="container">
                    <div className="col-md-12">
                        <div className="row clickable">
                            <div className="col-md-12">
                                <div className="card">
                                    <a href="#" onClick={this._playVideo}><i className="fa fa-youtube-play"></i> Introduktion til interaktive videoer</a>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <ul>
                                                <li><b>Længde:</b> 10:20</li>
                                                <li><b>Antal spørgsmål:</b> 20</li>
                                            </ul>
                                        </div>
                                        <div className="col-sm-6">
                                            <ul>
                                                <li><b>Videoen er set:</b> <i className="fa fa-check"></i></li>
                                                <li><b>Spørgsmålene er besvaret:</b> <i className="fa fa-times"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>;
    },
});


/**
 * This is the widget's grading function.
 * Points for videos are tallied by the embedded video itself, in the case
 * of Khan Academy videos.
 */
_.extend(InteractiveVideo, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    },
});

module.exports = {
    name: "interactivevideo",
    displayName: "Interactive video",
    defaultAlignment: "block",
    supportedAlignments: ["block", "float-left", "float-right", "full-width"],
    widget: InteractiveVideo,
};
