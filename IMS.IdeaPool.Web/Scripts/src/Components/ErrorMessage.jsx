import React from 'react'
import ErrorHandler from 'component/ErrorHandler'

class ErrorMessage extends ErrorHandler {
    render() {
        return (
            <small className="error-message">{this.props.message}</small>
        );
    }
}

export default ErrorMessage