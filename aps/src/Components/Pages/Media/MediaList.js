import VideoCard from './VideoCard'

import { Row } from 'react-bootstrap'

const MediaList = ({ videos, loggedUser }) => {
    return (
        <Row>
            {videos?.map(elm => <VideoCard key={elm._id} {...elm} user_id={loggedUser?._id || undefined} />)}
        </Row>
    )
}

export default MediaList