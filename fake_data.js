function append_fake_data(data) {
  // Each "timestamp" object is a date object + data for all states
  let ts_1 = new GraphData(
    "March 15th",
    [
      new State("CA", 0.5, 0.5),
      new State("NY", 0.6, 0.6),
      new State("AUS", 0.6, 0.7),
    ]);
  let ts_2 = new GraphData(
    "March 16th",
    [
      new State("CA", 0.8, 0.5),
      new State("NY", 0.8, 0.6),
      new State("AUS", 0.8, 0.7),
    ]);

  // The data is a list of timestamps
  data.push(ts_1)
  data.push(ts_2);
}
