import { useContext } from "react";
import { AuthContext } from "./components/AuthContext";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";

const App = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
<<<<<<< HEAD
    <div
      className="flex flex-col items-center justify-start p-8 w-full max-w-[1280px] mx-auto h-screen
             "
    >
      <div className="flex gap-4 items-center justify-center">
        <img src={StudentLogo} alt="" width={48} />
        <h1 className="text-2xl font-semibold">Student Attendance System</h1>
      </div>
      <div className="flex flex-col w-full gap-2 justify-between">
        <form className="flex flex-grow py-4" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter Student Name"
            className="justify-center items-center flex-grow p-2 rounded-tl-md rounded-bl-md border ring-gray-100 focus:ring-1 focus:ring-gray-400 focus:outline-none"
            value={studentName}
            onChange={changeNameHandler}
=======
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
>>>>>>> 52b3eb6 (signup and signin features has been added)
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
