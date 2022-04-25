/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import {
//   loginUser
// } from "../../redux/reducers/user";
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { loginUser, userSelector } from "redux/reducers/user";
import { clearState } from "redux/reducers/user";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isFetching, isSuccess, isError, errorMessage, successMessage } =
    useSelector(userSelector);

  useEffect(() => {
    if (isError) {
      // alert(errorMessage, isError);
      // dispatch(clearState());
    }
    if (isSuccess) {
      notify(successMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError, errorMessage, isFetching, successMessage]);

  let token = localStorage.getItem("token");
  useEffect(() => {
    try {
      if (token !== null && token !== undefined && token !== "undefined") {
        navigate("/");
      } else {
        navigate("/authentication/sign-in");
      }
    } catch (error) {
      alert(error);
    }
  }, [token, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const logIn = (e) => {
    const userData = {
      email,
      password,
    };

    dispatch(loginUser(userData));
  };

  useEffect(() => {
    if (isError) {
      notify(errorMessage);
      setTimeout(() => {
        dispatch(clearState());
      }, 3000);
    }
  }, [isError]);

  const handleSubmit = () => {
    handleForm();
  };
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const notify = (message) => toast(message);

  const onClick = () => {
    logIn();
  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Login
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                label="Email"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                label="Password"
                fullWidth
              />
            </MDBox>
            {/*<MDBox display="flex" alignItems="center" ml={-1}>*/}
            {/*  <Switch checked={rememberMe} onChange={handleSetRememberMe} />*/}
            {/*  <MDTypography*/}
            {/*    variant="button"*/}
            {/*    fontWeight="regular"*/}
            {/*    color="text"*/}
            {/*    onClick={handleSetRememberMe}*/}
            {/*    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}*/}
            {/*  >*/}
            {/*    &nbsp;&nbsp;Remember me*/}
            {/*  </MDTypography>*/}
            {/*</MDBox>*/}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={onClick}>
                sign in
              </MDButton>
            </MDBox>
            <ToastContainer />

            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Having Trouble Loggin in ? Contact{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Technical Support
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
