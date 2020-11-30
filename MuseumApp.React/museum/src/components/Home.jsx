import React, { Component,} from 'react';
import Search from './Search';
import { Switch, Route, withRouter } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { Canvas } from 'react-canvas-js'
import Popup from "reactjs-popup";
import { Fade } from 'react-slideshow-image';
import { Navbar, Form, Table, Nav, Button,  Container, Image, FormControl, ResponsiveEmbed, DropdownButton, DropdownItem,  Col, Row } from 'react-bootstrap';
import ShowAllExhibitionsForUser from './ExhibitionActions/ShowAllExhibitionsForUser';
import ExhibitionDetails from './ExhibitionActions/ExhibitionDetails';
import CurrentExhibitionsForUser from './ExhibitionActions/CurrentExhibitionsForUser'
import ComingSoonExhibitionsForUser from './ExhibitionActions/ComingSoonExhibitionsForUser'
import Animation from './Animation';
import Contact from './Contact';
import About from '../components/About';
import image1 from './Pictures/imagee.jpg';
import image2 from './Pictures/imagee1.jpg';
import image3 from './Pictures/imagee2.jpg';
import image4 from './Pictures/imagee3.jpg';
import image6 from './Pictures/imagee5.jpg';
import image7 from './Pictures/final1.png';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../AppSettings';
import logo from './Pictures/logo1.png'
const fadeImages = [image1, image2, image3, image4, image6, image7];


const fadeProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: false,
    indicators: true,
    onChange: (oldIndex, newIndex) => {
        console.log(`fade transition from ${oldIndex} to ${newIndex}`);
    }
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { rotation: 0 };
        this.tick = this.tick.bind(this);
        this.state = {
            open: false,
            open1: false,
            username: '',
            user: [],
            submitted: false,
         
        
        };
        this.state = { angle: 0 };
        this.updateAnimationState = this.updateAnimationState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal1 = this.openModal1.bind(this);
        this.closeModal1 = this.closeModal1.bind(this);
    }

    componentDidMount() {
        requestAnimationFrame(this.tick);
      }
    
      tick() {
        const rotation = this.state.rotation + 0.04;
        this.setState({ rotation });
        requestAnimationFrame(this.tick);
      }
    componentDidMount() {

        const token = localStorage.getItem('jwt');
        if (!token) {
            this.guestToken();
        } else {
            var jwtDecoder = require('jwt-decode');
            const decodedToken = jwtDecoder(token);
            var role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            if (role != 'admin') {
                this.guestToken();
            }
        }
    }

    handleLogOut(e) {
        e.preventDefault();
        this.props.history.push('/home')
        NotificationManager.warning("Odjavljeni ste!");
        this.guestToken();

    }
getUser(username){  
      const requestOptions = {
          method: 'GET',
          headers: {'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + localStorage.getItem('jwt')}
      };
      fetch(`${serviceConfig.baseURL}/api/users/byusername/${username}`, requestOptions)
          .then(response => {
            if (!response.ok) {
              return Promise.reject(response);
          }
          return response.json();
          })
          .then(data => {
            if (data) {
              this.setState({user:data, isLoading: false})
              if (this.state.user.isAdmin == true) {
                this.adminLogin();
              }else if(this.state.user.isSuperUser == true) {
                  this.superUserLogin();
              }else if((this.state.user.isAdmin == false) && (this.state.user.isSuperUser == false)) {
                this.userLogin();
              }
              }
          })
          .catch(response => {
              NotificationManager.error("Neuspešno prijavljivanje. ");
              this.setState({ submitted: false });
          });
  }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        this.getUser(this.state.username);
    }

    guestToken() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        };

        fetch(`${serviceConfig.baseURL}/get-token?name=gost&guest=true&admin=false&superUser=false`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then(data => {
                if (data.token) {
                    localStorage.setItem("jwt", data.token);
                }
            })
            .catch(response => {
                NotificationManager.error("Neuspešno prijavljivanje.");
                this.setState({ submitted: false });
            });
    }

    adminLogin() {
        const { username } = this.state;

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        };

        fetch(`${serviceConfig.baseURL}/get-token?name=${username}&admin=true`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then(data => {
                NotificationManager.success('Ulogovani ste kao admin!');
                if (data.token) {
                    localStorage.setItem("jwt", data.token);
                }
            })
            .catch(response => {
                NotificationManager.error("Neuspešno prijavljivanje. ");
                this.setState({ submitted: false });
            });
    }
    openModal() {
        this.setState({ open: true });
    }

    closeModal() {
        this.setState({ open: false });
    }
    openModal1() {
        this.setState({ open1: true });
    }

    closeModal1() {
        this.setState({ open1: false });
    }
    componentDidMount() {
        this.rAF = requestAnimationFrame(this.updateAnimationState);
      }
      
      componentWillUnmount() {
        cancelAnimationFrame(this.rAF);
      }
      
      updateAnimationState() {
        this.setState(prevState => ({ angle: prevState.angle + 1 }));
        this.rAF = requestAnimationFrame(this.updateAnimationState);
      }
    render() {
        const { username } = this.state;
        return (
            <Row className="no-gutters pr-0 pl-0" >
                <Table>
                    <Navbar sticky="top" className="slide-container" expand="lg" bg="light">
                    <Row>
                                    <Col xs={6} md={4}>
                                    <Animation angle={this.state.angle} />
                                    </Col>
                                </Row>
                        <Nav className="mr-auto">
                            <Container>
                                <Row>
                                    <Col xs={6} md={4}>
                                        <Image src={logo} roundedCircle />
                                    </Col>
                                </Row>
                               
                            </Container>
                        </Nav>
                       
                        <Nav className="mr-auto">
                            <Container>
                                <DropdownButton title="IZLOŽBE" className="btn-outline-light" variant="outline-light" size="lg" active>
                                    <DropdownItem href="/home/ShowAllExhibitionsForUser" ><button className="button1">Sve izložbe</button></DropdownItem>
                                    <DropdownItem href="/home/ComingSoonExhibitionsForUser" ><button className="button1">Uskoro </button></DropdownItem>
                                    <DropdownItem href="/home/CurrentExhibitionsForUser" ><button className="button1">Trenutno </button></DropdownItem>
                                </DropdownButton >
                            </Container>
                        </Nav>
                   
                        <Nav className="mr-auto">
                            <Container>
                                <Button  href="/home/about" className="btn-outline-light" size="lg" active> O MUZEJU </Button>
                            </Container>
                        </Nav>
                   
                            
                        <Nav className="mr-auto">
                            <Container>
                                <Button href="/home/contact" className="btn-outline-light" size="lg" > KONTAKT </Button>
                            </Container>
                        </Nav>
                       
                        <Navbar.Collapse className="justify-content-end">
                            {/* <Dropdown as={ButtonGroup}>
                                <Dropdown.Toggle split id="dropdown-custom-2"  >
                                    <Dropdown.Menu >
                                        <Dropdown.Item ><Button className="button1" onClick={this.openModal1}>Kreirajte nalog</Button></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Toggle>
                                <Button variant="outline-light" size="lg" active onClick={this.openModal} className="login" >
                                    <FaUser /> Login
                                      </Button>
                            </Dropdown >
                            <Popup className="popup" open={this.state.open} closeOnDocumentClick onClose={this.closeModal}>
                                <a className="close" onClick={this.closeModal}>&times;</a>
                                {/* <Form> */}

                                    {/* <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" />

                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Lozinka</Form.Label>
                                        <Form.Control type="password" />
                                    </Form.Group> */}

                                    {/* <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Check me out" />
                                    </Form.Group> */}

                                    {/* <Button variant="primary" type="submit">Potvrdi </Button>

                                </Form> */}
                         {/* //   </Popup> */}
                            {/* <Popup className="popup" open={this.state.open1} closeOnDocumentClick onClose={this.closeModal1}>
                                <a className="close" onClick={this.closeModal1}>&times;</a>

                                <Form>
                                    <h5>Kreiranje naloga</h5>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>Ime</Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>Prezime</Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Group >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" />
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Lozinka</Form.Label>
                                        <Form.Control type="password" />
                                    </Form.Group>

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridCity">
                                            <Form.Label>Grad</Form.Label>
                                            <Form.Control />
                                        </Form.Group>

                                        {/* <Form.Group as={Col} controlId="formGridState">
                                            <Form.Label>State</Form.Label>
                                            <Form.Control as="select" value="Choose...">
                                                <option>Choose...</option>
                                                <option>...</option>
                                            </Form.Control>
                                        </Form.Group> */}

                                        {/* <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>Zip</Form.Label>
                                            <Form.Control />
                                        </Form.Group> */}
                                    {/* </Form.Row> */}

                                    {/* <Form.Group id="formGridCheckbox">
                                        <Form.Check type="checkbox" label="Check me out" />
                                    </Form.Group> */}

                                    {/* <Button variant="primary" type="submit">
                                        Potvrdi
                                </Button> */}
                                {/* </Form> */}
                            {/* </Popup> */} 
                            <Form inline onSubmit={this.handleSubmit}>
                                <FormControl
                                    type="text"
                                    placeholder="korisničko ime"
                                    id="username"
                                    value={username}
                                    onChange={this.handleChange}
                                    className="mr-sm-2" />
                                <Button type="submit"   variant="outline-danger" className="mr-1">Prijava</Button>
                                <Button type="submit" onClick={this.handleLogOut} variant="outline-danger" className="mr-1">Odjava</Button>
                                <Row>
                                    <Col xs={6} md={4}>
                                    <Animation angle={this.state.angle} />
                                    </Col>
                                </Row>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                </Table>
                <p className="slide-container">
                    <Fade {...fadeProperties}>
                        <div className="each-fade">
                            <ResponsiveEmbed aspectRatio="21by9">
                                <img src={fadeImages[0]} />
                            </ResponsiveEmbed>
                            {/* <Carousel.Caption className="welcomeMesssage">
                                <Search />
                            </Carousel.Caption> */}
                        </div>
                        <div className="each-fade">
                            <ResponsiveEmbed aspectRatio="21by9">
                                <img src={fadeImages[1]} />
                            </ResponsiveEmbed>
                            {/* <Carousel.Caption className="welcomeMesssage">
                                <Search />
                            </Carousel.Caption> */}
                        </div>
                        <div className="each-fade">
                            <ResponsiveEmbed aspectRatio="21by9">

                                <img src={fadeImages[2]} />
                            </ResponsiveEmbed>
                            {/* <Carousel.Caption className="welcomeMesssage">
                                <Search />
                            </Carousel.Caption> */}
                        </div>
                        <div className="each-fade">
                            <ResponsiveEmbed aspectRatio="21by9">
                                <img src={fadeImages[3]} />
                            </ResponsiveEmbed>
                            {/* <Carousel.Caption className="welcomeMesssage">
                                <Search />
                            </Carousel.Caption> */}
                        </div>
                        <div className="each-fade">
                            <ResponsiveEmbed aspectRatio="21by9">

                                <img src={fadeImages[4]} />
                            </ResponsiveEmbed>
                            {/* <Carousel.Caption className="welcomeMesssage">
                                <Search />
                            </Carousel.Caption> */}
                        </div>
                        <div className="each-fade">
                            <ResponsiveEmbed aspectRatio="21by9">
                                <img src={fadeImages[5]} />
                            </ResponsiveEmbed>
                            {/* <Carousel.Caption className="welcomeMesssage">
                                <Search />
                            </Carousel.Caption> */}
                        </div>
                    </Fade>
                </p>
                <Col className="pt-2 app-content-main">
                    <Switch>
                        <Route path="/home/ShowAllExhibitionsForUser" component={ShowAllExhibitionsForUser} />
                        <Route path="/home/ComingSoonExhibitionsForUser" component={ComingSoonExhibitionsForUser} />
                        <Route path="/home/CurrentExhibitionsForUser" component={CurrentExhibitionsForUser} />
                        <Route path="/home/ExhibitionDetails/:id" component={ExhibitionDetails} />
                        <Route path="/home/About" component={About} />
                        <Route path="/home/Contact" component={Contact} />

                    </Switch>
                </Col>
            </Row>
        );
    }
}
export default Home;