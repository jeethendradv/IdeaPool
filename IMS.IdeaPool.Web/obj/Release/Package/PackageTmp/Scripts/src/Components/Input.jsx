import React from 'react'
import ErrorHandler from 'component/ErrorHandler'

class Input extends ErrorHandler {
    onChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    render() {
        return (
            <input className="form-control"
                type={this.props.config.type}
                name={this.props.config.name}
                placeholder={this.props.config.placeholder}
                value={this.props.value}
                onChange={this.onChange.bind(this)} />
            );
    }
}

export default Input