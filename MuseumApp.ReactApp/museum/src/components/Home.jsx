import React, { Component } from 'react';
import { Route, Switch,  } from 'react-router-dom';
import { DropdownItem, DropdownButton , Carousel} from 'react-bootstrap';
import AllExhibitions from './user/AllExhibitions';
import AllExhibits from './user/AllExhibits';
import AllAuditoriums from './user/AllAuditoriums';
import CurrentExhibitions from './user/CurrentExhibitions';
import '../App.css';
import image1 from './resources/p02hhfzm.jpg';
import image2 from './resources/shutterstock_438357028_lz7xlx.jpg'
class Home extends Component {
  
    render(){

      return (
       <div className="accordion-homepage">
   
         <div className= "accordion-homepage--row">
          <div className = "accordion-homepage--column">    
          <img src = {image2} width = "100%"/>
          </div>
          <div className = "accordion-homepage--column">   <img src = {image2} width = "100%"/></div>
        </div>

        <div className="heading">HEading 1</div>
        <div className="text-home">Join Museum Curator Jessica Ware to find out why Arctic dragonflies are threatened with habitat loss as the permafrost melts, why in some regions Arctic dragonflies are being replaced by other species, and more. Discover the latest research about the treeline dragonfly, Somatochlora sahlbergi, and a few other groups, that underpins ongoing work to learn how these dragonflies withstand freezing and to make forecasts about their fate in a warming climate.Join Museum Curator Jessica Ware to find out why Arctic dragonflies are threatened with habitat loss as the permafrost melts, why in some regions Arctic dragonflies are being replaced by other species, and more. Discover the latest research about the treeline dragonfly, Somatochlora sahlbergi, and a few other groups, that underpins ongoing work to learn how these dragonflies withstand freezing and to make forecasts about their fate in a warming climate.Join Museum Curator Jessica Ware to find out why Arctic dragonflies are threatened with habitat loss as the permafrost melts, why in some regions Arctic dragonflies are being replaced by other species, and more. Discover the latest research about the treeline dragonfly, Somatochlora sahlbergi, and a few other groups, that underpins ongoing work to learn how these dragonflies withstand freezing and to make forecasts about their fate in a warming climate.Join Museum Curator Jessica Ware to find out why Arctic dragonflies are threatened with habitat loss as the permafrost melts, why in some regions Arctic dragonflies are being replaced by other species, and more. Discover the latest research about the treeline dragonfly, Somatochlora sahlbergi, and a few other groups, that underpins ongoing work to learn how these dragonflies withstand freezing and to make forecasts about their fate in a warming climate.Join Museum Curator Jessica Ware to find out why Arctic dragonflies are threatened with habitat loss as the permafrost melts, why in some regions Arctic dragonflies are being replaced by other species, and more. Discover the latest research about the treeline dragonfly, Somatochlora sahlbergi, and a few other groups, that underpins ongoing work to learn how these dragonflies withstand freezing and to make forecasts about their fate in a warming climate.Join Museum Curator Jessica Ware to find out why Arctic dragonflies are threatened with habitat loss as the permafrost melts, why in some regions Arctic dragonflies are being replaced by other species, and more. Discover the latest research about the treeline dragonfly, Somatochlora sahlbergi, and a few other groups, that underpins ongoing work to learn how these dragonflies withstand freezing and to make forecasts about their fate in a warming climate.Join Museum Curator Jessica Ware to find out why Arctic dragonflies are threatened with habitat loss as the permafrost melts, why in some regions Arctic dragonflies are being replaced by other species, and more. Discover the latest research about the treeline dragonfly, Somatochlora sahlbergi, and a few other groups, that underpins ongoing work to learn how these dragonflies withstand freezing and to make forecasts about their fate in a warming climate.
        </div>
        <div className= "accordion-homepage--row">
          <div className = "accordion-homepage--column">    
          <img src = {image1} width = "100%"/>
          </div>
          <div className = "accordion-homepage--column">   <img src = {image1} width = "100%"/></div>
          </div>
          <div className="heading">HEading 2</div>
          <div className="text-home">Join Museum Curator Jessica Ware to find out why Arctic dragonflies are threatened with habitat loss as the permafrost melts, why in some regions Arctic dragonflies are being replaced by other species, and more. Discover the latest research about the treeline dragonfly, Somatochlora sahlbergi, and a few other groups, that underpins ongoing work to learn how these dragonflies withstand freezing and to make forecasts about their fate in a warming climate.
          Join Museum Curator Jessica Ware to find out why Arctic dragonflies are threatened with habitat loss as the permafrost melts, why in some regions Arctic dragonflies are being replaced by other species, and more. Discover the latest research about the treeline dragonfly, Somatochlora sahlbergi, and a few other groups, that underpins ongoing work to learn how these dragonflies withstand freezing and to make forecasts about their fate in a warming climate.
          Join Museum Curator Jessica Ware to find out why Arctic dragonflies are threatened with habitat loss as the permafrost melts, why in some regions Arctic dragonflies are being replaced by other species, and more. Discover the latest research about the treeline dragonfly, Somatochlora sahlbergi, and a few other groups, that underpins ongoing work to learn how these dragonflies withstand freezing and to make forecasts about their fate in a warming climate.
          Join Museum Curator Jessica Ware to find out why Arctic dragonflies are threatened with habitat loss as the permafrost melts, why in some regions Arctic dragonflies are being replaced by other species, and more. Discover the latest research about the treeline dragonfly, Somatochlora sahlbergi, and a few other groups, that underpins ongoing work to learn how these dragonflies withstand freezing and to make forecasts about their fate in a warming climate.
          </div>
         </div>
      
      );
  }
}

export default Home;