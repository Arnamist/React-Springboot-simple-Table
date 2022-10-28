import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import { withRouter } from '../services/withRouter'

class ViewEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.params.id,
            employee: {}
        }
    }
    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            this.setState({employee: res.data});
        });
    }

    render() {
        return (
        <div>
            <div className="card col-md-6 offset-md-3 offset mt-3">
                <h3 className="text-center">View Employee Details</h3>
                <div className="card-body">
                    <div className="row">
                        <label>Employee First Name:  {this.state.employee.firstName}</label>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <label>Employee Last Name: {this.state.employee.lastName}</label>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <label>Email Address: {this.state.employee.emailId}</label>
                    </div>
                </div>
            </div>
            
        </div>
        )
    }
}

export default withRouter(ViewEmployeeComponent);