import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (

        <footer>
            <div className="social-footer">
                <div>
                    <a href="https://www.instagram.com/aps.racing/?hl=es"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png" /></a>
                    <a href="https://www.youtube.com/channel/UCJvVfEm3ZtKKmynxs2u-uzA"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1280px-YouTube_full-color_icon_%282017%29.svg.png" /></a>

                </div>
            </div>
            <p >aps@aps.com</p>
            <small >APS Racing || Todos los derechos reservados {new Date().getFullYear()}</small>
            <div className="bottom-nav">
                <Link className="bottom-nav-link" to="/news">News</Link>
                <Link className="bottom-nav-link" to="/media">Media</Link>
                <Link className="bottom-nav-link" to="/contact">Contact</Link>
            </div>
        </footer>

    )
}
export default Footer