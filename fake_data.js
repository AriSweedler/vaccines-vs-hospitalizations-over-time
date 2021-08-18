function append_fake_data(data) {
  // Each "timestamp" object is a date object + data for all states
  let ts_1 = GraphData(
    "March 15th",
    [
      State("CA", 0.5, 0.5))
      State("NY", 0.6, 0.6))
      State("AUS", 0.6, 0.5))
    ]);
  let ts_2 = GraphData(
    "March 16th",
    [
      State("CA", 0.5, 0.5))
      State("NY", 0.6, 0.6))
      State("AUS", 0.6, 0.5))
    ]);

  // The data is a list of timestamps
  data.append([ts_1, ts_2]);
}
