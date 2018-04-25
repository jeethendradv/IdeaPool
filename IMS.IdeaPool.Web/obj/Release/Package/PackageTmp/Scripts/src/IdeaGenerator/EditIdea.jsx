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
import _ from 'lodash'

class EditIdea extends IdeaFormBase {
    constructor(props) {
        super();
        this.ideaId = props.match.params.id;
    }

    getConfig() {
        var config = super.getConfig();
        config.reason = {
            name: 'reason',
            type: 'text',
            label: 'Reason for update',
            charactercount: {
                display: true,
                maxlength: 100
            },
            errordata: {
                field: 'Reason',
                length: 100
            },
            validation: [{
                isrequired: true,
                errorcode: 132
            }, {
                length: 100,
                errorcode: 120
            }],
            setRequired: function (isrequired) {
                for (var i = 0; i < this.validation.length; i++) {
                    if (this.validation[i].hasOwnProperty('isrequired')) {
                        this.validation[i].isrequired = isrequired;
                        break;
                    }
                }
            }
        };
        return config;
    }

    componentDidMount() {
        this.fetchFieldOfWaterData(this.onFetchfieldofwater.bind(this));
        this.$loading = $(this.el);
    }

    onFetchfieldofwater(data) {
        this.setFieldOfWater(data);
        this.makeCall("/Idea/FetchIdeaDetails", "POST", { Id: this.ideaId }, this.onIdeaDetailsFetchSuccess.bind(this));
    }

    onIdeaDetailsFetchSuccess(idea) {
        //set the state object.
        this.state.ideaId = idea.Id;
        this.state.ideaname.value = idea.Title;
        this.state.ideacontent.htmlContent = idea.DescriptionHtml;
        this.state.isdraft = idea.IsDraft;
        var files = _.map(idea.Files, function (file) {
            return {
                name: file.Name,
                id: file.Id,
                type: file.ContentType,
                result: 'data:' + file.ContentType + ';base64,' + file.ThumbnailBase64,
                size: file.Size,
                sizebytes: file.SizeInKb * 1024,
                isuploadedviadiscussions: file.IsUploadedViaDiscussions
            };
        });
        _.forEach(idea.FieldOfWater, function (fow) {
            var fieldOfWater = _.find(this.state.fieldofwater.items, function (item) {
                return fow.Id == item.key;
            });
            if (fieldOfWater) {
                fieldOfWater.ischecked = true;
                if (fieldOfWater.key == -1) {
                    fieldOfWater.name = fow.Description;
                }
            }
        }.bind(this));
        this.state.uploadfiles.files = files;
        this.setState(this.state);
    }

    getData() {
        var data = new FormData();
        data.append("Id", this.state.ideaId);
        data.append("Title", this.state.ideaname.value);
        var fieldofwaterIndex = 0;
        _.forEach(this.state.fieldofwater.items, function (fieldOfWater) {
            if (fieldOfWater.ischecked) {
                data.append("FieldOfWater[" + fieldofwaterIndex + "].Id", fieldOfWater.key);
                if (fieldOfWater.key == -1) {
                    data.append("FieldOfWater[" + fieldofwaterIndex + "].Description", fieldOfWater.name);
                }
                fieldofwaterIndex = fieldofwaterIndex + 1;
            }
        });
        data.append("Description", this.state.ideacontent.value);
        data.append("DescriptionHtml", this.state.ideacontent.htmlValue);
        data.append("Reason", this.state.reason.value);
        var filesIndex = 0;
        _.forEach(this.state.uploadfiles.files, function (file) {
            if (file.id == 0) {
                data.append(file.name, file.file);
            }
            else {
                data.append("Files[" + filesIndex + "].Id", file.id);
                data.append("Files[" + filesIndex + "].IsUploadedViaDiscussions", file.isuploadedviadiscussions);
                filesIndex += 1;
            }
        });
        return data;
    }

    update() {
        var data = this.getData();
        // if the idea was in draft state and is submitted now then idea is considered new
        data.append("IsNew", this.state.isdraft);
        this.postFormWithFileData("/Idea/Update", data, this.onIdeaUpdate.bind(this, false));
    }

    saveAsDraft() {
        var data = this.getData();
        data.append("IsDraft", true);
        this.postFormWithFileData("/Idea/Update", data, this.onIdeaUpdate.bind(this, true));
    }

    onIdeaUpdate(isSavedAsDraft) {
        var messagecode = 133; // idea updated message code
        if (isSavedAsDraft) { 
            messagecode = 137; // if the idea was saved as draft.
        }
        else if (this.state.isdraft) {
            messagecode = 130; // if idea was in draft mode and has been submitted now
        }
        NotificationManager.success(ErrorHelper.GetErrorMessage(messagecode));
        this.state.redirectToHome = true;
        this.setState(this.state);
    }

    validateAndUpdate() {
        this.config.reason.setRequired(!this.state.isdraft);
        this.validate(this.update.bind(this));
    }

    validateAndSaveAsDraft() {
        this.config.reason.setRequired(false);
        this.validate(this.saveAsDraft.bind(this));
    }

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/Home/Index" />
        }

        return (
            <div className="row" ref={el => this.el = el}>
                <div className="col-lg-1"></div>
                <div className="col-lg-10 border page-background">
                    <h1>Update Idea</h1>
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
                    {
                        !this.state.isdraft ?
                            <FormInput
                                config={this.config.reason}
                                state={this.state.reason}
                                valuebind={this.valuebind.bind(this, this.config.reason.name)}
                            />
                            : null
                    }
                    <FileUpload
                        config={this.config.uploadfiles}
                        state={this.state.uploadfiles}
                        onFileSelected={this.onFileChange.bind(this)}
                        onFileDeleted={this.onFileDelete.bind(this)}
                    />
                    <div className="form-group">
                        <div className="row">
                            <Link className="btn btn-info btn-hynds left" to="/Home/Index"><span className="glyphicon glyphicon-arrow-left"></span> Back</Link>
                            <button className="btn btn-primary btn-hynds right" style={{ marginLeft: 1 + '%' }} onClick={this.validateAndUpdate.bind(this)}>Submit</button>
                            {
                                this.state.isdraft ?
                                    <button className="btn btn-primary btn-hynds right" onClick={this.validateAndSaveAsDraft.bind(this)}>Save as Draft</button>
                                    : null
                            }
                        </div>
                    </div>
                </div>
                <div className="col-lg-1"></div>
            </div>
        );
    }
}

export default EditIdea