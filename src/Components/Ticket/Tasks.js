import React,{Component} from 'react'
import {Col, Pagination, Row, Table} from 'react-bootstrap'
import {Button,ButtonToolbar} from "react-bootstrap";
import {TasksAddModal} from "./TasksAddModal";
import {TasksEditModal} from "./TasksEditModal";
import {TasksDeleteModal} from "./TasksDeleteModal";
import {TasksHeader} from "./TasksHeader";

export class Tasks extends Component{
    constructor(props) {
        super(props);
        this.state={page:1,pages:0,tasks:[],addModalShow:false, editModalShow:false, deleteModalShow:false};
    }
    render(){
        const {task,tasks,page} = this.state
        const tasksToShow= this.getPage(tasks,page)
        return(
            <div>
                <TasksHeader></TasksHeader>
                <div className="m-4">
                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                        <tr><th>Id</th><th>Summary</th><th>Status</th><th>Created</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {tasksToShow?.map(t=>
                            <tr key={t.id}>
                                <td width={"50px"} align={"center"}>{t.id}</td>
                                <td className="text-center">{t.summary}</td>
                                <td>{t.status}</td>
                                <td>{t.dateCreated}</td>
                                <td width={"200px"}>
                                    <ButtonToolbar>
                                        <Button className="m-auto btn-main btn-md " type="button" onClick={()=>this.setState({editModalShow:true, task:t})}>Edit</Button>
                                        <Button className="m-auto btn-danger btn-md " type="button" onClick={()=>this.setState({deleteModalShow:true, task:t})}>Resolve</Button>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                        </tbody>
                    </Table>
                    <Row>
                        <Col>
                            <Button className="btn btn-md btn-success" onClick={()=>this.setState({addModalShow:true})}>
                                Add new
                            </Button>
                        </Col>
                        <Col>
                            <Pagination className="justify-content-end">
                                {this.getPagination()}
                            </Pagination>
                        </Col>
                    </Row>
                    <TasksAddModal show={this.state.addModalShow} onHide={()=>{this.setState({addModalShow:false})}}/>
                    <TasksEditModal show={this.state.editModalShow} t={task} onHide={()=>{this.setState({editModalShow:false})}}/>
                    <TasksDeleteModal show={this.state.deleteModalShow} t={task} onHide={()=>{this.setState({deleteModalShow:false})}}/>
                </div>
            </div>
        )
    }

    getPage(t,i){
        return t.slice((i-1)*10,(i*10>t.length?t.length:i*10))
    }

    getPagination(){
        let list = [];
        for (let i=1; i<this.state.pages+1; i++){
            list.push(<Pagination.Item key={i} active={i === this.state.page} onClick={()=>this.setState({page:i})}>{i}</Pagination.Item>)
        }
        return list;
    }

    refreshList(){
        fetch((process.env.REACT_APP_API+'/tickets'),
            {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Basic ' + process.env.TOKEN,
                    Accept:'application/json'}
                )})
            .then(response=>response.json())
            .then(data=>{
                this.setState({tasks:data,pages:Math.ceil(data.length/10)})
            }).catch(e=>console.log(e))
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((JSON.stringify(prevState.tasks)!==JSON.stringify(this.state.tasks))||prevState.addModalShow!==this.state.addModalShow||prevState.editModalShow!==this.state.editModalShow||prevState.deleteModalShow!==this.state.deleteModalShow||prevState.page!==this.state.page||prevState.pages!==this.state.pages){
            this.refreshList();
        }
    }

}