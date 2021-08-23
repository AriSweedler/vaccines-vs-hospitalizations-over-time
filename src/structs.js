/********************* The shape of the data is like so: **********************/
// For each timestamp:         |- Trace
//   Every state has:          |
//     * Vaccine Rate          |                 |- State
//     * Hospitalization Rate  |                 |
//
// To animate the graph, we'll flip through each Trace object using the
// 'update' function we're defining in plotly.js
/******************************************************************************/

/* A state object looks like:
 *
 *  "MA": {
 *    "total_cases": 375178.0,
 *    "total_deaths": 12613.0,
 *    "pop_vax_pct": 0.0,
 *    "twelve_vax_pct": 0.0,
 *    "eighteen_vax_pct": 0.0,
 *    "old_vax_pct": 0.0
 *  },
 *
 *  Where all of the fields past total_cases and total_deaths are potentially
 *  nullable
 */
