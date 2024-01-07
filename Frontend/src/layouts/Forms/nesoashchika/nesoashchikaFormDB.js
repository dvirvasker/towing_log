/* eslint-disable react/self-closing-comp */
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
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import NativeSelect from "@mui/material/NativeSelect";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Dropzone from "react-dropzone-uploader";
import Popup from "reactjs-popup";
// import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";

// Material Dashboard 2 React example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link, Navigate, Outlet } from "react-router-dom";
// import { Upload } from "antd-upload";
// import { multipleFilesUpload } from "../../data/api";

import TextareaAutosize from "@mui/base/TextareaAutosize";
import { produce } from "immer";
import { generate } from "shortid";

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
import MDAlert from "components/MDAlert";
import { DropzoneAreaBase } from "material-ui-dropzone";
import { DropzoneArea } from "react-mui-dropzone";

// for file upload from Data
import { singleFileUpload } from "Data/api";

// user and auth import
import { authenticate, isAuthenticated, signin } from "auth/index";
const { user } = isAuthenticated();

// console.log("Hozla Print Request Form");
// console.log(user);

export default function NesoaShchikaFormDB() {
  const [data, setData] = useState({
    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });

  const [reportData, setReportData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/nesoashchika/`)
      .then((response) => {
        setReportData(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.code);
      });
  }, []);

  function handleChange(evt) {
    const { value } = evt.target;
    setReportData({ ...reportData, [evt.target.name]: value });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    SendFormData(event);
    SendarchiveFormData(event);
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
      c4_km_day: reportData.c4_km_day,
      c3_km_day: reportData.c3_km_day,
      namer_km_day: reportData.namer_km_day,
      puma_km_day: reportData.puma_km_day,
      ahzarit_km_day: reportData.ahzarit_km_day,

      c4_km_avg: reportData.c4_km_avg,
      c3_km_avg: reportData.c3_km_avg,
      namer_km_avg: reportData.namer_km_avg,
      puma_km_avg: reportData.puma_km_avg,
      ahzarit_km_avg: reportData.ahzarit_km_avg,

      c4_sham_avg: reportData.c4_sham_avg,
      c3_sham_avg: reportData.c3_sham_avg,
      namer_sham_avg: reportData.namer_sham_avg,
      puma_sham_avg: reportData.puma_sham_avg,
      dahforim_sham_avg: reportData.dahforim_sham_avg,

      c4_tools: reportData.c4_tools,
      c3_bz_tools: reportData.c3_bz_tools,
      c3_rmh_tools: reportData.c3_rmh_tools,
      namer_tools: reportData.namer_tools,
      dahforim_tools: reportData.dahforim_tools,

      c4_tools_damaged: reportData.c4_tools_damaged,
      c3_bz_tools_damaged: reportData.c3_bz_tools_damaged,
      c3_rmh_tools_damaged: reportData.c3_rmh_tools_damaged,
      namer_tools_damaged: reportData.namer_tools_damaged,
      dahforim_tools_damaged: reportData.dahforim_tools_damaged,

      c4_hatak: reportData.c4_hatak,
      c3_hatak: reportData.c3_hatak,
      namer_hatak: reportData.namer_hatak,
      dahforim_hatak: reportData.dahforim_hatak,

      c4_bakash: reportData.c4_bakash,
      c3_bakash: reportData.c3_bakash,
      namer_bakash: reportData.namer_bakash,
      dahforim_bakash: reportData.dahforim_bakash,

      c4_coat: reportData.c4_coat,
      c3_coat: reportData.c3_coat,
      namer_coat: reportData.namer_coat,
      dahforim_coat: reportData.dahforim_coat,

      c4_end: reportData.c4_end,
      c3_end: reportData.c3_end,
      namer_end: reportData.namer_end,
      dahforim_end: reportData.dahforim_end,

      c4_kanim: reportData.c4_kanim,
      c3_kanim: reportData.c3_kanim,
      namer_kanim: reportData.namer_kanim,
      dahforim_kanim: reportData.dahforim_kanim,
    };

    console.log(requestData);
    axios
      .post(`http://localhost:5000/TowingLogApi/nesoashchika/update/${reportData._id}`, requestData)
      .then((response) => {
        setData({
          ...data,
          loading: false,
          error: false,
          successmsg: true,
          NavigateToReferrer: true,
        });
        // toast.success(`הטופס נשלח בהצלחה`);
        // history.push(`/signin`);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setData({
          ...data,
          errortype: error.response,
          loading: false,
          error: true,
          NavigateToReferrer: false,
        });
      });
  };

  const SendarchiveFormData = (event) => {
    event.preventDefault();
    setData({
      ...data,
      loading: true,
      successmsg: false,
      error: false,
      NavigateToReferrer: false,
    });
    const archiverequestData = {
      personalnumber: user.personalnumber,

      c4_km_day: reportData.c4_km_day,
      c3_km_day: reportData.c3_km_day,
      namer_km_day: reportData.namer_km_day,
      puma_km_day: reportData.puma_km_day,
      ahzarit_km_day: reportData.ahzarit_km_day,

      c4_km_avg: reportData.c4_km_avg,
      c3_km_avg: reportData.c3_km_avg,
      namer_km_avg: reportData.namer_km_avg,
      puma_km_avg: reportData.puma_km_avg,
      ahzarit_km_avg: reportData.ahzarit_km_avg,

      c4_sham_avg: reportData.c4_sham_avg,
      c3_sham_avg: reportData.c3_sham_avg,
      namer_sham_avg: reportData.namer_sham_avg,
      puma_sham_avg: reportData.puma_sham_avg,
      dahforim_sham_avg: reportData.dahforim_sham_avg,

      c4_tools: reportData.c4_tools,
      c3_bz_tools: reportData.c3_bz_tools,
      c3_rmh_tools: reportData.c3_rmh_tools,
      namer_tools: reportData.namer_tools,
      dahforim_tools: reportData.dahforim_tools,

      c4_tools_damaged: reportData.c4_tools_damaged,
      c3_bz_tools_damaged: reportData.c3_bz_tools_damaged,
      c3_rmh_tools_damaged: reportData.c3_rmh_tools_damaged,
      namer_tools_damaged: reportData.namer_tools_damaged,
      dahforim_tools_damaged: reportData.dahforim_tools_damaged,

      c4_hatak: reportData.c4_hatak,
      c3_hatak: reportData.c3_hatak,
      namer_hatak: reportData.namer_hatak,
      dahforim_hatak: reportData.dahforim_hatak,

      c4_bakash: reportData.c4_bakash,
      c3_bakash: reportData.c3_bakash,
      namer_bakash: reportData.namer_bakash,
      dahforim_bakash: reportData.dahforim_bakash,

      c4_coat: reportData.c4_coat,
      c3_coat: reportData.c3_coat,
      namer_coat: reportData.namer_coat,
      dahforim_coat: reportData.dahforim_coat,

      c4_end: reportData.c4_end,
      c3_end: reportData.c3_end,
      namer_end: reportData.namer_end,
      dahforim_end: reportData.dahforim_end,

      c4_kanim: reportData.c4_kanim,
      c3_kanim: reportData.c3_kanim,
      namer_kanim: reportData.namer_kanim,
      dahforim_kanim: reportData.dahforim_kanim,
    };

    console.log(archiverequestData);
    axios
      .post(`http://localhost:5000/TowingLogApi/archivenesoashchika/add`, archiverequestData)
      .then((response) => {
        setData({
          ...data,
          loading: false,
          error: false,
          successmsg: true,
          NavigateToReferrer: false,
        });
        // toast.success(`הטופס נשלח בהצלחה`);
        // history.push(`/signin`);
        console.log(response.data);
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
          טופס מסועה ושחיקה עודכן{" "}
        </MDTypography>
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
          שגיאה בשליחת הבקשה
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

  const handleCloseSuccsecModal = () => {
    setData({ ...data, loading: false, error: false, successmsg: false, NavigateToReferrer: true });
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
  const handleCloseLoadingModal = () => {
    setData({ ...data, loading: false });
  };

  const NavigateUser = () => {
    if (data.NavigateToReferrer) {
      window.location.href = window.location.href;
      return <Navigate to="/nesoaShchika" />;
    }
  };

  const nesoashchikaFormDB = () => (
    <Container className="" dir="rtl">
      <Row className="justify-content-center">
        <Col lg="12" md="12">
          <Card className="shadow border-0">
            <CardBody className="px-lg-8 py-lg-10">
              <MDBox
                variant="gradient"
                bgColor="mekatnar"
                borderRadius="lg"
                coloredShadow="mekatnar"
                mx={2}
                mt={-3}
                p={3}
                mb={1}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  טופס מסועה ושחיקה{" "}
                </MDTypography>
              </MDBox>
              <Form style={{ textAlign: "right" }} role="form">
                <div
                  tag="h4"
                  style={{
                    direction: "rtl",
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingTop: "20px",
                    paddingBottom: "10px",
                  }}
                >
                  <p style={{ fontSize: 18 }}>ק"מ</p>
                </div>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    ></Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>ק"מ ממוצע ליום</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>ממוצע ק"מ לכלי מתמרן</h6>
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>סימן 4</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='ק"מ ממוצע ליום'
                        type="number"
                        min={0}
                        name="c4_km_day"
                        value={reportData.c4_km_day}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='ממוצע ק"מ לכלי'
                        type="number"
                        min={0}
                        name="c4_km_avg"
                        value={reportData.c4_km_avg}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>סימן 3</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='ק"מ ממוצע ליום'
                        type="number"
                        min={0}
                        name="c3_km_day"
                        value={reportData.c3_km_day}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='ממוצע ק"מ לכלי'
                        type="number"
                        min={0}
                        name="c3_km_avg"
                        value={reportData.c3_km_avg}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>נמר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='ק"מ ממוצע ליום'
                        type="number"
                        min={0}
                        name="namer_km_day"
                        value={reportData.namer_km_day}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='ממוצע ק"מ לכלי'
                        type="number"
                        min={0}
                        name="namer_km_avg"
                        value={reportData.namer_km_avg}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>פומה</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='ק"מ ממוצע ליום'
                        type="number"
                        min={0}
                        name="puma_km_day"
                        value={reportData.puma_km_day}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='ממוצע ק"מ לכלי'
                        type="number"
                        min={0}
                        name="puma_km_avg"
                        value={reportData.puma_km_avg}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>אכזרית</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='ק"מ ממוצע ליום'
                        type="number"
                        min={0}
                        name="ahzarit_km_day"
                        value={reportData.ahzarit_km_day}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='ממוצע ק"מ לכלי'
                        type="number"
                        min={0}
                        name="ahzarit_km_avg"
                        value={reportData.ahzarit_km_avg}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>

                <div
                  tag="h4"
                  style={{
                    direction: "rtl",
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingTop: "20px",
                    paddingBottom: "10px",
                  }}
                >
                  <p style={{ fontSize: 18 }}>שע"מ</p>
                </div>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    ></Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>שע"מ ממוצע מתמרן</h6>
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>סימן 4</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='שע"מ ממוצע'
                        type="number"
                        min={0}
                        name="c4_sham_avg"
                        value={reportData.c4_sham_avg}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>סימן 3</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='שע"מ ממוצע'
                        type="number"
                        min={0}
                        name="c3_sham_avg"
                        value={reportData.c3_sham_avg}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>נמר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='שע"מ ממוצע'
                        type="number"
                        min={0}
                        name="namer_sham_avg"
                        value={reportData.namer_sham_avg}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>פומה</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='שע"מ ממוצע'
                        type="number"
                        min={0}
                        name="puma_sham_avg"
                        value={reportData.puma_sham_avg}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>דחפורים</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='שע"מ ממוצע'
                        type="number"
                        min={0}
                        name="dahforim_sham_avg"
                        value={reportData.dahforim_sham_avg}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>

                <div
                  tag="h4"
                  style={{
                    direction: "rtl",
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingTop: "20px",
                    paddingBottom: "10px",
                  }}
                >
                  <p style={{ fontSize: 18 }}>שחיקה מבצעית</p>
                </div>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    ></Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>כמות כלים</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>כלים פגועים</h6>
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>סימן 4</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="כמות כלים"
                        type="number"
                        min={0}
                        name="c4_tools"
                        value={reportData.c4_tools}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="כלים פגועים"
                        type="number"
                        min={0}
                        name="c4_tools_damaged"
                        value={reportData.c4_tools_damaged}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>סימן 3 בז</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="כמות כלים"
                        type="number"
                        min={0}
                        name="c3_bz_tools"
                        value={reportData.c3_bz_tools}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="כלים פגועים"
                        type="number"
                        min={0}
                        name="c3_bz_tools_damaged"
                        value={reportData.c3_bz_tools_damaged}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>סימן 3 רמח</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="כמות כלים"
                        type="number"
                        min={0}
                        name="c3_rmh_tools"
                        value={reportData.c3_rmh_tools}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="כלים פגועים"
                        type="number"
                        min={0}
                        name="c3_rmh_tools_damaged"
                        value={reportData.c3_rmh_tools_damaged}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>נמר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="כמות כלים"
                        type="number"
                        min={0}
                        name="namer_tools"
                        value={reportData.namer_tools}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="כלים פגועים"
                        type="number"
                        min={0}
                        name="namer_tools_damaged"
                        value={reportData.namer_tools_damaged}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>דחפורים</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="כמות כלים"
                        type="number"
                        min={0}
                        name="dahforim_tools"
                        value={reportData.dahforim_tools}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="כלים פגועים"
                        type="number"
                        min={0}
                        name="dahforim_tools_damaged"
                        value={reportData.dahforim_tools_damaged}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>

                <div
                  tag="h4"
                  style={{
                    direction: "rtl",
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingTop: "20px",
                    paddingBottom: "10px",
                  }}
                >
                  <p style={{ fontSize: 18 }}>תקלות טכניות</p>
                </div>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    ></Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>שליפות חט"כ</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>כמות בק"ש</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>מעיל רוח</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>הינע סופי</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>קנים</h6>
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>סימן 4</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='שליפות חט"כ'
                        type="number"
                        min={0}
                        name="c4_hatak"
                        value={reportData.c4_hatak}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='כמות בק"ש'
                        type="number"
                        min={0}
                        name="c4_bakash"
                        value={reportData.c4_bakash}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="מעיל רוח"
                        type="number"
                        min={0}
                        name="c4_coat"
                        value={reportData.c4_coat}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הינע סופי"
                        type="number"
                        min={0}
                        name="c4_end"
                        value={reportData.c4_end}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="קנים"
                        type="number"
                        min={0}
                        name="c4_kanim"
                        value={reportData.c4_kanim}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>סימן 3</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='שליפות חט"כ'
                        type="number"
                        min={0}
                        name="c3_hatak"
                        value={reportData.c3_hatak}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='כמות בק"ש'
                        type="number"
                        min={0}
                        name="c3_bakash"
                        value={reportData.c3_bakash}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="מעיל רוח"
                        type="number"
                        min={0}
                        name="c3_coat"
                        value={reportData.c3_coat}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הינע סופי"
                        type="number"
                        min={0}
                        name="c3_end"
                        value={reportData.c3_end}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="קנים"
                        type="number"
                        min={0}
                        name="c3_kanim"
                        value={reportData.c3_kanim}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>נמר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='שליפות חט"כ'
                        type="number"
                        min={0}
                        name="namer_hatak"
                        value={reportData.namer_hatak}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='כמות בק"ש'
                        type="number"
                        min={0}
                        name="namer_bakash"
                        value={reportData.namer_bakash}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="מעיל רוח"
                        type="number"
                        min={0}
                        name="namer_coat"
                        value={reportData.namer_coat}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הינע סופי"
                        type="number"
                        min={0}
                        name="namer_end"
                        value={reportData.namer_end}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="קנים"
                        type="number"
                        min={0}
                        name="namer_kanim"
                        value={reportData.namer_kanim}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row xs={12} md={6} lg={6}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>דחפורים</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='שליפות חט"כ'
                        type="number"
                        min={0}
                        name="dahforim_hatak"
                        value={reportData.dahforim_hatak}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='כמות בק"ש'
                        type="number"
                        min={0}
                        name="dahforim_bakash"
                        value={reportData.dahforim_bakash}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="מעיל רוח"
                        type="number"
                        min={0}
                        name="dahforim_coat"
                        value={reportData.dahforim_coat}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הינע סופי"
                        type="number"
                        min={0}
                        name="dahforim_end"
                        value={reportData.dahforim_end}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="קנים"
                        type="number"
                        min={0}
                        name="dahforim_kanim"
                        value={reportData.dahforim_kanim}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>

                <div className="text-center" style={{ paddingTop: "20px" }}>
                  <MDButton
                    color="mekatnar"
                    size="large"
                    onClick={onSubmit}
                    className="btn-new-blue"
                    type="submit"
                  >
                    עדכן
                    <Icon fontSize="small">upload</Icon>&nbsp;
                  </MDButton>
                </div>
              </Form>
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
      {nesoashchikaFormDB()}
      <Outlet />
    </MDBox>
  );
}
