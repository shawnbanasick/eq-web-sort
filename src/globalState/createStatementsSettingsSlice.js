const createStatementsSettingsSlice = (set, get) => ({
  statementsObj: {},
  columnStatements: {},

  setStatementsObj: (statementsObjInput) => {
    set(() => ({ statementsObj: statementsObjInput }));
  },
  setColumnStatements: (columnStatementsInput) => {
    set(() => ({ columnStatements: columnStatementsInput }));
  },
});

export default createStatementsSettingsSlice;
