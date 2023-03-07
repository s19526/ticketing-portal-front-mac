import {Component} from "react";
import { Doughnut} from "react-chartjs-2";

export class AgentChartDonut extends Component {
    render() {
        return (
            <div className="chart-container" >
                <Doughnut className="m-auto"
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