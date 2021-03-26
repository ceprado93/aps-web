import { Component } from 'react'
import { Container, Row, Col, Modal, ButtonGroup, Button, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NewsService from '../../../Service/news.service'
import NewsForm from './NewsForm'
import './News.css'


class NewsDetails extends Component {

    constructor() {
        super()
        this.state = {
            news: undefined,
            showForm: false,
            alert: {
                show: false,
                title: '',
                text: ''

            }
        }
        this.newsService = new NewsService()

    }

    componentDidMount() {
        this.loadNews()
        window.scrollTo(0, 0)
    }

    loadNews() {
        const news_id = this.props.match.params.id

        this.newsService
            .getOne(news_id)
            .then(response => this.setState({ news: response.data }))
            .catch(err => console.log(err))
    }

    togglemodalForm(value) {
        this.setState({ showForm: value })
    }


    scrollDown() {
        this.setState({ move: true }, () => window.scrollTo({ left: 0, top: 860, behavior: "smooth" }))
    }

    handleAlert = (show, title, text) => this.setState({ alert: { show, title, text } })


    render() {
        return (
            <>
                <Container as="section" style={{ marginTop: 100, marginBottom: 100 }}>

                    {this.state.news

                        ?
                        <>
                            <Row>
                                <Col md={{ span: 6 }}>
                                    <h1>{this.state.news?.title}</h1>
                                    <ButtonGroup size="mb" style={{ marginBottom: 20 }}>
                                        {this.props.loggedUser && <Button variant="dark" onClick={() => this.togglemodalForm(true)} > Edit</Button>}

                                        <Link to={`/news`} className="btn btn-outline-dark">Back to news</Link>
                                    </ButtonGroup>
                                    <hr />
                                    <p>{this.state.news?.description}</p>
                                    <hr />

                                </Col>

                                <Col md={6}>
                                    <h3>Photos</h3>
                                    <img style={{ width: '100%', marginBottom: 20 }} src={this.state.news?.image} alt='news image' />
                                    <small>{this.state.news?.title}</small>
                                </Col>

                            </Row>


                            <Modal show={this.state.showForm} onHide={() => this.togglemodalForm(false)} size='xl'>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit news</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <NewsForm closeModal={() => this.togglemodalForm(false)} news={this.state?.news} modalType="Edit" refreshList={() => this.loadNews()} handleAlert={this.props.handleAlert} />
                                </Modal.Body>
                            </Modal>
                        </>
                        :
                        <Spinner style={{ display: 'block', margin: '100 300' }} animation="border" variant="dark" />}
                </Container>

            </>
        )
    }
}

export default NewsDetails