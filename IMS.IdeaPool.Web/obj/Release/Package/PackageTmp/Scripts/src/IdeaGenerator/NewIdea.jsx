import React from 'react'
import IdeaFormBase from 'idea/IdeaFormBase'
import FormInput from 'component/FormInput'
import FieldOfWaterCheckBox from 'component/FieldOfWaterCheckBox'
import TextEditor from 'component/TextEditor'
import FileUpload from 'component/FileUpload'
import { Link } from 'react-router-dom'
import { NotificationManager } from 'notification';
import ErrorHelper from 'component/ErrorHelper'
import { Redirect } from 'react-router'

class NewIdea extends IdeaFormBase {
    constructor() {
        super();
        this.saveIdea = this.saveIdea.bind(this);
    }

    componentDidMount() {
        this.fetchFieldOfWaterData();
        this.$loading = $(this.el);
    }

    getData() {
        var data = new FormData();
        data.append("Title", this.state.ideaname.value);
        var fieldofwaterIndex = 0;
        _.forEach(this.state.fieldofwater.items, function (fieldOfWater) {
            if (fieldOfWater.ischecked && fieldOfWater.key != -1) {
                data.append("FieldOfWater[" + fieldofwaterIndex + "].Id", fieldOfWater.key);
                fieldofwaterIndex = fieldofwaterIndex + 1;
            }
        });
        var otherObject = _.find(this.state.fieldofwater.items, { key: -1, ischecked: true });
        if (otherObject) {
            data.append("FieldOfWater[" + fieldofwaterIndex + "].Id", otherObject.key);
            data.append("FieldOfWater[" + fieldofwaterIndex + "].Description", otherObject.name);
        }
        data.append("Description", this.state.ideacontent.value);
        data.append("DescriptionHtml", this.state.ideacontent.htmlValue);
        _.forEach(this.state.uploadfiles.files, function (file) {
            data.append(file.name, file.file);
        });
        return data;
    }

    saveIdea() {
        var data = this.getData();
        this.postFormWithFileData("/Idea/Save", data, this.onIdeaSaved.bind(this, false));
    }

    saveAsDraft() {
        var data = this.getData();
        data.append("IsDraft", true);
        this.postFormWithFileData("/Idea/Save", data, this.onIdeaSaved.bind(this, true));
    }

    onIdeaSaved(isdraft) {
        NotificationManager.success(ErrorHelper.GetErrorMessage(isdraft ? 137 : 130));
        this.state.redirectToHome = true;
        this.setState(this.state);
    }

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/Home/Index" />
        }

        return (
            <div className="row" ref={el => this.el = el}>
                <div className="col-lg-1"></div>
                <div className="col-lg-10 border page-background">
                    <h1>Submit Idea</h1>
                    <hr />
                    <FormInput
                        config={this.config.ideaname}
                        state={this.state.ideaname}
                        valuebind={this.valuebind.bind(this, this.config.ideaname.name)}
                    />
                    <FieldOfWaterCheckBox
                        state={this.state.fieldofwater}
                        config={this.config.fieldofwater}
                        fieldOfWaterChangeCallback={this.updateFieldOfWater}
                    />
                    <TextEditor
                        config={this.config.ideacontent}
                        state={this.state.ideacontent}
                        onChange={this.onIdeaDescriptionChange.bind(this)}
                    />
                    <FileUpload
                        config={this.config.uploadfiles}
                        state={this.state.uploadfiles}
                        onFileSelected={this.onFileChange.bind(this)}
                        onFileDeleted={this.onFileDelete.bind(this)}
                    />
                    <div className="form-group">
                        <div className="row">
                            <Link className="btn btn-info btn-hynds left" to="/Home/Index"><span className="glyphicon glyphicon-arrow-left"></span> Back</Link>
                            <button className="btn btn-primary btn-hynds right" style={{ marginLeft: 1 + '%' }} onClick={this.validate.bind(this, this.saveIdea.bind(this))}>Submit</button>&nbsp;&nbsp;&nbsp;
                            <button className="btn btn-primary btn-hynds right" onClick={this.validate.bind(this, this.saveAsDraft.bind(this))}>Save as Draft</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-1"></div>
            </div>
        );
    }
}

export default NewIdea