import React from 'react'
import $ from 'jquery'
import ErrorMessage from 'component/ErrorMessage'
import BaseComponent from 'component/BaseComponent'
import ErrorHelper from 'component/ErrorHelper'
import 'bootstrap'
import 'summernote'

class TextEditor extends BaseComponent {
    constructor() {
        super();
        this.state = {
            content: '',
            isInit: true
        }
    }

    componentDidMount() {
        this.$el = $(this.el);
        this.$el.summernote({
            height: this.props.config.height,
            placeholder: this.props.config.placeholder,
            fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
            toolbar: [
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']]
            ],
            callbacks: {
                onChange: this.oncontentchange.bind(this)
            }
        });
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.state.htmlContent && this.state.isInit) {
            this.setText(nextprops.state.htmlContent);
        }
    }

    oncontentchange(contents, $editable) {
        this.state.content = $(".note-editable").text()
        this.state.htmlContent = contents;
        if (this.displayCharacterCount()) {
            this.setState(this.state);
        }
        this.props.onChange(this.state.content, this.state.htmlContent);
    }

    displayCharacterCount() {
        return this.props.config.charactercount && this.props.config.charactercount.display;
    }

    componentWillUnmount() {
        this.$el.summernote('destroy');
    }

    setText(text) {
        this.$el.summernote('code', text);
        this.state.isInit = false;
    }

    render() {
        return (
            <div className={this.props.state.isvalid ? 'form-group' : 'form-group has-error'}>
                <label className="texteditor-label">{this.props.config.label}</label>
                {                    
                    this.displayCharacterCount() ?
                        <label
                            className="texteditor-label right">
                            {this.state.content.length} of {this.props.config.charactercount.maxlength}
                        </label>
                        : ''
                }                
                <div className="form-control" ref={el => this.el = el} />
                {this.props.state.isvalid ? '' : <ErrorMessage message={ErrorHelper.GetErrorMessageFromTemplate(this.props.state.errorcode, this.props.config.errordata)} />}
            </div>
        );
    }
}

export default TextEditor