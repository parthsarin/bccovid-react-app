import React from 'react';

import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/spinner';

function LoadingCard(props) {
    return (
    <Card body className="text-center mb-2">
        <Spinner animation="border" className="align-middle" /> 
        <span className="h2 align-middle ml-3">Loading...</span>
    </Card>
    );
}

export default LoadingCard;