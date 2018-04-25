import React from 'react'
import BaseComponent from 'component/BaseComponent'
import { Link } from 'react-router-dom'

class Welcome extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-6">
                        <h2>Welcome {this.props.firstname}</h2>
                    </div>
                    <div className="col-lg-6">
                        <h2>
                            {
                                this.props.cansubmitidea ?
                                    <Link className="btn btn-primary btn-hynds right" to="/Idea/New"><span className="glyphicon glyphicon-plus"></span> Submit Idea</Link>                                    
                                    : ''
                            }
                        </h2>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}

export default Welcome