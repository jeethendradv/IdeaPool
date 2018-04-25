/*
Author: Jeethendra
Description:
The Input takes two props state and config. Below is the state and the config object used in input.

state: {                // The state object has properties which change during the input lifetime.
    isvalid: true,      // defaults to true, if set to false the input border will change to red indicating error.
    value: '',          // if you want to set the initial value for the input
    errorcode: ''       // the errorcode that will be used to display the errormessage when isvalid is false
}

config: {
    name: 'name',
    type: 'text',
    label: 'title',
    charactercount: {
        display: true,      // if set to true displays the character count at the top right next the the label
        maxlength: 25
    },
    placeholder: '',
    errordata: {            //any properties that should be used in the error template
    }
}

Events:
    valuebind           // the event will be fired when the value in the input changes
*/

import React from 'react'
import BaseComponent from 'component/BaseComponent'
import ErrorMessage from 'component/ErrorMessage'
import ErrorHelper from 'component/ErrorHelper'

class FormInput extends BaseComponent {
    constructor() {
        super();
    }

    onvaluechange(event) {
        this.props.valuebind(event);
    }

    displayCharacterCount() {
        return this.props.config.charactercount && this.props.config.charactercount.display;
    }

    render() {
        return (
            <div className={this.props.state.isvalid ? 'form-group' : 'form-group has-error'}>
                <label htmlFor={this.props.config.name}>{this.props.config.label}
                </label>
                {
                    this.displayCharacterCount() ?
                        <label htmlFor={this.props.config.name}
                            className="right">
                            {this.props.state.value.length} of {this.props.config.charactercount.maxlength}
                        </label>
                        : ''
                }
                <input className="form-control"
                    type={this.props.config.type}
                    name={this.props.config.name}
                    placeholder={this.props.config.placeholder}
                    value={this.props.state.value}
                    onChange={this.onvaluechange.bind(this)} />
                {this.props.state.isvalid ? '' : <ErrorMessage message={ErrorHelper.GetErrorMessageFromTemplate(this.props.state.errorcode, this.props.config.errordata)} />}
            </div>);
    }
}

export default FormInput