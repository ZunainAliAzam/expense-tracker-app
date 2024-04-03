import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import "./index.css";

export const Auth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    console.log(results);
  };
  const navigate = useNavigate();

  const onButtonClick = () => {
    // You'll update this function later...
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
      </div>
      <div className="inputGoogle">
        <input
            className={"googleButton"}
            type="button"
            onClick={signInWithGoogle}
            value={"Sign in with Google"}
        />
      </div>
    </div>
  );
};