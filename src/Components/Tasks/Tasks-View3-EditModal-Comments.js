import {Button, Form, ProgressBar, Table} from "react-bootstrap";
import React, {Component} from "react";


export class TasksView3EditModalComments extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {comments: []};
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + "/comments/create", {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + process.env.TOKEN,
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                ticket: {"id": this.props.t.id},
                author: {"id": JSON.parse(sessionStorage.getItem("user")).id},
                content: event.target.commentContent.value,
                dateAdded: Date.now(),
                internal: 0
            })
        })
            .then(res => res.json())
            .then(result => {
                console.log('Created a comment with id: ' + result.id)
                document.getElementById("form-comment").reset();
                this.getComments();
            }, (error) => {
                console.log(error)
            }).catch(e => console.log(e))
    }

    render() {
        const {comments} = this.state;
        return (
            <div className="mx-4">
                <Table>
                    <thead>
                    <tr>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Comment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {comments?.map(t =>
                        <tr key={t.id}>
                            <td width={"100px"}>{t.author.name + " " + t.author.lastName}</td>
                            <td width={"100px"}>{new Date(t.dateAdded).toDateString()}</td>
                            <td>{t.content}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                <Form id="form-comment" onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="commentContent">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as="textarea" rows={6} name="commentContent" required
                                      placeholder="Please type in your comment"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3 text-center">
                        <Button variant="btn btn-success btn-md" type="submit">
                            Add comment
                        </Button>
                    </Form.Group>
                </Form>
            </div>)

    }

    getComments() {
        fetch((process.env.REACT_APP_API + '/comments/' + this.props.t?.id),
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
                this.setState({comments: data});
            }).catch(e => console.log(e));
    }

    componentDidMount() {
        this.getComments();
    }
}