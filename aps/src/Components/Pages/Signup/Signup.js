import { Component } from 'react'
import AuthService from '../../../Service/auth.service'
import { Form, Button, Container, Row, Col, Jumbotron } from 'react-bootstrap'
import './Signup.css'
import Alert from '../../Shared/Alert/Alert'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            alert: {
                show: false,
                title: '',
                text: ''

            }
        }
        this.authService = new AuthService()
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit(e) {

        e.preventDefault()

        this.authService
            .signup(this.state)
            .then(response => {
                console.log(response.data)
                // this.props.storeUser(response.data)
                this.props.history.push('/')
            })
            .catch(err => this.setState({ alert: { show: true, title: 'Error', text: err.response.data.message } }))
    }
    handleAlert = (show, title, text) => this.setState({ alert: { show, title, text } })

    render() {
        return (
            <>
                <section className="signup">
                    <h1>Sign up</h1>
                </section>
                <section>
                    <Container>

                        <Row>

                            <Col>

                                <Jumbotron className="jumbo-signup">

                                    <Form className="form-signup" onSubmit={e => this.handleSubmit(e)}>
                                        <Form.Group>
                                            <Form.Label className="label-signup">Username</Form.Label>
                                            <Form.Control type="text" name="username" value={this.state.username} onChange={e => this.handleInputChange(e)} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className="label-signup">Password</Form.Label>
                                            <Form.Control type="password" name="password" value={this.state.password} onChange={e => this.handleInputChange(e)} />
                                        </Form.Group>

                                        <Button variant="outline-dark" block type="submit" className="sign-button">Sign up</Button>
                                    </Form>
                                </Jumbotron>

                            </Col>

                        </Row>

                    </Container>
                    <Alert handleAlert={this.handleAlert} show={this.state.alert.show} title={this.state.alert.title} text={this.state.alert.text} />

                </section>
            </>
        )
    }
}

export default Signup



