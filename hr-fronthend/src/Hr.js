import './Hr.css';
import React from "react";
import Employee from "./model/employee";

class Hr extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            employee: new Employee(),
            employees: []
        }
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Employee</h4>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="identityNo">Identity No:</label>
                            <input id="identityNo" type="text"
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Full Name:</label>
                            <input id="name" type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="salary" >Salary:</label>
                            <input id="salary" type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="iban">Iban:</label>
                            <input id="iban" data-bind="value: employee.iban" type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="department">Department:</label>
                            <select id="department" className="form-control">
                                <option>FINANCE</option>
                                <option>HR</option>
                                <option>IT</option>
                                <option>SALES</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthYear">Birth Year:</label>
                            <input id="birthYear"
                                   type="text"
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <div className="checkbox">
                                <label><input type="checkbox"></input>Full time?</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="photo">Photo</label>
                            <img id="photo" className="thumbnail"/>
                            <label className="btn btn-info">
                                <input type="file" style={{display: "none"}}
                                       className="form-control"/>
                                <span>File</span>
                            </label>
                        </div>
                        <div className="form-group">
                            <div id="filedrag"
                                 className="drop-zone">Drop the photo here!
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-info">Add
                            </button>
                            <button className="btn btn-warning">Update
                            </button>
                            <button className="btn btn-danger">Delete
                            </button>
                            <button className="btn btn-success">Find
                            </button>
                            <button className="btn btn-success">Find All</button>
                        </div>

                    </div>
                </div>
                <p></p>
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Employees</h4>
                    </div>
                    <div className="card-body">

                    </div>
                </div>
            </div>
        );
    }

}

export default Hr;