import axios from 'axios'

class VideoService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/video`,
            withCredentials: true
        })
    }

    getVideos = () => this.api.get(`/`)
    getLatest = () => this.api.get(`/latest`)
    saveVideos = videoDetails => this.api.post('/new', videoDetails)
    editVideos = (videoId, videoDetails) => this.api.put(`/edit/${videoId}`, videoDetails)
    deleteVideos = (videoId) => this.api.delete(`/delete/${videoId}`)
}

export default VideoService