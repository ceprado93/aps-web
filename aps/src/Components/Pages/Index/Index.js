import { useState, useLayoutEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.css'
import NewsService from '../../../Service/news.service'
import VideoService from '../../../Service/video.service'



const IndexPage = ({ loggedUser }) => {

    const [news, setNews] = useState(undefined)
    const [media, setMedia] = useState(undefined)
    const [all, setAll] = useState(undefined)
    const [show, setShow] = useState({ news: true, media: false })
    const [showMedia, setShowMedia] = useState(false)

    const newsService = new NewsService()
    const videoService = new VideoService()


    useLayoutEffect(() => {
        window.scrollTo(0, 0)
        loadNews()
        loadVideos()
        loadALL()
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

    function loadALL() {
        newsService
            .getAllLatest()
            .then(response => setAll(response.data))
            .catch(err => console.log(err))
    }

    function changeSection(value) {
        console.log(value)
    }

    return (
        <>
            <section className="first-section">

                {news ? <Container >
                    <Row>
                        <Col md={3} lg={4} className="firstNews" style={{ paddingLeft: 0 }}>
                            <div>
                                <p style={{ color: 'red' }}>News</p>
                                <Link to={`/news/${news && news[0]._id}`} className="indexLink">{news && news[0].title}</Link>
                            </div>
                            <Link to={`/news/${news && news[0]._id}`} ><p>{news && news[0].description}</p></Link>
                        </Col>
                        <Col md={{ span: 7, offset: 2 }} lg={{ span: 8, offset: 0 }} >
                            <Link to={`/news/${news && news[0]._id}`} className="indexLink"><img src={news && news[0].image} alt="newsImage" /></Link>
                        </Col>
                    </Row>
                </Container> : <Container> <Spinner style={{ display: 'block', margin: '100px auto' }} animation="border" variant="dark" /></Container>}
            </section>

            <section className="second-section">
                <div className="latestNews">

                    <Row className="news-col">
                        <Col lg={1} className="second-section-first-col">
                            <div className="second-section-options" style={{ paddingLeft: 0 }}>
                                <button className="second-section-button" onClick={() => setShow({ news: true, media: false })}>News</button>
                                <button className="second-section-button" onClick={() => setShow({ news: false, media: true })}>Media</button>
                            </div>
                        </Col>
                        {show.news && news?.map(elm => <Col lg={2} key={elm._id} > <div className="card-news" ><Link to={`/news/${elm._id}`} style={{ alignSelf: 'center' }}> <img src={elm.image} alt="news image" /> <h4>{elm.title}</h4> </Link></div> </Col>)}
                        {show.media && media?.map(elm => <Col lg={2} key={elm._id}> <div className="card-news" ><Link to={`/video/${elm.videoURL}`} style={{ alignSelf: 'center' }}> <img src={`https://i.ytimg.com/vi/${elm.videoURL}/sddefault.jpg`} alt="video image" /> <h4>{elm.title}</h4> </Link></div> </Col>)}

                    </Row>
                </div>

            </section>

            <section className="third-section">
                <Container>
                    <h2>Lo último</h2>
                    {all?.map(elm =>
                        <Row key={elm._id}>
                            <Col md={{ span: 5, offset: 1 }} style={{ marginBottom: 30 }}>
                                <Link to={elm.image ? `/news/${elm._id}` : `/video/${elm.videoURL}`}>
                                    <img src={elm.image || `https://i.ytimg.com/vi/${elm.videoURL}/sddefault.jpg`} alt="news image" />
                                </Link>
                            </Col>
                            <Col md={5} style={{ alignSelf: 'center' }}>
                                <div className="bottom-card-news">
                                    <Link to={elm.image ? `/news/${elm._id}` : `/video/${elm.videoURL}`}>
                                        <p style={{ color: 'red' }}>{elm.image ? 'News' : 'Media'}</p>
                                    </Link>
                                    <Link to={elm.image ? `/news/${elm._id}` : `/video/${elm.videoURL}`}>
                                        <h5>{elm.title}</h5>
                                        <p>{elm.description}</p>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    )
                    }
                </Container>
            </section>

        </>
    )
}

export default IndexPage

