import React from 'react'
import DataTable from 'component/DataTable'
import ErrorHandler from 'component/ErrorHandler'

class UsersGrid extends ErrorHandler {
    constructor(props) {
        super(props);
    }

    getColumnsConfig() {
        var config = [
            {
                name: 'Joined On',
                binding: 'JoinedDate'
            },
            {
                name: 'Name',
                binding: 'FullName',
                islink: true,
                onClick: this.onUserClick.bind(this)
            },
            {
                name: 'Company',
                binding: 'Company'
            },
            {
                name: '# Ideas Submitted',
                binding: 'TotalIdeasSubmitted'
            }
        ];
        return config;
    }

    onUserClick(rowdata) {
        if (this.props.onUserClick) {
            this.props.onUserClick(rowdata.Id);
        }
    }

    render() {
        return (
            <div>
                <DataTable
                    url="/User/Search"
                    data={{ SearchTerm: this.props.searchname }}
                    columns={this.getColumnsConfig()}
                />
            </div>
        );
    }
}

export default UsersGrid