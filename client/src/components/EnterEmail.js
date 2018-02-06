import React from 'react';
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Button} from 'react-bootstrap'
import axios from 'axios'
import validator from 'validator'

class EnterEmail extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleNetworkRequest = this.handleNetworkRequest.bind(this);

        this.state = {
            email: '',
            status: ''
        };
    }

    getValidationStateEmail() {
        const valid = validator.isEmail(this.state.email);
        if (this.state.email.length === 0) return null;
        if (valid) return 'success';
        else if (!valid) return 'error';
        return null;
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleNetworkRequest() {
        let instance = axios.create({
            baseURL: 'https://zagar.spdns.org/',
            timeout: 5000
        });

        instance.post("users/resetpassword", {
            email: this.state.email
        }).then((response) => {
            if(response.body["status"] === "OK") {
                // Render on the HTML Page
                this.setState({
                   status: "OK"
                });
            } else if (response.body["status"] === "ERROR") {
                // Render error
                this.setState({
                    status: "ERROR"
                });
            } else {
                console.log("Response failed!");
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        switch (this.state) {
            case 'OK':
                return (
                    <div>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <h2>Reset your password</h2>

                                    <h4>Mail was sent successfully to {this.state.email}!</h4>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                );

            case 'ERROR':
                return (
                    <div>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <h2>Reset your password</h2>

                                    <h4>An error occurred while requesting a password reset!</h4>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                );

            default:
                return (
                    <div>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <h2>Reset your password</h2>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12}>
                                    <form>
                                        <FormGroup
                                            controlId="Email"
                                            validationState={this.getValidationStateEmail()}
                                        >
                                            <ControlLabel>Enter your eMail:</ControlLabel>
                                            <FormControl
                                                type="email"
                                                value={this.state.email}
                                                placeholder="Enter mail"
                                                onChange={this.handleChangeEmail}
                                            />
                                            <FormControl.Feedback/>
                                        </FormGroup>
                                        <Button type="submit" onClick={this.handleNetworkRequest}>Submit</Button>
                                    </form>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                );
        }
    }
}

export default EnterEmail