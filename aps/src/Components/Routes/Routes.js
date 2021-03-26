import { Switch, Route } from 'react-router-dom'
import Login from '../Pages/Login/Login'
import IndexPage from '../Pages/Index/Index'
import Signup from '../Pages/Signup/Signup'
import News from '../Pages/News/News'
import Video from '../Pages/Media/Video'
import Media from '../Pages/Media/Media'
import NewsDetails from '../Pages/News/NewsDetails'
import Contact from '../Pages/Contact/Contact'






const Routes = ({ storeUser, loggedUser, isAdmin, handleAlert }) => {

    return (
        <>
            <Switch>
                <Route path="/" exact render={props => <IndexPage loggedUser={loggedUser} storeUser={storeUser}  {...props} />} />
                <Route path="/login" exact render={props => <Login storeUser={storeUser}  {...props} />} />
                <Route path="/signup" exact render={() => <Signup />} />
                <Route path="/news" exact render={props => <News {...props} loggedUser={loggedUser} handleAlert={handleAlert} />} />
                <Route path="/news/:id" exact render={props => <NewsDetails {...props} loggedUser={loggedUser} handleAlert={handleAlert} />} />
                <Route path="/video/:videoURL" exact render={props => <Video {...props} handleAlert={handleAlert} />} />
                <Route path="/media" exact render={() => <Media loggedUser={loggedUser} handleAlert={handleAlert} />} />
                <Route path="/contact" exact render={() => <Contact />} />

            </Switch>
        </>
    )
}

export default Routes