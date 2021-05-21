import React, { Component } from 'react';
import data from "./anomalyTemp";

class ATemp extends Component {
    render() {
        return (
            <div>
                <div>
                    <span>Name | </span>
                    <span>Time Step | </span>
                    <span>Description</span>
                </div>
                {
                    data.anomalies.map((anomaly, i) => {
                        return (
                            <div key={i}>
                                <div>
                                    <span>{anomaly.col_name_2} | </span>
                                    <span> {anomaly.time_step} | </span>
                                    <span> {anomaly.description}</span>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
export default ATemp;