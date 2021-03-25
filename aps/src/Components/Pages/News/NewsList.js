import NewsCard from './NewsCard'

import { Row } from 'react-bootstrap'

const NewsList = ({ news, loggedUser }) => {
    return (
        <Row>
            {news?.map(elm => <NewsCard key={elm._id} {...elm} user_id={loggedUser?._id || undefined} />)}
        </Row>
    )
}

export default NewsList