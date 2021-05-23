import './App.css';
import Select from "react-select";
import React from "react";
import ResultData from '../../controller/ResultJson';

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
      <form action="/detect" method="POST" encType="multipart/form-data" name="searchFrom" target="result" className="search_From">
        <table name="tableFile" className="Table_File">
          <tr>
            <td><input type="file" name="normal_file"/></td>
            <td>קובץ טיסה רגילה</td>
          </tr>
          <tr>
            <td><input type="file" name="test_file"/></td>
            <td>קובץ טיסה לבדיקה</td>
          </tr>
        </table>

          <div>
              <Select name="select" className="select_" placeholder={'select detection type'}
               isSearchable={false} options={options}>
              </Select>
          </div>

          <div>
            <input type="submit" value="UPLOAD" name="submit"/>
          </div>

      </form>

        <h3>Anomaly List</h3>
        <div name="result" className="result_">
            <ResultData></ResultData>
        </div>

    </div>
  );
}

export default App;
