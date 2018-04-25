import React from 'react'
import ErrorHandler from 'component/ErrorHandler'

class HeaderLogo extends ErrorHandler {
    render() {
        return (
            <div className="navbar-branding" id="branding">
                <img className="preload-me retinized" alt="Hynds Pipe Systems Ltd" src="/Content/Images/Logo.png" />
            </div>
        );
    }
}

export default HeaderLogo