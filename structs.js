/********************* The shape of the data is like so: **********************/
// For each timestamp:         |- GraphData
//   Every state has:          |
//     * Vaccine Rate          |                 |- State
//     * Hospitalization Rate  |                 |
//
// To animate the graph, we'll flip through each GraphData object using the
// 'update' function we're defining in plotly.js
/******************************************************************************/

class GraphData {
  constructor(timestamp, states) {
    // Timestamp in <TODO what format> format
    this.timestamp = timestamp

    // List of states
    this.states = states
  }
}

class State {
  constructor(state_code, vacc_rate, hosp_rate) {
    this.state_code = state_code;
    this.vacc_rate = vacc_rate;
    this.hosp_rate = hosp_rate;
  }
}
