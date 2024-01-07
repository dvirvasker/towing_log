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
import MDBadge from "components/MDBadge";

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
  const [militaryindustryDate, setmilitaryindustryDate] = useState("1900-01-01T00:01");
  const [data, setData] = useState({
    personalnumber: user.personalnumber,
    urgent: false,

    date_update: new Date().toISOString(),

    ztakahim: 0,
    tvachOgdati: 0,
    egedTeneVeMerhavim: 0,
    matkaliyot: 0,
    atoda: 0,

    reservationCenters: 0,
    yachsam: 0,
    pakladVeMesayat: 0,
    unitsMatkaliyot: 0,

    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });
  const kshirot =
    (data.ztakahim + data.tvachOgdati + data.egedTeneVeMerhavim + data.matkaliyot + data.atoda) / 5;
  const min = 0;
  const max = 100;

  function handleChange(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value });
  }

  function handleChange1(evt) {
    const value = Math.max(min, Math.min(max, Number(evt.target.value)));
    setData({ ...data, [evt.target.name]: value });
  }

  const ksirotColor = (num) => {
    const value = Math.round(num);
    let color = "";
    if (value >= 0 && value <= 59) {
      color = "error";
    } else if (value >= 60 && value <= 79) {
      color = "warning";
    } else if (value >= 80 && value <= 100) {
      color = "success";
    }
    return [color];
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (CheckFormData(event)) {
      SendFormData(event);
    }
  };
  const CheckFormData = () => {
    let flag = true;
    const ErrorReason = [];

    if (Number(data.ztakahim) < 0 || Number(data.ztakahim) > 100) {
      flag = false;
      ErrorReason.push("צק''חים לא תקין");
    }
    if (Number(data.tvachOgdati) < 0 || Number(data.tvachOgdati) > 100) {
      flag = false;
      ErrorReason.push("תווך אוגדתי לא תקין");
    }
    if (Number(data.egedTeneVeMerhavim) < 0 || Number(data.egedTeneVeMerhavim) > 100) {
      flag = false;
      ErrorReason.push("אגד טנ''א ומרחבים לא תקין");
    }
    if (Number(data.matkaliyot) < 0 || Number(data.matkaliyot) > 100) {
      flag = false;
      ErrorReason.push("יח' מטכ''ליות לא תקין");
    }
    if (Number(data.atoda) < 0 || Number(data.atoda) > 100) {
      flag = false;
      ErrorReason.push("עתודה לא תקין");
    }

    if (Number(data.reservationCenters) < 0) {
      flag = false;
      ErrorReason.push("מרכזי הזמנות לא תקין");
    }
    if (Number(data.yachsam) < 0) {
      flag = false;
      ErrorReason.push("יחס''ם לא תקין");
    }
    if (Number(data.pakladVeMesayat) < 0) {
      flag = false;
      ErrorReason.push("פקל''ד ומסייעת לא תקין");
    }
    if (Number(data.unitsMatkaliyot) < 0) {
      flag = false;
      ErrorReason.push("יחידות מטכ''ליות לא תקין");
    }

    if (!data.date_update) {
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
      ztakahim: data.ztakahim,
      tvachOgdati: data.tvachOgdati,
      egedTeneVeMerhavim: data.egedTeneVeMerhavim,
      matkaliyot: data.matkaliyot,
      atoda: data.atoda,

      reservationCenters: data.reservationCenters,
      yachsam: data.yachsam,
      pakladVeMesayat: data.pakladVeMesayat,
      unitsMatkaliyot: data.unitsMatkaliyot,

      personalnumber: data.personalnumber,
      date_update: data.date_update,
    };

    console.log(checkData);
    console.log(requestData);
    console.log(archiveData);
    axios
      .post(`http://localhost:5000/TowingLogApi/Militaryindustry/${checkData}`, requestData)
      .then((response) => {
        // toast.success(`הטופס נשלח בהצלחה`);
        console.log(response.data);
        if (checkData === "update") {
          axios
            .post(`http://localhost:5000/TowingLogApi/MilitaryindustryArchive/add`, archiveData)
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
      .get(`http://localhost:5000/TowingLogApi/Militaryindustry/`)
      .then(async (response) => {
        console.log(response.data);
        if (response.data !== null) {
          setData({
            ...data,
            ztakahim: response.data.ztakahim,
            tvachOgdati: response.data.tvachOgdati,
            egedTeneVeMerhavim: response.data.egedTeneVeMerhavim,
            matkaliyot: response.data.matkaliyot,
            atoda: response.data.atoda,

            reservationCenters: response.data.reservationCenters,
            yachsam: response.data.yachsam,
            pakladVeMesayat: response.data.pakladVeMesayat,
            unitsMatkaliyot: response.data.unitsMatkaliyot,
          });
          setmilitaryindustryDate(response.data.date_update);
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
          טופס אחזקה צבאית עודכן{" "}
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
                mx={35}
                mt={-3}
                p={3}
                mb={4}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  אחזקה צבאית{" "}
                </MDTypography>
              </MDBox>
              <Form style={{ textAlign: "right", paddingBottom: "5%" }} role="form">
                {/* <FormGroup row> */}
                <Row style={{ padding: "1%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>צקח"ים</h6>
                      <Input
                        placeholder='צקח"ים'
                        type="number"
                        min={0}
                        max={100}
                        name="ztakahim"
                        value={data.ztakahim}
                        onChange={handleChange1}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>תווך אוגדתי</h6>
                      <Input
                        placeholder="תווך אוגדתי"
                        type="number"
                        min={0}
                        max={100}
                        name="tvachOgdati"
                        value={data.tvachOgdati}
                        onChange={handleChange1}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>אגד טנ''א ומרחבים</h6>
                      <Input
                        placeholder="אגד טנ''א ומרחבים"
                        type="number"
                        min={0}
                        max={100}
                        name="egedTeneVeMerhavim"
                        value={data.egedTeneVeMerhavim}
                        onChange={handleChange1}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>יח' מטכ''ליות</h6>
                      <Input
                        placeholder="יח' מטכ''ליות"
                        type="number"
                        min={0}
                        max={100}
                        name="matkaliyot"
                        value={data.matkaliyot}
                        onChange={handleChange1}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>עתודה</h6>
                      <Input
                        placeholder="עתודה"
                        type="number"
                        min={0}
                        max={100}
                        name="atoda"
                        value={data.atoda}
                        onChange={handleChange1}
                      />
                    </FormGroup>
                  </Col>
                  <Row style={{ textAlign: "center" }}>
                    <MDTypography variant="h4" fontWeight="large" color="dark" mt={1}>
                      אחוז כשירות:{" "}
                      <MDBadge
                        badgeContent={kshirot === 100 ? "100%" : `${kshirot.toFixed(0)}%`}
                        color={ksirotColor(kshirot)[0]}
                        size="sm"
                        variant="contained"
                        container
                      />
                    </MDTypography>
                  </Row>
                  <Row style={{ textAlign: "center" }}>
                    <MDTypography variant="h4" fontWeight="large" color="dark" mt={1}>
                      אחוז אי כשירות:{" "}
                      <MDBadge
                        badgeContent={
                          100 - kshirot === 100 ? "100%" : `${(100 - kshirot).toFixed(0)}%`
                        }
                        color={ksirotColor(kshirot)[0]}
                        size="sm"
                        variant="contained"
                        container
                      />
                    </MDTypography>
                  </Row>
                </Row>
                <MDTypography variant="h4" fontWeight="large" color="mekatnar" mt={1}>
                  מופעלים:
                </MDTypography>

                <Row style={{ padding: "1%", paddingBottom: "3%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>מרכזי הזמנות</h6>
                      <Input
                        placeholder="מרכזי הזמנות"
                        type="number"
                        min={0}
                        max={100}
                        name="reservationCenters"
                        value={data.reservationCenters}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>יחס''ם</h6>
                      <Input
                        placeholder="יחס''ם"
                        type="number"
                        min={0}
                        max={100}
                        name="yachsam"
                        value={data.yachsam}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>פקל''ד ומסייעת</h6>
                      <Input
                        placeholder="פקל''ד ומסייעת"
                        type="number"
                        min={0}
                        max={100}
                        name="pakladVeMesayat"
                        value={data.pakladVeMesayat}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6>יחידות מטכ''ליות</h6>
                      <Input
                        placeholder="יחידות מטכ''ליות"
                        type="number"
                        min={0}
                        max={100}
                        name="unitsMatkaliyot"
                        value={data.unitsMatkaliyot}
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
                    עדכן טופס אחזקה צבאית
                    <Icon fontSize="small">upload</Icon>&nbsp;
                  </MDButton>
                </div>
              </Form>
              {militaryindustryDate !== "1900-01-01T00:01" && (
                <MDTypography variant="h6" textGradient color="secondary">
                  עדכון אחרון:
                  {dateUpdate(militaryindustryDate)}
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
