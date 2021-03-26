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
    getAllLatest = () => this.api.get(`/allLatest`)
    getOne = newsId => this.api.get(`/details/${newsId}`)
    saveNews = newsDetails => this.api.post('/new', newsDetails)
    editNews = (newsId, newsDetails) => this.api.put(`/edit/${newsId}`, newsDetails)
    deleteNews = (newsId) => this.api.delete(`/delete/${newsId}`)
}

export default NewsService