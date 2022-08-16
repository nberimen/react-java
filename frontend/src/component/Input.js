import React from "react";

const Input = (props) => {
  const { label, name, onChange, type, error, defaultValue } = props;
  const className = error ? "form-control is-invalid" : "form-control";
  return (
    <div className="mb-3">
      <label>{label}</label>
      <input
        className={className}
        name={name}
        type={type}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Input;
