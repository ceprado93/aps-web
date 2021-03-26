import { Card, Col, ButtonGroup, Button } from 'react-bootstrap'
import './Media.css'

import { Link } from 'react-router-dom'

const VideoCard = ({ title, videoURL, _id, Author, user_id }) => {

    console.log(videoURL)
    return (
        <Col md={4} className="video-card">
            <Card style={{ height: '100%' }}>
                <Card.Img variant="top" src={`https://i.ytimg.com/vi/${videoURL}/sddefault.jpg`} />
                <Card.Body>
                    <h5>{title}</h5>
                    <Link to={`/video/${videoURL}`} className="btn btn-dark btn-sm btn-block">Ver detalles</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default VideoCard