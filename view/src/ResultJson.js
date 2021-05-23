import React, { Component } from 'react';
import data from "./anomalyTemp";

class ResultData extends Component {
    render() {
        return (
            <div>
                <table width="100%">
                    <tr>
                        <th className="ResultTableTH_">Name</th>
                        <th className="ResultTableTH_">Time Step</th>
                        <th className="ResultTableTH_">Description</th>
                    </tr>
                {
                    data.anomalies.map((anomaly, i) => {
                        return (
                            <tr key={i}>
                                <th className="ResultTableTH_">{anomaly.col_name} </th>
                                <th className="ResultTableTH_"> {anomaly.time_step} </th>
                                <th className="ResultTableTH_"> {anomaly.description}</th>
                            </tr>
                        );
                    })
                }
                </table>
            </div>
        );
    }
}
export default ResultData;