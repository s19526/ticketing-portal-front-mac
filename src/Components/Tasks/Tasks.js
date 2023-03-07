import React, {Component} from 'react'
import {Col, Form, FormCheck, FormGroup, Pagination, Row, Table} from 'react-bootstrap'
import {Button, ButtonToolbar} from "react-bootstrap";
import {TasksView1AddModal} from "./Tasks-View1-AddModal";
import {TasksView2DeleteModal} from "./Tasks-View2-DeleteModal";
import {TasksHeader} from "./Tasks-Header";
import {TasksView3EditModal} from "./Tasks-View3-EditModal";

export class Tasks extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setKeyword = this.setKeyword.bind(this);
        this.state = {
            page: 1,
            tasks: [],
            tasksFiltered: [],
            userFilter: 0,
            statusFilter: 31,
            keywordFilter: "",
            addModalShow: false,
            editModalShow: false,
            deleteModalShow: false
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        let userValue = 0;
        let statusValue = 0;
        if (event.target.radio1.checked)
            userValue = 1;
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
        this.setState({userFilter: 0 + userValue, statusFilter: 0 + statusValue}, () => {
            console.log(this.state);
        })
    }

    render() {
        const {task, tasksFiltered, page} = this.state;
        const tasksToShow = this.getPage(tasksFiltered, page)
        return (
            <div>
                <TasksHeader f={this.setKeyword}></TasksHeader>
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
                                <Form id="form-keyword" onSubmit={this.handleSubmit}>
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
                                            <div>
                                                <FormCheck id="radio1" type="radio" name="user"
                                                           defaultChecked={this.isCheckedUser(1)}
                                                           label="Only my tickets"/>
                                                <FormCheck id="radio2" type="radio" name="user"
                                                           defaultChecked={this.isCheckedUser(0)}
                                                           label="All organization tickets"/>
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
                        <Col>
                            <Button className="btn btn-md btn-success"
                                    onClick={() => this.setState({addModalShow: true})}>
                                Add new
                            </Button>
                        </Col>
                        <Col>
                            <Pagination className="justify-content-end">
                                {this.getPagination()}
                            </Pagination>
                        </Col>
                    </Row>
                    <TasksView1AddModal show={this.state.addModalShow} onHide={() => {
                        this.setState({addModalShow: false})
                    }}/>
                    <TasksView3EditModal show={this.state.editModalShow} t={task} onHide={() => {
                        this.setState({editModalShow: false})
                    }}/>
                    <TasksView2DeleteModal show={this.state.deleteModalShow} t={task} onHide={() => {
                        this.setState({deleteModalShow: false})
                    }}/>
                </div>
            </div>
        )
    }

    getPage(t, i) {
        if (t.length > 10) {
            return t.slice((i - 1) * 10, (i * 10 > t.length ? t.length : i * 10))
        }
        return t;
    }

    isCheckedStatus(i) {
        let status = this.state.statusFilter;
        return (status & i) !== 0;
    }

    isCheckedUser(i) {
        let user = this.state.userFilter;
        return (user & i) === i;
    }

    getPagination() {
        let list = [];
        for (let i = 1; i < this.state.tasksFiltered.length / 10 + 1; i++) {
            list.push(<Pagination.Item key={i} active={i === this.state.page}
                                       onClick={() => this.setState({page: i})}>{i}</Pagination.Item>)
        }
        return list;
    }

    setKeyword(x) {
        this.setState({userFilter: 0, statusFilter: 31, keywordFilter: "" + x});
        document.getElementById("form-keyword").reset();
        console.log("Keyword: " + this.state.keywordFilter + " " + " User " + this.state.userFilter + " Status " + this.state.statusFilter);
    }


    mapFilters(l) {
        let result = l;
        let status = this.state.statusFilter;
        let user = this.state.userFilter;
        let keyword = this.state.keywordFilter;
        if (status !== 31) {
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
        if (user !== 0) {
            result = result.filter((x) => x.author.id === JSON.parse(sessionStorage.getItem("user")).id)
        }
        if (keyword.toLowerCase() !== "") {
            result = result.filter((x) => x.summary.toLowerCase().includes(keyword.toLowerCase()))
        }
        console.log(result);
        return JSON.parse(JSON.stringify(result));
    }

    refreshList() {
        fetch((process.env.REACT_APP_API + '/tickets?userId=' + JSON.parse(sessionStorage.getItem("user")).id),
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
        if ((JSON.stringify(prevState.tasks) !== JSON.stringify(this.state.tasks)) || prevState.addModalShow !== this.state.addModalShow || prevState.editModalShow !== this.state.editModalShow || prevState.deleteModalShow !== this.state.deleteModalShow || prevState.page !== this.state.page || prevState.pages !== this.state.pages || prevState.statusFilter !== this.state.statusFilter || prevState.keywordFilter !== this.state.keywordFilter || prevState.userFilter !== this.state.userFilter) {
            this.refreshList();
        }
    }
}