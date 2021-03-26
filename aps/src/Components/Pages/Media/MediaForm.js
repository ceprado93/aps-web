import { Component } from 'react'
import VideoService from '../../../Service/video.service'

import { Form, Button, Container } from 'react-bootstrap'

class CoasterForm extends Component {

    constructor() {
        super()
        this.state = {
            video: {
                title: '',
                description: '',
                videoURL: ''
            },
            isUploading: false
        }

        this.videoService = new VideoService()
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ video: { ...this.state.video, [name]: value } })
    }

    handleSubmit(e) {

        e.preventDefault()
        console.log(this.state.video.videoURL)

        this.videoService
            .saveVideos(this.state.video)
            .then(() => {
                this.props.closeModal()
                this.props.refreshList()
                this.props.handleAlert(true, 'Video subido', 'Se ha guardado el video en nuestra Base de Datos')
            })
            .catch(err => console.log(err))
    }

    // handleFileUpload = e => {

    //     this.setState({ isUploading: true })

    //     const uploadData = new FormData()
    //     uploadData.append('imageUrl', e.target.files[0])

    //     this.uploadService
    //         .uploadFile(uploadData)
    //         .then(response => {
    //             this.props.handleAlert(true, 'Imagen subida', 'Se ha guardado la imagen')
    //             this.setState({
    //                 isUploading: false,
    //                 coaster: { ...this.state.coaster, imageUrl: response.data.secure_url }
    //             })
    //         })
    //         .catch(err => console.log(err))
    // }


    render() {
        return (
            <Container>

                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" name="title" value={this.state.title} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control type="text" name="description" value={this.state.description} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Video (URL)</Form.Label>
                        <Form.Control type="text" name="videoURL" value={this.state.videoURL} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    {/* <Form.Group>
                        <Form.Label>Imagen (File) </Form.Label>
                        <Form.Control type="file" name="image" onChange={e => this.handleFileUpload(e)} />
                    </Form.Group> */}
                    <Button variant="dark" block type="submit" disabled={this.state.isUploading}>{this.state.isUploading ? 'Espere, subiendo...' : 'Crear video'}</Button>
                </Form>
            </Container>
        )
    }
}



export default CoasterForm