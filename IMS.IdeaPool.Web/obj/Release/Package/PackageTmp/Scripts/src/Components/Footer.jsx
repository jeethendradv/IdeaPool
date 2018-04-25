import React from 'react'
import ErrorHandler from 'component/ErrorHandler'

class Footer extends ErrorHandler {
    render() {
        return (
            <div>
                <hr />
                <footer className="text-center">
                    <p>&copy; {(new Date()).getFullYear()} - Hynds Group</p>
                </footer>
            </div>
        );
    }
}

export default Footer