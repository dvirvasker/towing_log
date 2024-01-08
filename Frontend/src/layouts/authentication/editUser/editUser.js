/* eslint-disable react/jsx-boolean-value */
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
import { Link, Navigate, Outlet, useParams } from "react-router-dom";

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

import { FormControl, Icon } from "@mui/material";
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
import bgImage from "assets/images/desertBackgroundImage.jpg";
import axios from "axios";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Form, Input } from "reactstrap";

// import bgImage from "assets/images/max-burger-DMRQmC8gRBs-unsplash.jpg";
let { user } = isAuthenticated();

// ? Hozla user ==> 0
// ? ToraHailit user ==> 3
function EditUser() {
  const params = useParams();

  const [editUserData, setEditUserData] = useState({
    firstName: "",
    lastName: "",
    personalnumber: "",
    password: "",

    admin: "",

    approved: false,
  });

  const [data, setData] = useState({
    errortype: "",
    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });

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

    axios
      .post(`http://localhost:5000/TowingLogApi/getuserbyid`, { userid: params.id })
      .then((response) => {
        setEditUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.code);
      });
  }, []);

  function handleChange(evt) {
    const { value } = evt.target;
    setEditUserData({ ...editUserData, [evt.target.name]: value });
  }

  //* ------------------Pop up models messages--------------------------

  const handleCloseSuccsecModal = () => {
    setData({
      ...data,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: true,
    });
  };

  const handleCloseLoadingModal = () => {
    setData({ ...data, loading: false });
  };
  const handleCloseErrorModal = () => {
    setData({
      ...data,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: false,
    });
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function NavigateUser() {
    if (data.NavigateToReferrer) {
      return <Navigate to="/adminManagementTable" />;
    }
  }

  const showSuccess = () => (
    <Dialog
      open={data.successmsg}
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
          פרטי המשתמש עודכנו בהצלחה
        </MDTypography>
        <MDButton onClick={handleCloseSuccsecModal} variant="gradient" color="light">
          סגירה
        </MDButton>
      </MDBox>
    </Dialog>
  );
  const showError = () => (
    <Dialog
      open={data.error}
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
          שגיאה בעדכון
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            אנא נסה שינית מאוחר יותר{" "}
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
      open={data.loading}
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
            עדיכון הפרטים יקח מספר רגעים...
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  //* ------------------Pop up models messages - end--------------------------

  //* ------------------Send data to server--------------------------
  // eslint-disable-next-line consistent-return
  const CheckSignUpForm = (event) => {
    event.preventDefault();
    let flag = true;
    const ErrorReason = [];

    if (editUserData.password === "") {
      flag = false;
      ErrorReason.push("אנא מלא סיסמא");
      // toast.error(ErrorReason);
    }

    if (editUserData.personalnumber === "") {
      flag = false;
      ErrorReason.push("אנא מלא מספר אישי");
      // toast.error(ErrorReason);
    }

    if (flag !== true) {
      ErrorReason.forEach((reason) => {
        toast.error(reason);
        // setData({ ...data, loading: false, successmsg: false, error: true });
      });
      return false;
    } else {
      return true;
      // setData({ ...data, loading: false, successmsg: true, error: false });
    }
  };

  const SendFormData = async (event) => {
    event.preventDefault();
    setData({ ...data, loading: true, successmsg: false, error: false });
    const updateUser = {
      firstName: editUserData.firstName,
      lastName: editUserData.lastName,
      personalnumber: editUserData.personalnumber,
      password: editUserData.password,
      admin: editUserData.admin,
      approved: editUserData.approved,
    };
    await axios
      .put(`http://localhost:5000/TowingLogApi/user/update/${params.id}`, updateUser)
      .then((res) => {
        if (res.data.personalnumber === user.personalnumber) {
          authenticate(res.data);
          user = isAuthenticated().user;
          const count = parseInt(localStorage.getItem("RefreshCount"), 10) + 1;
          updateRefreshCount(count);
        }
        setData({ ...data, loading: false, error: false, successmsg: true });
        const count = parseInt(localStorage.getItem("RefreshCount"), 10) + 1;
        updateRefreshCount(count);
      })
      .catch((error) => {
        console.log(error);
        setData({ ...data, loading: false, error: true, successmsg: false });
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (CheckSignUpForm(event)) {
      SendFormData(event);
    }
  };

  //* ------------------Send data to server - end--------------------------
  const editUser = () => (
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
          {` עדכון פרטי משתמש`}
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form" onSubmit={onSubmit}>
          <MDBox mb={2}>
            <MDInput
              // disabled
              type="text"
              name="personalnumber"
              onChange={handleChange}
              variant="standard"
              label="מספר אישי"
              value={editUserData.personalnumber}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              disabled
              type="text"
              name="firstName"
              label="שם פרטי"
              variant="standard"
              value={editUserData.firstName}
              onChange={handleChange}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              name="password"
              label="סיסמא"
              variant="standard"
              value={editUserData.password}
              onChange={handleChange}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              disabled
              type="text"
              name="lastName"
              label="שם משפחה"
              variant="standard"
              value={editUserData.lastName}
              onChange={handleChange}
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
              value={editUserData.admin}
              onChange={handleChange}
              autoWidth
              label="בחר הרשאה"
              sx={{ height: 50, minWidth: 150 }}
            >
              <MenuItem value="0">מפקד מוקד</MenuItem>
              <MenuItem value="1">מוקדנית</MenuItem>
              <MenuItem value="2">אחמ"ש</MenuItem>
            </Select>
          </FormControl>

          <MDBox my={2}>
            <FormControl required>
              <InputLabel id="approved">משתמש מאושר</InputLabel>
              <Select
                required
                labelId="approved"
                name="approved"
                id="approved"
                value={editUserData.approved}
                onChange={handleChange}
                autoWidth
                label="משתמש מאושר"
                sx={{ height: 50, minWidth: 150 }}
              >
                <MenuItem value={false}>לא מאושר</MenuItem>
                <MenuItem value={true}>מאושר</MenuItem>
              </Select>
            </FormControl>
          </MDBox>
          <MDBox
            sx={{
              display: "inline-flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignContent: "space-evenly",
            }}
            px={5}
            mt={3}
          >
            <MDBox px={5}>
              <MDButton variant="gradient" color="mekatnar" type="submit" fullWidth>
                עדכן
              </MDButton>
            </MDBox>
            <MDBox>
              <MDButton
                variant="gradient"
                color="error"
                fullWidth
                onClick={() => {
                  axios
                    .post(`http://localhost:5000/TowingLogApi/user/remove/${params.id}`)
                    .then((response) => {
                      if (params.id === user.id) {
                        signout();
                        user = isAuthenticated().user;
                        window.location.reload(true);
                        const count = parseInt(localStorage.getItem("RefreshCount"), 10) + 1;
                        updateRefreshCount(count);
                      }
                      setData({ ...data, loading: false, error: false, successmsg: true });
                      // console.log(response.data);
                      const count = parseInt(localStorage.getItem("RefreshCount"), 10) + 1;
                      updateRefreshCount(count);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
                size="medium"
              >
                מחק משתמש
              </MDButton>
            </MDBox>
            <MDBox />
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar /> {/* //! fot the pop up warning windoes */}
      <MDBox
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignContent: "space-evenly",
        }}
        pt={6}
        pb={3}
      >
        <MDBox>
          <ToastContainer
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
          />
          {showError()}
          {showSuccess()}
          {showLoading()}
          {NavigateUser()}
          {editUser()}
        </MDBox>
      </MDBox>
      <Outlet />
      <Footer />
    </DashboardLayout>
  );
}
export default EditUser;
