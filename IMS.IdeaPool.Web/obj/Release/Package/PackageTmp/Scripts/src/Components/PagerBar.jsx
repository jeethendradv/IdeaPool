import React from 'react'
import ErrorHandler from 'component/ErrorHandler'

class PagerBar extends ErrorHandler {
    constructor(props) {
        super(props);
    }

    onNext() {
        if (this.props.onNext) {
            this.props.onNext();
        }
    }

    onPrevious() {
        if (this.props.onPrevious) {
            this.props.onPrevious();
        }
    }

    onPageLengthChange(event) {
        var pagelength = event.target.value;
        if (this.props.onPageLengthChange) {
            this.props.onPageLengthChange(pagelength);
        }
    }

    getDisplayText() {
        var currentpage = parseInt(this.props.currentpage);
        var pagelength = parseInt(this.props.pagelength);
        var numberofrows = parseInt(this.props.numberofrows);

        var start = ((currentpage - 1) * pagelength);
        var end = start + pagelength;
        if (end > numberofrows) {
            end = numberofrows;
        }
        return (start + 1) + ' to ' + end + ' of ' + this.props.numberofrows;
    }

    render() {
        return (
            <ul className="pager">
                <li className="left">
                    <select className="form-control" onChange={this.onPageLengthChange.bind(this)}>
                        <option value="10">10</option>
                        <option value="30">30</option>
                        <option value="40">50</option>
                        <option value="100">100</option>
                    </select>
                </li>
                <li>
                    {this.getDisplayText()}
                </li>
                <li className="right"><a onClick={this.onNext.bind(this)}>Next</a></li>
                <li className="right"><a onClick={this.onPrevious.bind(this)}>Previous</a></li>
            </ul>
        );
    }
}

export default PagerBar