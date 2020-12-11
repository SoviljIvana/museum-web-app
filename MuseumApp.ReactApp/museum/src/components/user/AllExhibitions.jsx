import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../appSettings';
import { Container, Card, CardColumns, Button,ResponsiveEmbed} from 'react-bootstrap';

class AllExhibitions extends Component {
    constructor(props) {
      super(props);
      this.state = {
        exhibitions: [],
      };
    }

    componentDidMount() {
       this.getExhibitions();
    }

    getExhibitions() {
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + localStorage.getItem('jwt')}
      };

      fetch(`${serviceConfig.baseURL}/api/Exhibitions/get`, requestOptions)
        .then(response => {
          if (!response.ok) {
            return Promise.reject(response);
        }
        return response.json();
        })
        .then(data => {
          NotificationManager.success('Successfuly fetched data');
          if (data) {
            this.setState({ 
              exhibitions: data,
                 isLoading: false });
            }
        })
        .catch(response => {
            NotificationManager.error(response.message || response.statusText);
            this.setState({ submitted: false });
        });
    }

    getAllExhibitions() {
      return this.state.exhibitions.map(exhibition => {
          return <Card className = "center1" style={{ width: '20rem' }} className="text-center"  key={exhibition.id}>
                   <hr>
                  </hr>
                  <h1>Exhibitions</h1>
          <Container>
              <div className="inner">
              <ResponsiveEmbed aspectRatio="4by3">
            <Card.Img variant="top" src= {exhibition.picture} /> 
            </ResponsiveEmbed>
           </div>
          </Container>   
          <Container >
              <Button>
              <Card.Header  onClick={() => this.exhibitionDetails(exhibition.exhibitionId)}><h4 >{exhibition.exhibitionName}</h4></Card.Header>
              </Button>
          </Container>
              <Card.Body>
          <Container>
              <Card.Text> {exhibition.about}</Card.Text>
          </Container>
          </Card.Body>
          <Container>
          Otvaranje:  <Card.Footer className="text-muted">
          
          </Card.Footer>
            Zatvaranje: <Card.Footer className="text-muted">   </Card.Footer></Container>
            <hr>
                  </hr>
      </Card>
      })
  }
 
    render(){
      const exhibitionDetails = this.getAllExhibitions();
      const exhibitions =<Container className= "container-cards"> {exhibitionDetails} </Container>;
      return (
        
                  <CardColumns>
                  {exhibitions}
                  </CardColumns>   
  
      );
  }
}

export default AllExhibitions;