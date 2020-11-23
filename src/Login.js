import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
    const [state, dispatch] = useStateValue();
  
    const signIn = () => {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result);
          dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    };

  return (
    <div className="login">
     
      <div className="login__container">
        <img
          src="https://cdn.dribbble.com/users/85031/screenshots/1275110/chords-logo.png"
          
          alt=""
        />
        <h1>Sign in to Chords</h1>
        <p>www.chords.com</p>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default Login;
