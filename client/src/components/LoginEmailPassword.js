import React from 'react';
import { Link } from 'react-router-dom';
import { history } from './../routers/AppRouter';
import { connect } from 'react-redux';
import { login } from './../actions/auth';
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import axios from "axios";
import validator from "validator";
import ProgressButton from 'react-progress-button';

class LoginEmailPassword extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePW = this.handleChangePW.bind(this);
        this.getValidationStateEmail = this.getValidationStateEmail.bind(this);
        this.getValidationStatePW = this.getValidationStatePW.bind(this);
        this.handleLoginRequest = this.handleLoginRequest.bind(this);

        this.state = {
            email: '',
            pw: '',
            buttonState: '',
            isValidInput: true,
            dispatch: this.props.dispatch
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
        e.persist();

        this.setState(() => {
            return {
                email: e.target.value
            };
        });
    }

    getValidationStatePW() {
        const length = this.state.pw.length;
        if (length > 6) return 'success';
        else if (length > 4) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    handleChangePW(e) {
        e.persist();

        this.setState(() => {
            return {
                pw: e.target.value
            };
        });
    }

    handleLoginRequest(e) {
        e.preventDefault();

        return new Promise((resolve, reject) => {
            if((validator.isEmail(this.state.email)) && (this.state.pw.length > 6)) {

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

                instance.post("users/login", {
                    email: this.state.email,
                    password: this.state.pw
                }).then((response) => {
                    if(response.data["status"] === "OK") {
                        console.log("Login successful");
                        const token = response.headers["x-auth"];

                        instance = axios.create({
                            baseURL: 'https://zagar.spdns.org/',
                            timeout: 3000,
                            headers: {'x-auth': token}
                        });

                        instance.get("users/me").then((response) => {
                            const data = response.data;

                            setTimeout(function() {
                                this.state.dispatch(login({
                                    uid: data._id,
                                    email: data.email,
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    access: "patient",
                                    token: token,
                                    auth: "normal"
                                }));
                                history.push('/dashboard');
                            }.bind(this), 500);
                        }).catch((e) => {
                            console.log(e);

                            reject();
                        });

                        resolve();
                    } else if (response.data["status"] === "ERROR") {
                        console.log("Error while login");

                        reject();
                    } else {
                        console.log("Response failed!");

                        reject();
                    }
                }).catch((e) => {
                    console.log(e);

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
                            <h2>Login</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={8} lg={6} xsOffset={0} smOffset={3} mdOffset={3} lgOffset={3}>
                            <form>
                                <FormGroup
                                    controlId="eMail"
                                    validationState={this.getValidationStateEmail()}
                                >
                                    <ControlLabel>Enter your email:</ControlLabel>
                                    <FormControl
                                        type="email"
                                        value={this.state.email}
                                        placeholder="Enter email"
                                        onChange={this.handleChangeEmail}
                                    />
                                    <FormControl.Feedback/>
                                </FormGroup>

                                <FormGroup
                                    controlId="PW"
                                    validationState={this.getValidationStatePW()}
                                >
                                    <ControlLabel>Enter your password:</ControlLabel>
                                    <FormControl
                                        type="password"
                                        value={this.state.pw}
                                        placeholder="Enter password"
                                        onChange={this.handleChangePW}
                                    />
                                    <FormControl.Feedback/>
                                </FormGroup>

                                {!this.state.isValidInput && <h4 style={{color: "red"}}>Please check your inputs!</h4>}

                                <ProgressButton type="submit" onClick={this.handleLoginRequest} state={this.state.buttonState}>
                                    Submit
                                </ProgressButton>
                            </form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default connect()(LoginEmailPassword);