import UserIcon from "../assets/user-icon.svg";
import StudentLogo from "../assets/student-logo.svg";
import Button from "./Button";
import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase";

const Navbar = () => {
  const [dropdownvisibility, setDropdownvisibility] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const showProfile = location.pathname === "/dashboard";

  console.log("User object:", user);
  if (loading) return null;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  return (
    <div className="relative flex items-center justify-between w-full max-w-[1280px] mx-auto py-4">
      <Link to="/">
        <div className="flex gap-4 items-center justify-center">
          <img src={StudentLogo} alt="" width={48} />
          <h1 className="text-2xl font-semibold">Student Attendance System</h1>
        </div>
      </Link>
      <div>
        {showProfile && user && (
          <img
            className="cursor-pointer"
            src={UserIcon}
            alt="User"
            width={32}
            onClick={() => setDropdownvisibility(!dropdownvisibility)}
          />
        )}
      </div>
      {dropdownvisibility && user && (
        <div className="absolute flex flex-col items-end justify-between p-4 right-0 top-14 transition-all ease-in-out duration-500 w-48 h-72 bg-gray-100 rounded-md shadow z-10">
          <div className="px-4 py-2 rounded-md bg-gray-50 text-gray-800 flex items-center justify-end">
            <h1 className="font-medium text-lg">
              {user?.displayName || "Guest"}
            </h1>
          </div>
          <Button title="Sign Out" onClick={handleSignOut} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
