const InputField = ({ id, label, value, onChange, error }) => {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`relative block overflow-hidden rounded-md border px-3 pt-3 shadow-sm transition-all duration-300 ease-in-out ${
          error
            ? "border-red-600 focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600"
            : "border-gray-200 focus-within:border-violet-600 focus-within:ring-1 focus-within:ring-violet-600"
        }`}
      >
        <input
          type="text"
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder=" "
          className={`peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm transition-all duration-300 ease-in-out ${
            error ? "placeholder-red-600" : "placeholder-gray-500"
          }`}
        />
        <span
          className={`absolute start-3 top-3 -translate-y-1/2 text-xs transition-all duration-300 ease-in-out ${
            error
              ? "text-red-600"
              : "peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs text-gray-700"
          }`}
        >
          {error ? <span className="text-red-600">{error}</span> : label}
        </span>
      </label>
    </div>
  );
};

export default InputField;
