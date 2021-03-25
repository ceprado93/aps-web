import axios from 'axios'

class NewsService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/news`,
            withCredentials: true
        })
    }

    getNews = () => this.api.get(`/`)
    getLatest = () => this.api.get(`/latest`)
    saveNews = newsDetails => this.api.post('/new', newsDetails)
    editNews = (newsId, newsDetails) => this.api.put(`/edit/${newsId}`, newsDetails)
    deleteNews = (newsId) => this.api.delete(`/delete/${newsId}`)
}

export default NewsService