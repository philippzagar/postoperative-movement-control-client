import React from 'react';
import { Link } from 'react-router-dom';
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Button} from 'react-bootstrap';
import axios from 'axios';
import validator from 'validator';
import ProgressButton from 'react-progress-button';

class ResetPasswordEnterEmail extends React.Component {
    constructor(props) {
        super(props);

        this.getValidationStateEmail = this.getValidationStateEmail.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleNetworkRequest = this.handleNetworkRequest.bind(this);

        this.state = {
            email: '',
            status: '',
            buttonState: '',
            isValidInput: true
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

    handleNetworkRequest(e) {
        e.preventDefault();

        return new Promise((resolve, reject) => {
            if(validator.isEmail(this.state.email)) {
                this.setState(() => {
                    return {
                        isValidInput: true
                    };
                });

                this.setState(() => {
                    return {
                        buttonState: "loading"
                    };
                });

                let instance = axios.create({
                    baseURL: 'https://zagar.spdns.org/',
                    timeout: 5000
                });

                instance.post("users/resetpassword", {
                    email: this.state.email
                }).then((response) => {
                    if(response.data["status"] === "OK") {
                        console.log("Email sent");

                        // Render on the HTML Page
                        setTimeout(function() { this.setState(() => {
                            return {
                                status: "OK"
                            };
                        }); }.bind(this), 500);

                        resolve();
                    } else if (response.data["status"] === "ERROR") {
                        // Render error
                        this.setState(() => {
                            return {
                                status: "ERROR"
                            };
                        });

                        reject();
                    } else {
                        console.log("Response failed!");
                        this.setState(() => {
                            return {
                                status: "ERROR"
                            };
                        });

                        reject();
                    }
                }).catch((e) => {
                    console.log(e);

                    this.setState(() => {
                        return {
                            status: "ERROR"
                        };
                    });

                    reject();
                });
            } else {
                this.setState(() => {
                    return {
                        isValidInput: false
                    };
                });

                reject();
            }
        });
    }

    render() {
        switch (this.state.status) {
            case 'OK':
                return (
                    <div>
                        <Grid>
                            <Row>
                                <Col xs={12} sm={12} md={8} lg={6} xsOffset={0} smOffset={3} mdOffset={3} lgOffset={3}>
                                    <h2>Reset your password</h2>

                                    <h4>Mail was sent successfully to {this.state.email}!</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h4>
                                        <Link to="/">
                                            Go home
                                        </Link>
                                    </h4>
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
                                <Col xs={12} sm={12} md={8} lg={6} xsOffset={0} smOffset={3} mdOffset={3} lgOffset={3}>
                                    <h2>Reset your password</h2>

                                    <h4>An error occurred while requesting a password reset!</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h4>
                                        <Link to="/">
                                            Go home
                                        </Link>
                                    </h4>
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
                                <Col xs={12} sm={12} md={8} lg={6} xsOffset={0} smOffset={3} mdOffset={3} lgOffset={3}>
                                    <h4>
                                        <Link to="/">
                                            Go home
                                        </Link>

                                        <br/>
                                        <br/>
                                    </h4>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} sm={12} md={8} lg={6} xsOffset={0} smOffset={3} mdOffset={3} lgOffset={3}>
                                    <h2>Reset your password</h2>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} sm={12} md={8} lg={6} xsOffset={0} smOffset={3} mdOffset={3} lgOffset={3}>
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

                                        {!this.state.isValidInput && <h4 style={{color: "red"}}>Please check your input!</h4>}

                                        <ProgressButton type="submit" onClick={this.handleNetworkRequest} state={this.state.buttonState}>
                                            Submit
                                        </ProgressButton>
                                    </form>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                );
        }
    }
}

export default ResetPasswordEnterEmail