import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Anomaly Detection Server</h1>
      </header>
      <form action="/detect" method="POST" encType="multipart/form-data" className="searchFrom" target="result">
        <table className="tableFile" >
          <tr>
            <td><input type="file" className="normal_file"/></td>
            <td>קובץ טיסה רגילה</td>
          </tr>
          <tr>
            <td><input type="file" className="test_file"/></td>
            <td>קובץ טיסה לבדיקה</td>
          </tr>
        </table>

          <div>
            <input type="submit" value="UPLOAD" className="submit"/>
          </div>
      </form>

      <div>
        <iframe className="result" width="80%" height="500">Result will be here.</iframe>
      </div>

    </div>
  );
}

export default App;
