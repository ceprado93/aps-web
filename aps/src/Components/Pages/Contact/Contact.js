import { useState, useLayoutEffect } from 'react'
import './Contact.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import nodemailer from 'nodemailer'

const Contact = () => {

    const [name, setName] = useState({ name: '' })
    const [email, setEmail] = useState({ email: '' })
    const [text, setText] = useState({ text: '' })


    function handleNameChange(e) {
        e.preventDefault()
        const { name, value } = e.target
        setName({ [name]: value })
    }

    function handleEmailChange(e) {
        e.preventDefault()
        const { name, value } = e.target
        setEmail({ [name]: value })
    }

    function handleTextChange(e) {
        e.preventDefault()
        const { name, value } = e.target
        setText({ [name]: value })
    }

    async function send() {

        let testAccount = await nodemailer.createTestAccount();


        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'carlos', // generated ethereal user
                pass: 'carlos', // generated ethereal password
            }
        })

        let info = await transporter.sendMail({
            from: `${name} ${email}`, // sender address
            to: "ceprado93@gmail.com", // list of receivers
            subject: { name }, // Subject line
            text: { text }, // plain text body
            html: `<b>${text}</b>`, // html body
        });
    }

    return (

        <section className="contact" >
            <Container>
                <h1>Contact</h1>
                <p>Leave a message and we'll answer as soon as possible</p>
                <hr style={{ width: 150, color: 'black', marginBottom: 60 }}></hr>
                <Row>
                    <Col md={{ span: 3, offset: 1 }} className="social">
                        <h3>Social:</h3>
                        <a href="https://www.instagram.com/aps.racing/?hl=es">Instagram <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png" /></a>
                        <a href="https://www.youtube.com/channel/UCJvVfEm3ZtKKmynxs2u-uzA">Youtube <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1280px-YouTube_full-color_icon_%282017%29.svg.png" /></a>
                        <p>Email: aps@aps.com</p>
                    </Col>
                    <Col md={8}>
                        <Form onSubmit={(e) => send()}>
                            <Row>
                                <Col>
                                    <Form.Control name="Name" placeholder="Name" onChange={e => handleNameChange(e)} />
                                </Col>
                                <Col>
                                    <Form.Control name="email" placeholder="E-mail" onChange={e => handleEmailChange(e)} />
                                </Col>
                            </Row>
                            <Form.Control style={{ marginTop: 20 }} name="text" as="textarea" rows={6} onChange={e => handleTextChange(e)} />
                            <Button style={{ marginTop: 20, marginBottom: 40 }} variant="secondary" type="submit" block>
                                Submit
                                </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section >

    )
}
export default Contact