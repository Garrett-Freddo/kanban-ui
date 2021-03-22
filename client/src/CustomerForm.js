import React from 'react';
import axios from "axios";
import { makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  label: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))
const classes = useStyles;

export default class CustomerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: {
        firstName: props.firstName,
        lastName: props.lastName
        // status: props.status
      },
      task: {
          assignee: props.assignee,
          type: props.type,
          title: props.title,
          description: props.description,
      },
      editTask: {
        assignee: props.assignee,
        type: props.type,
        title: props.title,
        description: props.description,
    },
      data: [],
    }
  }

  componentDidMount() {
    axios.get("/tasks").then(response => {
      this.setState({
          data: response.data.tasks
      });
  })
  }


  handleFirstNameChanged(event) {
    var customer        = this.state.customer;
    customer.firstName  = event.target.value;

    this.setState({ customer: customer });
  }

  handleLastNameChanged(event) {
    var customer      = this.state.customer;
    customer.lastName = event.target.value;

    this.setState({ customer: customer });
  }

  handleTypeChanged(event) {
    var task    = this.state.task;
    task.type = event.target.value;

    this.setState({ task: task });
  }

  handleAssigneeChanged(event) {
    var task = this.state.task;
    task.assignee = event.target.value;

    this.setState({task:task});
  }

  handleTitleChanged(event) {
    var task = this.state.task;
    task.title = event.target.value;

    this.setState({task:task});
  }

  handleDescriptionChanged(event) {
    var task = this.state.task;
    task.description = event.target.value;

    this.setState({task:task});
  }

  handleEditTypeChanged(event) {
    var task    = this.state.editTask;
    task.type = event.target.value;

    this.setState({ editTask: task });
  }

  handleEditAssigneeChanged(event) {
    var task = this.state.editTask;
    task.assignee = event.target.value;

    this.setState({editTask:task});
  }

  handleEditTitleChanged(event) {
    var task = this.state.editTask;
    task.title = event.target.value;

    this.setState({editTask:task});
  }

  handleEditDescriptionChanged(event) {
    var task = this.state.editTask;
    task.description = event.target.value;

    this.setState({editTask:task});
  }

  handleCreateUserButtonClick = (fName, lName) => {
    console.log(this.state.customer);
    console.log(lName);
    axios.post("/users", {
        firstName: fName,
        lastName: lName
      }).then(response => {
        console.log(response.data);
        this.setState({
            Users: JSON.stringify(response.data)
        });
    })
}

    handleRetrieveUserButtonClick = () => {
        axios.get("/users").then(response => {
            console.log(response.data);
        })
    }

    handleTaskButtonClicked = (Assignee, Title, Description, Type) => {
      if(!Type) {
        Type = "TO DO";
      }
        if(Assignee && Title && Description && Type) {
          console.log("clicked");
            axios.post("/tasks", {
                assignee: Assignee,
                title: Title,
                description: Description,
                type: Type, 
            }).then(response => {
                console.log(response.data);
            })
        } else {
          console.log(Assignee, Title, Description, Type);
        }
    }

    handleDeleteButtonClicked(Title) {
      console.log(Title);
      axios.delete("/tasks", {
        headers: {
          Authorization: "1"
        },
        data: {
          title: Title
        }
      }).then(response => {
        console.log(response.data);
      })
    }

  handleButtonClicked(event) {
    if(this.state.customer.firstName && this.state.customer.lastName) {
        this.handleCreateUserButtonClick(JSON.stringify(this.state.customer.firstName), JSON.stringify(this.state.customer.lastName));
    }
  }

  handleEditTask() {
    const mockTitle = this.state.data.filter(task => task.title === this.state.editTask.title);
    console.log(this.state.editTask);
    let editTask = {
      title: this.state.editTask.title,
      description: this.state.editTask.description,
      assignee: this.state.editTask.assignee,
      type: this.state.editTask.type
    };
    if(mockTitle.length !== 0) {
      if(!this.state.editTask.description)
        editTask.description = mockTitle[0].description;
      if(!this.state.editTask.assignee)
        editTask.assignee = mockTitle[0].assignee;
      if(!this.state.editTask.type)
        editTask.type = mockTitle[0].type;
      axios.put("/tasks", editTask).then(response => {
        console.log(response.data);
      })
    } else {
      alert("enter a valid title");
    }
  }


  render() {
    console.log(this.state.data);
    if(this.state.data.length) {
      return (

        <div className = {classes.root} >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Kanbam Board</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>Create Users</Paper>
              <label>
              First Name: 
            </label>
            <input type="text" value={this.state.customer.firstName} onChange={this.handleFirstNameChanged.bind(this)}/>
            <br/>
            <label>
              Last Name:
            </label>
            <input type="text" value={this.state.customer.lastName} onChange={this.handleLastNameChanged.bind(this)}/>
            <br/>
            <hr/>
            <button onClick={this.handleButtonClicked.bind(this)}>
              Create User
            </button>
            <button tag = "button" onClick = {this.handleRetrieveUserButtonClick}> retreive users </button>
          </Grid>
          <Grid item xs={4}>
          <Paper className={classes.paper}>Create Tasks</Paper>
          <label>
          Title     :
          </label>
          <input type="text" value={this.state.task.title} onChange={this.handleTitleChanged.bind(this)}/>
          <br/>
          <label> 
          description: 
          </label>
          <input type="text" value={this.state.task.description} onChange={this.handleDescriptionChanged.bind(this)}/>
          <br/>
          <label>
          Assignee: 
          </label>
          <input type="text" value={this.state.task.assignee} onChange={this.handleAssigneeChanged.bind(this)}/>
          <br/>
          <label>
          Status:
          </label>
          <select value={this.state.customer.status} onChange={this.handleTypeChanged.bind(this)}>
            <option value="TO DO">
              To Do
            </option>
            <option value="IN PROGRESS">
              In Progress
            </option>
            <option value="IN REVIEW">  
              In Review
            </option>
            <option value = "COMPLETE">
              Complete
            </option>    
          </select>
          <hr/>
          <button onClick={() => this.handleTaskButtonClicked(this.state.task.assignee,this.state.task.title,this.state.task.description,this.state.task.type)}>
              createTask
          </button>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>Edit Tasks</Paper>
            <h10>Enter the correct title of an existing task, then enter values into
              the fields you wish to change. Unedited fields will retain the sames data. 
            </h10>
            <label>
          Title:
          </label>
          <input type="text" value={this.state.editTask.title} onChange={this.handleEditTitleChanged.bind(this)}/>
          <br/>
          <label> 
          description: 
          </label>
          <input type="text" value={this.state.editTask.description} onChange={this.handleEditDescriptionChanged.bind(this)}/>
          <br/>
          <label>
          Assignee: 
          </label>
          <input type="text" value={this.state.editTask.assignee} onChange={this.handleEditAssigneeChanged.bind(this)}/>
          <br/>
          <label>
          Status:
          </label>
          <select value={this.state.editTask.type} onChange={this.handleEditTypeChanged.bind(this)}>
            <option value="TO DO">
              To Do
            </option>
            <option value="IN PROGRESS">
              In Progress
            </option>
            <option value="IN REVIEW">  
              In Review
            </option>
            <option value = "COMPLETE">
              Complete
            </option>    
          </select>
          <button onClick = {this.handleEditTask.bind(this)}> Edit task </button>
            </Grid>
            <Grid item xs={3}>
            <Paper className={classes.paper}>To Do</Paper>
            {this.state.data.filter(task => task.type === "TO DO").map((task, i) =>(
          <div key = {task.title}>
            <div>Task {++i} </div>
            <div>Title: {task.title}</div>
            <div>Description: {task.description}</div>
            <div>Assignee: {task.assignee}</div>
            <div>Due Date:{task.dateDue}</div>
            <div>Status: {task.type}  </div> 
            <button onClick = {() => this.handleDeleteButtonClicked(task.title)}> Delete Task </button>
          </div>
        ))}
            </Grid>

          <Grid item xs={3}>
          <Paper className={classes.paper}>In Progress</Paper>
          {this.state.data.filter(task => task.type === "IN PROGRESS").map((task, i) =>(
          <div key = {task.title}>
            <div>Task {++i} </div>
            <div>Title: {task.title}</div>
            <div>Description: {task.description}</div>
            <div>Assignee: {task.assignee}</div>
            <div>Due Date:{task.dateDue}</div>
            <div>Status: {task.type}  </div> 
            <button onClick = {() => this.handleDeleteButtonClicked(task.title)}> Delete Task </button>
          </div>
        ))}
            </Grid>
            <Grid item xs={3}>
          <Paper className={classes.paper}>Complete</Paper>
          {this.state.data.filter(task => task.type === "COMPLETE").map((task, i) =>(
          <div key = {task.title}>
            <div>Task {++i} </div>
            <div>Title: {task.title}</div>
            <div>Description: {task.description}</div>
            <div>Assignee: {task.assignee}</div>
            <div>Due Date:{task.dateDue}</div>
            <div>Status: {task.type}  </div> 
            <button onClick = {() => this.handleDeleteButtonClicked(task.title)}> Delete Task </button>
          </div>
        ))}
            </Grid>
            <Grid item xs={3}>
          <Paper className={classes.paper}>In Review</Paper>
          {this.state.data.filter(task => task.type === "IN REVIEW").map((task, i) =>(
          <div key = {task.title}>
            <div>Task {++i} </div>
            <div>Title: {task.title}</div>
            <div>Description: {task.description}</div>
            <div>Assignee: {task.assignee}</div>
            <div>Due Date:{task.dateDue}</div>
            <div>Status: {task.type}  </div> 
            <button onClick = {() => this.handleDeleteButtonClicked(task.title)}> Delete Task </button>
          </div>
        ))}
            </Grid>

        </Grid>
      </div>

      );
      } else {

        return (

          <div className = {classes.root} >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Kanbam Board</Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>Create Users</Paper>
                <label>
                First Name: 
              </label>
              <input type="text" value={this.state.customer.firstName} onChange={this.handleFirstNameChanged.bind(this)}/>
              <br/>
              <label>
                Last Name:
              </label>
              <input type="text" value={this.state.customer.lastName} onChange={this.handleLastNameChanged.bind(this)}/>
              <br/>
              <hr/>
              <button onClick={this.handleButtonClicked.bind(this)}>
                Create User
              </button>
              <button tag = "button" onClick = {this.handleRetrieveUserButtonClick}> retreive users </button>
            </Grid>
            <Grid item xs={4}>
            <Paper className={classes.paper}>Create Tasks</Paper>
            <label>
            Assignee: 
            </label>
            <input type="text" value={this.state.task.assignee} onChange={this.handleAssigneeChanged.bind(this)}/>
            <br/>
            <label>
            Title     :
            </label>
            <input type="text" value={this.state.task.title} onChange={this.handleTitleChanged.bind(this)}/>
            <br/>
            <label> 
            description: 
            </label>
            <input type="text" value={this.state.task.description} onChange={this.handleDescriptionChanged.bind(this)}/>
            <br/>
            <label>
            Status:
            </label>
            <select value={this.state.customer.status} onChange={this.handleTypeChanged.bind(this)}>
              <option value="TO DO">
                To Do
              </option>
              <option value="IN PROGRESS">
                In Progress
              </option>
              <option value="IN REVIEW">  
                In Review
              </option>
              <option value = "COMPLETE">
                Complete
              </option>    
            </select>
            <hr/>
            <button onClick={() => this.handleTaskButtonClicked(this.state.task.assignee,this.state.task.title,this.state.task.description,this.state.task.type)}>
                createTask
            </button>
            </Grid>
            <Grid item xs={4}>
            <Paper className={classes.paper}>Create Tasks</Paper>
            </Grid>
          </Grid>
        </div>
        );
      }
  }
}

/*
<label>
          Status:
        </label>
        <select value={this.state.customer.status} onChange={this.handleStatusChanged.bind(this)}>
          <option value="PENDING">
            Pending
          </option>
          <option value="APPROVED">
            Approved
          </option>
        </select>
        */