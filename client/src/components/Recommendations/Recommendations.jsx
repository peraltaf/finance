import { Card, ListGroup } from 'react-bootstrap';
import './Recommendations.css';


export const Recommendations = ({ insights_data }) => {
  return (
    <Card className='data-container'>
      <Card.Header className='mb-2 text-muted'>SEC Reports</Card.Header>
      <Card.Body>
        <ListGroup variant='flush'>
        {
          insights_data && insights_data.map(d => 
            <ListGroup.Item key={d.id} className='insights__item'>
              <div>
                <div>
                  <a href={d.snapshotUrl} target='_blank' rel='noreferrer'>{d.title}</a>
                </div>
              </div>
            </ListGroup.Item>
          )
        } 
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default Recommendations;