import React from 'react'
import $ from 'jquery'

class ErrorHandler extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidCatch(error, info) {
        let data = {
            message: error.message,
            callstack: error.stack
        };
        $.ajax({
            context: this,
            type: 'POST',
            url: '/Error/LogException',
            data: data
        });
    }
}

export default ErrorHandler