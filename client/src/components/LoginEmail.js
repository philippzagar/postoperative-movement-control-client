import React from 'react';
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Button} from 'react-bootstrap'
import axios from 'axios'
import validator from "validator";

class LoginEmail extends React.Component {
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

        this.state = {
            email: '',
            pw1: '',
            pw2: '',
            firstName: '',
            lastName: '',
            birthDay: 0,
            birthMonth: 0,
            birthYear: 0,
            status: 'PENDING'
        }
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

    getValidationStateFirstName() {
        const length = this.state.firstName.length;

        if (length > 0) {
            return 'success';
        } else {
            return 'error';
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
            return 'error';
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
        if (length > 6 && this.state.pw1 === this.state.pw2) return 'success';
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
            birth_year: this.state.birthYear
        }).then((response) => {
            console.log(response);

            if(response.data["status"] === "OK") {
                console.log("User created");

                // Render on the HTML Page
                this.setState(() => {
                    return {
                        status: "OK"
                    };
                });

                console.log(this.state);
            } else if (response.data["status"] === "ERROR") {
                // Render error
                this.setState(() => {
                    return {
                        status: "ERROR"
                    };
                });
            } else {
                console.log("Response failed!");
            }
        }).catch((e) => {
            this.setState(() => {
                return {
                    status: "ERROR"
                };
            });
            console.log(e);
        });
    }

    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12} sm={12} md={8} lg={6}>
                            <h2>Register</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={8} lg={6}>
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
                                    <HelpBlock>Validation is based on string length.</HelpBlock>
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
                                    <HelpBlock>Validation is based on string length.</HelpBlock>
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

                                <Button type="submit" onClick={this.handleRegistrationRequest}>Submit</Button>
                            </form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}




export default LoginEmail;
