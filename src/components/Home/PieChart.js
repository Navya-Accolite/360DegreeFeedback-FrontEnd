import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart, ArcElement } from 'chart.js'
import axios from "axios";

Chart.register(ChartDataLabels);
Chart.register(ArcElement);

function PieExample() {
  const emailId = window.sessionStorage.getItem('emailId');
  const header = "Bearer " + window.sessionStorage.getItem('accessToken');
  const [datas, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4545/api/avgRating/"+emailId, {
      headers: {
        "Content-type": "application/json",
        Authorization: header,
      }
    }).then((response) => setData(response.data));
  }, []);

  const data = datas.map(([id, label, value]) => ({
    label,
    value,
  }));

 const options = {
    title: {
        display: true,
        text: 'My Pie Chart',
    },
    legend: {
        display: true,
        position: 'right',
        labels: {
            fontColor: '#333',
            generateLabels: function(chart) {
                const data = chart.data.datasets[0].data;
                const labels = chart.data.labels;
                const legendLabels = [];

                for (let i = 0; i < data.length; i++) {
                    const color = chart.data.datasets[0].backgroundColor[i];
                    legendLabels.push({
                        text: `${labels[i]}: ${data[i]}`,
                        fillStyle: color
                    });
                }
                
                return legendLabels;
            }
        }
    },
    plugins: {
        datalabels: {
            display: true,
            color: '#fff',
            formatter: function(value, context) {
                return context.chart.data.labels[context.dataIndex];
            }
        }
    }
};


  const colors = ['red', 'green', 'blue', 'orange', 'purple'];

  const datasets = [{
    data: data.map(({ value }) => value),
    backgroundColor: colors.slice(0, data.length),
  }];

  return (
    <div className="col-5 col-sm-3">
        <div className="piechart">
        <Pie data={{ labels: data.map(({ label }) => label), datasets }} options={options} style={{height:"200px"}}/>
        </div>
    </div>
  );
}

export default PieExample;
