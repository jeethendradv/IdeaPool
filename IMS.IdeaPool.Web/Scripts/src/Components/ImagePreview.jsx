import React from 'react'
import BaseComponent from 'component/BaseComponent'
import 'colorbox';
import $ from 'jquery'

class ImagePreview extends BaseComponent {
    constructor() {
        super();
    }

    init() {
        $('a.gallery').colorbox({
            photo: true,
            rel: 'group',
            width: '100%',
            height: '100%'
        });
    }

    componentDidMount() {
        this.init();
    }

    render() {
        return <div></div>;
    }
}

export default ImagePreview