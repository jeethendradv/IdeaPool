import React from 'react'
import BaseComponent from 'component/BaseComponent'
import $ from 'jquery'
import 'jquery-ui'

class UsersAutocomplete extends BaseComponent {
    constructor() {
        super();
    }

    componentDidMount() {
        this.$autocomplete = $(this.el);
        this.$autocomplete.autocomplete({
            minLength: 2,
            source: function (request, response) {
                this.makeCall('/User/Autocomplete', 'POST', request, response);
            }.bind(this),
            select: this.onUserSelect.bind(this),
            change: this.onUserChange.bind(this)
        })
            .autocomplete('instance')._renderItem = function (ul, item) {
                return $("<li>")
                    .append("<div>" + item.FirstName + ", " + item.LastName + "</div>")
                    .appendTo(ul);
            };
    }

    onUserSelect(event, ui) {
        this.$autocomplete.val(ui.item.FirstName + ", " + ui.item.LastName);
        if (this.props.onSelect) {
            this.props.onSelect(ui.item.Id);
        }
        return false;
    }

    onUserChange(event, ui) {
        if (this.props.onChange) {
            const id = ui.item ? ui.item.Id : 0;
            this.props.onChange(id);
        }
    }

    searchClick() {
        if (this.props.onSearch) {
            this.props.onSearch(this.$autocomplete.val());
        }
    }

    render() {
        return (
            this.props.hidesearch ?
                <div className="row form-inline">
                    <input className="form-control width100" ref={el => this.el = el}
                        type="text"
                        name="user"
                        placeholder="Type first name or last name"
                    />
                </div>
                :
                <div className="row form-inline">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-5">

                        <input className="form-control width100" ref={el => this.el = el}
                            type="text"
                            name="user"
                            placeholder="Type first name or last name"
                        />
                    </div>
                    <div className="col-lg-1">
                        <button className="btn btn-primary btn-IMS" onClick={this.searchClick.bind(this)}>
                            <span className="glyphicon glyphicon-search"></span> Search
                    </button>
                    </div>
                    <div className="col-3"></div>
                </div>
        );
    }
}

export default UsersAutocomplete