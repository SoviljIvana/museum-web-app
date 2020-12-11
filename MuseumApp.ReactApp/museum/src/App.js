import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
// components
import Header from './components/Header';
import AllExhibitions from './components/user/AllExhibitions';

// higher order component

function App() {
  return (
    <React.Fragment>
      <Header/>
      <div className="set-overflow-y">
      <Switch>
        <Redirect exact from="/" to="exhibitions" />
        <Route path="/exhibitions" component={AllExhibitions} />
      </Switch>
      <NotificationContainer />
      </div>
    </React.Fragment>
  );
}

export default App;
