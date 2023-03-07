import React, {Component} from 'react'
import {Badge, Col, Form, FormCheck, FormGroup, Pagination, Row, Table} from 'react-bootstrap'
import {Button, ButtonToolbar} from "react-bootstrap";
import {Chart} from "chart.js/auto"
import {CategoryScale, Colors} from "chart.js";
import {AgentChartBar} from "./Agent-Chart-Bar";
import {AgentChartDonut} from "./Agent-Chart-Donut";
import {AgentView3EditModal} from "../Agent/Agent-View3-EditModal";
import {AgentView2DeleteModal} from "../Agent/Agent-View2-DeleteModal";

Chart.register(CategoryScale);
Chart.defaults.color="#FFFFFF";

export class Agent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            tasks: [],
            tasksFiltered: [],
            userFilter: 0,
            statusFilter: 31,
            assigneeFilter:0,
            editModalShow: false,
            deleteModalShow: false
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    render() {
        const {task, tasksFiltered, page} = this.state;
        const tasksToShow = this.getPage(tasksFiltered, page);
        return (
            <div className="margin-omit-navbar">
                <div className="chart-panel text-center">
                    <Row>
                        <Col>
                            <h4>Tickets assigned</h4>
                            <h6>Excl. "Closed"</h6>
                            <h1 className="text-danger m-auto">{this.getAssignedTicketsNumber()}</h1>
                        </Col>
                        <Col>
                            <h4>Tickets per month</h4>
                            <h6>Last 3 months</h6>
                            <AgentChartBar classname="text-center" data={this.getChartData1()}></AgentChartBar>
                        </Col>
                        <Col>
                            <h4>Tickets per status</h4>
                            <h6>Last 3 months</h6>
                            <AgentChartDonut classname="text-center" data={this.getChartData2()}></AgentChartDonut>
                        </Col>
                    </Row>
                </div>
                <div className="accordion accordion-flush" id="accordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="accordionHeading">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Filters
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="accordionHeading"
                             data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <Form onSubmit={this.handleSubmit}>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Label>Filter Status</Form.Label>
                                            <FormGroup>
                                                <FormCheck id="check1" type="switch"
                                                           defaultChecked={this.isCheckedStatus(1)} label="Created">
                                                </FormCheck>
                                                <FormCheck id="check2" type="switch"
                                                           defaultChecked={this.isCheckedStatus(2)} label="In Progress">
                                                </FormCheck>
                                                <FormCheck id="check3" type="switch"
                                                           defaultChecked={this.isCheckedStatus(4)} label="Resolved">
                                                </FormCheck>
                                                <FormCheck id="check4" type="switch"
                                                           defaultChecked={this.isCheckedStatus(8)} label="Closed">
                                                </FormCheck>
                                                <FormCheck id="check5" type="switch"
                                                           defaultChecked={this.isCheckedStatus(16)} label="Reopened">
                                                </FormCheck>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <Form.Label>Filter Author</Form.Label>
                                            <Form.Control className="w-50" name="author" type="number" defaultValue={0} placeholder="Provide the account ID">
                                            </Form.Control>
                                            <Form.Label className="mt-3">Filter Assignee</Form.Label>
                                            <div>
                                                <FormCheck id="radio1" type="radio" name="assignee"
                                                           defaultChecked={this.isCheckedUser(1)}
                                                           label="Only assigned to me"/>
                                                <FormCheck id="radio2" type="radio" name="assignee"
                                                           defaultChecked={this.isCheckedUser(0)}
                                                           label="All tickets"/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Button className="btn-main" type="submit">Apply filters</Button>
                                </Form>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="px-4 overflow-auto">
                    {tasksToShow.length === 0 ?
                        <p className="text-center fw-bold mb-5">You have no tickets to show here!</p> :
                        <Table className="mt-4" striped bordered hover size="sm">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Summary</th>
                                <th>Status</th>
                                <th>Created</th>
                                <th>Assignee</th>
                                <th className="text-center">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tasksToShow?.map(t =>
                                <tr key={t.id}>
                                    <td align={"center"}>{t.id}</td>
                                    <td className="text-center">{t.summary}</td>
                                    <td>{t.status}</td>
                                    <td>{new Date(t.dateCreated).toDateString()}</td>
                                    <td valign="middle" className="text-center">{t.assignee!=null?this.getBadge(t): "---"}</td>
                                    <td width={"200px"}>
                                        <ButtonToolbar>
                                            <Button className="m-auto btn-main btn-md " type="button"
                                                    onClick={() => this.setState({
                                                        editModalShow: true,
                                                        task: t
                                                    })}>Details</Button>
                                            <Button className="m-auto btn-danger btn-md " type="button"
                                                    onClick={() => this.setState({
                                                        deleteModalShow: true,
                                                        task: t
                                                    })}>Delete</Button>
                                        </ButtonToolbar>
                                    </td>
                                </tr>)}
                            </tbody>
                        </Table>}
                    <Row>
                            <Pagination className="justify-content-end">
                                {this.getPagination()}
                            </Pagination>
                    </Row>
                    <AgentView3EditModal show={this.state.editModalShow} t={task} onHide={() => {
                        this.setState({editModalShow: false})
                    }}/>
                    <AgentView2DeleteModal show={this.state.deleteModalShow} t={task} onHide={() => {
                        this.setState({deleteModalShow: false})
                    }}/>
                </div>
            </div>
        )
    }
    getAssignedTicketsNumber(){
        return this.state.tasks.filter(t=>
            t.assignee?.id===JSON.parse(sessionStorage.getItem("user")).id && t.status !=="Closed"
        ).length;
    }

    getChartData1() {
        let months =[];
        let values =[];
        let date = new Date();
        for(let i = 0; i<3 ; i++){
            values[i]=this.state.tasks.filter(t=>new Date(t.dateCreated).getMonth()===date.getMonth()&&new Date(t.dateCreated).getFullYear()==date.getFullYear()).length
            let month = date.toLocaleString('default', { month: 'long' });
            date.setMonth(date.getMonth()-1);
            months.push(month);
        }
        values.reverse();
        months.reverse();

        const data = {
            labels:months,
            datasets: [
                {
                    label: 'Tickets',
                    data: values,
                    backgroundColor: ["rgba(220, 53, 69, 0.6)","rgba(220, 53, 69, 0.8)","rgba(220, 53, 69, 1)"]
                },
            ],
        };
        return data;
    }

    getChartData2() {
        let statuses = ["Created","Reopened","In Progress","Resolved","Closed"];
        let values =[];
        let date = new Date();
        let min;
        if(!date.getMonth()<3){
            min = new Date(date.getFullYear(),date.getMonth()-3,date.getDate())
        }
        else {
            min = new Date(date.getFullYear(), 12 - (3 - date.getMonth()), date.getDate())
        }
        let tasks = this.state.tasks.filter(t=>new Date(t.dateCreated)>min);

        statuses.forEach(x=>{
                values.push(tasks.filter(t=>t.status===x).length)
        });
        values.reverse();

        const data = {
            labels:statuses,
            datasets: [
                {
                    label: 'Tickets',
                    data: values,
                    backgroundColor: ["rgba(220, 53, 69, 1)","rgba(39, 154, 4,1)","rgba(255, 153, 51,1)","rgba(204, 51, 255,1)","rgb(0, 0, 255,1)"]
                },
            ],
        };
        return data;
    }

    getBadge(t){
        return t.assignee.id === JSON.parse(sessionStorage.getItem("user")).id  ? <Badge bg="success">{t.assignee.name + " " + t.assignee.lastName}</Badge> : <Badge bg="light" text="dark">{t.assignee.name + " " + t.assignee.lastName}</Badge>;

    }

    handleSubmit(event) {
        event.preventDefault();
        let userValue = 0;
        let statusValue = 0;
        let assigneeValue=0;

        if (event.target.check1.checked)
            statusValue += 1
        if (event.target.check2.checked)
            statusValue += 2
        if (event.target.check3.checked)
            statusValue += 4
        if (event.target.check4.checked)
            statusValue += 8
        if (event.target.check5.checked)
            statusValue += 16

        userValue= parseInt(event.target.author.value);

        if (event.target.radio1.checked)
            assigneeValue = 1;


        this.setState({userFilter: 0 + userValue, statusFilter: 0 + statusValue, assigneeFilter: 0 + assigneeValue}, () => {
            console.log(this.state);
        })
    }


    isCheckedStatus(i) {
        let status = this.state.statusFilter;
        return (status & i) !== 0;
    }
    isCheckedUser(i) {
        let user = this.state.assigneeFilter;
        return (user & i) === i;
    }

    mapFilters(l) {
        let result = l;
        let status = this.state.statusFilter;
        let user = this.state.userFilter;
        let assignee = this.state.assigneeFilter;
        if (status != 31) {
            if ((status & 1) === 0)
                result = result.filter((x) => x.status !== "Created");
            if ((status & 2) === 0)
                result = result.filter((x) => x.status !== "In Progress");
            if ((status & 4) === 0)
                result = result.filter((x) => x.status !== "Resolved");
            if ((status & 8) === 0)
                result = result.filter((x) => x.status !== "Closed");
            if ((status & 16) === 0)
                result = result.filter((x) => x.status !== "Reopened");
        }
        if (user != 0) {
            result = result.filter((x) => x.author.id === user);
        }
        if (assignee != 0) {
            result = result.filter((x) => x.assignee?.id === JSON.parse(sessionStorage.getItem("user")).id);
        }
        return JSON.parse(JSON.stringify(result));
    }

    getPage(t, i) {
        if (t.length > 10) {
            return t.slice((i - 1) * 10, (i * 10 > t.length ? t.length : i * 10))
        }
        return t;
    }
    getPagination() {
        let list = [];
        for (let i = 1; i < this.state.tasksFiltered.length / 10 + 1; i++) {
            list.push(<Pagination.Item key={i} active={i === this.state.page}
                                       onClick={() => this.setState({page: i})}>{i}</Pagination.Item>)
        }
        return list;
    }

    refreshList() {
        fetch((process.env.REACT_APP_API + '/tickets'),
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
                this.setState({tasks: data, tasksFiltered: this.mapFilters(data)})
            }).catch(e => console.log(e))
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((JSON.stringify(prevState.tasks) !== JSON.stringify(this.state.tasks)) || prevState.editModalShow !== this.state.editModalShow || prevState.deleteModalShow !== this.state.deleteModalShow || prevState.page !== this.state.page || prevState.pages !== this.state.pages || prevState.statusFilter !== this.state.statusFilter || prevState.userFilter !== this.state.userFilter || prevState.assigneeFilter !== this.state.assigneeFilter) {
            this.refreshList();
        }
    }
}