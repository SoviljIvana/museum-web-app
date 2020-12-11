import React, { Component } from 'react';
import { Route, Switch,  } from 'react-router-dom';
import { DropdownItem, DropdownButton } from 'react-bootstrap';
import AllExhibitions from './user/AllExhibitions';
import AllExhibits from './user/AllExhibits';
import AllAuditoriums from './user/AllAuditoriums';
import CurrentExhibitions from './user/CurrentExhibitions';
import '../App.css';

class Home extends Component {
  
    render(){
      
      return (
          <div>
          <div className = "header"></div>
          <div className = "content">
            <Switch>  
            <DropdownButton title="IZLOŽBE" className="btn-outline-light" variant="outline-light" size="lg" active>
            <DropdownItem href="/exhibitions"><button className="button1">Sve izložbe</button></DropdownItem>
            <DropdownItem href="/current-exhibitions"><button >Trenutne izlozbe</button></DropdownItem>
            <DropdownItem href="/exhibits"><button className="button1">Svi eksponati</button></DropdownItem>
               <DropdownItem href="/auditoriums"><button className="button1">Svi auditoriumi</button></DropdownItem>
      
            </DropdownButton>
            <Route path='/exhibitions' component = {AllExhibitions} />
            <Route path='/current-exhibitions' component = {CurrentExhibitions} />
            <Route path='/exhibits' component = {AllExhibits} />
            <Route path='/auditoriums' component = {AllAuditoriums} />
            </Switch>
              </div>
          <div className = "footer"></div>
          </div>
  
      );
  }
}

export default Home;