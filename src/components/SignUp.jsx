import { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../firebase";
import { updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import SpanText from "./SpanText";
import { registerVersion } from "firebase/app";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return alert("Fill all the fields");
    }
    if (password.length < 6) {
      return alert("Password must be at least 6 characters.");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      navigate("/signin");
    } catch (error) {
      console.log("Error sign up: ", error);
      alert(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };
  return (
    <div className="flex flex-col items-center w-full h-screen justify-center">
      <h1 className="text-2xl font-bold">Sign Up Now</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button title="Sign Up" onClick={handleSignUp} />
      </form>
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
