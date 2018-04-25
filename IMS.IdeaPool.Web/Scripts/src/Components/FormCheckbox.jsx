import React from 'react'
import BaseComponent from 'component/BaseComponent'

class FormCheckbox extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name={this.props.config.name}
                        checked={this.props.state.value}
                        onChange={this.props.checkboxvaluebind} />
                    {this.props.config.label}
                </label>
            </div>);
    }
}

export default FormCheckbox