import React from 'react'
import BaseComponent from 'component/BaseComponent'

class UserInfoModal extends BaseComponent {
    constructor() {
        super();
        this.state = {
            FirstName: '',
            LastName: '',
            Email: '',
            Phone: '',
            Company: ''
        }
    }

    componentDidMount() {
        if (this.props.userid) {
            this.fetchUserDetails(this.props.userid);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userid) {
            this.fetchUserDetails(nextProps.userid);
        }
    }

    fetchUserDetails(userId) {
        this.makeCall('/User/FetchUserDetails', 'post', { userid: userId }, this.onFetchUserDetailsComplete.bind(this));
    }

    onFetchUserDetailsComplete(user) {
        this.state = user;
        this.setState(this.state);
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        const backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        };

        const modalStyle = {
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: "40%",
            minHeight: '25%',
            margin: '0 auto',
            padding: 30,
            height: '37%'
        };

        return (
            <div className="backdrop" style={backdropStyle}>
                <div style={modalStyle}>
                    <div className="row">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-4">First Name: </div>
                        <div className="col-lg-3">{this.state.FirstName}</div>
                    </div>
                    <div className="row">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-4">Last Name: </div>
                        <div className="col-lg-3">{this.state.LastName}</div>
                    </div>
                    <div className="row">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-4">Company: </div>
                        <div className="col-lg-3">{this.state.Company}</div>
                    </div>
                    <div className="row">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-4">Email: </div>
                        <div className="col-lg-3">{this.state.Email}</div>
                    </div>
                    <div className="row">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-4">Phone: </div>
                        <div className="col-lg-3">{this.state.Phone}</div>
                    </div>
                    <br />
                    <div className="row footer">
                        <div className="col-lg-10"></div>
                        <div className="col-lg-2">
                            <button onClick={this.props.onClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfoModal