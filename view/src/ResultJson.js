import React, { Component } from 'react';
import data from "./anomalyTemp";

class ResultData extends Component {
    render() {
        return (
            <div>
                <table width="100%">
                    <tr>
                        <th className="ResultTableTR_">Name</th>
                        <th className="ResultTableTR_">Time Step</th>
                        <th className="ResultTableTR_">Description</th>
                    </tr>
                {
                    data.anomalies.map((anomaly, i) => {
                        return (
                            <tr key={i}>
                                <th className="ResultTableTR_">{anomaly.col_name_2} </th>
                                <th className="ResultTableTR_"> {anomaly.time_step} </th>
                                <th className="ResultTableTR_"> {anomaly.description}</th>
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