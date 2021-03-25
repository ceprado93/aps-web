import { Component } from 'react'
import { Container, Button, Modal, Spinner } from 'react-bootstrap'
import './News.css'
import NewsList from './NewsList'
import NewsForm from './NewsForm'

import NewsService from '../../../Service/news.service'

class News extends Component {

    constructor() {
        super()
        this.state = {
            news: [],
            showForm: false
        }

        this.newsService = new NewsService()
    }


    componentDidMount() {
        this.loadNews()
    }

    loadNews() {
        this.newsService
            .getNews()
            .then(response => this.setState({ news: response.data }))
            .catch(err => console.log(err))
    }


    togglemodalForm(value) {
        this.setState({ showForm: value })
    }


    render() {
        return (

            <>
                <Container as="section" className="newsSection">
                    <h1>News</h1>
                    {this.props.loggedUser && <Button onClick={() => this.togglemodalForm(true)} variant="dark" className="new-coaster-btn">New Post</Button>}
                    {this.state.news.length ? <NewsList news={this.state.news} loggedUser={this.props.loggedUser} /> : <Spinner style={{ display: 'block', margin: '100 300' }} animation="border" variant="dark" />
                    }
                </Container>


                <Modal show={this.state.showForm} onHide={() => this.togglemodalForm(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nueva montaña rusa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewsForm closeModal={() => this.togglemodalForm(false)} refreshList={() => this.loadNews()} handleAlert={this.props.handleAlert} />
                    </Modal.Body>
                </Modal>

            </>

        )
    }
}

export default News