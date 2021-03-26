import NewsCard from './NewsCard'

import { Row } from 'react-bootstrap'

const NewsList = ({ news, loggedUser }) => {
    return (
        <Row>
            {news?.map(elm => <NewsCard key={elm._id} {...elm} loggedUser={loggedUser} />)}
        </Row>
    )
}

export default NewsList