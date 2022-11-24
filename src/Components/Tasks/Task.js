import React,{Component} from 'react'
import {Table} from 'react-bootstrap'
import {Button,ButtonToolbar} from "react-bootstrap";
import {AddTaskModal} from "./AddTaskModal";
import {EditTaskModal} from "./EditTaskModal";

export class Task extends Component{
    constructor(props) {
        super(props);
        this.state={tasks:[],addModalShow:false, editModalShow:false}
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
    if ((JSON.stringify(prevState.tasks)!==JSON.stringify(this.state.tasks))||prevState.addModalShow!==this.state.addModalShow||prevState.editModalShow!==this.state.editModalShow){
        this.refreshList();
    }


    }


    render(){
        const {tasks,task} = this.state;
        //let addModalClose=(()=>this.setState({addModalClose:false}));

        return(
        <div>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                <tr><th>Id</th><th>Summary</th><th>Status</th><th>Created</th></tr>
                </thead>
                <tbody>
                    {tasks?.map(t=>
                    <tr key={t.id}>
                        <td>{t.id}</td>
                        <td>{t.summary}</td>
                        <td>{t.status}</td>
                        <td>{t.dateCreated}</td>
                        <td>
                            <ButtonToolbar>
                                <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, task:t})}>
                                    Edit
                                </Button>
                                <EditTaskModal show={this.state.editModalShow} t={task} onHide={()=>this.setState({editModalShow:false})}/>
                            </ButtonToolbar>
                        </td>
                    </tr>)}
                </tbody>
            </Table>

            <ButtonToolbar>
                <Button variant='primary' onClick={()=>this.setState({addModalShow:true})}>
                    Add new
                </Button>

                <AddTaskModal show={this.state.addModalShow} onHide={()=>this.setState({addModalShow:false})}/>
            </ButtonToolbar>
        </div>
        )
    }
}