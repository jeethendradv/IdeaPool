import React from 'react'
import SystemSettings from 'component/SystemSettings'
import BaseComponent from 'component/BaseComponent'

class IdeaFormBase extends BaseComponent {
    constructor() {
        super();
        this.settings = SystemSettings.GetSettings();
        this.config = this.getConfig();
        this.state = this.getDefaultState();
        this.state.fieldofwater.items = [];
        this.state.uploadfiles.files = [];
        this.updateFieldOfWater = this.updateFieldOfWater.bind(this);
    }

    getConfig() {
        return {
            ideaname: {
                name: 'ideaname',
                type: 'text',
                label: 'Title',
                charactercount: {
                    display: true,
                    maxlength: this.settings.IDEA_TITLE_LENGTH || 25
                },
                errordata: {
                    field: 'Title',
                    length: this.settings.IDEA_TITLE_LENGTH || 25
                },
                validation: [{
                    isrequired: true,
                    errorcode: 119
                }, {
                    length: this.settings.IDEA_TITLE_LENGTH || 25,
                    errorcode: 120
                }, {
                    isvalid: this.checkIfTitleExists.bind(this),
                    errorcode: 138
                }]
            },
            fieldofwater: {
                name: 'fieldofwater',
                showotheroption: true,
                validation: [{
                    isvalid: this.isFieldOfWaterSelected.bind(this),
                    errorcode: 115
                }, {
                    isvalid: this.checkOtherFieldOfWaterisEntered.bind(this),
                    errorcode: 123
                }]
            },
            ideacontent: {
                name: 'ideacontent',
                label: 'Idea Description',
                disabletoolbar: false,
                placeholder: 'Description',
                height: 235,
                charactercount: {
                    display: true,
                    maxlength: this.settings.IDEA_CONTENT_LENGTH || 1000
                },
                errordata: {
                    field: 'Idea description',
                    length: this.settings.IDEA_CONTENT_LENGTH || 1000
                },
                validation: [{
                    isrequired: true,
                    errorcode: 121
                }, {
                    length: this.settings.IDEA_CONTENT_LENGTH || 1000,
                    errorcode: 120
                }, {
                    isvalid: this.checkIfDescriptionExists.bind(this),
                    errorcode: 139
                }]
            },
            uploadfiles: {
                name: 'uploadfiles',
                fileFilter: 'image/*,.pdf',
                validation: [{
                    isvalid: function () {
                        var maxfilesize = this.settings.IDEA_FILE_MAX_SIZE || 2;
                        var maxnumberoffiles = this.settings.IDEA_FILE_LIMIT || 5;
                        var file = _.find(this.state.uploadfiles.files, function (file) {
                            return (file.sizebytes / (1024 * 1024)).toFixed(2) > maxfilesize;
                        });

                        var files = _.filter(this.state.uploadfiles.files, ['isuploadedviadiscussions', false]);
                        return !file && files.length <= maxnumberoffiles;
                    }.bind(this),
                    errorcode: 122
                }]
            }
        };
    }

    checkIfTitleExists() {
        var exists = this.makeSyncCall('/Idea/TitleExists', 'POST', { id: _.isNil(this.state.ideaId) ? 0 : this.state.ideaId, ideaName: this.state.ideaname.value });
        return !this.isTrue(exists);
    }

    checkIfDescriptionExists() {
        var exists = this.makeSyncCall('/Idea/DescriptionExists', 'POST', { id: _.isNil(this.state.ideaId) ? 0 : this.state.ideaId, description: this.state.ideacontent.value });
        return !this.isTrue(exists);
    }

    checkOtherFieldOfWaterisEntered() {
        var isvalid = true;
        var other = _.find(this.state.fieldofwater.items, { key: -1, ischecked: true });
        if (other && _.isEmpty(other.name)) { // other option is checked and user has not entered the text
            isvalid = false;
        }
        return isvalid;
    }

    isFieldOfWaterSelected() {
        var index = _.findIndex(this.state.fieldofwater.items, ['ischecked', true]);
        return index != -1;
    }

    fetchFieldOfWaterData(callback) {
        var successcallback = callback || this.onFetchFieldofWaterCallback.bind(this);
        this.makeCall("/Idea/GetFieldOfWater", "POST", null, successcallback);
    }

    onFetchFieldofWaterCallback(data) {
        this.setFieldOfWater(data);
    }

    setFieldOfWater(data) {
        var fieldofwater = _.map(data, function (item) {
            return {
                key: item.Key,
                name: item.Key != -1 ? item.Value : '',
                ischecked: false
            };
        });
        this.state.fieldofwater.items = fieldofwater;
        this.setState(this.state);
    }

    updateFieldOfWater(fieldofwater) {
        for (var index in this.state.fieldofwater.items) {
            if (this.state.fieldofwater.items[index].key == fieldofwater.key) {
                this.state.fieldofwater.items[index].ischecked = fieldofwater.ischecked;
                if (fieldofwater.key == -1) {
                    this.state.fieldofwater.items[index].name = fieldofwater.ischecked ? fieldofwater.name : '';
                }
                break;
            }
        }
        this.setState(this.state);
    }

    onIdeaDescriptionChange(content, htmlContent) {
        this.state.ideacontent.value = content;
        this.state.ideacontent.htmlValue = htmlContent;
    }

    onFileChange(file) {
        this.state.uploadfiles.files.push(file);
        this.setState(this.state);
    }

    onFileDelete(name) {
        _.remove(this.state.uploadfiles.files, function (file) {
            return file.name === name;
        });
        this.setState(this.state);
    }
}

export default IdeaFormBase