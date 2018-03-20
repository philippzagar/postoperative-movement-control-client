import React from 'react';
import {Line} from 'react-chartjs-2';
import { connect } from 'react-redux';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';

class Diagram extends React.Component {
    constructor(props) {
        super(props);
        this.fetchLatestData = this.fetchLatestData.bind(this);

        this.state = {
            token: props.token,
            data: {
                labels: [],
                datasets: [{
                        data: [],
                        label: "Pitch",
                        borderColor: "#3e95cd",
                        fill: false
                }, {
                        data: [],
                        label: "Roll",
                        borderColor: "#8e5ea2",
                        fill: false
                },
                    {
                        data: [],
                        label: "Yaw",
                        borderColor: "#7db492",
                        fill: false
                    }
                ]
            }
        };
    }

    fetchLatestData() {
        let instance = axios.create({
            baseURL: 'https://zagar.spdns.org/',
            timeout: 10000,
            headers: {'x-auth': this.state.token},
            maxContentLength: 1000000
        });

        const count = 400;

        instance.get(`findGyroLastValues/${count}`).then((response) => {
            console.log(response);
            const fetchedData = response.data.values;
            console.log(fetchedData);

            const sensor1 = fetchedData.filter(value => value.id === 1);
            const sensor2 = fetchedData.filter(value => value.id === 2);

            console.log("Fetched Data");

            this.setState({
                data: {
                    labels: sensor1.map((data) => data.t),
                    datasets: [
                        {
                            data: sensor1.map((data) => data.p),
                            label: "Pitch 1",
                            borderColor: "#3e95cd",
                            fill: false
                        }, {
                            data: sensor1.map((data) => data.r),
                            label: "Roll 1",
                            borderColor: "#3e9500",
                            fill: false
                        }, {
                            data: sensor1.map((data) => data.y),
                            label: "Yaw 1",
                            borderColor: "#7db492",
                            fill: false
                        }, {
                            data: sensor2.map((data) => data.p),
                            label: "Pitch 2",
                            borderColor: "#451235",
                            fill: false
                        }, {
                            data: sensor2.map((data) => data.r),
                            label: "Roll 2",
                            borderColor: "#964865",
                            fill: false
                        }, {
                            data: sensor2.map((data) => data.y),
                            label: "Yaw 3",
                            borderColor: "#855990",
                            fill: false
                        }
                    ]
                }
            });
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={10}>
                            <Line
                                data={this.state.data}
                                width={300}
                                height={150}
                                options={{
                                    title: {
                                        display: true,
                                        text: 'Gyro data'
                                }}}
                            />
                        </Col>
                        <Col xs={2}>
                            <br/>
                                <br/>


                            <Button bsStyle="primary" onClick={this.fetchLatestData}>Get Data</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(Diagram);