import React, { Component } from 'react';

class QuizOption extends Component {
    constructor(props) {
        super(props);
        this.callParentCheckOption = this.callParentCheckOption.bind(this);
    }
    
    callParentCheckOption() {
        this.props.checkResults(this.props.option);
    }

    render() {
        return (
            <div className="fields animated zoomIn" onClick={this.callParentCheckOption}>
                <div className="field-block">
                    {this.props.option}
                </div>
            </div>
        );
    }
}

export default QuizOption;