import { Component } from 'react'
import { Container, Button, Modal, Spinner } from 'react-bootstrap'
import './Media.css'
import MediaList from './MediaList'
import MediaForm from './MediaForm'
import VideoService from '../../../Service/video.service'


class Media extends Component {

    constructor() {
        super()
        this.state = {
            videos: [],
            showForm: false
        }

        this.videoService = new VideoService()
    }


    componentDidMount() {
        window.scrollTo(0, 0)
        this.loadVideos()
    }

    loadVideos() {
        this.videoService
            .getVideos()
            .then(response => this.setState({ videos: response.data }))
            .catch(err => console.log(err))
    }


    togglemodalForm(value) {
        this.setState({ showForm: value })
    }


    render() {
        return (

            <>
                <Container as="section" className="mediasection">
                    <h1>Media</h1>
                    {this.props.loggedUser && <Button style={{ marginBottom: 40 }} onClick={() => this.togglemodalForm(true)} variant="dark" className="new-video-btn">New Video</Button>}
                    {this.state.videos.length ? <MediaList videos={this.state.videos} loggedUser={this.props.loggedUser} /> : <Spinner style={{ display: 'block', margin: '100 300' }} animation="border" variant="dark" />
                    }
                </Container>


                <Modal show={this.state.showForm} onHide={() => this.togglemodalForm(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nuevo video</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <MediaForm closeModal={() => this.togglemodalForm(false)} refreshList={() => this.loadVideos()} handleAlert={this.props.handleAlert} />
                    </Modal.Body>
                </Modal>

            </>

        )
    }
}

export default Media