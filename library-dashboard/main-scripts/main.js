const chartData = {
  labels: ["Return Books", "Borrowed Books", "Issue Books"],
  data: [475, 275, 175],
};
const myChart = document.querySelector(".my-chart");

new Chart(myChart, {
  type: "doughnut",
  data: {
    labels: chartData.labels,
    datasets: [
      {
        label: "Books Overview",
        data: chartData.data,
        backgroundColor: [
          "#2196f3", // Return Books
          "#ffb300", // Borrowed Books
          "#eb2831", // Issue Books
        ],
        borderWidth: 10,
        borderRadius: 2,
        hoverBorderWidth: 0,
      },
    ],
  },
  options: {
    cutout: "75%", // Makes the center bigger for the number
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  },
});
