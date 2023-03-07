import {Button, Form, ProgressBar, Table} from "react-bootstrap";
import React, {Component} from "react";


export class AgentView3EditModalHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {history: []};
    }
    render() {
        const {history} = this.state;
        return (
            <div className="mx-4">
                <Table>
                    <thead>
                    <tr>
                        <th>Status</th>
                        <th>Assignee</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {history?.map(t =>
                        <tr key={t.id}>
                            <td width={"100px"}>{t.ticket.id}</td>
                            <td width={"100px"}>{t.status.name}</td>
                            <td width={"150px"}>{new Date(t.date).toDateString()}<br/>{new Date(t.date).toLocaleTimeString()}</td>
                            <td>{t.action}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>)

    }

    getHistory() {
        fetch((process.env.REACT_APP_API + '/tickets/' + this.props.t?.id+"/history"),
            {
                method: 'GET',
                headers: new Headers({
                        Authorization: 'Basic ' + process.env.TOKEN,
                        Accept: 'application/json'
                    }
                )
            })
            .then(response => response.json())
            .then(data => {
                this.setState({history: data});
            }).catch(e => console.log(e));
    }

    componentDidMount() {
        this.getHistory();
    }
}