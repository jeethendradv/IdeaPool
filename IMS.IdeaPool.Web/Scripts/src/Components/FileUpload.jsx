import React from 'react'
import BaseComponent from 'component/BaseComponent'
import ErrorMessage from 'component/ErrorMessage'
import ErrorHelper from 'component/ErrorHelper'

class FileUpload extends BaseComponent {
    constructor() {
        super();
        this.onFileSelected = this.onFileSelected.bind(this);
    }

    componentDidMount() {
        this.$el = $(this.el);
        this.$el.tooltip();
        this.$multiFileSelect = $(this.multiFileSelect);
    }

    onFileSelected(input) {
        if (input.target.files) {
            var fileCount = input.target.files.length;
            for (var i = 0; i < fileCount; i++) {
                var fileInfo = {};
                var file = input.target.files[i];

                if (!this.fileExists(file.name)) {
                    fileInfo.id = 0;
                    fileInfo.name = file.name;
                    fileInfo.sizebytes = file.size;
                    fileInfo.size = this.getFilesize(file.size);
                    fileInfo.type = file.type;
                    fileInfo.file = file;
                    fileInfo.isuploadedviadiscussions = false;

                    var reader = new FileReader();
                    reader.onload = function (fileInfo, event) {
                        fileInfo.result = event.target.result;
                        this.props.onFileSelected(fileInfo);
                        this.setState(this.state);
                    }.bind(this, fileInfo);
                    reader.readAsDataURL(file);
                }
            }
            this.$multiFileSelect.val('');
        }
    }

    fileExists(name) {
        return _.find(this.props.state.files, { name: name });
    }

    getFilesize(_size) {
        var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'), i = 0;
        while (_size > 900) {
            _size /= 1024; i++;
        }
        var exactSize = (Math.round(_size * 100) / 100) + ' ' + fSExt[i];
        return exactSize;
    }

    onBrowseClick() {
        this.$multiFileSelect.click();
    }

    onFileDelete(name) {
        this.props.onFileDeleted(name);
    }

    render() {
        return (
            <div ref={el => this.el = el}>
                <div className='form-group'>
                    <input type="file" accept={this.props.config.fileFilter} ref={el => this.multiFileSelect = el} multiple onChange={this.onFileSelected} className="hidden"></input>
                    <button type="button" className="btn btn-primary btn-IMS" onClick={this.onBrowseClick.bind(this)} data-toggle="tooltip" title="Attach files.">
                        <span className="glyphicon glyphicon-paperclip"></span> {this.props.config.label}
                    </button>
                </div>
                {
                    !this.props.state.isvalid
                        ? <ErrorMessage message={ErrorHelper.GetErrorMessageFromTemplate(this.props.state.errorcode)} />
                        : ''
                }
                <div className='form-group'>
                    <div className='row display-flex'>
                        {
                            this.props.state.files.map(
                                (file, index) => (
                                    <div className='col-sm-6 col-sm-3' key={index}>
                                        <div className='thumbnail'>
                                            {
                                                file.type.match('image/*') ?
                                                    <img className='img-thumbnail' src={file.result} />
                                                    : file.type.match('application/pdf') ?
                                                        <img className='img-thumbnail' src='/Content/Images/pdf.png' />
                                                        : <img className='img-thumbnail' src='/Content/Images/file.png' />
                                            }
                                        </div>
                                        <div className="caption">
                                            <h4>{file.name}</h4>
                                            <p>Size: {file.size}</p>
                                            {
                                                !file.isuploadedviadiscussions ?
                                                    <button type="button" className="btn btn-primary btn-sm btn-IMS" onClick={this.onFileDelete.bind(this, file.name)}>
                                                        <span className="glyphicon glyphicon-remove-sign"></span> Remove
                                                    </button>
                                                    : null
                                            }
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default FileUpload