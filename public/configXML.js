const configXML = {
  horiCardMinHeight: 100,
  totalStatements: 30,
  headerColorsArray: [
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
  ],
  columnColorsArray: [
    "#ffcbcb",
    "#ffd8d8",
    "#ffe5e5",
    "#f5f5f5",
    "#d6f5d6",
    "#c1f0c1",
    "#adebad",
  ],
  sortCharacteristics: {
    qSortPattern: [3, 4, 5, 6, 5, 4, 3],
    qSortHeaders: ["N3", "N2", "N1", 0, 1, 2, 3],
    forcedSorts: true,
    qSortHeaderNumbers: ["-3", "-2", "-1", "0", "+1", "+2", "+3"],
  },
  out: true,
};

window.configXML = configXML;
