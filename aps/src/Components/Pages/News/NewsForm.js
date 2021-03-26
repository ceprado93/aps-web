import { Component } from 'react'
import NewsService from '../../../Service/news.service'

import { Form, Button, Container } from 'react-bootstrap'

class NewsForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            news: {
                title: this.props.news?.title || '',
                description: this.props.news?.description || '',
                image: this.props.news?.image || '',
                id: this.props.news?._id || ''
            },
            isUploading: false
        }

        this.newsService = new NewsService()
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ news: { ...this.state.news, [name]: value } })
    }

    // handleSubmit(e) {

    //     e.preventDefault()

    //     this.newsService
    //         .saveNews(this.state.news)
    //         .then(() => {
    //             this.props.closeModal()
    //             this.props.refreshList()
    //             this.props.handleAlert(true, 'Noticia guardada', 'Se ha guardado la noticia en nuestra Base de Datos')
    //         })
    //         .catch(err => console.log(err))
    // }


    handleEdit(e) {
        e.preventDefault()
        this.newsService
            .editNews(this.state.news.id, this.state.news)
            .then(() => {
                this.props.closeModal()
                this.props.refreshList()
                this.props.handleAlert(true, 'Edicion guardada', 'Se ha guardado la noticia en nuestra Base de Datos')
            })
            .catch(err => console.log(err))
    }

    handleNew(e) {

        e.preventDefault()
        this.newsService
            .saveNews(this.state.news)
            .then(() => {
                this.props.closeModal()
                this.props.refreshList()
                this.props.handleAlert(true, 'Noticia guardada', 'Se ha guardado la noticia en nuestra Base de Datos')
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

                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" name="title" value={this.state.news.title} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control type="text" name="description" value={this.state.news.description} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control type="text" name="image" value={this.state.news.image} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    {/* <Form.Group>
                        <Form.Label>Imagen (File) </Form.Label>
                        <Form.Control type="file" name="image" onChange={e => this.handleFileUpload(e)} />
                    </Form.Group> */}
                    {this.props.modalType === 'New'
                        ?
                        <Button variant="dark" block type="submit" onClick={e => this.handleNew(e)}>Nueva noticia</Button>
                        :
                        <Button variant="dark" block type="submit" onClick={e => this.handleEdit(e)}> Editar noticia</Button>}                </Form>
            </Container>
        )
    }
}



export default NewsForm