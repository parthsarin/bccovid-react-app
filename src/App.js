import React from 'react';

import Navigation from './Navigation';
import Header from './Header';
import Help from './Help';
import DiseaseMap from './DiseaseMap';
import Footer from './Footer';

import './App.css';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.setState({user});
      } else {
        this.setState({user: null});
      }
    }.bind(this));
  }

  signInGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    var db = firebase.firestore();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      db.collection('users').doc(result.user.uid).set({
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL
      })
    }).catch(function(error) {
      console.log(`${error.message} (Error ${error.code})`);
    });
  }

  signOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      MySwal.fire({
        title: "Something went wrong.",
        icon: 'error',
        text: `${error.message} (Error ${error.code})`
      });
    });

  }

  render() {
    var user = this.state.user;

    return (
      <div className="App">
        <Navigation 
          user={user}
          signInGoogle={this.signInGoogle}
          signOut={this.signOut}
        />
        <Header />
        <Help 
          user={user}
          signInGoogle={this.signInGoogle}
        />
        <DiseaseMap />
        <Footer />
      </div>
    );
  }
}