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
    <div className="piehome">
  <div className="piechart-wrapper">
    <div className="piechart">
      <Pie data={{ datasets }} options={options} />
    </div>
    <div className="legend">
      {data.map(({ label }, index) => (
        <div key={index} className="legend-label">
          <span className="legend-color" style={{ backgroundColor: colors[index] }}></span>
          <span className="legend-text">{label}</span>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}

export default PieExample;
