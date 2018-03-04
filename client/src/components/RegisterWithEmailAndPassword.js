import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Button} from 'react-bootstrap'
import axios from 'axios'
import validator from "validator";
import ProgressButton from 'react-progress-button';
import {startEmailLogin, startFacebookLogin, startGoogleLogin} from "../actions/auth";

class RegisterWithEmailAndPassword extends React.Component {
    constructor(props) {
        super(props);

        this.getValidationStateEmail = this.getValidationStateEmail.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.getValidationStateFirstName = this.getValidationStateFirstName.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.getValidationStateLastName = this.getValidationStateLastName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.getValidationStatePW1 = this.getValidationStatePW1.bind(this);
        this.handleChangePW1 = this.handleChangePW1.bind(this);
        this.getValidationStatePW2 = this.getValidationStatePW2.bind(this);
        this.handleChangePW2 = this.handleChangePW2.bind(this);
        this.handleRegistrationRequest = this.handleRegistrationRequest.bind(this);

        this.state = {
            email: '',
            pw1: '',
            pw2: '',
            firstName: '',
            lastName: '',
            birthDay: 0,
            birthMonth: 0,
            birthYear: 0,
            status: 'PENDING',
            buttonState: '',
            isValidInput: true
        }
    }

    getValidationStateEmail() {
        const valid = validator.isEmail(this.state.email);
        if (this.state.email.length === 0) {
            return null;
        }
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

    getValidationStateFirstName() {
        const length = this.state.firstName.length;

        if (length > 0) {
            return 'success';
        } else {
            return null;
        }
    }

    handleChangeFirstName(e) {
        e.persist();

        this.setState(() => {
            return {
                firstName: e.target.value
            };
        });
    }

    getValidationStateLastName() {
        const length = this.state.lastName.length;

        if (length > 0) {
            return 'success';
        } else {
            return null;
        }
    }

    handleChangeLastName(e) {
        e.persist();

        this.setState(() => {
            return {
                lastName: e.target.value
            };
        });
    }

    getValidationStatePW1() {
        const length = this.state.pw1.length;
        if (length > 6) return 'success';
        else if (length > 4) return 'warning';
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

    getValidationStatePW2() {
        const length = this.state.pw2.length;
        if (length > 6 && this.state.pw1 === this.state.pw2) {
            return 'success';
        }
        else if (length > 4 && this.state.pw1 === this.state.pw2) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    handleChangePW2(e) {
        e.persist();

        this.setState(() => {
            return {
                pw2: e.target.value
            };
        });
    }

    handleRegistrationRequest(e) {
        e.preventDefault();

        return new Promise((resolve, reject) => {
            if((validator.isEmail(this.state.email)) && (this.state.firstName.length > 0) && (this.state.lastName.length > 0) &&
                (this.state.pw1.length > 6) && (this.state.pw2.length > 6) && (this.state.pw1 === this.state.pw2)) {

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

                instance.post("users", {
                    email: this.state.email,
                    password: this.state.pw1,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    birth_day: this.state.birthDay,
                    birth_month: this.state.birthMonth,
                    birth_year: this.state.birthYear,
                    firebase: false,
                    firebaseToken: undefined
                }).then((response) => {
                    if(response.data["status"] === "OK") {
                        console.log("User created");

                        // Render on the HTML Page
                        setTimeout(function() { this.setState(() => {
                            return {
                                status: "OK"
                            };
                        }); }.bind(this), 500);

                        resolve();
                    } else if (response.data["status"] === "ERROR") {
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
            case "PENDING":
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
                                    <h2>Register</h2>
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
                                                placeholder="Enter email"
                                                onChange={this.handleChangeEmail}
                                            />
                                            <FormControl.Feedback/>
                                        </FormGroup>

                                        <FormGroup
                                            controlId="FirstName"
                                            validationState={this.getValidationStateFirstName()}
                                        >
                                            <ControlLabel>Enter your first name:</ControlLabel>
                                            <FormControl
                                                type="text"
                                                value={this.state.firstName}
                                                placeholder="Enter first name"
                                                onChange={this.handleChangeFirstName}
                                            />
                                            <FormControl.Feedback/>
                                        </FormGroup>

                                        <FormGroup
                                            controlId="LastName"
                                            validationState={this.getValidationStateLastName()}
                                        >
                                            <ControlLabel>Enter your last name:</ControlLabel>
                                            <FormControl
                                                type="text"
                                                value={this.state.lastName}
                                                placeholder="Enter last name"
                                                onChange={this.handleChangeLastName}
                                            />
                                            <FormControl.Feedback/>
                                        </FormGroup>

                                        <FormGroup
                                            controlId="PW1"
                                            validationState={this.getValidationStatePW1()}
                                        >
                                            <ControlLabel>Enter your password:</ControlLabel>
                                            <FormControl
                                                type="password"
                                                value={this.state.pw1}
                                                placeholder="Enter password"
                                                onChange={this.handleChangePW1}
                                            />
                                            <FormControl.Feedback/>
                                        </FormGroup>

                                        <FormGroup
                                            controlId="PW2"
                                            validationState={this.getValidationStatePW2()}
                                        >
                                            <ControlLabel>Enter your password again:</ControlLabel>
                                            <FormControl
                                                type="password"
                                                value={this.state.pw2}
                                                placeholder="Enter password again"
                                                onChange={this.handleChangePW2}
                                            />
                                            <FormControl.Feedback/>
                                            <HelpBlock>Validation is based on string length.</HelpBlock>
                                        </FormGroup>

                                        {!this.state.isValidInput && <h4 style={{color: "red"}}>Please check your inputs!</h4>}

                                        <ProgressButton type="submit" onClick={this.handleRegistrationRequest} state={this.state.buttonState}>
                                            Submit
                                        </ProgressButton>
                                    </form>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                );

            case "OK":
                return (
                   <div>
                       <Grid>
                           <Row>
                               <Col xs={12} sm={12} md={8} lg={6} xsOffset={0} smOffset={4} mdOffset={4} lgOffset={4}>
                                   <h2>User created successfully!</h2>
                               </Col>
                           </Row>
                           <Row>
                               <Col xs={12} sm={12} md={8} lg={6} xsOffset={0} smOffset={4} mdOffset={4} lgOffset={4}>
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
                                <Col xs={12} sm={12} md={8} lg={6} xsOffset={0} smOffset={4} mdOffset={4} lgOffset={4}>
                                    <h2>Error while creating user!</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={8} lg={6} xsOffset={0} smOffset={4} mdOffset={4} lgOffset={4}>
                                    <h4>
                                        <Link onClick={this.forceUpdate} to="/register">
                                            Back to Registration
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

/*const mapDispatchToProps = (dispatch) => ({
    startEmailLogin: () => dispatch(startEmailLogin()),
    startGoogleLogin: () => dispatch(startGoogleLogin()),
    startFacebookLogin: () => dispatch(startFacebookLogin())
});

export default connect(undefined, mapDispatchToProps)(RegisterWithEmailAndPassword);*/

export default RegisterWithEmailAndPassword;
