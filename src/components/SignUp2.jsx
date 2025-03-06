import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";

const SignUp2 = () => {
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
    <div>
      <h1>Sign Up Here</h1>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default SignUp2;
