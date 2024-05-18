import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/AuthSlice";
import { useLogin } from "../Hooks/Query/AuthQuery";
import logo from "../assets/Designer.png";

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length > 6;
};

const Login = () => {
  const dispatch = useDispatch();
  const { isPending: isLoginPending, mutate: login } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allvalid, setAllValid] = useState(false);
  const tempdata = {
    email: "Vivek123@gmail.com",
    password: "Vivek123@",
    name: "Vivek123",
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (validateEmail(email) && validatePassword(password)) {
      setAllValid(true);
    } else {
      setAllValid(false);
    }
  }, [email, password]);

  function handleLogin() {
    const finaldata = {
      email: email,
      password: password,
    };

    login(
      { data: finaldata },
      {
        onSuccess: (data) => {
          dispatch(loginSuccess({ token: data.data.token }));
          navigate("/");
        },
      }
    );

    // const data = {
    //   data: {
    //     token: "token",
    //     user: {
    //       email: tempdata.email,
    //       name: tempdata.name,
    //     },
    //   },
    // };
    // dispatch(loginSuccess({ token: data.data.token, user: data.data.user }));
    // navigate("/");
  }

  function handlefill() {
    setEmail(tempdata.email);
    setPassword(tempdata.password);
  }

  return (
    <div className={styles.container}>
      <div className={styles.outerContainer}>
        <div className={styles.imageContainer}>
          <Image src={logo} alt="logo" width="100px" height="100px" />
        </div>
        <div className={styles.headerContainer}>
          <h2 style={{ margin: "0px" }}>Login</h2>
          <p>Please enter your details</p>
        </div>
        <div className={styles.formContainer}>
          <span className="p-input-icon-left ">
            <InputText
              placeholder="Email"
              style={{
                width: "100%",
                padding: "10px",
              }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </span>
          <span className="p-input-icon-left">
            <InputText
              placeholder="Password"
              style={{
                width: "100%",
                padding: "10px",
              }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </span>
        </div>

        <div className={styles.buttonContainer}>
          <Button
            label="Login"
            raised
            disabled={!allvalid}
            loading={isLoginPending}
            onClick={handleLogin}
          />
        </div>

        <div className={styles.tempdata}>
          <div
            onClick={handlefill}
            style={{
              cursor: "pointer",
              display: "flex",
              gap: "10px",
            }}
          >
            <p>{tempdata.email}</p>
            <p>{tempdata.password}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
