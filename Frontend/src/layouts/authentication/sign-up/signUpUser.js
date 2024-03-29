/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-else-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
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

// react-router-dom components
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

import { FormControl, Snackbar, Alert, Slide } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";

import { Icons, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Dialog
import { Dialog, DialogContent, DialogContentText, DialogTitle, Modal } from "@mui/material";

import { authenticate, isAuthenticated, signin, signout, updateRefreshCount } from "auth/index";

// Images
import bgImage from "assets/images/towinglogbg2.png";

// import bgImage from "assets/images/skydesertBackgroundImage.jpg";
// import bgImage from "assets/images/desertBackgroundImage.jpg";
import axios from "axios";
import { Form, Input } from "reactstrap";

// import bgImage from "assets/images/max-burger-DMRQmC8gRBs-unsplash.jpg";

// ? Hozla user ==> 0
// ? ToraHailit user ==> 3
function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

function SignUpUser() {
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    personalnumber: "",

    admin: "",

    password: "",

    errortype: "",
    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const openError = (error) => {
    setSnackbarOpen(true);
    setErrorMessage(error);
  };

  function handleChange(evt) {
    const { value } = evt.target;
    setSignUpData({ ...signUpData, [evt.target.name]: value });
  }

  const [pikods, setPikods] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/Pikod/`)
      .then((response) => {
        setPikods(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.code);
      });
  }, []);

  //* ------------------Pop up models messages--------------------------

  const handleCloseSuccsecModal = () => {
    setSignUpData({
      ...signUpData,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: true,
    });
  };

  const handleCloseLoadingModal = () => {
    setSignUpData({ ...signUpData, loading: false });
  };
  const handleCloseErrorModal = () => {
    setSignUpData({
      ...signUpData,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: false,
    });
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function NavigateUser() {
    if (signUpData.NavigateToReferrer) {
      navigate("/landing");
    }
  }

  const showSuccess = () => (
    <Dialog
      open={signUpData.successmsg}
      onClose={handleCloseSuccsecModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        coloredShadow="mekatnar"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          נרשמת בהצלחה למערכת
        </MDTypography>
        <MDButton onClick={handleCloseSuccsecModal} variant="gradient" color="light">
          {signUpData.admin === "1" || signUpData.admin === "2" ? "סגירה" : "מעבר לאתר"}
        </MDButton>
      </MDBox>
    </Dialog>
  );
  const showError = () => (
    <Dialog
      open={signUpData.error}
      onClose={handleCloseErrorModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="error"
        coloredShadow="error"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          שגיאה בהרשמה
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            וודא שהינך כבר רשום למערכת, במידה ולא נסה שנית מאוחר יותר
          </MDTypography>
          <MDButton onClick={handleCloseErrorModal} variant="gradient" color="light">
            סגירה
          </MDButton>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const showLoading = () => (
    <Dialog
      open={signUpData.loading}
      onClose={handleCloseLoadingModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        coloredShadow="mekatnar"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        px={5}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          בטעינה
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            ההרשמה תיקח מספר רגעים...
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  //* ------------------Pop up models messages - end--------------------------

  //* ------------------Send data to server--------------------------
  // eslint-disable-next-line consistent-return
  const digitsOnly = (str) => /^\d+$/.test(str);
  const isPersonalNumberValid = (personalnum) => {
    if (personalnum.length === 7 && digitsOnly(personalnum)) {
      return true;
    }
    if (personalnum.length === 8) {
      if (personalnum.startsWith("s") && digitsOnly(personalnum.slice(1))) {
        return true;
      }
    }
    return false;
  };
  const CheckSignUpForm = (event) => {
    event.preventDefault();
    let flag = true;
    const ErrorReason = [];
    let errorReasonText = "";

    const AddError = (error) => {
      flag = false;
      ErrorReason.push(error);
      errorReasonText += errorReasonText === "" ? `${error}` : `, ${error}`;
    };

    if (signUpData.personalnumber === "") {
      flag = false;
      AddError("אנא הכנס מספר אישי");
      // toast.error(ErrorReason);
    }
    if (signUpData.password === "") {
      flag = false;
      AddError("אנא הכנס סיסמא");
      // toast.error(ErrorReason);
    }
    if (!isPersonalNumberValid(signUpData.personalnumber)) {
      flag = false;
      AddError("אנא וודא כי המספר האישי תקין");
      // toast.error(ErrorReason);
    }
    if (signUpData.firstName === "") {
      flag = false;
      AddError("אנא הכנס שם פרטי");
      // toast.error(ErrorReason);
    }
    if (signUpData.lastName === "") {
      flag = false;
      AddError("אנא הכנס שם משפחה");
      // toast.error(ErrorReason);
    }
    if (signUpData.admin === "") {
      flag = false;
      AddError("אנא בחר הרשאה");
      // toast.error(ErrorReason);
    }
    // if (signUpData.admin === "") {
    //   flag = false;
    //   ErrorReason.push("אנא בחר סוג משתמש ");
    //   // toast.error(ErrorReason);
    // }
    // const c = signUpData.personalnumber.charAt(0);
    // if (c >= "0" && c <= "9") {
    //   // it is a number
    //   let temppersonalnumber = signUpData.personalnumber;
    //   temppersonalnumber = `s${temppersonalnumber}`;
    //   signUpData.personalnumber = temppersonalnumber;
    // } else {
    //   // it isn't
    //   if (c === c.toUpperCase()) {
    //     // UpperCase Letter -Make Lowercase
    //     const tempc = c.toLowerCase();
    //     let temppersonalnumber = signUpData.personalnumber;
    //     temppersonalnumber = temppersonalnumber.substring(1);
    //     temppersonalnumber = tempc + temppersonalnumber;
    //     signUpData.personalnumber = temppersonalnumber;
    //   }
    //   if (c === c.toLowerCase()) {
    //     // LowerCase Letter - All Good
    //   }
    // }
    if (flag !== true) {
      // ErrorReason.forEach((reason) => {
      //   toast.error(reason);
      //   // setData({ ...data, loading: false, successmsg: false, error: true });
      // });
      openError(errorReasonText);
      return false;
    } else {
      return true;
      // setData({ ...data, loading: false, successmsg: true, error: false });
    }
  };

  const SendFormData = async (event) => {
    event.preventDefault();
    setSignUpData({ ...signUpData, loading: true, successmsg: false, error: false });
    const newUser = {
      firstName: signUpData.firstName,
      lastName: signUpData.lastName,
      personalnumber: signUpData.personalnumber,
      admin: signUpData.admin,
      approved: false,
      password: signUpData.password,
    };
    await axios
      .post(`http://localhost:5000/TowingLogApi/signup`, newUser)
      .then((res) => {
        console.log(`gotten new user from sign up`);
        console.log(`${res.data}`);
        console.log({ personalnumber: res.data.user.personalnumber });
        console.log(res.data.user.personalnumber);
        // if (signUpData.admin === "0") {
        //   authenticate(res.data);
        // }
        setSignUpData({ ...signUpData, loading: false, error: false, successmsg: true });
        const count = parseInt(localStorage.getItem("RefreshCount"), 10) + 1;
        updateRefreshCount(count);
      })
      .catch((error) => {
        console.log(error);
        setSignUpData({ ...signUpData, loading: false, error: true, successmsg: false });
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (CheckSignUpForm(event)) {
      SendFormData(event);
    }
  };

  //* ------------------Send data to server - end--------------------------
  const singUpUser = () => (
    <Card>
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        borderRadius="lg"
        coloredShadow="success"
        mx={2}
        mt={-3}
        p={3}
        mb={1}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          {`הרשמה למערכת יומן גרירות`}
        </MDTypography>
        {/* <MDTypography display="block" variant="button" color="white" my={1}>
          הגיע הזמן להירשם אלינו 😉
        </MDTypography> */}
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form" onSubmit={onSubmit}>
          <MDBox mb={2}>
            <MDInput
              required
              type="text"
              name="firstName"
              label="שם פרטי"
              variant="standard"
              value={signUpData.firstName}
              onChange={handleChange}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              required
              type="text"
              name="lastName"
              label="שם משפחה"
              variant="standard"
              value={signUpData.lastName}
              onChange={handleChange}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              required
              type="text"
              name="password"
              onChange={handleChange}
              variant="standard"
              label="סיסמא"
              value={signUpData.password}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              required
              type="text"
              name="personalnumber"
              onChange={handleChange}
              variant="standard"
              label="מספר אישי"
              value={signUpData.personalnumber}
              fullWidth
            />
          </MDBox>
          <FormControl required>
            <InputLabel id="demo-simple-select-autowidth-label">בחר הרשאה</InputLabel>
            <Select
              required
              labelId="demo-simple-select-autowidth-label"
              name="admin"
              id="demo-simple-select-autowidth"
              value={signUpData.admin}
              onChange={handleChange}
              autoWidth
              label="בחר הרשאה"
              sx={{ height: 50, minWidth: 150 }}
            >
              <MenuItem value="0">מפקד מוקד</MenuItem>
              <MenuItem value="1">נציג/ת שירות</MenuItem>
              <MenuItem value="2">אחמ"ש</MenuItem>
            </Select>
          </FormControl>

          {/* <FormControl required>
            <InputLabel id="demo-simple-select-autowidth-label">בחר הרשאה</InputLabel>
            <Select
              required
              labelId="demo-simple-select-autowidth-label"
              name="admin"
              id="demo-simple-select-autowidth"
              value={signUpData.admin}
              onChange={handleChange}
              autoWidth
              label="בחר הרשאה"
              sx={{ height: 50, minWidth: 150 }}
            >
              <MenuItem value="0">מנהל מערכת</MenuItem>
              <MenuItem value="1">צפייה</MenuItem>
              <MenuItem value="2">עריכה</MenuItem>
            </Select>
          </FormControl> */}
          <MDBox mt={4} mb={1}>
            <MDButton variant="gradient" color="mekatnar" type="submit" fullWidth>
              הירשם
            </MDButton>
          </MDBox>
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              <MDTypography
                component={Link}
                to="/authentication/sign-in"
                variant="button"
                color="mekatnar"
                fontWeight="medium"
                textGradient
              >
                להתחברות לחץ כאן
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
    setErrorMessage("");
  };
  return (
    <CoverLayout image={bgImage}>
      {/* //! fot the pop up warning windoes */}
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
      <Snackbar
        open={snackbarOpen}
        TransitionComponent={SlideTransition}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity="error" variant="standard" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      {showError()}
      {showSuccess()}
      {showLoading()}
      {NavigateUser()}

      {singUpUser()}
      <Outlet />
    </CoverLayout>
  );
}
export default SignUpUser;
