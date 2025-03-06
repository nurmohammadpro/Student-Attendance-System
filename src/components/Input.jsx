const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <div className="w-72">
      <input
        className="p-4 my-2 text-sm rounded-md border border-gray-300 focus:border-gray-400 outline-none w-full"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
