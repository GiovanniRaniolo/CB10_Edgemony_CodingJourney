import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const useFilter = () => {
  return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
  const [filterText, setFilterText] = useState("");

  return (
    <FilterContext.Provider value={{ filterText, setFilterText }}>
      {children}
    </FilterContext.Provider>
  );
};
