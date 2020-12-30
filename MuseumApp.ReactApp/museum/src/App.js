import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
// components
import Header from './components/Header';
import Footer from './components/Footer';
import AllExhibitions from './components/user/AllExhibitions';
import CurrentExhibitions from './components/user/CurrentExhibitions';
import AllExhibits from './components/user/AllExhibits';
import AllAuditoriums from './components/user/AllAuditoriums';
import Home from './components/Home'

// higher order component

function App() {
  return (
    <React.Fragment>
      <Header/>
    
      <div className="set-overflow-y">
      <Switch>
        <Redirect exact from="/" to="home" />
        <Route path='/home' component = {Home} />
        <Redirect exact from="/" to="exhibitions" />
        <Route path="/exhibitions" component={AllExhibitions} />
        <Route path="/current-exhibitions" component={CurrentExhibitions} />
        <Redirect exact from="/" to="exhibits" />
        <Route path="/exhibits" component={AllExhibits} />
        <Route path="/auditoriums" component={AllAuditoriums} />
      </Switch>
      <NotificationContainer />
      </div>
      <Footer/>
    </React.Fragment>
  );
}

export default App;
