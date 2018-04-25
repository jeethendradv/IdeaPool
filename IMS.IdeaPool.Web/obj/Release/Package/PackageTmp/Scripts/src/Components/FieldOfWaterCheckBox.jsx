import React from 'react'
import BaseComponent from 'component/BaseComponent'
import ErrorMessage from 'component/ErrorMessage'
import ErrorHelper from 'component/ErrorHelper'

class FieldOfWaterCheckBox extends BaseComponent {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        var fieldofwater = {
            key: parseInt(event.target.value),
            ischecked: event.target.checked
        };
        this.props.fieldOfWaterChangeCallback(fieldofwater);
    }

    onOtherTextChange(event) {
        var fieldofwater = {
            key: -1,
            ischecked: true,
            name: event.target.value
        };
        this.props.fieldOfWaterChangeCallback(fieldofwater);
    }

    render() {
        return (
            <div className="form-group form-checkbox">
                <label htmlFor="fieldOfWater">Field of water</label>
                <div name="fieldOfWater">
                    {
                        this.props.state.items.map(
                            item =>
                                (
                                    <div className="inline" key={item.key}>
                                        <input checked={item.ischecked} className="form-control" type="checkbox" name={item.key + "fancy-checkbox-default"} id={item.key + "fancy-checkbox-default"} value={item.key} onChange={this.onChange} />
                                        <div className="[ btn-group ]">
                                            <label htmlFor={item.key + "fancy-checkbox-default"} className="btn btn-default">
                                                <span className="[ glyphicon glyphicon-ok ]"></span>
                                                <span></span>
                                            </label>
                                            {
                                                item.key == -1 ?
                                                    // if key is -1 then it is to display Other option
                                                    <input type="text" className="[ fieldofwater-other active btn-fieldofwater]" disabled={!item.ischecked} value={item.name} onChange={this.onOtherTextChange.bind(this)} placeholder="other" />
                                                    :
                                                    <label htmlFor={item.key + "fancy-checkbox-default"} className="[ btn btn-fieldofwater ]">
                                                        {item.name}
                                                    </label>
                                            }
                                        </div>
                                    </div>
                                )
                        )
                    }
                </div>
                {
                    !this.props.state.isvalid
                        ? <ErrorMessage message={ErrorHelper.GetErrorMessageFromTemplate(this.props.state.errorcode)} />
                        : ''
                }
            </div>
        );
    }
}

export default FieldOfWaterCheckBox