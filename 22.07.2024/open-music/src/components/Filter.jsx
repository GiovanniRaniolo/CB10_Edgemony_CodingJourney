import { useFilter } from "../context/FilterContext";

function Filter() {
  const { filterText, setFilterText } = useFilter();

  const handleChange = (e) => {
    setFilterText(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      className="input input-bordered rounded-xl px-2 w-24 md:w-auto text-slate-700"
      value={filterText}
      onChange={handleChange}
    />
  );
}

export default Filter;
