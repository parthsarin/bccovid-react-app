import React from 'react';

import RichTextEditor from 'react-rte';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

export default class HelpForm extends React.Component {
    constructor(props) {
        super(props);

        const today = new Date().toISOString();

        this.state = {
            expanded: false,
            author_id: props.user.uid,
            category: null,
            contact: RichTextEditor.createEmptyValue(),
            date: today,
            desc: RichTextEditor.createEmptyValue(),
            icon: null,
            name: "",
            provider: ""
        }
    }

    render () {
        return (
            <>
                <Button
                    variant="outline-success"
                    onClick={() => this.setState({expanded: !this.state.expanded})}
                    aria-controls="new-resource-form"
                    aria-expanded={this.state.expanded}
                >
                    {
                        this.state.expanded ? 
                        'Hide Form'
                        : (<span><i className="material-icons">create</i> Add New Resource</span>)
                    }
                </Button>
                <Collapse in={this.state.expanded}>
                    <div id="new-resource-form">
                    Not implemented yet...
                    </div>
                </Collapse>
            </>
        );
    }
}