import React from 'react';
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Button} from 'react-bootstrap'
import axios from 'axios'

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangePW1 = this.handleChangePW1.bind(this);
        this.handleChangePW2 = this.handleChangePW2.bind(this);

        this.state = {
            pw1: '',
            pw2: ''
        };
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
        this.setState({ pw1: e.target.value });
    }

    handleChangePW2(e) {
        this.setState({ pw2: e.target.value });
    }

    render() {
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
                                    <FormControl.Feedback />
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
                                    <FormControl.Feedback />
                                    <HelpBlock>Validation is based on string length.</HelpBlock>
                                </FormGroup>

                                <Button type="submit">Submit</Button>
                            </form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default ResetPassword