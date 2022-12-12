import {Component} from "react";
import {TasksHeader} from "./TasksHeader";
import {TaskList} from "./TaskList";

export class Tasks extends Component{

    render() {
        return (
            <div>
                <TasksHeader></TasksHeader>
                <TaskList/>
            </div>
        );
    }
}