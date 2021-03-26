import { Card, Col, ButtonGroup, Button } from 'react-bootstrap'
import './News.css'
import NewsService from '../../../Service/news.service'
import { Link } from 'react-router-dom'

const NewsCard = ({ title, image, _id, Author, loggedUser }) => {

    const newsService = new NewsService()

    function deleteNews(id) {

        newsService
            .deleteNews(id._id)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }


    return (
        <Col md={4} className="news-card">
            <Card style={{ height: '100%' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <h5>{title}</h5>
                    {
                        loggedUser
                            ?
                            <ButtonGroup size="sm" style={{ width: '100%' }}>
                                <Link to={`/news/${_id}`} className="btn btn-dark btn-sm btn-block">Ver detalles</Link>
                                <Button variant="outline-dark" onClick={() => deleteNews({ _id })}>Borrar</Button>
                            </ButtonGroup>
                            :
                            <Link to={`/news/${_id}`} className="btn btn-dark btn-sm btn-block">Ver detalles</Link>
                    }
                </Card.Body>
            </Card>
        </Col>
    )
}

export default NewsCard