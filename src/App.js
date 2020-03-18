import React from 'react';

import Navigation from './Navigation';
import Header from './Header';
import Container from 'react-bootstrap/Container';

import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Header />
      <Container>
        <h1>Coming soon...</h1>
      </Container>
    </div>
  );
}

export default App;
