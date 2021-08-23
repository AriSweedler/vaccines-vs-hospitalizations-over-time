function append_fake_data(data) {
  // Each "timestamp" object is a date object + data for all states
  data.push(new GraphData(
    "March 15th",
    [
      new State("CA", 0.5, 0.5),
      new State("NY", 0.6, 0.6),
      new State("AUS", 0.6, 0.7),
    ])
  );
  data.push(new GraphData(
    "March 16th",
    [
      new State("CA", 0.5, 0.8),
      new State("NY", 0.6, 0.8),
      new State("AUS", 0.6, 0.8),
    ])
  );
  data.push(new GraphData(
    "March 17th",
    [
      new State("CA", 0.5, 0.9),
      new State("NY", 0.6, 0.9),
      new State("AUS", 0.6, 0.9),
    ])
  );
}
