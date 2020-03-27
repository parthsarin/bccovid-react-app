import React from 'react';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

import ReactMarkdown from 'react-markdown';

const sunshineItems = [
    `&#128524; [19 Ways To Stay Busy And Calm While Under Self-Quarantine](https://www.buzzfeed.com/bekoconnell/ways-to-keep-yourself-busy-and-calm-while-stuck-at-home) from BuzzFeed`,
    `&#127881; [Readers’ Ideas for Finding Community and Cheer at Home](https://www.nytimes.com/2020/03/24/travel/coronavirus-quarantine-what-to-do.html) from the New York Times`,
    `&#127939; [Exercise, Health and Self-Care for Coronavirus Isolation](https://www.nytimes.com/2020/03/20/style/self-care/isolation-exercise-meditation-coronavirus.html) from the New York Times`,
    `&#9997; [100 things to do while stuck inside due to a pandemic](https://www.usatoday.com/story/life/health-wellness/2020/03/16/coronavirus-quarantine-100-things-do-while-trapped-inside/5054632002/) from USAToday`,
    `&#128149; [20 Wholesome, Tender, And Downright Entertaining Things People Are Doing During Quarantine](https://www.buzzfeed.com/farrahpenn/pure-and-wholesome-quarantine-people-coronavirus) from BuzzFeed`,
    `&#128696; [125 Ideas to Keep Kids Entertained During the Coronavirus Crisis](https://parade.com/1009774/stephanieosmanski/things-to-do-with-kids-during-coronavirus-quarantine/) from Parade`
];

function Sunshine(props) {
    return (
        <Container>
            <h1 id="sunshine" className="mt-4">Rays of Sunshine</h1>
            <p className="lead">Brightness in this scary, often dark time.</p>
            <ListGroup variant="flush" className="sunshine-list mb-2">
                {
                    sunshineItems.map(
                        (item, i) => 
                        (<ListGroup.Item key={i}>
                            <ReactMarkdown source={item} />
                        </ListGroup.Item>))
                }
            </ListGroup>
        </Container>
    )
}

export default Sunshine;