// Read in the data.json blob into a JSON object - dataxx
//
// This generator function will return the next element
function* trace_generator() {
  for (timestamp in timestamped_data) {
    const julian_data = timestamped_data[timestamp]
    yield julian_data_to_plotly_trace(julian_data)
  }
}
function julian_data_to_plotly_trace(jd) {
  // TODO do the actual transform. We have:
  // * TS obj with 50 keys
  //   * STATE obj with 2-6 keys
  //
  // We need N arrays
  // * Percentage of people who have died: total_deaths/population
  // * Percentage of people who are vaxinated (pop_vax_pct)
  //
  // TODO what's the best way to shape this data for plotly
  return [{"data": d}];
}
const trace_gen = trace_generator();

const plot_options = {
  xaxis: {range: [0, 100]}, // TODO what're the bounds
  yaxis: {range: [0, 100]}, // TODO what're the bounds
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
  let trace = trace_gen.next().value;
  trace[0].mode = 'markers'
  trace[0].name = 'stuff'
  // TODO how do we want the legend to look? I think the trace_gen should be
  // setting the names

  // Grab the DOM element to give to plotly
  Plotly.newPlot(g_graphDiv, trace, plot_options);
}

/******************************************************************************/

// Hardcoded parameter to tell plotly how to animate between our GraphDatas
const animation_options = {
  transition: { duration: 0 },
  frame: {
    duration: 0,
  }
}

// Function to advance the plot by 1 step (adds itself to the event queue, too)
function update() {
  const {trace: value, done} = trace_gen.next()
  if (done) { return; } // no more updates
  Plotly.animate(g_graphDiv, trace, animation_options);
  requestAnimationFrame(update);
}

// Start
init_graph();
requestAnimationFrame(update);
