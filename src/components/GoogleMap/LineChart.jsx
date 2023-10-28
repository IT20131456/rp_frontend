// // import React from 'react';
// // // import { Line } from 'react-chartjs-2';

// // // function LineChart({ data }) {
// // //   const chartData = {
// // //     labels: data.map(item => item.stime),
// // //     datasets: [
// // //       {
// // //         label: 'Average Speed',
// // //         data: data.map(item => item.averageSpeed),
// // //         fill: false,
// // //         borderColor: 'rgba(75,192,192,1)',
// // //         tension: 0.1,
// // //       },
// // //     ],
// // //   };

// // //   return (
// // //     <div>
// // //       <h2>Line Chart</h2>
// // //       <Line data={chartData} />
// // //     </div>
// // //   );
// // // }

// // import { Line } from 'react-chartjs-2';

// // function LineChart({ data }) {
// //   const chartData = {
// //     labels: data.map(item => item.stime),
// //     datasets: [
// //       {
// //         label: 'Average Speed',
// //         data: data.map(item => item.averageSpeed),
// //         fill: false,
// //         borderColor: 'rgba(75, 192, 192, 1)',
// //         tension: 0.1,
// //       },
// //     ],
// //   };

// //   const chartOptions = {
// //     scales: {
// //       x: {
// //         type: 'category', // Use category scale for x-axis
// //         title: {
// //           display: true,
// //           text: 'Time', // X-axis label
// //         },
// //       },
// //       y: {
// //         title: {
// //           display: true,
// //           text: 'Average Speed', // Y-axis label
// //         },
// //       },
// //     },
// //   };

// //   return <Line data={chartData} options={chartOptions} />;
// // }


// // export default LineChart;


// import React from 'react';
// import { Line } from 'react-chartjs-2';

// function LineChart({ data }) {
//   const chartData = {
//     labels: data.map(item => item.stime),
//     datasets: [
//       {
//         label: 'Average Speed',
//         data: data.map(item => ({
//           x: new Date().setHours(...item.stime.split(':'), 0, 0), // Convert time to Date object
//           y: item.averageSpeed,
//         })),
//         fill: false,
//         borderColor: 'rgba(75, 192, 192, 1)',
//         tension: 0.1,
//       },
//     ],
//   };

//   const chartOptions = {
//     scales: {
//       x: {
//         type: 'time', // Use "time" scale for x-axis
//         title: {
//           display: true,
//           text: 'Time',
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Average Speed',
//         },
//       },
//     },
//   };

//   return <Line data={chartData} options={chartOptions} />;
// }

// export default LineChart;



// import React from 'react';
// import { Line } from 'react-chartjs-2';

// function LineChart({ data }) {
//   const chartData = {
//     labels: data.map(item => item.stime),
//     datasets: [
//       {
//         label: 'Average Speed',
//         data: data.map(item => ({
//           x: item.stime,
//           y: item.averageSpeed,
//         })),
//         fill: false,
//         borderColor: 'rgba(75, 192, 192, 1)',
//         tension: 0.1,
//       },
//     ],
//   };

//   const chartOptions = {
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Time',
//         },
//         type: 'time',
//         time: {
//           parser: 'HH:mm', // Specify the time format
//           unit: 'minute', // Choose a suitable time unit
//           displayFormats: {
//             minute: 'HH:mm', // Display format for minutes
//           },
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Average Speed',
//         },
//       },
//     },
//   };

//   return <Line data={chartData} options={chartOptions} />;
// }

// export default LineChart;




// import React from 'react';
// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

// function LineChartComponent({ data }) {
//   return (
//     <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
//       <Line type="monotone" dataKey="averageSpeed" stroke="#8884d8" />
//       <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//       <XAxis dataKey="stime" />
//       <YAxis />
//       <Tooltip />
//     </LineChart>
//   );
// }

// export default LineChartComponent;




import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function LineChartComponent({ data, title }) {
  return (
    <div>
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="stime" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="level" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartComponent;



