import React from 'react';
import Container from 'react-bootstrap/Container';

function DiseaseMap(props) {
    return (
    <>
        <Container> 
            <p className="lead">Made by Johns Hopkins University.</p>
        </Container>
        <iframe 
            style={{width: '100%'}}
            height="600" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight="0" 
            marginWidth="0" 
            title="2019-nCoV" 
            src="https://gisanddata.maps.arcgis.com/apps/Embed/index.html?webmap=14aa9e5660cf42b5b4b546dec6ceec7c&extent=-140,11.535,-50,60&zoom=true&previewImage=false&scale=true&disable_scroll=true&theme=light"
        ></iframe>
    </>
    );
}

export default DiseaseMap;