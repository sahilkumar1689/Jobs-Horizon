// // components/VacancyStats.jsx
// import React from "react";

// // import moreIcon from "../assets/more-icon.svg";

// function VacancyStats() {
//   // In a real application, you would fetch this data from an API
//   return (
//     <div className="vacancy-stats">
//       <div className="section-header">
//         <h3>Vacancy Stats</h3>
//         <button className="filter-btn">
//           <i className="filter-icon"></i>
//         </button>
//       </div>
//       <div className="vacancy-chart">
//         {/* This would typically be a chart component */}
//         <div className="chart-placeholder">
//           <div className="chart-bar"></div>
//           <div className="chart-bar"></div>
//           <div className="chart-bar"></div>
//           <div className="chart-bar"></div>
//           <div className="chart-bar"></div>
//           <div className="chart-bar"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VacancyStats;

// VacancyStatsChart.jsx
import React, { useState, useEffect, useRef } from "react";
// import "./VacancyStatsChart.css";

const VacancyStatsChart = () => {
  let data = [];
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  // Sample data if none is provided
  useEffect(() => {
    if (data.length === 0) {
      setChartData([
        { month: "01", order: 10, refunds: 70, earnings: 120 },
        { month: "02", order: 20, refunds: 60, earnings: 120 },
        { month: "03", order: 30, refunds: 80, earnings: 130 },
        { month: "04", order: 30, refunds: 80, earnings: 150 },
        { month: "05", order: 40, refunds: 110, earnings: 180 },
        { month: "06", order: 10, refunds: 90, earnings: 170 },
        { month: "07", order: 20, refunds: 110, earnings: 190 },
        { month: "08", order: 20, refunds: 110, earnings: 190 },
        { month: "09", order: 10, refunds: 30, earnings: 140 },
        { month: "10", order: 70, refunds: 160, earnings: 225 },
        { month: "11", order: 80, refunds: 100, earnings: 180 },
        { month: "12", order: 20, refunds: 100, earnings: 175 },
      ]);
    } else {
      setChartData(data);
    }
  }, []);

  // Get max value for scaling
  const maxValue = Math.max(
    ...chartData.map((item) =>
      Math.max(item.order, item.refunds, item.earnings)
    )
  );
  const yAxisMax = Math.ceil(maxValue / 50) * 50;

  // Update dimensions on window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (chartRef.current) {
        const width = chartRef.current.clientWidth;
        setDimensions({
          width: width,
          height: Math.min(width * 0.5, 300), // Responsive height based on width
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Calculate position based on value
  const getYPosition = (value) => {
    return 200 - (value / yAxisMax) * 180;
  };

  // Generate line points
  const generateLinePath = (key) => {
    const points = chartData
      .map((item, index) => {
        const x =
          50 + index * ((dimensions.width - 100) / (chartData.length - 1));
        const y = getYPosition(item[key]);
        return `${x},${y}`;
      })
      .join(" ");
    return points;
  };

  // Generate area path
  const generateAreaPath = (key) => {
    const startX = 50;
    const endX =
      50 +
      ((dimensions.width - 100) / (chartData.length - 1)) *
        (chartData.length - 1);
    const baseline = 200;

    const linePoints = chartData
      .map((item, index) => {
        const x =
          50 + index * ((dimensions.width - 100) / (chartData.length - 1));
        const y = getYPosition(item[key]);
        return `${x},${y}`;
      })
      .join(" ");

    return `M${startX},${baseline} L${startX},${getYPosition(
      chartData[0][key]
    )} L${linePoints} L${endX},${baseline} Z`;
  };

  // Y-axis tick values
  const yAxisTicks = [
    0,
    yAxisMax / 4,
    yAxisMax / 2,
    (yAxisMax * 3) / 4,
    yAxisMax,
  ];

  return (
    <div className="vacancy-stats-container" ref={chartRef}>
      <h2 className="vacancy-stats-title">Vacancy Stats</h2>

      <div className="chart-wrapper">
        <svg
          viewBox={`0 0 ${dimensions.width} 300`}
          className="vacancy-chart"
          width={dimensions.width}
          height={dimensions.height}
        >
          {/* Grid lines */}
          {yAxisTicks.map((tick, index) => (
            <line
              key={`grid-${index}`}
              x1="50"
              y1={200 - index * 45}
              x2={dimensions.width - 50}
              y2={200 - index * 45}
              className="grid-line"
            />
          ))}

          {/* Y-axis labels */}
          {yAxisTicks.map((tick, index) => (
            <text
              key={`y-label-${index}`}
              x="40"
              y={204 - index * 45}
              className="axis-label y-axis-label"
            >
              {tick}
            </text>
          ))}

          {/* X-axis labels (months) */}
          {chartData.map((item, index) => (
            <text
              key={`x-label-${index}`}
              x={
                50 + index * ((dimensions.width - 100) / (chartData.length - 1))
              }
              y="220"
              className="axis-label x-axis-label"
            >
              {item.month}
            </text>
          ))}

          {/* Area charts */}
          {/* <path d={generateAreaPath("order")} className="area area-order" />
          <path d={generateAreaPath("refunds")} className="area area-refunds" />
          <path
            d={generateAreaPath("earnings")}
            className="area area-earnings"
          /> */}

          {/* Lines */}
          <polyline
            points={generateLinePath("order")}
            className="line line-order"
          />
          <polyline
            points={generateLinePath("refunds")}
            className="line line-refunds"
          />
          <polyline
            points={generateLinePath("earnings")}
            className="line line-earnings"
          />

          {/* Data points */}
          {chartData.map((item, index) => (
            <React.Fragment key={`points-${index}`}>
              <circle
                cx={
                  50 +
                  index * ((dimensions.width - 100) / (chartData.length - 1))
                }
                cy={getYPosition(item.order)}
                r="4"
                className="data-point data-point-order"
              />
              <circle
                cx={
                  50 +
                  index * ((dimensions.width - 100) / (chartData.length - 1))
                }
                cy={getYPosition(item.refunds)}
                r="4"
                className="data-point data-point-refunds"
              />
              <circle
                cx={
                  50 +
                  index * ((dimensions.width - 100) / (chartData.length - 1))
                }
                cy={getYPosition(item.earnings)}
                r="4"
                className="data-point data-point-earnings"
              />
            </React.Fragment>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color legend-color-order"></div>
          <span className="legend-label">Order</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-color-refunds"></div>
          <span className="legend-label">Refunds</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-color-earnings"></div>
          <span className="legend-label">Earnings</span>
        </div>
      </div>
    </div>
  );
};

export default VacancyStatsChart;
