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

    state = {

        // Initially, no file is selected
        selectedFile1: null,
        selectedFile2: null,
        select1: ''
    };
    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile1: event.target.files[0] });

    };

    onFileChange1 = event => {

        // Update the state
        this.setState({ selectedFile2: event.target.files[0] });

    };


    



    onChangeSelect = value  => {
        this.setState({ select1: value });
    }

    handleSubmit = e => {
        e.preventDefault();

        // Create an object of formData
        const formData1 = new FormData();

        // Update the formData object
        formData1.append(
            "myFile1",
            this.state.selectedFile1,
        );

        formData1.append(
            "myFile2",
            this.state.selectedFile2,
        );

        formData1.append(
            "selection12",
            this.state.select1
        );

        axios
            .post('http://localhost:8080/detect', formData1)
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


                <table className="Table_File">
                    <tr>
                        <td><input type="file" name="normal_file" id="normal_file" onChange={this.onFileChange1}/></td>
                        <td>קובץ טיסה רגילה</td>
                    </tr>
                    <tr>
                        <td><input type="file" name="test_file" id="test_file" onChange={this.onFileChange} /></td>
                        <td>קובץ טיסה לבדיקה</td>
                    </tr>
                </table>

                <div>
                    <Select name="select1" id="select1" className="select_"  placeholder={'select detection type'}
                            isSearchable={false} options={options} onChange={this.onChangeSelect}>
                    </Select>
                    </div>

                <button value="UPLOAD" name="submit" onClick={this.handleSubmit} />

                <h3>Anomaly List</h3>
                <div className="result_">
                    <ResultData/>
                </div>
            </div>
        );
    }
}


