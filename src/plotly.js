// Ari Sweedler
// Julian Hamama
// Make a plotly graph of some vaccination data

/******************************************************************************/
/******************************************************************************/
/************************ TODO remove after debugging *************************/
// This stuff can all be removed in production. It's just useful to know what
// to set the bounds of our axis to be.
let global_max = {x: 0, y: 0};
let data_index = 0;
function do_debugging_statistics_stuff(axis)
{
  // Calculate the maximum value for each axis and store it in a global
  let local_max = {
    x: Math.max(...axis.x),
    y: Math.max(...axis.y),
  }
  global_max = {
    x: Math.max(local_max.x, global_max.x),
    y: Math.max(local_max.y, global_max.y),
  }
  // I happen to know we have 574 pieces of data
  console.log(`Generating data frame ${++data_index}/574`);
  if (data_index >= 574) console.log("global_max: ", global_max);
}
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/

// We read in the data.json blob into a JSON object - 'timestamped_data'. This
// generator function will return the next element
function* trace_generator()
{
  // For each timestamp, generate a trace
  // . Generate - yield a value without returning from this function. It's a way
  //   to lazily compute stuff so we don't have to do it all up front)
  // . trace - i don't really know but you can't just give data to plotly. You
  //   have to give it in a special format. I think they call it a trace? Not
  //   sure, don't care too much. For this code I call it a trace.
  for (timestamp in timestamped_data) {
    const raw_data = timestamped_data[timestamp]
    yield raw_data_to_plotly_trace(raw_data)
  }
}

// Online data -> CSV -> JSON w/ relevant data -> plotly trace. This is '->'
// number 3 in that whole ordeal
function raw_data_to_plotly_trace(raw_data)
{
  let axis = {x: [], y: []}

  // Add each state's data into the axis @ the state's hardcoded index
  for (state_code in raw_data) {
    let index = state_code_to_index[state_code]
    let state_data = raw_data[state_code]

    // The x axis is percent fully vaccinated.
    let pct_fully_vaccinated = state_data.pop_vax_pct;
    if (!pct_fully_vaccinated) pct_fully_vaccinated = 0;
    axis.x[index] = pct_fully_vaccinated

    // The y axis is deaths / 100,000 people
    // If the population is 1 million & we have 2 deaths, that's 2*0.1    deaths/100k
    // If the population is 1 person  & we have 2 deaths, that's 2*100000 deaths/100k
    const per_100k = 100000 / total_state_population[state_code];
    let deaths_per_100k = state_data.total_deaths * per_100k;
    if (!deaths_per_100k) deaths_per_100k = 0;
    axis.y[index] = deaths_per_100k

/******************************************************************************/
    // TODO this is just so I can see stuff show up but it's just garbage instead of data lol
    axis.x[index] = Math.random() * 100;
    axis.y[index] = Math.random() * 100;
/******************************************************************************/
  }

  // TODO remove this when done
  do_debugging_statistics_stuff(axis);

  return {"data": [axis]};
}
const trace_gen = trace_generator();

var g_graphDiv = document.getElementById('graph');
const layout = {
/*************** TODO what should the bounds be for this plot? ****************/
  xaxis: {range: [0, 100]},
  yaxis: {range: [0, 100]},
/******************************************************************************/
  // TODO how do we want the legend to look?
  showlegend: true,
  legend: {
    bgcolor: '#E2E2E2',
    bordercolor: '#2F2F2F',
    borderwidth: 2,
    x: 0.3,
    y: 0.3
  }
}
function init_graph()
{
  // Get the first piece of data. This is type gynmastics. (Or, data shape
  // gymnastics).
  //
  // I have the generator return data all packed up to be animated, so we have
  // to unpack it to initialize a regular graph
  let data = [trace_gen.next().value.data[0]];
  data[0].mode = 'markers'
  data[0].name = 'stuff'

  // Grab the DOM element to give to plotly
  Plotly.newPlot(g_graphDiv, data, layout);
}

/******************************************************************************/

// Hardcoded parameter to tell plotly how to animate between our GraphDatas
const animation_options = {
  transition: { duration: 40 },
  frame: {
    duration: 50,
  }
}

// Advance the plot by 1 step. Doesn't render immediately, just adds itself to
// the event queue
function update()
{
  const {value, done} = trace_gen.next()
  if (done) { return; } // No more update
  Plotly.animate(g_graphDiv, value, animation_options);
  requestAnimationFrame(update);
}

// Start
init_graph();
requestAnimationFrame(update);
