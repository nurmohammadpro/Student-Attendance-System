import StudentLogo from "./assets/student-main-logo.svg";

const App = () => {
  return (
    <div
      className="flex flex-col items-center justify-start p-8 w-full max-w-[1280px] mx-auto h-screen
     "
    >
      <div className="flex gap-4 items-center justify-center">
        <img src={StudentLogo} alt="" width={48} />
        <h1 className="text-2xl font-semibold">Student Attendance App</h1>
      </div>
      <div className="flex w-full gap-2 justify-between">
        <form className="flex flex-grow py-4">
          <input
            type="text"
            placeholder="Enter Student Name"
            className="justify-center items-center flex-grow p-2 rounded-tl-md rounded-bl-md border ring-gray-100 focus:ring-1 focus:ring-gray-400 focus:outline-none"
          />
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-br-md rounded-tr-md cursor-pointer
          "
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
