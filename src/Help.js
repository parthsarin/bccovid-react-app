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

import moment from 'moment';

import helpCategories from './helpCategories.json';

export default class Help extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            resources: null,
            filter: ['anyone']
        }
    }

    componentDidMount() {
        var db = firebase.firestore();
        this.getResources();

        db.collection("resources").onSnapshot(function (querySnapshot) {
            this.getResources();
        }.bind(this));
    }

    sanitize(data) {
        data.desc = data.desc.replace(/\\n/g, "\n");
        return data
    }

    async getResources() {
        var db = firebase.firestore();

        var resources = [];

        await db.collection('resources').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const docData = {
                    id: doc.id,
                    ...this.sanitize(doc.data())
                };

                resources.push(docData);
            });
        });

        this.setState({resources});
    }

    addFilter(category) {
        this.setState({ filter: [...this.state.filter, category] })
    }

    removeFilter(category) {
        var arr = [...this.state.filter];
        var index = arr.indexOf(category);
        if (index !== -1) {
            arr.splice(index, 1);
            this.setState({ filter: arr });
        }
    }

    shouldShowResource(resource) {
        return (this.state.filter.includes('anyone') 
                || this.state.filter.includes(resource.category));
    }

    render() {
        const user = this.props.user;
        const signInButton = user ? null : (
            <Card>
              <Card.Body>
                <Card.Title>Login to Add Resources</Card.Title>
                <Card.Text>
                  Sign in to add your own resources.
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

        var filterButtons = [];
        for (const category in helpCategories) {
            filterButtons.push(
                <FilterButton
                    key={category}
                    category={helpCategories[category]}
                    filter={this.state.filter.includes(category)}
                    addFilter={() => this.addFilter(category)}
                    removeFilter={() => this.removeFilter(category)}
                />
            );
        }

        return (
            <div>
                <Container className="help">
                    <h1>Get and Give Help</h1>
                    <p className="lead">Resources for the entire community.</p>
                    <p className="text-muted">Filter resources based on target group:</p>
                    <Row noGutters={true} className="filter-resources mb-2">
                    { filterButtons }
                    </Row>
                    <Row noGutters={true} className="community-resource-cards justify-content-between">
                    {
                        this.state.resources ? 
                        this.state.resources.map(
                            (resource) => 
                            this.shouldShowResource(resource) ? 
                            <CommunityResourceCard 
                                key={resource.id} 
                                resource={resource} 
                            /> : null
                        ) : null
                    }
                    </Row>
                    { signInButton }
                </Container>
            </div>
        );
    }
}

function FilterButton(props) {
    var variant = 'outline-info';
    if (props.filter) {
        variant = 'info';
    }

    const targetFunc = props.filter ? props.removeFilter : props.addFilter;

    var icon = null;
    if (props.category.icon !== undefined && props.category.icon) {
        icon = (
            <i className="material-icons">{props.category.icon}</i>
        )
    }

    return (
        <Button 
            className="mr-2"
            variant={variant} 
            onClick={targetFunc}
        >
            { icon } { props.category.name }
        </Button>
    );
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

        const date = moment(resource.date.toDate());
        console.log(date);

        return (
            <>
                <Card as={Col} md={4} className="community-resource-card mb-2 h-100">
                    <Card.Body>
                        <Card.Title>{icon} { resource.name }</Card.Title>
                        <span>From <i className="provider">{ resource.provider }</i>.</span>
                        <div className="details">
                            <Button
                                onClick={() => this.setState({show: true})}
                                aria-controls={"resource-desc-" + resource.id}
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
                    aria-labelledby={"resource-desc-" + resource.id}
                    onHide={() => this.setState({show: false})}
                    centered
                >
                    <Modal.Header closeButton>
                      <Modal.Title>{resource.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><i>Posted on { date.format("MMM D, YYYY") } ({ date.fromNow() }).</i></p>
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