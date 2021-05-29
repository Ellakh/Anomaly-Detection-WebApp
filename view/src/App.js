import './App.css';
import Select from "react-select";
import React from "react";
import ResultData from './ResultJson';
import { useState } from 'react';

const options=[
    {label:"Hybrid",value:'op1'},
    {label:"Regression",value:'op2'}
]

function App() {
    const [selectDetection, setSelectDetection] = useState("")
  return (
    <div className="App">
      <header className="App-header">
        <h2>Anomaly Detection Server</h2>
      </header>

      <form action="/detect" method="POST" encType="multipart/form-data" name="searchFrom" target="result" className="form_">
        <table className="Table_File">
          <tr>
            <td><input name="norm_file" type="file"/></td>
            <td>קובץ טיסה רגילה</td>
          </tr>
          <tr>
            <td><input name="test_file" type="file"/></td>
            <td>קובץ טיסה לבדיקה</td>
          </tr>
        </table>

          <div>
              <Select name="selectDetect" className="select_" placeholder={'select detection type'}
               isSearchable={false} options={options} onChange={setSelectDetection}>
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
