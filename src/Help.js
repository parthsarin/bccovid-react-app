import React from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import ReactMarkdown from 'react-markdown';

import helpResources from './helpResources';

export default class Help extends React.Component {
    render() {
        return (
            <Container className="help">
                <h1>Get and Give Help</h1>
                <h3 className="mt-3">Community-Wide Resources</h3>
                <p className="lead">Resources open to the entire county, provided by institutions.</p>
                <Row noGutters={true} className="community-resource-cards">
                {
                    helpResources.map((resource) => <CommunityResourceCard key={resource.uuid} resource={resource} />)
                }
                </Row>
                <h3 className="mt-3">Individual Resources</h3>
                <p className="lead">Resources, small and large, provided by individuals.</p>
            </Container>
        );
    }
}

class CommunityResourceCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        }
    }

    render() {
        const resource = this.props.resource;

        var icon = null;
        if (resource.icon !== undefined && resource.icon) {
            icon = (
                <i className="small material-icons">{resource.icon}</i>
            )
        }

        return (
            <Card as={Col} md={4} className="community-resource-card mr-2 h-100">
                <Card.Body>
                    <Card.Title>{icon} { resource.name }</Card.Title>
                    <span>From <i className="provider">{ resource.provider }</i>.</span>
                    <div className="details">
                        <Collapse appear={true} in={this.state.expanded}>
                            <div id={"resource-desc-" + resource.uuid}>
                                <ReactMarkdown source={resource.desc} />
                                <i><ReactMarkdown source={resource.contact} /></i>
                            </div>
                        </Collapse>
                        <Button
                            onClick={() => this.setState({expanded: !this.state.expanded})}
                            aria-controls={"resource-desc-" + resource.uuid}
                            aria-expanded={this.state.expanded}
                            variant="link"
                            className="p-0"
                        >
                            {this.state.expanded ? 'Hide' : 'Show'} additional details.
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}