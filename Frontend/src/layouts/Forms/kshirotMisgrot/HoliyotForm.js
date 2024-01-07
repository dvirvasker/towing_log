/* eslint-disable no-self-assign */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-use-before-define */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable consistent-return */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
// TODO check mult-files
// Material Dashboard 2 React components
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
// import { Upload } from "antd-upload";
// import { multipleFilesUpload } from "../../data/api";

import { useDropzone } from "react-dropzone";
import { Icons, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  // Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";

// Material Dashboard 2 React Components
import {
  Autocomplete,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Select,
  TextField,
} from "@mui/material";

// user and auth import
import { authenticate, isAuthenticated, signin } from "auth/index";
const { user } = isAuthenticated();

export default function HoliyaRequestForm() {
  const [archiveData, setArchiveData] = useState([]);
  const [checkData, setCheckData] = useState("update");
  const [holiyotDate, setHoliyotDate] = useState("1900-01-01T00:01");
  const [data, setData] = useState({
    personalnumber: user.personalnumber,
    urgent: false,

    date_need: new Date().toISOString(),

    masha: 0,
    eged: 0,
    rapat: 0,
    hatal: 0,

    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });

  function handleChange(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (CheckFormData(event)) {
      SendFormData(event);
    }
  };
  const CheckFormData = () => {
    let flag = true;
    const ErrorReason = [];

    if (Number(data.masha) < 0) {
      flag = false;
      ErrorReason.push("מש''א לא תקין");
    }
    if (Number(data.eged) < 0) {
      flag = false;
      ErrorReason.push("אגד לא תקין");
    }
    if (Number(data.rapat) < 0) {
      flag = false;
      ErrorReason.push("רפ''ט לא תקין");
    }
    if (Number(data.hatal) < 0) {
      flag = false;
      ErrorReason.push("חט''ל לא תקין");
    }

    if (!data.date_need) {
      flag = false;
      ErrorReason.push(" תאריך ריק ");
    }
    if (data.personalnumber === "" || data.personalnumber === undefined) {
      flag = false;
      ErrorReason.push("  מספר אישי ריק");
    }

    if (flag !== true) {
      ErrorReason.forEach((reason) => {
        toast.error(reason);
        return false;
      });
    } else {
      return true;
    }
  };

  const SendFormData = (event) => {
    event.preventDefault();
    setData({
      ...data,
      loading: true,
      successmsg: false,
      error: false,
      NavigateToReferrer: false,
    });
    const requestData = {
      masha: data.masha,
      eged: data.eged,
      rapat: data.rapat,
      hatal: data.hatal,
      personalnumber: data.personalnumber,
      date_need: data.date_need,
    };

    console.log(checkData);
    console.log(requestData);
    console.log(archiveData);
    axios
      .post(`http://localhost:5000/TowingLogApi/Holiyot/${checkData}`, requestData)
      .then((response) => {
        // toast.success(`הטופס נשלח בהצלחה`);
        console.log(response.data);
        if (checkData === "update") {
          axios
            .post(`http://localhost:5000/TowingLogApi/HoliyotArchive/add`, archiveData)
            .then((res) => {
              // toast.success(`הטופס נשלח בהצלחה`);
              console.log(res.data);
            })
            .catch((error) => {
              // console.log(error);
              setData({
                ...data,
                errortype: error.response,
                loading: false,
                error: true,
                NavigateToReferrer: false,
              });
            });
        }
        setData({
          ...data,
          loading: false,
          error: false,
          successmsg: true,
          NavigateToReferrer: true,
        });
      })
      .catch((error) => {
        // console.log(error);
        setData({
          ...data,
          errortype: error.response,
          loading: false,
          error: true,
          NavigateToReferrer: false,
        });
      });
  };

  const dateUpdate = (date1) => {
    const newestDate = date1;
    return `${newestDate.slice(0, 10)} ${newestDate.slice(11, 16)}`;
  };

  const handleCloseSuccsecModal = () => {
    setData({ ...data, loading: false, error: false, successmsg: false, NavigateToReferrer: true });
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
  const NavigateUser = () => {
    if (data.NavigateToReferrer) {
      window.location.href = window.location.href;
      return <Navigate to="/kshirotMisgrot" />;
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/Holiyot/`)
      .then(async (response) => {
        console.log(response.data);
        if (response.data !== null) {
          setData({
            ...data,
            masha: response.data.masha,
            eged: response.data.eged,
            rapat: response.data.rapat,
            hatal: response.data.hatal,
          });
          setHoliyotDate(response.data.date_update);
          setArchiveData(response.data);
        } else {
          setCheckData("add");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
          טופס חוליות עודכן{" "}
        </MDTypography>

        {/* <DialogContent>
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            אישור
          </MDTypography>
        </DialogContent> */}
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
          שגיאה בשליחת הטופס
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            אנא נסה שנית מאוחר יותר
          </MDTypography>
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
            שליחת הטופס תיקח מספר רגעים...
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const holiyaRequestForm = () => (
    <Container className="" dir="rtl">
      <Row className="justify-content-center">
        <Col lg="12" md="12">
          <Card className="shadow border-0">
            <CardBody className="px-lg-12 py-lg-12">
              <MDBox
                variant="gradient"
                bgColor="mekatnar"
                borderRadius="lg"
                coloredShadow="mekatnar"
                mx={2}
                mt={-3}
                p={3}
                mb={2}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  חוליות{" "}
                </MDTypography>
              </MDBox>
              <Form style={{ textAlign: "right", paddingBottom: "5%" }} role="form">
                <Row style={{ padding: "5%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>מש"א</h6>
                      <Input
                        placeholder='מש"א'
                        type="number"
                        min={0}
                        // max={100}
                        name="masha"
                        value={data.masha}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>אגד</h6>
                      <Input
                        placeholder="אגד"
                        type="number"
                        min={0}
                        // max={100}
                        name="eged"
                        value={data.eged}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>רפ"ט</h6>
                      <Input
                        placeholder="רפ''ט"
                        type="number"
                        min={0}
                        // max={100}
                        name="rapat"
                        value={data.rapat}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>חט"ל</h6>
                      <Input
                        placeholder="חט''ל"
                        type="number"
                        min={0}
                        // max={100}
                        name="hatal"
                        value={data.hatal}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <div className="text-center">
                  <MDButton
                    color="mekatnar"
                    size="large"
                    onClick={onSubmit}
                    className="btn-new-blue"
                    type="submit"
                  >
                    עדכן טופס חוליות
                    <Icon fontSize="small">upload</Icon>&nbsp;
                  </MDButton>
                </div>
              </Form>
              {holiyotDate !== "1900-01-01T00:01" && (
                <MDTypography variant="h6" textGradient color="secondary">
                  עדכון אחרון:
                  {dateUpdate(holiyotDate)}
                </MDTypography>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  return (
    <MDBox>
      {/* //! fot the pop up warning windoes */}
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

      {holiyaRequestForm()}
      <Outlet />
    </MDBox>
  );
}
