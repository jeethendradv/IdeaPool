import { BrowserRouter } from 'react-router-dom'
import Container from 'idea/Container'
import React from 'react'
import { render } from 'react-dom'

render((
    <BrowserRouter>
        <Container />
    </BrowserRouter>
), document.getElementById('root'));