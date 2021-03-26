import YouTube from 'react-youtube';
import { useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import './Media.css'




const Video = props => {

    const [size, setSize] = useState(0)

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
        { window.innerWidth > 1000 && setSize(400) }
        { window.innerWidth < 1000 && setSize(400) }

    }, [])


    function onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    const VideoWrapper = styled.div`
    width:100%;
    height:${size};
    `


    const opts = {
        height: '500px',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    }

    return (
        <>
            <section className="videoSection">
                <Container>
                    <Row>
                        <Col md={{ span: 10, offset: 1 }}>
                            <h1>Videos</h1>
                            <Link to={`/media`} className="btn btn-outline-dark" style={{ marginBottom: 20 }}>Back to media</Link>
                            <VideoWrapper>
                                <YouTube videoId={props.match.params.videoURL} opts={opts} onReady={onReady} />
                            </VideoWrapper>
                        </Col>
                    </Row>
                </Container>

            </section>
        </>
    )

}

export default Video
