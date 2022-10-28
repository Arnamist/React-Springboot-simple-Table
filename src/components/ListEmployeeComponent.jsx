import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService'
import { withRouter } from '../services/withRouter';



class ListEmployeeComponent extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
        this.saveEmployee = this.saveEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.viewEmployee = this.viewEmployee.bind(this);
    }

    componentDidMount() {
            EmployeeService.getEmployees().then((res) => {
                this.setState({ employees: res.data });
            });
    }

    saveEmployee(id) {
            this.props.navigate(`/save-employee/${id}`);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployeeById(id).then(() => {
            this.setState({employee: this.state.employees.filter(employee => employee.id != id)});
            window.location.reload();
        })
    }
    viewEmployee(id) {
        this.props.navigate(`/view-employee/${id}`);
    }

    render() {
        return (
        <div>
            <h2 className="text-center">Employees List</h2>
            <div className="row">
                <div className="col-sm mb-3">
                    <button className="btn btn-primary" onClick={() => this.saveEmployee(-1)}>Add Employee</button>
                </div>
            </div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> Employee First Name</th>
                            <th> Employee Last Name</th>
                            <th> Employee Email Id</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.employees.map(
                                employee => 
                                <tr key = {employee.id}>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.emailId}</td>
                                    <td>
                                        <button className="btn btn-primary m-2" onClick={() => this.saveEmployee(employee.id)}>Update</button>
                                        <button className="btn btn-danger m-2" onClick={() => this.deleteEmployee(employee.id)}>Delete</button>
                                        <button className="btn btn-warning m-2" onClick={() => this.viewEmployee(employee.id)}>View</button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}

export default withRouter(ListEmployeeComponent);