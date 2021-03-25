import { Component } from 'react'
import NewsService from '../../../Service/news.service'

import { Form, Button, Container } from 'react-bootstrap'

class CoasterForm extends Component {

    constructor() {
        super()
        this.state = {
            news: {
                title: '',
                description: '',
                image: ''
            },
            isUploading: false
        }

        this.newsService = new NewsService()
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ news: { ...this.state.news, [name]: value } })
    }

    handleSubmit(e) {

        e.preventDefault()

        this.newsService
            .saveNews(this.state.news)
            .then(() => {
                this.props.closeModal()
                this.props.refreshList()
                this.props.handleAlert(true, 'Registro guardado', 'Se ha guardado la montaña rusa en nuestra Base de Datos')
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
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control type="text" name="image" value={this.state.imageUrl} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    {/* <Form.Group>
                        <Form.Label>Imagen (File) </Form.Label>
                        <Form.Control type="file" name="image" onChange={e => this.handleFileUpload(e)} />
                    </Form.Group> */}
                    <Button variant="dark" block type="submit" disabled={this.state.isUploading}>{this.state.isUploading ? 'Espere, subiendo...' : 'Crear montaña rusa'}</Button>
                </Form>
            </Container>
        )
    }
}



export default CoasterForm