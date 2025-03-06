import { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../firebase";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { Link } from "react-router-dom";
import SpanText from "./SpanText";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.log("Sign In error: ", error);
      alert(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center w-full h-screen justify-center">
      <h1 className="text-2xl font-bold">Sign In Here</h1>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button title="Sign In" onClick={handleSignIn} />
      <p className="text-sm w-full text-center whitespace-nowrap mt-2">
        Don't have an account? Please{" "}
        <Link to="/signup">
          <SpanText text="Sign Up" />
        </Link>{" "}
        here.
      </p>
    </div>
  );
};

export default SignIn;
