// Ingest data
// Normalize (add 0s if needed)
// shape
let data = []
append_fake_data();
console.log(data);

// Grab the DOM element to give to plotly
var graphDiv = document.getElementById('graph')

// TODO take the structured data from GraphData & turn it into a graph
graph_from_GraphData(gd) {
  // Pull the data outta the GraphData object and put it into X/Y arrays
  // let x = ...

  // Create a new graph
  Plotly.newPlot(graphDiv, [{
    x: x,
    y: z,
    mode: 'markers'
  }], {
    xaxis: {range: [-40, 40]},
    yaxis: {range: [0, 60]}
  })
}

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
