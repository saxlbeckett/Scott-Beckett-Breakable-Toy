import React, { useState } from "react";
import config from "../../config";
import FormError from "../layout/FormError";
import { Redirect } from "react-router-dom"

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const validateInput = (payload) => {
    setErrors({});
    const { email, password, passwordConfirmation } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }
    setErrors(newErrors);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    validateInput(userPayload);
    if (Object.keys(errors).length === 0) {
      fetch("/api/v1/user-sessions", {
        method: "post",
        body: JSON.stringify(userPayload),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then(() => {
            setShouldRedirect(true);
          });
        } else {
          const errorMessage = `${resp.status} (${resp.statusText})`;
          const error = new Error(errorMessage);
          alert(error)
          throw error;
        }
      });
    }
  };

  if (shouldRedirect) {
    location.href="/"
  }

  return (
    <div className="grid-container" onSubmit={onSubmit}>
      <h1>Sign In to start creating!</h1>
      <form>
        <div>
          <label>
            Email
            <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Sign In" />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
