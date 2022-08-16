import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signup } from "../api/apiCalls";
import Input from "../component/Input";
import ButtonWithProgress from "../component/ButtonWithProgress";

const SingUpPage = () => {
  const { handleSubmit, handleChange, errors, touched } = useFormik({
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
    onSubmit: async (values) => {
      const { firstName, lastName, username, password } = values;
      const body = { firstName, lastName, username, password };

      try {
        await signup(body);
      } catch (err) {}
    },
  });
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
          error={touched.firstName && firstNameError}
        />
        <Input
          label="Last Name"
          name="lastName"
          onChange={handleChange}
          error={touched.lastName && lastNameError}
        />
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
        <Input
          label="Password Repeat"
          type="password"
          name="passwordRepeat"
          onChange={handleChange}
          error={touched.passwordRepeat && passwordRepeatError}
        />

        <div className="text-center">
          <ButtonWithProgress
            text="Sign Up"
            disabled={passwordRepeatError !== undefined}
          />
        </div>
      </form>
    </div>
  );
};

export default SingUpPage;
