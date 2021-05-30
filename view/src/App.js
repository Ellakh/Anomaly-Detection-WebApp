import './App.css';
import Select from "react-select";
import React, { Component } from "react";
import ResultData from './ResultJson';
import axios from 'axios';

const options=[
    {label:"Hybrid",value:'op1'},
    {label:"Regression",value:'op2'}
]

const form = new FormData();

const API_BASE = "http://localhost:3000"

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            normal_file: '',
            test_file: '',
            select1:  '',
        };
    }

    onNormFileUpload() {
        form.append("normFile", normal_file);
        //submitForm("multipart/form-data", formData, (msg) => console.log(msg));
    }

    onTestFileUpload() {
        form.append("anomalyFile", test_file);
        //submitForm("multipart/form-data", formData, (msg) => console.log(msg));
    }

    onSelectAlgo() {
        form.append("anomalyDetectionMethod", select1);
        //
    }

    onSubmitForm() {
        //submitForm("multipart/form-data", form, (msg) => console.log(msg));

        axios({
            url: `${API_BASE}/detect`,
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': contentType
            }
        }).then((response) => {
            setResponse(response.data);
        }).catch((error) => {
            setResponse("error");
        })
    }


//jhkl
    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onChangeSelect = value => {
        this.setState({ select1: value });
    }

    onSubmit = () => {
        const data = new FormData()
        data.append('normal_file', this.state.normal_file)
        data.append('test_file', this.state.test_file)
        axios.post("http://localhost:3000/detect", data).then(res => {
            //console.log(res.statusText)
        })
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
            .post('http://localhost:3000/detect', posting)
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
                <form onSubmit={this.onSubmitForm} encType="multipart/form-data" name="searchFrom" target="result" className="form_">
                    <table className="Table_File">
                        <tr>
                            <td><input type="file" name="normal_file" id="normal_file" onChange={this.onNormFileUpload}/></td>
                            <td>קובץ טיסה רגילה</td>
                        </tr>
                        <tr>
                            <td><input type="file" name="test_file" id="test_file" onChange={this.onTestFileUpload} /></td>
                            <td>קובץ טיסה לבדיקה</td>
                        </tr>
                    </table>
                    <div>
                        <Select name="select1" id="select1" className="select_"  placeholder={'select detection type'}
                                isSearchable={false} options={options} onChange={this.onSelectAlgo}>
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


