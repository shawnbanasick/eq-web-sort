import create from "zustand";
import { persist } from "zustand/middleware";

const useLocalPersist = create(
  persist(
    (set, get) => ({
      localStoredQsorts: {},

      setLocalStoredQsorts: (inputValue) => {
        set(() => ({ localStoredQsorts: inputValue }));
      },
    }),
    {
      name: "sorts-storage", // unique name
    }
  )
);

export default useLocalPersist;
