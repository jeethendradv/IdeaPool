import React from 'react'
import BaseComponent from 'component/BaseComponent'
import { Redirect } from 'react-router'
import { NotificationManager } from 'notification';
import ErrorHelper from 'component/ErrorHelper'

class ActivateUser extends BaseComponent {
    constructor(props) {
        super();
        this.showMessage(this.activate(this.getParameterByName('code')));
    }

    showMessage(activated) {
        if (activated) {
            NotificationManager.success(ErrorHelper.GetErrorMessage(128));
        }
        else {
            NotificationManager.error(ErrorHelper.GetErrorMessage(129));
        }
    }

    activate(code) {
        var data = {
            code: code
        };
        var response = this.makeSyncCall("/Login/Activate", "POST", data);
        return this.isTrue(response);
    }

    render() {
        return <Redirect to="/" />
    }
}

export default ActivateUser