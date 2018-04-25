import React from 'react'
import _ from 'lodash'
import ErrorHandler from 'component/ErrorHandler'

class ExportDropdown extends ErrorHandler {
    constructor() {
        super();
        this.state = {};
        this.state.exportTypes = [
            {
                type: 'none',
                label: '-Export-'
            }, {
                type: 'pdf',
                label: 'PDF'
            }, {
                type: 'excel',
                label: 'Excel'
            }
        ];
        this.state.selectedName = '-Export-';
        this.state.selected = 'none';
    }

    onChange(type) {
        var exportType = _.find(this.state.exportTypes, { type: type });
        this.state.selected = exportType.type;
        this.state.selectedName = exportType.label;
        if (type != 'none') {
            if (this.props.onChange) {
                this.props.onChange(type);
            }
        }
        this.setState(this.state);
    }

    render() {
        return (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle updatestatus-dropdown" type="button" id="dropdownexport" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.selectedName} <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownexport" role="menu">
                    {
                        this.state.exportTypes.map(
                            exportType => (
                                <li key={exportType.type} className={this.state.selected == exportType.type ? 'active' : null}>
                                    <a className="dropdown-item" onClick={this.onChange.bind(this, exportType.type)}>{exportType.label}</a>
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default ExportDropdown