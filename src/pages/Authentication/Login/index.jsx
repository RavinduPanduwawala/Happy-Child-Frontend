import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import { post } from "../../../helpers/apiHelper";
import { Button, Spinner } from "reactstrap";
import { validateEmail } from "../../../helpers/Validators/validateEmail";

const Login = () => {
  // Set Email Value, Initially Email value is empty
  const [email, setEmail] = useState("");

  // Set password value, Initially password value is empty
  const [password, setPassword] = useState("");

  // Save loading status when click the login button
  const [isLoading, setIsLoading] = useState(false);

  // Navigation function to redirect pages, import from react-router-dom library
  const navigate = useNavigate();

  // Async funtion for login, wait for request response
  const handleLoginButtonClick = async (e) => {
    // Validate email
    if (!email) {
      return toast.error("Empty Email Address!", {
        autoClose: 3000,
      });
    } else if (!validateEmail(email)) {
      return toast.error("Invalid Email Address!", {
        autoClose: 3000,
      });
    } else if (!password) {
      return toast.error("Empty Password!", {
        autoClose: 3000,
      });
    }

    // Set loading status
    setIsLoading(true);

    // try catch for send api request
    try {
      // Prepare data for request to send API
      let payload = {
        email,
        password,
      };

      // Send API await post request, wait for response
      const res = await post(`/user/login`, payload);

      // handle error, if response False
      if (res.error) {
        // Set loading button false
        setIsLoading(false);

        // return toast message
        return toast.error("Something went wrong", {
          autoClose: 3000,
        });
      }

      // show toast message
      toast.success("Login successfully!", {
        autoClose: 3000,
      });

      // Save user data to Browser Local Storage
      localStorage.setItem("TOKEN", res.data.token);
      localStorage.setItem("USER", JSON.stringify(res.data.user));

      // Rerirect to home page
      navigate("/");

      // Set loading false
      setIsLoading(false);
    } catch (error) {
      // If error show toast error
      toast.error("An error occurred while logging!", {
        autoClose: 1000,
      });

      // Set loading false
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage:
          "url('https://www.careforkids.com.au/image/blog/articleimage/832413df-4412-45f2-ad3e-b4858d60de29?width=1300')",
        backgroundSize: "cover",
      }}
    >
      <div className="card w-50 p-4">
        <h2 className="mb-4 text-center">Welcome to Happy Child</h2>
        <div className="text-center">
          <div className="mb-3 text-start">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            color="primary"
            onClick={handleLoginButtonClick}
            disabled={isLoading}
            className="w-50 mt-4"
          >
            {isLoading ? <Spinner size="sm" color="light" /> : "Login"}
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
