import React from 'react';
import { Link } from 'react-router-dom';
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import axios from 'axios';
import ProgressButton from 'react-progress-button';

class ResetPasswordEnterPassword extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangePW1 = this.handleChangePW1.bind(this);
        this.handleChangePW2 = this.handleChangePW2.bind(this);
        this.getValidationStatePW1 = this.getValidationStatePW1.bind(this);
        this.getValidationStatePW2 = this.getValidationStatePW2.bind(this);
        this.checkKeyValidate = this.checkKeyValidate.bind(this);
        this.handlePasswordChangeRequest = this.handlePasswordChangeRequest.bind(this);


        this.state = {
            pw1: '',
            pw2: '',
            keyValid: "PENDING",
            key: props.match.params.key,
            pwChanged: "PENDING",
            buttonState: '',
            isValidInput: true
        };

        this.checkKeyValidate();
    }

    getValidationStatePW1() {
        const length = this.state.pw1.length;
        if (length > 6) return 'success';
        else if (length > 4) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    getValidationStatePW2() {
        const length = this.state.pw2.length;
        if (length > 6 && this.state.pw1 === this.state.pw2) return 'success';
        else if (length > 4 && this.state.pw1 === this.state.pw2) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    handleChangePW1(e) {
        e.persist();

        this.setState(() => {
            return {
                pw1: e.target.value
            };
        });
    }

    handleChangePW2(e) {
        e.persist();

        this.setState(() => {
            return {
                pw2: e.target.value
            };
        });
    }

    checkKeyValidate() {
        let instance = axios.create({
            baseURL: 'https://zagar.spdns.org/',
            timeout: 5000
        });

        instance.get(`users/resetpasswordreq/${this.state.key}`).then((response) => {
            console.log(response);

            if(response.data["status"] === "OK") {
                console.log("Key valid");

                // Render on the HTML Page
                this.setState(() => {
                    return {
                        keyValid: "OK"
                    };
                });

                console.log(this.state);
            } else if (response.data["status"] === "ERROR") {
                // Render error
                console.log("Key not valid");

                this.setState(() => {
                    return {
                        keyValid: "ERROR"
                    };
                });
            } else {
                console.log("Response failed!");
            }
        }).catch((e) => {
            this.setState(() => {
                return {
                    keyValid: "ERROR"
                };
            });
            console.log(e);
        });
    }

    handlePasswordChangeRequest(e) {
        e.preventDefault();

        return new Promise((resolve, reject) => {
            if((this.state.pw1.length > 6) && (this.state.pw2.length > 6) && (this.state.pw1 === this.state.pw2)) {

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

                instance.post("users/changepassword", {
                    key: this.state.key,
                    newPassword: this.state.pw1
                }).then((response) => {
                    if(response.data["status"] === "OK") {
                        console.log("Password changed");

                        setTimeout(function() { this.setState(() => {
                            return {
                                pwChanged: "OK"
                            };
                        }); }.bind(this), 500);

                        resolve();

                    } else if (response.data["status"] === "ERROR") {
                        console.log("Error while changing password");

                        this.setState(() => {
                            return {
                                pwChanged: "ERROR"
                            };
                        });

                        reject();
                    } else {
                        console.log("Response failed!");
                        this.setState(() => {
                            return {
                                pwChanged: "ERROR"
                            };
                        });

                        reject();
                    }
                }).catch((e) => {
                    console.log(e);

                    this.setState(() => {
                        return {
                            pwChanged: "ERROR"
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
        switch (this.state.pwChanged) {
            case "PENDING":
                switch (this.state.keyValid) {
                    case "OK":
                        return (
                            <div>
                                <Grid>
                                    <Row>
                                        <Col xs={12} sm={12} md={8} lg={6} xsOffset={0} smOffset={3} mdOffset={3} lgOffset={3}>
                                            <h2>Reset your password</h2>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} sm={12} md={8} lg={6} xsOffset={0} smOffset={3} mdOffset={3} lgOffset={3}>
                                            <form>
                                                <FormGroup
                                                    controlId="PW1"
                                                    validationState={this.getValidationStatePW1()}
                                                >
                                                    <ControlLabel>Enter your new password:</ControlLabel>
                                                    <FormControl
                                                        type="password"
                                                        value={this.state.pw1}
                                                        placeholder="Enter new password"
                                                        onChange={this.handleChangePW1}
                                                    />
                                                    <FormControl.Feedback/>
                                                </FormGroup>

                                                <FormGroup
                                                    controlId="PW2"
                                                    validationState={this.getValidationStatePW2()}
                                                >
                                                    <ControlLabel>Enter your new password again:</ControlLabel>
                                                    <FormControl
                                                        type="password"
                                                        value={this.state.pw2}
                                                        placeholder="Enter new password again"
                                                        onChange={this.handleChangePW2}
                                                    />
                                                    <FormControl.Feedback/>
                                                    <HelpBlock>Validation is based on string length.</HelpBlock>
                                                </FormGroup>

                                                {!this.state.isValidInput && <h4 style={{color: "red"}}>Please check your inputs!</h4>}

                                                <ProgressButton type="submit" onClick={this.handlePasswordChangeRequest} state={this.state.buttonState}>
                                                    Submit
                                                </ProgressButton>
                                            </form>
                                        </Col>
                                    </Row>
                                </Grid>
                            </div>
                        );

                    case "ERROR":
                        return (
                            <div>
                                <Grid>
                                    <Row>
                                        <Col xs={12} sm={12} md={8} lg={6} xsOffset={0} smOffset={3} mdOffset={3} lgOffset={3}>
                                            <h3>Key is not valid!</h3>
                                        </Col>
                                    </Row>
                                </Grid>
                            </div>
                        );

                    case "PENDING":
                        return (
                            <div>
                                <Grid>
                                    <Row>
                                        <Col xs={12} sm={12} md={8} lg={6} xsOffset={0} smOffset={3} mdOffset={3} lgOffset={3}>
                                            <h3>Key is being checked! Please wait!</h3>
                                        </Col>
                                    </Row>
                                </Grid>
                            </div>
                        )
                }

            case "OK":
                return (
                    <div>
                        <Grid>
                            <Row>
                                <Col xs={12} sm={12} md={8} lg={6} xsOffset={0} smOffset={3} mdOffset={3} lgOffset={3}>
                                    <h2>Password changed successfully!</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h4>
                                        <Link to="/loginemailpassword">
                                             Login here
                                        </Link>
                                    </h4>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                );

            case "ERROR":
                return (
                    <div>
                        <Grid>
                            <Row>
                                <Col xs={12} sm={12} md={8} lg={6} xsOffset={0} smOffset={3} mdOffset={3} lgOffset={3}>
                                    <h2>Error while changing password!</h2>
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
        }

    }
}

export default ResetPasswordEnterPassword