import { Card, ListGroup } from 'react-bootstrap';
import './News.css';


export const News = ({ news_data }) => {
  return (
    <Card className='data-container'>
      <Card.Header className="mb-2 text-muted">News</Card.Header>
      <Card.Body>
        <ListGroup variant='flush'>
        {
          news_data && news_data.map(d => 
            <ListGroup.Item key={d.uuid} className='news__item'>
              <div>
                <div>
                  <a href={d.link} target='_blank' rel='noreferrer'>{d.title}</a>
                </div>
                <small className='news__publisher'>-- {d.publisher}</small>
              </div>
            </ListGroup.Item>
          )
        } 
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default News;