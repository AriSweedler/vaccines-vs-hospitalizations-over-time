



let vaccination_data = []
append_fake_data(vaccination_data);

const plot_options = {
  xaxis: {range: [0, 1]},
  yaxis: {range: [0, 1]},
  showlegend: true,
  legend: {
    bgcolor: '#E2E2E2',
    bordercolor: '#2F2F2F',
    borderwidth: 2,
    x: 0.3,
    y: 0.3
  }
}
var g_graphDiv = document.getElementById('graph');
function init_graph() {
  // First piece of data
  let trace = vaccination_data[next_index()].to_plotly_trace();
  trace.mode = 'markers'
  trace.name = "Stuff"
  let data = [trace]

  // Grab the DOM element to give to plotly
  Plotly.newPlot(g_graphDiv, data, plot_options);
}

// Helper function to let us step through the 'vaccination_data' array
let index = -1;
function next_index() {
  index = (index + 1) % vaccination_data.length;
  return index;
}

/******************************************************************************/

// Hardcoded parameter to tell plotly how to animate between our GraphDatas
const animation_options = {
  transition: { duration: 100 },
  frame: {
    duration: 1000,
  }
}

// Function to advance the plot by 1 step (adds itself to the event queue, too)
function update() {
  let l_data = {
    "data": [vaccination_data[next_index()].to_plotly_trace()],
  };
  Plotly.animate(g_graphDiv, l_data, animation_options);
  requestAnimationFrame(update);
}

// Start
init_graph();
requestAnimationFrame(update);
