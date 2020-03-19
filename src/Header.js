import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

export default class Header extends React.Component {
    render() {
        return (
            <Jumbotron className="header first-page-component" fluid>
                <Container>
                    <h1>The Brazos County COVID-19 Project</h1>
                    <p className="lead">When the going gets tough, our community steps up.</p>
                </Container>
            </Jumbotron>
        );
    }
}