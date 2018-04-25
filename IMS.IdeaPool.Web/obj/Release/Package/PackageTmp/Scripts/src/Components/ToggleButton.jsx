import React from 'react'
import ErrorHandler from 'component/ErrorHandler'

class ToggleButton extends ErrorHandler {
    onClick() {
        if (!this.props.onconfig.isselected && this.props.onClick) {
            this.props.onClick();
        }
    }

    offClick() {
        if (!this.props.offconfig.isselected && this.props.offClick) {
            this.props.offClick();
        }
    }

    render() {
        return (
            <div className="btn-group" data-toggle="buttons">
                <label className={`btn btn-primary ${this.props.onconfig.isselected ? 'active' : null}`} onClick={this.onClick.bind(this)}>
                    <input type="radio" name="options" id="on" /> {this.props.onconfig.text}
                </label>
                <label className={`btn btn-primary ${this.props.offconfig.isselected ? 'active' : null}`} onClick={this.offClick.bind(this)} >
                    <input type="radio" name="options" id="off" /> {this.props.offconfig.text}
                </label>
            </div>
        );
    }
}

export default ToggleButton