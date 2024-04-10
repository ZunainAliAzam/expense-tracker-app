import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../config/firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "./styles.css";

export const Auth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    console.log(results);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };

    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense");
  };

  const onButtonClick = () => {
    let isValid = true;

    if (!email) {
      isValid = false;
    }
    if (!password) {
      isValid = false;
    }

    if (isValid) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User logged in:", user);
          navigate("/expense");
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log("Error message:", errorMessage);
        });
    }
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Expense Tracker Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
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
