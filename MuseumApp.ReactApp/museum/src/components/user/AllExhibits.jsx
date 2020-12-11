import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../../appSettings';
import { Container, Card, CardColumns} from 'react-bootstrap';

class AllExhibits extends Component {
    constructor(props) {
      super(props);
      this.state = {
        exhibits: [],
      };
    }

    componentDidMount() {
       this.getExhibits();
    }

    getExhibits() {
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + localStorage.getItem('jwt')}
      };

      fetch(`${serviceConfig.baseURL}/api/Exhibits/get`, requestOptions)
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
              exhibits: data,
                 isLoading: false });
            }
        })
        .catch(response => {
            NotificationManager.error(response.message || response.statusText);
            this.setState({ submitted: false });
        });
    }

    getAllExhibits() {
      return this.state.exhibits.map(exhibit => {
          return <Card className = "center1" style={{ width: '20rem' }} className="text-center"  key={exhibit.exhibitId}>
                  
                                <hr>
                  </hr>
      
     
              <Card.Body>
          <Container>
              <Card.Text>          {exhibit.name}
</Card.Text>
<Card.Text>          {exhibit.exhibitId}
</Card.Text>
          </Container>
          </Card.Body>
         
            <hr>
                  </hr>
         
         
      </Card>
      })
  }
 
    render(){
      const exhibitDetails = this.getAllExhibits();
      const exhibits =<Container className= "container-cards"> {exhibitDetails} </Container>;
      return (
        
                  <CardColumns>
                  {exhibits}
                  </CardColumns>   
  
      );
  }
}

export default AllExhibits;