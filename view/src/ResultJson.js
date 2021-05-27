import React, { Component } from 'react';
import data from "../../model/src/anomalies.json";

class ResultData extends Component {
    render() {
        return (
            <div>
                <table width="100%">
                    <tr>
                        <th className="ResultTableTH_">Feature</th>
                        <th className="ResultTableTH_">Time Steps</th>
                    </tr>
                {
                    data.anomalies.map((anomaly, i) => {
                        return (
                            <tr key={i}>
                                <th className="ResultTableTH_">{anomaly.col_name} </th>
                                <th className="ResultTableTH_"> {anomaly.time_step} </th>
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