 /* eslint-disable no-console */

const React = require('react');
const { StyleSheet, css } = require('aphrodite');
const ReactDOM = require('react-dom');

const ApiClassNames = require("./perseus-api.jsx").ClassNames;
const ItemRenderer = require('./item-renderer.jsx');
const SimpleButton = require('./simple-button.jsx');

const TekRenderer = React.createClass({

    propTypes: {
        problemNum: React.PropTypes.number,
        question: React.PropTypes.any.isRequired,
    },

    getDefaultProps: function() {
        return {
            problemNum: 1,
        };
    },

    getInitialState: function() {
        return {
            // Matches ItemRenderer.showInput
            answer: { empty: true, correct: null },
        };
    },

    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.itemRenderer).focus();
    },

    onScore: function() {
        console.log(this.refs.itemRenderer.scoreInput());
    },

    checkAnswer: function() {
        this.setState({answer: this.refs.itemRenderer.scoreInput()});
    },

    takeHint: function() {
        this.refs.itemRenderer.showHint();
    },

    render: function() {
        const xomManatee = !!localStorage.xomManatee;

        const apiOptions = {
            responsiveStyling: true,
            getAnotherHint: () => {
                this.refs.itemRenderer.showHint();
            },
            xomManatee,
            customKeypad: xomManatee,
        };

        const rendererComponent = <ItemRenderer
            item={this.props.question}
            ref="itemRenderer"
            problemNum={this.props.problemNum}
            initialHintsVisible={0}
            enabledFeatures={{
                highlight: true,
                toolTipFormats: true,
                newHintStyles: true,
                useMathQuill: true,
            }}
            apiOptions={apiOptions}
        />;

        const answer = this.state.answer;
        const showSmiley = !answer.empty && answer.correct;

        const scratchpadEnabled = Khan.scratchpad.enabled;

        if (xomManatee) {
            const className = "framework-perseus " + ApiClassNames.XOM_MANATEE;
            return <div className={className}>
                <div>
                    {rendererComponent}
                    <div id="problem-area">
                        <div id="workarea" style={{marginLeft:0}}/>
                        <div id="hintsarea"/>
                    </div>
                </div>
            </div>;
        } else {
            return (
                <div className="framework-perseus">
                    <div>
                        <div id="problem-area">
                            <div id="workarea"/>
                            <div id="hintsarea"/>
                        </div>
                        <div>
                            <div id="answer-area">
                                <div>
                                    <div id="solutionarea"></div>
                                        <button
                                            className="btn btn-primary"
                                            onClick={this.checkAnswer}>
                                            {answer.empty ? 'Tjek svar' : (
                                                answer.correct ? 'Korrekt!' : 'Prøv igen.')}
                                        </button>
                                    <button
                                        className="btn btn-info"
                                        onClick={this.takeHint}>
                                        Hint
                                    </button>
                                </div>
                                    
                            </div>
                        </div>
                        <div style={{clear: "both"}}/>
                    </div>
                    {rendererComponent}
                </div>
            );
        }
    },
});

module.exports = TekRenderer;
