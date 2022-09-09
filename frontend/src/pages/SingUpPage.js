import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../component/Input";
import ButtonWithProgress from "../component/ButtonWithProgress";
import { signupHandler } from "../redux/authActions";
import { useApiProgress } from "../shared/ApiProgress";

const SingUpPage = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      passwordRepeat: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Fist Name alanı boş bırakılamaz"),
      lastName: Yup.string().required("Last Name alanı boş bırakılamaz"),
      username: Yup.string().required("Username alanı boş bırakılamaz"),
      password: Yup.string().required("Şifre boş bırakılamaz"),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref("password")], "Şifre aynı olmalı")
        .required("Şifre Tekrar alanı boş bırakılamaz"),
    }),
    onSubmit: (values) => {
      clickSignup(values);
    },
  });

  const clickSignup = async (values) => {
    const { firstName, lastName, username, password } = values;
    const body = { firstName, lastName, username, password };

    try {
      await dispacth(signupHandler(body));
      navigate("/");
    } catch (err) {}
  };


  const pendingApiCallSignup = useApiProgress('/auth/register')
  const pendingApiCallLogin = useApiProgress('/auth/login')

  const pendingApiCall = pendingApiCallLogin || pendingApiCallSignup;
  const {
    firstName: firstNameError,
    lastName: lastNameError,
    username: usernameError,
    password: passwordError,
    passwordRepeat: passwordRepeatError,
  } = errors;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Sign Up</h1>
        <Input
          label="First Name"
          name="firstName"
          onChange={handleChange}
          error={firstNameError}
        />
        <Input
          label="Last Name"
          name="lastName"
          onChange={handleChange}
          error={lastNameError}
        />
        <Input
          label="Username"
          name="username"
          onChange={handleChange}
          error={usernameError}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          error={passwordError}
        />
        <Input
          label="Password Repeat"
          type="password"
          name="passwordRepeat"
          onChange={handleChange}
          error={passwordRepeatError}
        />

        <div className="text-center">
          <ButtonWithProgress
            text="Sign Up"
            disabled={pendingApiCall || passwordRepeatError !== undefined}
            pendingApiCall={pendingApiCall}
          />
        </div>
      </form>
    </div>
  );
};

export default SingUpPage;
