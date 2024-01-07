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

export default function DamagedtoolsFormDB() {
  const [data, setData] = useState({
    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });

  const [reportData, setReportData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/damagedtools/`)
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
      c4_trained: reportData.c4_trained,
      c4_treatment: reportData.c4_treatment,
      c4_shutdown: reportData.c4_shutdown,
      c4_rescue: reportData.c4_rescue,

      c3_trained: reportData.c3_trained,
      c3_treatment: reportData.c3_treatment,
      c3_shutdown: reportData.c3_shutdown,
      c3_rescue: reportData.c3_rescue,

      malar_trained: reportData.malar_trained,
      malar_treatment: reportData.malar_treatment,
      malar_shutdown: reportData.malar_shutdown,
      malar_rescue: reportData.malar_rescue,

      namer_trained: reportData.namer_trained,
      namer_treatment: reportData.namer_treatment,
      namer_shutdown: reportData.namer_shutdown,
      namer_rescue: reportData.namer_rescue,

      zma_trained: reportData.zma_trained,
      zma_treatment: reportData.zma_treatment,
      zma_shutdown: reportData.zma_shutdown,
      zma_rescue: reportData.zma_rescue,

      hasz_trained: reportData.hasz_trained,
      hasz_treatment: reportData.hasz_treatment,
      hasz_shutdown: reportData.hasz_shutdown,
      hasz_rescue: reportData.hasz_rescue,

      nagmash_trained: reportData.nagmash_trained,
      nagmash_treatment: reportData.nagmash_treatment,
      nagmash_shutdown: reportData.nagmash_shutdown,
      nagmash_rescue: reportData.nagmash_rescue,

      until_timron_tank_trained: reportData.until_timron_tank_trained,
      until_timron_tank_left: reportData.until_timron_tank_left,

      until_timron_malar_trained: reportData.until_timron_malar_trained,
      until_timron_malar_left: reportData.until_timron_malar_left,

      until_timron_namer_trained: reportData.until_timron_namer_trained,
      until_timron_namer_left: reportData.until_timron_namer_left,

      until_timron_dahfor_trained: reportData.until_timron_dahfor_trained,
      until_timron_dahfor_left: reportData.until_timron_dahfor_left,

      until_timron_hasz_trained: reportData.until_timron_hasz_trained,
      until_timron_hasz_left: reportData.until_timron_hasz_left,

      from_timron_tank_trained: reportData.from_timron_tank_trained,
      from_timron_tank_left: reportData.from_timron_tank_left,

      from_timron_malar_trained: reportData.from_timron_malar_trained,
      from_timron_malar_left: reportData.from_timron_malar_left,

      from_timron_namer_trained: reportData.from_timron_namer_trained,
      from_timron_namer_left: reportData.from_timron_namer_left,

      from_timron_dahfor_trained: reportData.from_timron_dahfor_trained,
      from_timron_dahfor_left: reportData.from_timron_dahfor_left,

      from_timron_hasz_trained: reportData.from_timron_hasz_trained,
      from_timron_hasz_left: reportData.from_timron_hasz_left,

      tank_fix: reportData.tank_fix,
      tank_till_weeks: reportData.tank_till_weeks,
      tank_till_month: reportData.tank_till_month,
      tank_up_month: reportData.tank_up_month,
      tank_long_fix: reportData.tank_long_fix,

      malar_fix: reportData.malar_fix,
      malar_till_weeks: reportData.malar_till_weeks,
      malar_till_month: reportData.malar_till_month,
      malar_up_month: reportData.malar_up_month,
      malar_long_fix: reportData.malar_long_fix,

      namer_fix: reportData.namer_fix,
      namer_till_weeks: reportData.namer_till_weeks,
      namer_till_month: reportData.namer_till_month,
      namer_up_month: reportData.namer_up_month,
      namer_long_fix: reportData.namer_long_fix,

      dahfor_fix: reportData.dahfor_fix,
      dahfor_till_weeks: reportData.dahfor_till_weeks,
      dahfor_till_month: reportData.dahfor_till_month,
      dahfor_up_month: reportData.dahfor_up_month,
      dahfor_long_fix: reportData.dahfor_long_fix,

      hasz_fix: reportData.hasz_fix,
      hasz_till_weeks: reportData.hasz_till_weeks,
      hasz_till_month: reportData.hasz_till_month,
      hasz_up_month: reportData.hasz_up_month,
      hasz_long_fix: reportData.hasz_long_fix,

      pikod_fix: reportData.pikod_fix,
      pikod_till_weeks: reportData.pikod_till_weeks,
      pikod_till_month: reportData.pikod_till_month,
      pikod_up_month: reportData.pikod_up_month,
      pikod_long_fix: reportData.pikod_long_fix,

      egad_fix: reportData.egad_fix,
      egad_till_weeks: reportData.egad_till_weeks,
      egad_till_month: reportData.egad_till_month,
      egad_up_month: reportData.egad_up_month,
      egad_long_fix: reportData.egad_long_fix,

      masha_fix: reportData.masha_fix,
      masha_till_weeks: reportData.masha_till_weeks,
      masha_till_month: reportData.masha_till_month,
      masha_up_month: reportData.masha_up_month,
      masha_long_fix: reportData.masha_long_fix,

      katrapiler_fix: reportData.katrapiler_fix,
      katrapiler_till_weeks: reportData.katrapiler_till_weeks,
      katrapiler_till_month: reportData.katrapiler_till_month,
      katrapiler_up_month: reportData.katrapiler_up_month,
      katrapiler_long_fix: reportData.katrapiler_long_fix,

      nt_trained: reportData.nt_trained,
      nt_treatment: reportData.nt_treatment,
      nt_shutdown: reportData.nt_shutdown,

      mtan_trained: reportData.mtan_trained,
      mtan_treatment: reportData.mtan_treatment,
      mtan_shutdown: reportData.mtan_shutdown,

      pazmar_trained: reportData.pazmar_trained,
      pazmar_treatment: reportData.pazmar_treatment,
      pazmar_shutdown: reportData.pazmar_shutdown,

      fire_trained: reportData.fire_trained,
      fire_treatment: reportData.fire_treatment,
      fire_shutdown: reportData.fire_shutdown,

      reversal_trained: reportData.reversal_trained,
      reversal_treatment: reportData.reversal_treatment,
      reversal_shutdown: reportData.reversal_shutdown,

      other_trained: reportData.other_trained,
      other_treatment: reportData.other_treatment,
      other_shutdown: reportData.other_shutdown,
    };

    console.log(requestData);
    axios
      .post(`http://localhost:5000/TowingLogApi/damagedtools/update/${reportData._id}`, requestData)
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

      c4_trained: reportData.c4_trained,
      c4_treatment: reportData.c4_treatment,
      c4_shutdown: reportData.c4_shutdown,
      c4_rescue: reportData.c4_rescue,

      c3_trained: reportData.c3_trained,
      c3_treatment: reportData.c3_treatment,
      c3_shutdown: reportData.c3_shutdown,
      c3_rescue: reportData.c3_rescue,

      malar_trained: reportData.malar_trained,
      malar_treatment: reportData.malar_treatment,
      malar_shutdown: reportData.malar_shutdown,
      malar_rescue: reportData.malar_rescue,

      namer_trained: reportData.namer_trained,
      namer_treatment: reportData.namer_treatment,
      namer_shutdown: reportData.namer_shutdown,
      namer_rescue: reportData.namer_rescue,

      zma_trained: reportData.zma_trained,
      zma_treatment: reportData.zma_treatment,
      zma_shutdown: reportData.zma_shutdown,
      zma_rescue: reportData.zma_rescue,

      hasz_trained: reportData.hasz_trained,
      hasz_treatment: reportData.hasz_treatment,
      hasz_shutdown: reportData.hasz_shutdown,
      hasz_rescue: reportData.hasz_rescue,

      nagmash_trained: reportData.nagmash_trained,
      nagmash_treatment: reportData.nagmash_treatment,
      nagmash_shutdown: reportData.nagmash_shutdown,
      nagmash_rescue: reportData.nagmash_rescue,

      until_timron_tank_trained: reportData.until_timron_tank_trained,
      until_timron_tank_left: reportData.until_timron_tank_left,

      until_timron_malar_trained: reportData.until_timron_malar_trained,
      until_timron_malar_left: reportData.until_timron_malar_left,

      until_timron_namer_trained: reportData.until_timron_namer_trained,
      until_timron_namer_left: reportData.until_timron_namer_left,

      until_timron_dahfor_trained: reportData.until_timron_dahfor_trained,
      until_timron_dahfor_left: reportData.until_timron_dahfor_left,

      until_timron_hasz_trained: reportData.until_timron_hasz_trained,
      until_timron_hasz_left: reportData.until_timron_hasz_left,

      from_timron_tank_trained: reportData.from_timron_tank_trained,
      from_timron_tank_left: reportData.from_timron_tank_left,

      from_timron_malar_trained: reportData.from_timron_malar_trained,
      from_timron_malar_left: reportData.from_timron_malar_left,

      from_timron_namer_trained: reportData.from_timron_namer_trained,
      from_timron_namer_left: reportData.from_timron_namer_left,

      from_timron_dahfor_trained: reportData.from_timron_dahfor_trained,
      from_timron_dahfor_left: reportData.from_timron_dahfor_left,

      from_timron_hasz_trained: reportData.from_timron_hasz_trained,
      from_timron_hasz_left: reportData.from_timron_hasz_left,

      tank_fix: reportData.tank_fix,
      tank_till_weeks: reportData.tank_till_weeks,
      tank_till_month: reportData.tank_till_month,
      tank_up_month: reportData.tank_up_month,
      tank_long_fix: reportData.tank_long_fix,

      malar_fix: reportData.malar_fix,
      malar_till_weeks: reportData.malar_till_weeks,
      malar_till_month: reportData.malar_till_month,
      malar_up_month: reportData.malar_up_month,
      malar_long_fix: reportData.malar_long_fix,

      namer_fix: reportData.namer_fix,
      namer_till_weeks: reportData.namer_till_weeks,
      namer_till_month: reportData.namer_till_month,
      namer_up_month: reportData.namer_up_month,
      namer_long_fix: reportData.namer_long_fix,

      dahfor_fix: reportData.dahfor_fix,
      dahfor_till_weeks: reportData.dahfor_till_weeks,
      dahfor_till_month: reportData.dahfor_till_month,
      dahfor_up_month: reportData.dahfor_up_month,
      dahfor_long_fix: reportData.dahfor_long_fix,

      hasz_fix: reportData.hasz_fix,
      hasz_till_weeks: reportData.hasz_till_weeks,
      hasz_till_month: reportData.hasz_till_month,
      hasz_up_month: reportData.hasz_up_month,
      hasz_long_fix: reportData.hasz_long_fix,

      pikod_fix: reportData.pikod_fix,
      pikod_till_weeks: reportData.pikod_till_weeks,
      pikod_till_month: reportData.pikod_till_month,
      pikod_up_month: reportData.pikod_up_month,
      pikod_long_fix: reportData.pikod_long_fix,

      egad_fix: reportData.egad_fix,
      egad_till_weeks: reportData.egad_till_weeks,
      egad_till_month: reportData.egad_till_month,
      egad_up_month: reportData.egad_up_month,
      egad_long_fix: reportData.egad_long_fix,

      masha_fix: reportData.masha_fix,
      masha_till_weeks: reportData.masha_till_weeks,
      masha_till_month: reportData.masha_till_month,
      masha_up_month: reportData.masha_up_month,
      masha_long_fix: reportData.masha_long_fix,

      katrapiler_fix: reportData.katrapiler_fix,
      katrapiler_till_weeks: reportData.katrapiler_till_weeks,
      katrapiler_till_month: reportData.katrapiler_till_month,
      katrapiler_up_month: reportData.katrapiler_up_month,
      katrapiler_long_fix: reportData.katrapiler_long_fix,

      nt_trained: reportData.nt_trained,
      nt_treatment: reportData.nt_treatment,
      nt_shutdown: reportData.nt_shutdown,

      mtan_trained: reportData.mtan_trained,
      mtan_treatment: reportData.mtan_treatment,
      mtan_shutdown: reportData.mtan_shutdown,

      pazmar_trained: reportData.pazmar_trained,
      pazmar_treatment: reportData.pazmar_treatment,
      pazmar_shutdown: reportData.pazmar_shutdown,

      fire_trained: reportData.fire_trained,
      fire_treatment: reportData.fire_treatment,
      fire_shutdown: reportData.fire_shutdown,

      reversal_trained: reportData.reversal_trained,
      reversal_treatment: reportData.reversal_treatment,
      reversal_shutdown: reportData.reversal_shutdown,

      other_trained: reportData.other_trained,
      other_treatment: reportData.other_treatment,
      other_shutdown: reportData.other_shutdown,
    };

    console.log(archiverequestData);
    axios
      .post(`http://localhost:5000/TowingLogApi/archiveddamagedtools/add`, archiverequestData)
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
          טופס כלים פגועים עודכן{" "}
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
      return <Navigate to="/damegedTools" />;
    }
  };

  const damagedtoolsFormDB = () => (
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
                  טופס כלים פגועים{" "}
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
                      <h6 style={{ fontWeight: "bold" }}>הוכשרו</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>בטיפול</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>הושבתו</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>טרם חולצו</h6>
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
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="c4_trained"
                        value={reportData.c4_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="c4_treatment"
                        value={reportData.c4_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="c4_shutdown"
                        value={reportData.c4_shutdown}
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
                        placeholder="טרם חולצו"
                        type="number"
                        min={0}
                        name="c4_rescue"
                        value={reportData.c4_rescue}
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
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="c3_trained"
                        value={reportData.c3_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="c3_treatment"
                        value={reportData.c3_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="c3_shutdown"
                        value={reportData.c3_shutdown}
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
                        placeholder="טרם חולצו"
                        type="number"
                        min={0}
                        name="c3_rescue"
                        value={reportData.c3_rescue}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>מלא"ר/גינס</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="malar_trained"
                        value={reportData.malar_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="malar_treatment"
                        value={reportData.malar_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="malar_shutdown"
                        value={reportData.malar_shutdown}
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
                        placeholder="טרם חולצו"
                        type="number"
                        min={0}
                        name="malar_rescue"
                        value={reportData.malar_rescue}
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
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="namer_trained"
                        value={reportData.namer_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="namer_treatment"
                        value={reportData.namer_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="namer_shutdown"
                        value={reportData.namer_shutdown}
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
                        placeholder="טרם חולצו"
                        type="number"
                        min={0}
                        name="namer_rescue"
                        value={reportData.namer_rescue}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>צמ"ה</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="zma_trained"
                        value={reportData.zma_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="zma_treatment"
                        value={reportData.zma_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="zma_shutdown"
                        value={reportData.zma_shutdown}
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
                        placeholder="טרם חולצו"
                        type="number"
                        min={0}
                        name="zma_rescue"
                        value={reportData.zma_rescue}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>חס"צ</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="hasz_trained"
                        value={reportData.hasz_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="hasz_treatment"
                        value={reportData.hasz_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="hasz_shutdown"
                        value={reportData.hasz_shutdown}
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
                        placeholder="טרם חולצו"
                        type="number"
                        min={0}
                        name="hasz_rescue"
                        value={reportData.hasz_rescue}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>נגמ"ש</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="nagmash_trained"
                        value={reportData.nagmash_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="nagmash_treatment"
                        value={reportData.nagmash_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="nagmash_shutdown"
                        value={reportData.nagmash_shutdown}
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
                        placeholder="טרם חולצו"
                        type="number"
                        min={0}
                        name="nagmash_rescue"
                        value={reportData.nagmash_rescue}
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
                  <p style={{ fontSize: 18 }}>עד התמרון</p>
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
                      <h6 style={{ fontWeight: "bold" }}>הוכשר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>נותר</h6>
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>טנקים</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="until_timron_tank_trained"
                        value={reportData.until_timron_tank_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="until_timron_tank_left"
                        value={reportData.until_timron_tank_left}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>מלא"ר/גינס</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="until_timron_malar_trained"
                        value={reportData.until_timron_malar_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="until_timron_malar_left"
                        value={reportData.until_timron_malar_left}
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
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="until_timron_namer_trained"
                        value={reportData.until_timron_namer_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="until_timron_namer_left"
                        value={reportData.until_timron_namer_left}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>דחפור</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="until_timron_dahfor_trained"
                        value={reportData.until_timron_dahfor_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="until_timron_dahfor_left"
                        value={reportData.until_timron_dahfor_left}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>חס"צ</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="until_timron_hasz_trained"
                        value={reportData.until_timron_hasz_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="until_timron_hasz_left"
                        value={reportData.until_timron_hasz_left}
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
                  <p style={{ fontSize: 18 }}>מתחילת התמרון</p>
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
                      <h6 style={{ fontWeight: "bold" }}>הוכשר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>נותר</h6>
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>טנקים</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="from_timron_tank_trained"
                        value={reportData.from_timron_tank_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="from_timron_tank_left"
                        value={reportData.from_timron_tank_left}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>מלא"ר/גינס</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="from_timron_malar_trained"
                        value={reportData.from_timron_malar_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="from_timron_malar_left"
                        value={reportData.from_timron_malar_left}
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
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="from_timron_namer_trained"
                        value={reportData.from_timron_namer_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="from_timron_namer_left"
                        value={reportData.from_timron_namer_left}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>דחפור</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="from_timron_dahfor_trained"
                        value={reportData.from_timron_dahfor_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="from_timron_dahfor_left"
                        value={reportData.from_timron_dahfor_left}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>חס"צ</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="from_timron_hasz_trained"
                        value={reportData.from_timron_hasz_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="from_timron_hasz_left"
                        value={reportData.from_timron_hasz_left}
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
                  <p style={{ fontSize: 18 }}>סוג רק"ם</p>
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
                      <h6 style={{ fontWeight: "bold" }}>תוקן</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>עד שבועיים</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>עד חודש</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>מעל חודש</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>תיקון ארוך</h6>
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>טנקים</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="תוקן"
                        type="number"
                        min={0}
                        name="tank_fix"
                        value={reportData.tank_fix}
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
                        placeholder="עד שבועיים"
                        type="number"
                        min={0}
                        name="tank_till_weeks"
                        value={reportData.tank_till_weeks}
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
                        placeholder="עד חודש"
                        type="number"
                        min={0}
                        name="tank_till_month"
                        value={reportData.tank_till_month}
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
                        placeholder="מעל חודש"
                        type="number"
                        min={0}
                        name="tank_up_month"
                        value={reportData.tank_up_month}
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
                        placeholder="תיקון ארוך"
                        type="number"
                        min={0}
                        name="tank_long_fix"
                        value={reportData.tank_long_fix}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>מלא"ר/גינס</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="תוקן"
                        type="number"
                        min={0}
                        name="malar_fix"
                        value={reportData.malar_fix}
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
                        placeholder="עד שבועיים"
                        type="number"
                        min={0}
                        name="malar_till_weeks"
                        value={reportData.malar_till_weeks}
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
                        placeholder="עד חודש"
                        type="number"
                        min={0}
                        name="malar_till_month"
                        value={reportData.malar_till_month}
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
                        placeholder="מעל חודש"
                        type="number"
                        min={0}
                        name="malar_up_month"
                        value={reportData.malar_up_month}
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
                        placeholder="תיקון ארוך"
                        type="number"
                        min={0}
                        name="malar_long_fix"
                        value={reportData.malar_long_fix}
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
                        placeholder="תוקן"
                        type="number"
                        min={0}
                        name="namer_fix"
                        value={reportData.namer_fix}
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
                        placeholder="עד שבועיים"
                        type="number"
                        min={0}
                        name="namer_till_weeks"
                        value={reportData.namer_till_weeks}
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
                        placeholder="עד חודש"
                        type="number"
                        min={0}
                        name="namer_till_month"
                        value={reportData.namer_till_month}
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
                        placeholder="מעל חודש"
                        type="number"
                        min={0}
                        name="namer_up_month"
                        value={reportData.namer_up_month}
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
                        placeholder="תיקון ארוך"
                        type="number"
                        min={0}
                        name="namer_long_fix"
                        value={reportData.namer_long_fix}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>דחפור</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="תוקן"
                        type="number"
                        min={0}
                        name="dahfor_fix"
                        value={reportData.dahfor_fix}
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
                        placeholder="עד שבועיים"
                        type="number"
                        min={0}
                        name="dahfor_till_weeks"
                        value={reportData.dahfor_till_weeks}
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
                        placeholder="עד חודש"
                        type="number"
                        min={0}
                        name="dahfor_till_month"
                        value={reportData.dahfor_till_month}
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
                        placeholder="מעל חודש"
                        type="number"
                        min={0}
                        name="dahfor_up_month"
                        value={reportData.dahfor_up_month}
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
                        placeholder="תיקון ארוך"
                        type="number"
                        min={0}
                        name="dahfor_long_fix"
                        value={reportData.dahfor_long_fix}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>חס"צ</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="תוקן"
                        type="number"
                        min={0}
                        name="hasz_fix"
                        value={reportData.hasz_fix}
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
                        placeholder="עד שבועיים"
                        type="number"
                        min={0}
                        name="hasz_till_weeks"
                        value={reportData.hasz_till_weeks}
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
                        placeholder="עד חודש"
                        type="number"
                        min={0}
                        name="hasz_till_month"
                        value={reportData.hasz_till_month}
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
                        placeholder="מעל חודש"
                        type="number"
                        min={0}
                        name="hasz_up_month"
                        value={reportData.hasz_up_month}
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
                        placeholder="תיקון ארוך"
                        type="number"
                        min={0}
                        name="hasz_long_fix"
                        value={reportData.hasz_long_fix}
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
                  <p style={{ fontSize: 18 }}>מיקום הרק"ם</p>
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
                      <h6 style={{ fontWeight: "bold" }}>תוקן</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>עד שבועיים</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>עד חודש</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>מעל חודש</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>תיקון ארוך</h6>
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>במרחב הפיקוד</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="תוקן"
                        type="number"
                        min={0}
                        name="pikod_fix"
                        value={reportData.pikod_fix}
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
                        placeholder="עד שבועיים"
                        type="number"
                        min={0}
                        name="pikod_till_weeks"
                        value={reportData.pikod_till_weeks}
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
                        placeholder="עד חודש"
                        type="number"
                        min={0}
                        name="pikod_till_month"
                        value={reportData.pikod_till_month}
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
                        placeholder="מעל חודש"
                        type="number"
                        min={0}
                        name="pikod_up_month"
                        value={reportData.pikod_up_month}
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
                        placeholder="תיקון ארוך"
                        type="number"
                        min={0}
                        name="pikod_long_fix"
                        value={reportData.pikod_long_fix}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>אגד</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="תוקן"
                        type="number"
                        min={0}
                        name="egad_fix"
                        value={reportData.egad_fix}
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
                        placeholder="עד שבועיים"
                        type="number"
                        min={0}
                        name="egad_till_weeks"
                        value={reportData.egad_till_weeks}
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
                        placeholder="עד חודש"
                        type="number"
                        min={0}
                        name="egad_till_month"
                        value={reportData.egad_till_month}
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
                        placeholder="מעל חודש"
                        type="number"
                        min={0}
                        name="egad_up_month"
                        value={reportData.egad_up_month}
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
                        placeholder="תיקון ארוך"
                        type="number"
                        min={0}
                        name="egad_long_fix"
                        value={reportData.egad_long_fix}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>מש"א</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="תוקן"
                        type="number"
                        min={0}
                        name="masha_fix"
                        value={reportData.masha_fix}
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
                        placeholder="עד שבועיים"
                        type="number"
                        min={0}
                        name="masha_till_weeks"
                        value={reportData.masha_till_weeks}
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
                        placeholder="עד חודש"
                        type="number"
                        min={0}
                        name="masha_till_month"
                        value={reportData.masha_till_month}
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
                        placeholder="מעל חודש"
                        type="number"
                        min={0}
                        name="masha_up_month"
                        value={reportData.masha_up_month}
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
                        placeholder="תיקון ארוך"
                        type="number"
                        min={0}
                        name="masha_long_fix"
                        value={reportData.masha_long_fix}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>קטרפילר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="תוקן"
                        type="number"
                        min={0}
                        name="katrapiler_fix"
                        value={reportData.katrapiler_fix}
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
                        placeholder="עד שבועיים"
                        type="number"
                        min={0}
                        name="katrapiler_till_weeks"
                        value={reportData.katrapiler_till_weeks}
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
                        placeholder="עד חודש"
                        type="number"
                        min={0}
                        name="katrapiler_till_month"
                        value={reportData.katrapiler_till_month}
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
                        placeholder="מעל חודש"
                        type="number"
                        min={0}
                        name="katrapiler_up_month"
                        value={reportData.katrapiler_up_month}
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
                        placeholder="תיקון ארוך"
                        type="number"
                        min={0}
                        name="katrapiler_long_fix"
                        value={reportData.katrapiler_long_fix}
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
                      <h6 style={{ fontWeight: "bold" }}>הוכשרו</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>בטיפול</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>הושבתו</h6>
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>פגיעת נ"ט</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="nt_trained"
                        value={reportData.nt_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="nt_treatment"
                        value={reportData.nt_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="nt_shutdown"
                        value={reportData.nt_shutdown}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>מטען</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="mtan_trained"
                        value={reportData.mtan_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="mtan_treatment"
                        value={reportData.mtan_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="mtan_shutdown"
                        value={reportData.mtan_shutdown}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>פצמ"ר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="pazmar_trained"
                        value={reportData.pazmar_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="pazmar_treatment"
                        value={reportData.pazmar_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="pazmar_shutdown"
                        value={reportData.pazmar_shutdown}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>שריפה</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="fire_trained"
                        value={reportData.fire_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="fire_treatment"
                        value={reportData.fire_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="fire_shutdown"
                        value={reportData.fire_shutdown}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>התהפכות</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="reversal_trained"
                        value={reportData.reversal_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="reversal_treatment"
                        value={reportData.reversal_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="reversal_shutdown"
                        value={reportData.reversal_shutdown}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>אחר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="other_trained"
                        value={reportData.other_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="other_treatment"
                        value={reportData.other_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="other_shutdown"
                        value={reportData.other_shutdown}
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
      {damagedtoolsFormDB()}
      <Outlet />
    </MDBox>
  );
}
