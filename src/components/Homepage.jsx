import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full max-w-[1280px] mx-auto h-screen justify-center items-center">
      <div className="flex  gap-2 bg-gray-50 w-2/4 h-2/3 items-center justify-center border border-gray-400 border-r-0 rounded-tl-xl rounded-bl-xl">
        <Button title="Sign In" onClick={() => navigate("/signin")} />
        <Button title="Sign Up" onClick={() => navigate("/signup")} />
      </div>

      <div className="flex flex-col gap-4 bg-gray-800 text-white w-2/4 h-2/3 items-center justify-center border border-gray-400 border-l-0 rounded-tr-xl rounded-br-xl">
        <h3 className="text-2xl font-semibold">Welcome to the</h3>
        <h1 className="text-4xl font-bold">Student Attendance System</h1>
      </div>
    </div>
  );
};

export default Homepage;
