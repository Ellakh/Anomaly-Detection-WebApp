import './App.css';
import Select from "react-select";
import React, { Component } from "react";
import ResultData from './ResultJson';
import axios from 'axios';


const options=[
    {label:"Hybrid",value:'op1'},
    {label:"Regression",value:'op2'}
]


export default class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            normal_file: '',
            test_file: '',
            select1: '',
        };
    }


    

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onChangeSelect = value => {
        this.setState({ select1: value });
    }

    handleSubmit = e => {
        e.preventDefault();

        const { normal_file, test_file, select1 } = this.state;

        const posting = {
            normal_file,
            test_file,
            select1,
        };
        console.log(normal_file);

        axios
            .post('http://localhost:8080/detect', posting)
            .then(() => console.log('posting Created'))
            .catch(err => {
                console.error(err);
            });
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h2>Anomaly Detection Server</h2>
                </header>

                <form onSubmit={this.handleSubmit} encType="multipart/form-data" name="searchFrom" target="result" className="form_">
                    <table className="Table_File">
                        <tr>
                            <td><input type="file" name="normal_file" id="normal_file" onChange={this.handleInputChange}/></td>
                            <td>קובץ טיסה רגילה</td>
                        </tr>
                        <tr>
                            <td><input type="file" name="test_file" id="test_file" onChange={this.handleInputChange} /></td>
                            <td>קובץ טיסה לבדיקה</td>
                        </tr>
                    </table>

                    <div>
                        <Select name="select1" id="select1" className="select_"  placeholder={'select detection type'}
                                isSearchable={false} options={options} onChange={this.onChangeSelect}>
                        </Select>
                    </div>

                    <input type="submit" value="UPLOAD" name="submit" />
                </form>

                <h3>Anomaly List</h3>
                <div className="result_">
                    <ResultData/>
                </div>
            </div>
        );
    }
}


