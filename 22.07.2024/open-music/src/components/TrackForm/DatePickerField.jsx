import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerField = ({ selected, onChange, error }) => {
  return (
    <div className="relative">
      <label
        className={`block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm ${
          error
            ? "border-red-600 focus-within:border-red-600 focus-within:ring-red-600"
            : "focus-within:border-violet-600 focus-within:ring-violet-600"
        }`}
      >
        <DatePicker
          selected={selected}
          onChange={onChange}
          dateFormat="yyyy-MM-dd"
          className={`peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${
            error ? "placeholder-red-600" : "placeholder-gray-500"
          }`}
          wrapperClassName="h-8 w-full"
          popperClassName="z-50"
          calendarClassName="border border-gray-200 rounded-md shadow-lg"
          popperPlacement="left-start"
          portalId="root"
        />
        <span className="absolute left-3 top-2 -translate-y-2 transform text-xs text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-xs">
          {error ? (
            <span className="text-red-600">{error}</span>
          ) : (
            "Release Date"
          )}
        </span>
      </label>
    </div>
  );
};

export default DatePickerField;
