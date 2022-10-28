
import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import { withRouter } from '../services/withRouter';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            id: this.props.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }

        this.changeFirstNameHandler =  this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
    }

    componentDidMount() {
        if(this.state.id == -1) {
            return;
        }else{
            EmployeeService.getEmployeeById(this.state.id).then((res) =>{
                let employee = res.data;
                this.setState({firstName: employee.firstName, lastName: employee.lastName, emailId: employee.emailId});
            });
        }        
    }

    saveEmployee = (e) => { 
        e.preventDefault();  
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId };
        if(this.state.id == -1) {
            EmployeeService.createEmployee(employee).then(() => {
                this.props.navigate("/employees");
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then(() => {
                this.props.navigate("/employees")   ;
            });
        }
    } 

    cancel = () => {
        this.props.navigate("/employees");
    }
    changeFirstNameHandler = (event) => { this.setState({firstName: event.target.value}); }
    changeLastNameHandler = (event) => { this.setState({lastName: event.target.value}); }
    changeEmailHandler = (event) => { this.setState({emailId: event.target.value}); }
    

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset mt-4">
                        <h3 className="text-center">{(this.state.id == -1)?"Add Employee":"Update Employee"}</h3>
                        <div className="card-body mb-2">
                            <form>
                                <div className="form-group mb-3">
                                    <label>First Name: </label>
                                    <input placeholder="First Name" name="firstName" className="form-control" 
                                    value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Last Name: </label>
                                    <input placeholder="Last Name" name="lastName" className="form-control" 
                                    value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email Address: </label>
                                    <input placeholder="Email Address" name="emailId" className="form-control" 
                                    value={this.state.emailId} onChange={this.changeEmailHandler} />
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-success" onClick={this.saveEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </div>                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CreateEmployeeComponent);