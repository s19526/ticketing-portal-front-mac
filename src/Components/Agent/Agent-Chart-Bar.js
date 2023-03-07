import {Component} from "react";
import {Bar} from "react-chartjs-2";

export class AgentChartBar extends Component {
    render() {
        return (
            <div className="chart-container">
                <Bar className="m-auto"
                    data={this.props.data}
                    options={{
                        plugins: {
                            title: {
                                display: false
                            },
                            legend: {
                                display: false
                            }
                        }
                    }}
                />
            </div>
        );
    }
}