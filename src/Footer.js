import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer(props) {
    return (
        <Jumbotron className="footer mb-0 mt-0" fluid>
            <Container>
                <Row>
                    <Col>
                        <p>Disclaimer: This project is not associated with the government of Brazos County.</p>
                        <p>Information on this page is rapidly changing and therefore may not be accurate. We need your help to make this site valuable! Please report inaccuracies to <a className="maroon-link" href="mailto:contact@bccovid.com">contact@bccovid.com</a>.</p>
                    </Col>
                    <Col>
                        <p className="lead text-right">Made with love and <span role="img" aria-label="unicorn">&#129412;</span>s by <a className="maroon-link" href="https://parthsarin.com">Parth Sarin</a>.</p>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
}

export default Footer;