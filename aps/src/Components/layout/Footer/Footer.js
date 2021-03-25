import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (

        <footer>
            <small>APS Racing || Todos los derechos reservados {new Date().getFullYear()}</small>
            <Link className="footer-link" to='/login'>Log in</Link>
        </footer>

    )
}
export default Footer