import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../component/Input";
import ButtonWithProgress from "../component/ButtonWithProgress";
import { loginHandler } from "../redux/authActions";

const LoginPage = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();

  const { handleSubmit, handleChange, errors, touched, values } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username alanı boş bırakılamaz"),
      password: Yup.string().required("Şifre boş bırakılamaz"),
    }),
    onSubmit: async (values) => {
      const { username, password } = values;
      const body = { username, password };

      try {
        await dispacth(loginHandler(body));
        navigate("/");
      } catch (err) {}
    },
  });

  const { username, password } = values;
  const { username: usernameError, password: passwordError } = errors;
  const buttonEnabled = username && password;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Login</h1>
        <Input
          label="Username"
          name="username"
          onChange={handleChange}
          error={touched.username && usernameError}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          error={touched.password && passwordError}
        />

        <div className="text-center">
          <ButtonWithProgress text="Login" disabled={!buttonEnabled} />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
