import { Card, Col, ButtonGroup, Button } from 'react-bootstrap'
import './News.css'

import { Link } from 'react-router-dom'

const NewsCard = ({ title, image, _id, Author, user_id }) => {


    return (
        <Col md={4} className="news-card">
            <Card style={{ height: '100%' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <h5>{title}</h5>
                    <Link to={`/news/${_id}`} className="btn btn-dark btn-sm btn-block">Ver detalles</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default NewsCard