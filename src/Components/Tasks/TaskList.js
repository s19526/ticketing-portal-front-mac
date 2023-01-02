import React,{Component} from 'react'
import {Table} from 'react-bootstrap'
import {Button,ButtonToolbar} from "react-bootstrap";
import {AddTaskModal} from "./AddTaskModal";
import {EditTaskModal} from "./EditTaskModal";
import {DeleteTaskModal} from "./DeleteTaskModal";
import {map} from "react-bootstrap/ElementChildren";

export class TaskList extends Component{
    constructor(props) {
        super(props);
        this.state={page:0,pages:0,tasks:[],addModalShow:false, editModalShow:false, deleteModalShow:false}
    }

    render(){
        const {tasks,task,page,pages} = this.state;
        return(
        <div className="m-4">
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                <tr><th>Id</th><th>Summary</th><th>Status</th><th>Created</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    {tasks?.map(t=>
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
            <Button className="mt-4 ms-4  btn btn-md btn-success" onClick={()=>this.setState({addModalShow:true})}>
                Add new
            </Button>
            <AddTaskModal show={this.state.addModalShow} onHide={()=>this.setState({addModalShow:false})}/>
            <EditTaskModal show={this.state.editModalShow} t={task} onHide={()=>{this.setState({editModalShow:false})}}/>
            <DeleteTaskModal show={this.state.deleteModalShow} t={task} onHide={()=>{this.setState({deleteModalShow:false})}}/>
        </div>
        )
    }

    prepareList(){
        let i = Math.ceil(this.state.tasks/10);
        if(i==0){
            this.setState({page:1,pages:1})
        }else{
            this.setState({page:1,pages:i})
        }

        let list=new Map;
        for (let i=0;i<this.state.pages;i++){
            list.set(i,this.state.tasks.slice(i*10,(i+1)*10));
        }
        //for (let i=(i-1)*10; i<i*10; i++){
        //    if(this.state.tasks.at(i)!=null){
         //       list.push(this.state.tasks.at(i));
           // }else break;
       // }
        console.log("Tutaj jest pocięta lista ticketów " + list.size);
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
                this.setState({tasks:data})
            }).catch(e=>console.log(e))
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((JSON.stringify(prevState.tasks)!==JSON.stringify(this.state.tasks))||prevState.addModalShow!==this.state.addModalShow||prevState.editModalShow!==this.state.editModalShow||prevState.deleteModalShow!==this.state.deleteModalShow){
            this.refreshList();
        }

    }

}