import YouTube from 'react-youtube';
import { Container, Row, Col } from 'react-bootstrap'


const Video = () => {


    function onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }


    const opts = {
        height: '390',
        width: '640',
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
                        <Col>
                            <h1>Videos</h1>
                            <YouTube videoId="fg0JxG90RIA" opts={opts} onReady={onReady} />
                        </Col>
                    </Row>
                </Container>

            </section>
        </>
    )

}

export default Video
