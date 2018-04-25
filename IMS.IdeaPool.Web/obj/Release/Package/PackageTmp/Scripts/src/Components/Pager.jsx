import React from 'react'
import BaseComponent from 'component/BaseComponent'

class Pager extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            currentpage: props.currentpage ? parseInt(props.currentpage) : 1,
            pagelength: props.pagelength ? parseInt(props.pagelength) : 10,
            totalpages: 0
        };
    }

    onNext() {
        if (this.state.currentpage < this.state.totalpages) {
            this.state.currentpage += 1;
            this.fetchRows();
        }
    }

    onPrevious() {
        if ((this.state.currentpage - 1) >= 1) {
            this.state.currentpage = this.state.currentpage - 1;
            this.fetchRows();
        }
    }

    onPageLengthChange(pagelength) {
        if (this.state.pagelength >= this.state.numberofrows && pagelength > this.state.numberofrows)
            return;
        this.state.currentpage = 1;
        this.state.pagelength = parseInt(pagelength);
        this.fetchRows();
    }

    componentDidMount() {
        this.fetchRows();
    }

    fetchRows() {
        if (this.props.url) {
            this.makeCall(this.props.url, 'POST', this.getUrlParams(), this.onFetchRows.bind(this));
        }
    }

    fetchRowsWithData(data) {
        data.CurrentPage = this.state.currentpage;
        data.PageLength = this.state.pagelength;
        this.state.data = data;
        this.makeCall(this.props.url, 'POST', data, this.onFetchRows.bind(this));
    }

    onFetchRows(result) {
        this.state.rows = result.Rows;
        this.state.numberofrows = parseInt(result.TotalCount);
        this.state.totalpages = parseInt(result.TotalPages);
        this.setState(this.state);
    }

    getUrlParams() {
        var data = this.state.data ? this.state.data : (this.props.data ? this.props.data : {});        
        data.CurrentPage = this.state.currentpage;
        data.PageLength = this.state.pagelength;
        return data;
    }
}

export default Pager