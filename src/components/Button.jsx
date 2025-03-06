const Button = ({ title, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="bg-gray-700 hover:bg-gray-950 text-white px-4 py-2 rounded-md cursor-pointer transition-all ease-in-out duration-200"
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
