import React from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import ReactMarkdown from 'react-markdown';

import firebase from 'firebase/app';
import 'firebase/firestore';

import helpResources from './helpResources';

export default class Help extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            individualResources: null
        }
    }

    componentDidMount() {
        var db = firebase.firestore();
        this.getResources();

        db.collection("resources").onSnapshot(function (querySnapshot) {
            this.getResources();
        }.bind(this));
    }

    async getResources() {
        var db = firebase.firestore();

        var individualResources = [];

        await db.collection('resources').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const docData = {
                    id: doc.id,
                    ...doc.data()
                };

                individualResources.push(docData);
            });
        });

        this.setState({individualResources});
    }

    render() {
        const user = this.props.user;
        const signInButton = user ? null : (
            <Card>
              <Card.Body>
                <Card.Title>Login to Add and Use Resources</Card.Title>
                <Card.Text>
                  Sign in to add your own resources and connect with others.
                </Card.Text>
                <Button
                    onClick={this.props.signInGoogle}
                    style={{textTransform: 'none'}}
                    variant="outline-dark"
                >
                    <img 
                        width="20px"
                        id="google-logo"
                        alt="Google sign-in" 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" 
                    />
                    Login With Google
                </Button>
              </Card.Body>
            </Card>
        );

        return (
            <div>
                <Container className="help">
                    <h1>Get and Give Help</h1>
                    <h3 className="mt-3">Community-Wide Resources</h3>
                    <p className="lead">Resources open to the entire county, provided by institutions.</p>
                    <Row noGutters={true} className="community-resource-cards justify-content-between">
                    {
                        helpResources.map((resource) => <CommunityResourceCard key={resource.uuid} resource={resource} />)
                    }
                    </Row>
                    <h3 className="mt-3">Individual Resources</h3>
                    <p className="lead">Resources, small and large, provided by individuals.</p>
                    { signInButton }
                </Container>
                <Row className="individual-resource-cards">
                </Row>
            </div>
        );
    }
}

class CommunityResourceCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    render() {
        const resource = this.props.resource;

        var icon = null;
        if (resource.icon !== undefined && resource.icon) {
            icon = (
                <i className="material-icons">{resource.icon}</i>
            )
        }

        return (
            <>
                <Card as={Col} md={4} className="community-resource-card mb-1 h-100">
                    <Card.Body>
                        <Card.Title>{icon} { resource.name }</Card.Title>
                        <span>From <i className="provider">{ resource.provider }</i>.</span>
                        <div className="details">
                            <Button
                                onClick={() => this.setState({show: true})}
                                aria-controls={"resource-desc-" + resource.uuid}
                                aria-expanded={this.state.show}
                                variant="link"
                                className="p-0"
                            >
                                Show additional details.
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
                <Modal 
                    show={this.state.show} 
                    animation={true}
                    aria-labelledby={"resource-desc-" + resource.uuid}
                    onHide={() => this.setState({show: false})}
                    centered
                >
                    <Modal.Header closeButton>
                      <Modal.Title>{resource.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ReactMarkdown source={resource.desc} />
                        <i><ReactMarkdown source={resource.contact} /></i>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="danger" onClick={() => this.setState({show: false})}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
            </>
        )
    }
}