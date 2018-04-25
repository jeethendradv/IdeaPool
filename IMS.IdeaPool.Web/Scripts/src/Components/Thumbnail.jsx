import React from 'react'
import BaseComponent from 'component/BaseComponent'
import ImagePreview from 'component/ImagePreview'

class Thumbnail extends BaseComponent {
    constructor() {
        super();
    }

    componentDidMount() {
        this.$el = $(this.el);
    }

    componentDidUpdate() {        
        this.$el.tooltip();
    }

    render() {
        return (
            <div className="row hide-section-when-print">
                {
                    (this.props.files && this.props.files.length > 0) ?
                        <div className="col-lg-10">
                            <hr />
                            <div className='form-group'>
                                <div className='row display-flex' ref={el => this.el = el}>
                                    {
                                        this.props.files.map(
                                            (file, index) => (
                                                <div className='col-sm-6 col-sm-3' key={index}>
                                                    <div className='thumbnail'>
                                                        {
                                                            file.IsImage ?
                                                                <a className="gallery" href={`/Idea/DisplayImage?ideaId=${this.props.ideaId}&imageId=${file.Id}`}>
                                                                    <img className='img-thumbnail' src={`data:${file.ContentType};base64,${file.ThumbnailBase64}`} />
                                                                </a>
                                                                :
                                                                <img className='img-thumbnail' src={`data:${file.ContentType};base64,${file.ThumbnailBase64}`} />
                                                        }
                                                    </div>
                                                    <div className="caption">
                                                        <h6>{file.Name}</h6>
                                                        <a className="btn btn-info btn-circle btn-IMS" href={`/Idea/Download?ideaId=${this.props.ideaId}&fileId=${file.Id}`} data-toggle="tooltip" title="Download this file.">
                                                            <i className="glyphicon glyphicon-download"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                            <ImagePreview />
                        </div>
                        : null
                }
            </div>
        );
    }
}

export default Thumbnail