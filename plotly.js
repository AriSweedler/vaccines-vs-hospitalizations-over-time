



let data = []
append_fake_data(data);

const plot_options = {
  xaxis: {range: [0, 1]},
  yaxis: {range: [0, 1]}
}
var g_graphDiv = document.getElementById('graph');
function init_graph() {
  // First piece of data
  let d = data[next_index()].to_plotly_format();
  d.mode = 'markers'

  // Grab the DOM element to give to plotly
  Plotly.newPlot(g_graphDiv, [d], plot_options, {showSendToCloud: true});
}

// Helper function to let us step through the 'data' array
let index = -1;
function next_index() {
  index = (index + 1) % data.length;
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
  let l_data = data[next_index()].to_plotly_format();
  Plotly.animate(g_graphDiv, {"data": [l_data]}, animation_options);
  requestAnimationFrame(update);
}

// Start
init_graph(data[0]);
requestAnimationFrame(update);
