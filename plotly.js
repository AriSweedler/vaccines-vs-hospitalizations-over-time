// Ingest data
// Normalize (add 0s if needed)
// shape
let data = []
append_fake_data(data);
console.log("fake data: ", data);
console.log("fake GraphData: ", data[0]);

// Grab the DOM element to give to plotly
var graphDiv = document.getElementById('graph');

// TODO take the structured data from GraphData & turn it into a graph
function graph_from_GraphData(gd) {
  // Pull the data outta the GraphData object:
  // * X is percent fully vaccinated (0 to 100)
  // * Y is hospitalizations per 100,000 residents
  let x = gd.states.map(state => state.vacc_rate);
  let y = gd.states.map(state => state.hosp_rate);
  console.log("Vacc rate list: ", x)
  console.log("Hosp rate list: ", y)

  // Create a new graph
  Plotly.newPlot(graphDiv, [{
    x: x,
    y: y,
    mode: 'markers'
  }], {
    xaxis: {range: [0, 1]},
    yaxis: {range: [0, 1]}
  })
}
graph_from_GraphData(data[0]);

/******************************************************************************/
// Advance the plot by 1 step
function update () {
  // Get the next pieces of data into the right spot
  // compute();

  Plotly.animate(graphDiv, {
    data: [{x: x, y: z}]
  }, {
    transition: {
      duration: 0
    },
    frame: {
      duration: 0,
      redraw: false
    }
  });

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
