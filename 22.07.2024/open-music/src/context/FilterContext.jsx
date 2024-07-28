import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const useFilter = () => {
  return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
  const [filterText, setFilterText] = useState("");
  const [filteredTrackList, setFilteredTrackList] = useState([]);

  return (
    <FilterContext.Provider
      value={{
        filterText,
        setFilterText,
        filteredTrackList,
        setFilteredTrackList,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
