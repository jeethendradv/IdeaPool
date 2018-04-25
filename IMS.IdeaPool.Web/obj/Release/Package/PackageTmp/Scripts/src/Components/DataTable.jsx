/* Author: jeethendra
{
    url: string
    data: object,
    pagelength: int             // default set to 10
    currentpage: int            // default set to 1
    columns:                    // Array for each column config
    [
        {
            name
            binding
            islink
                url or onClick                
            isicon
                displayedit
                    url or onEditClick
                displaycomment
                    url or onCommentClick        
        }
    ]
}

*/
import React from 'react'
import Pager from 'component/Pager'
import _ from 'lodash'
import PagerBar from 'component/PagerBar'

class DataTable extends Pager {
    constructor(props) {
        super(props);
        this.state.columns = [];
    }

    getLinkUrl(columnConfig, rowData) {
        return _.replace(columnConfig.url, /{([^}]+)}/g, function (row, match) {
            var prop = match.replace('{', '').replace('}', '');
            return row[prop];
        }.bind(this, rowData));
    }

    onEdit(columnconfig, rowdata) {
        if (columnconfig.onEditClick) {
            columnconfig.onEditClick(rowdata);
        }
    }

    onComment(columnconfig, rowdata) {
        if (columnconfig.onCommentClick) {
            columnconfig.onCommentClick(rowdata);
        }
    }

    onCellClick(columnconfig, rowdata) {
        if (columnconfig.onClick) {
            columnconfig.onClick(rowdata);
        }
    }

    componentWillReceiveProps(nextprops) {
        this.fetchRowsWithData(nextprops.data);
    }

    render() {
        return (
            <div>
                {
                    this.state.numberofrows > this.state.pagelength ?
                        <PagerBar
                            currentpage={this.state.currentpage}
                            pagelength={this.state.pagelength}
                            numberofrows={this.state.numberofrows}
                            onNext={this.onNext.bind(this)}
                            onPrevious={this.onPrevious.bind(this)}
                            onPageLengthChange={this.onPageLengthChange.bind(this)}
                        />
                        : null
                }
                <table className="table table-hover table-sm">
                    <thead className="thead-inverse">
                        <tr>
                            {
                                this.props.columns.map(
                                    (column, index) => (
                                        <th scope="col" key={index}>{column.name}</th>
                                    )
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.rows.map(
                                (row, i) => (
                                    <tr key={i}>
                                        {
                                            this.props.columns.map(
                                                (column, index) => (
                                                    <td key={index}>
                                                        {
                                                            column.islink ?
                                                                column.url ?
                                                                    <Link to={this.getLinkUrl(column, row)}>{row[column.binding]}</Link>
                                                                    :
                                                                    <a onClick={this.onCellClick.bind(this, column, row)}>{row[column.binding]}</a>
                                                                : null
                                                        }
                                                        {
                                                            column.isicon && column.displayedit ?
                                                                column.url ?
                                                                    <Link to={this.getLinkUrl(column, row)}>
                                                                        <span className="glyphicon glyphicon-pencil"> </span>
                                                                    </Link>
                                                                    :
                                                                    <a onClick={this.onEdit.bind(this, column, row)}><span className="glyphicon glyphicon-pencil"> </span></a>
                                                                : null
                                                        }
                                                        {
                                                            column.isicon && column.displaycomment ?
                                                                column.url ?
                                                                    <Link to={this.getLinkUrl(column, row)}>
                                                                        <span className="glyphicon glyphicon-comment"> </span>
                                                                    </Link>
                                                                    :
                                                                    <a onClick={column.onClick}><span className="glyphicon glyphicon-comment"> </span></a>
                                                                : null
                                                        }
                                                        {
                                                            !(column.isicon || column.islink) ?
                                                                row[column.binding]
                                                                : null
                                                        }
                                                    </td>
                                                )
                                            )
                                        }
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                {
                    this.state.numberofrows > this.state.pagelength ?
                        <PagerBar
                            currentpage={this.state.currentpage}
                            pagelength={this.state.pagelength}
                            numberofrows={this.state.numberofrows}
                            onNext={this.onNext.bind(this)}
                            onPrevious={this.onPrevious.bind(this)}
                            onPageLengthChange={this.onPageLengthChange.bind(this)}
                        />
                        : null
                }
            </div>
        );
    }
}

export default DataTable