import React from 'react'
import BaseComponent from 'component/BaseComponent'

class FieldOfWaterDropdown extends BaseComponent {
    constructor() {
        super();
        this.state.fieldofwater = [];
    }

    componentDidMount() {
        this.makeCall("/Idea/GetFieldOfWater", "POST", null, this.onFetchFieldofWaterCallback.bind(this));
    }

    onFetchFieldofWaterCallback(data) {
        const empty = [{ Key: 0, Value: '-Select FOW-' }];
        this.state.selectedId = empty[0].Key;
        this.state.selectedName = empty[0].Value;
        this.state.fieldofwater = empty.concat(data);
        this.setState(this.state);
    }

    onChange(key) {
        var fieldofwater = _.find(this.state.fieldofwater, { Key: key });
        this.state.selectedId = fieldofwater.Key;
        this.state.selectedName = fieldofwater.Value;
        this.setState(this.state);
        if (this.props.onChange) {
            this.props.onChange(key);
        }
    }

    render() {
        return (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle updatestatus-dropdown" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.selectedName} <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2" role="menu">
                    {
                        this.state.fieldofwater.map(
                            fieldofwater => (
                                <li key={fieldofwater.Key} className={this.state.selectedId == fieldofwater.Key ? 'active' : null}>
                                    <a className="dropdown-item" onClick={this.onChange.bind(this, fieldofwater.Key)}>{fieldofwater.Value}</a>
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default FieldOfWaterDropdown