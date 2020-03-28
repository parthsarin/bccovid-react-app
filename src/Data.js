import React from 'react';
import Container from 'react-bootstrap/Container';

import DiseaseMap from './DiseaseMap';
import BCTimeGraph from './BCTimeGraph';

function Data(props) {
    return (
    <div className="data" id="data">
        <Container> 
            <h1 className="mt-4">COVID-19 Data</h1>
        </Container>
        <BCTimeGraph />
        <DiseaseMap />
    </div>
    );
}

export default Data;