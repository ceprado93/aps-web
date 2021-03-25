import { useState, useLayoutEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.css'
import NewsService from '../../../Service/news.service'
import VideoService from '../../../Service/video.service'



const IndexPage = ({ loggedUser }) => {

    const [news, setNews] = useState(undefined)
    const [media, setMedia] = useState(undefined)
    const [show, setShow] = useState({ news: true, media: false })
    const [showMedia, setShowMedia] = useState(false)

    const newsService = new NewsService()
    const videoService = new VideoService()


    useLayoutEffect(() => {
        window.scrollTo(0, 0)
        loadNews()
        loadVideos()
    }, [])

    function loadNews() {
        newsService
            .getLatest()
            .then(response => setNews(response.data))
            .catch(err => console.log(err))
    }

    function loadVideos() {
        videoService
            .getLatest()
            .then(response => setMedia(response.data))
            .catch(err => console.log(err))
    }

    function changeSection(value) {
        console.log(value)
    }

    return (
        <>
            <section className="first-section">

                <Container >
                    <Row>
                        <Col md={4} className="firstNews" style={{ paddingLeft: 0 }}>
                            <Link to="/continents" className="indexLink">{news && news[news.length - 1].title}</Link>
                            <p>{news && news[news.length - 1].description}</p>
                        </Col>
                        <Col md={8} >
                            <img src={news && news[news.length - 1].image} alt="newsImage" />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="second-section">
                <div className="latestNews">

                    <Row className="news-col">
                        <Col lg={2} className="second-section-first-col">
                            <div className="second-section-options" style={{ paddingLeft: 0 }}>
                                <button className="second-section-button" onClick={() => setShow({ news: true, media: false })}>News</button>
                                <button className="second-section-button" onClick={() => setShow({ news: false, media: true })}>Media</button>
                            </div>
                        </Col>
                        {show.news && news?.map(elm => <Col lg={2} key={elm._id} > <div className="card-news" ><Link to='/news' style={{ alignSelf: 'center' }}> <img src={elm.image} alt="news image" /> <h4>{elm.title}</h4> </Link></div> </Col>)}
                        {show.media && media?.map(elm => <Col lg={2} key={elm._id}> <div className="card-news" ><Link to='/media' style={{ alignSelf: 'center' }}> <img src={`https://i.ytimg.com/vi/${elm.videoURL}/sddefault.jpg`} alt="video image" /> <h4>{elm.title}</h4> </Link></div> </Col>)}

                    </Row>
                </div>

            </section>

            <section className="third-section">
                <Container>
                    <h2>Lo ultimo</h2>
                    <Row >
                        <Col md={{ span: 5, offset: 1 }} style={{ marginBottom: 30 }}>
                            <img src={news && news[news.length - 1].image} alt="news image" />
                        </Col>
                        <Col md={5} style={{ alignSelf: 'center' }}>
                            <div className="bottom-card-news">
                                <Link to='/news'>
                                    <p style={{ color: 'red' }}>News</p>
                                </Link>
                                <Link to='/news'>
                                    <h5>{news && news[news.length - 1].title}</h5>
                                    <p>{news && news[news.length - 1].description}</p>
                                </Link>
                            </div>
                        </Col>
                        <Col md={{ span: 5, offset: 1 }} style={{ marginBottom: 30 }}>
                            <img src={media && `https://i.ytimg.com/vi/${media[media.length - 1].videoURL}/sddefault.jpg`} alt="media image" />
                        </Col>
                        <Col md={5} style={{ alignSelf: 'center' }}>
                            <div className="bottom-card-news">
                                <Link to='/media'>
                                    <p style={{ color: 'red' }}>Media</p>
                                </Link>
                                <Link to='/news'>
                                    <h5>{media && media[media.length - 1].title}</h5>
                                    <p>{media && media[media.length - 1].description}</p>
                                </Link>
                            </div>
                        </Col>
                        <Col md={{ span: 5, offset: 1 }} style={{ marginBottom: 30 }}>
                            <img src={news && news[news.length - 2].image} alt="news image" />
                        </Col>
                        <Col md={5} style={{ alignSelf: 'center' }}>
                            <div className="bottom-card-news">
                                <Link to='/news'>
                                    <p style={{ color: 'red' }}>News</p>
                                </Link>
                                <Link to='/news'>
                                    <h5>{news && news[news.length - 2].title}</h5>
                                    <p>{news && news[news.length - 2].description}</p>
                                </Link>
                            </div>
                        </Col>
                        <Col md={{ span: 5, offset: 1 }} style={{ marginBottom: 30 }}>
                            <img src={media && `https://i.ytimg.com/vi/${media[media.length - 2].videoURL}/sddefault.jpg`} alt="media image" />
                        </Col>
                        <Col md={5} style={{ alignSelf: 'center' }}>
                            <div className="bottom-card-news">
                                <Link to='/media'>
                                    <p style={{ color: 'red' }}>Media</p>
                                </Link>
                                <Link to='/news'>
                                    <h5>{media && media[media.length - 2].title}</h5>
                                    <p>{media && media[media.length - 2].description}</p>
                                </Link>
                            </div>
                        </Col>
                        <Col md={{ span: 5, offset: 1 }} style={{ marginBottom: 30 }}>
                            <img src={news && news[news.length - 3].image} alt="news image" />
                        </Col>
                        <Col md={5} style={{ alignSelf: 'center' }}>
                            <div className="bottom-card-news">
                                <Link to='/news'>
                                    <p style={{ color: 'red' }}>News</p>
                                </Link>
                                <Link to='/news'>
                                    <h5>{news && news[news.length - 3].title}</h5>
                                    <p>{news && news[news.length - 3].description}</p>
                                </Link>
                            </div>
                        </Col>
                        <Col md={{ span: 5, offset: 1 }} style={{ marginBottom: 60 }}>
                            <img src={media && `https://i.ytimg.com/vi/${media[media.length - 3].videoURL}/sddefault.jpg`} alt="media image" />
                        </Col>
                        <Col md={5} style={{ alignSelf: 'center' }}>
                            <div className="bottom-card-news">
                                <Link to='/media'>
                                    <p style={{ color: 'red' }}>Media</p>
                                </Link>
                                <Link to='/news'>
                                    <h5>{media && media[media.length - 3].title}</h5>
                                    <p>{media && media[media.length - 3].description}</p>
                                </Link>
                            </div>
                        </Col>

                    </Row>

                </Container>
            </section>

        </>
    )
}

export default IndexPage

