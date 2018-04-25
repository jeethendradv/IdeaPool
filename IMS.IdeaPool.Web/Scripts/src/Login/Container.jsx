import 'bootstrap'
import 'respond'
import BaseComponent from 'component/BaseComponent'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from 'login/Login'
import RegisterNewUser from 'login/RegisterNewUser'
import ForgotPassword from 'login/ForgotPassword'
import HeaderLogo from 'component/HeaderLogo'
import ResetPassword from 'login/ResetPassword'
import ActivateUser from 'login/ActivateUser'
import { NotificationContainer } from 'notification';
import Footer from 'component/Footer'

class Container extends BaseComponent {
    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container">
                        <HeaderLogo />
                    </div>
                </nav>
                <div className="container body-content">
                    <div id="messagecontainer">
                        <NotificationContainer />
                    </div>
                    <div id="content" className="content">
                        <Switch>
                            <Route exact path='/' component={Login} />
                            <Route exact path='/Login/Index' component={Login} />
                            <Route exact path='/register' component={RegisterNewUser} />
                            <Route exact path='/Resetpassword' component={ResetPassword} />
                            <Route exact path='/forgotpassword' component={ForgotPassword} />
                            <Route exact path="/Activate" component={ActivateUser} />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Container