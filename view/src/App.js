import './App.css';
import Select from "react-select";
import React from "react";
import ResultData from './ResultJson';

const options=[
    {label:"Hybrid",value:'op1'},
    {label:"Regression",value:'op2'}
]



function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h2>Anomaly Detection Server</h2>
            </header>

            <form action="/detect" method="post" encType="multipart/form-data" name="searchFrom" target="result" className="form_">
                <table className="Table_File">
                    <tr>
                        <td><input type="file" name="normal_file" id="normal_file" value="value"/></td>
                        <td>קובץ טיסה רגילה</td>
                    </tr>
                    <tr>
                        <td><input type="file" name="test_file" id="test_file" value="value"/></td>
                        <td>קובץ טיסה לבדיקה</td>
                    </tr>
                </table>

                <div>
                    <Select name="select" id="select" className="select_" value="value" placeholder={'select detection type'}
                            isSearchable={false} options={options}>
                    </Select>
                </div>

                <input type="submit" value="UPLOAD" name="submit"/>
            </form>

            <h3>Anomaly List</h3>
            <div className="result_">
                <ResultData/>
            </div>
        </div>
    );
}

export default App;