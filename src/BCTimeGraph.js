import React from 'react';

import Container from 'react-bootstrap/Container';

import LoadingCard from './LoadingCard';

import {LineChart} from 'react-d3-library';

export default class BCTimeGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            d3: ''
        }
    }

    componentDidMount() {
        const data = {};
        data.width = window.innerWidth;
        data.height = 750;

        data.margins = {top: 20, right: 10, bottom: 0, left: 10};
        data.orientXTicks = 'bottom';
        data.orientYTicks = 'left';
        data.XAxisClasses = 'lineChartX';
        data.YAxisClasses = 'lineChartY';
        data.lineClass = 'lineChart';

        data.dataset = [];

        const Papa = require('papaparse');
        Papa.parse('https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv', {
            worker: true,
            download: true,
            header: true,
            step: function(row) {
                if ((!row.errors || !row.errors.length)
                    && row.data.county === 'Brazos' 
                    && row.data.state === 'Texas') {
                    data.dataset.push({time: row.data.date, value: parseInt(row.data.cases)})
                }
            },

            complete: function() {
                console.log(data);
                this.setState({d3: data});
            }.bind(this)
        });

    }

    render() {
        return (
        <div id="bc-time-graph">
            <Container> 
                <p className="lead">Based on data from the New York Times.</p>
                {
                    this.state.d3 ? 
                    <LineChart data={this.state.d3} /> : <LoadingCard />
                }
            </Container>
        </div>
        );
    }
}