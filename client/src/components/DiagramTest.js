import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Grid, Row, Col } from 'react-bootstrap'

const MyList = (props) => {
    const listItems = props.data.map((number) =>
        <li key={Math.random()}>{number.pv}</li>
    );

    return (
        <ul>{listItems}</ul>
    );
};

class Diagram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: [
            {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
            {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
            {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
            {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
            {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
            {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
            {name: 'Page G', uv: 3490, pv: 4300, amt: 2100}
        ]};
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({data: [
                    {name: 'Page A', uv: 5000, pv: 5000, amt: 2400},
                    {name: 'Page B', uv: 5000, pv: 5000, amt: 2210},
                    {name: 'Page C', uv: 5000, pv: 5000, amt: 2290},
                    {name: 'Page D', uv: 4000, pv: 4000, amt: 2000},
                    {name: 'Page E', uv: 4000, pv: 4000, amt: 2181},
                    {name: 'Page F', uv: 3000, pv: 3000, amt: 2500},
                    {name: 'Page G', uv: 3000, pv: 3000, amt: 2100}
                ]
            });
        }, 3000);
    }

    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={6}>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={this.state.data} margin={{top: 5, right: 20, bottom: 5, left: 50}}>
                                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                                    <XAxis />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}} isAnimationActive={false}/>
                                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" isAnimationActive={true}/>
                                </LineChart>
                            </ResponsiveContainer>
                        </Col>
                        <Col xs={6}>
                            <MyList data={this.state.data}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Diagram;