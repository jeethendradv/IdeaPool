import React from 'react'
import BaseComponent from 'component/BaseComponent'
import LoginContainer from 'login/LoginContainer'
import { Switch, Route } from 'react-router-dom'

class Main extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <main>
                <Switch>
                    <Route path="/" component={LoginContainer} />
                </Switch>
            </main>
        );
    }
}

export default Main