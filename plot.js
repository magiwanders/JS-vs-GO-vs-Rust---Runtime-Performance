export default function draw_plot(data) {
    var plot_data = [
        {
          name: 'Javascript',
          showlegend: true,
          opacity:0.2,
          color:'green',
          type: 'mesh3d',
          x: data.P,
          y: data.N,
          z: data.js_time,
        },
        {
          name: 'Javascript Multithreaded',
          showlegend: true,
          opacity:0.2,
          color:'green',
          type: 'mesh3d',
          x: data.P,
          y: data.N,
          z: data.js_time_multithreaded,
        },
          {
          name: 'Go',
          showlegend: true,
          opacity:0.2,
          color:'blue',
          type: 'mesh3d',
          x: data.P,
          y: data.N,
          z: data.go_time,
        },
          {
          name: 'Go Multithreaded',
          showlegend: true,
          opacity:0.2,
          color:'black',
          type: 'mesh3d',
          x: data.P,
          y: data.N,
          z: data.go_time_multithreaded,
        },
           {
           name: 'Rust',
           showlegend: true,
           opacity:0.2,
           color:'red',
           type: 'mesh3d',
           x: data.P,
           y: data.N,
           z: data.rust_time,
         }
    ];

    var layout = {
    	scene: {
    		xaxis:{title: 'P (number of NxN matrices)'},
    		yaxis:{title: 'N (Size of square 2D Matrix)'},
    		zaxis:{title: 'Mock Multiplication Time (s)'},
    		},
        width: 1000,
        height: 800,
        showlegend: true,
        legend: {
            x: 1,
            xanchor: 'right',
            y: 1
          }
    }
    Plotly.newPlot('3d_plot', plot_data, layout);
}
