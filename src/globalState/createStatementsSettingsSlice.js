const createStatementsSettingsSlice = (set, get) => ({
  statementsObj: {},
  columnStatements: {},
  resetColumnStatements: {},

  setStatementsObj: (statementsObjInput) => {
    set(() => ({ statementsObj: statementsObjInput }));
  },
  setColumnStatements: (columnStatementsInput) => {
    set(() => ({ columnStatements: columnStatementsInput }));
  },
  setResetColumnStatements: (inputValue) => {
    set(() => ({ resetColumnStatements: inputValue }));
  },
});

export default createStatementsSettingsSlice;
