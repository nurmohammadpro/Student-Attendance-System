import { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import SpanText from "./SpanText";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passsword, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        passsword
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });
      navigate("/signin");
    } catch (error) {
      console.log("Error Sign Up: ", error);
      alert(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center w-full h-screen justify-center">
      <h1 className="text-2xl font-bold">Sign Up Now</h1>
      <Input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Enter your password"
        value={passsword}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button title="Sign Up" onClick={handleSignUp} />
      <p className="text-sm w-full text-center whitespace-nowrap mt-2">
        Already have an account? Please{" "}
        <Link to="/signin">
          <SpanText text="Sign in" />
        </Link>{" "}
        here.
      </p>
    </div>
  );
};

export default SignUp;
