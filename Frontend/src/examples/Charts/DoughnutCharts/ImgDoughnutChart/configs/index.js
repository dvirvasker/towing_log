/* eslint-disable consistent-return */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/* eslint-disable no-dupe-keys */
// Material Dashboard 2 React base styles
import colors from "assets/theme/base/colors";

const { gradients, dark } = colors;

function configs(labels, datasets, cutout = 60, datalabels) {
  const backgroundColors = [];

  if (datasets.backgroundColors) {
    datasets.backgroundColors.forEach((color) => {
      if (gradients[color]) {
        if (color === "mekatnar") {
          backgroundColors.push(gradients.mekatnar.main);
        } else {
          backgroundColors.push(gradients[color].state);
        }
      } else {
        backgroundColors.push(dark.main);
      }
    });
  } else {
    backgroundColors.push(dark.main);
  }

  return {
    data: {
      labels,
      datasets: [
        {
          label: datasets.label,
          weight: 9,
          cutout,
          tension: 0.9,
          pointRadius: 2,
          borderWidth: 2,
          backgroundColor: backgroundColors,
          fill: false,
          data: datasets.data,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
        },
        datalabels: {
          font: {
            size: 14,
            weight: "bold",
          },
          textAlign: "center",
          textFont: "Rubik",
          color: "rgb(246, 241, 238)",
          formatter: (value) => {
            if (value === 0) {
              return "";
            }
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
          },
          ticks: {
            display: false,
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
          },
          ticks: {
            display: false,
          },
        },
      },
    },
    plugins: [datalabels],
  };
}

export default configs;
