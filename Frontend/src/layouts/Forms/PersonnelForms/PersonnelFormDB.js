/* eslint-disable react/self-closing-comp */
/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable no-shadow */
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
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
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
import Divider from "@mui/material/Divider";
import { DropzoneAreaBase } from "material-ui-dropzone";
import { DropzoneArea } from "react-mui-dropzone";

// for file upload from Data
import { singleFileUpload } from "Data/api";
// user and auth import
import { authenticate, isAuthenticated, signin } from "auth/index";
const { user } = isAuthenticated();

// import * as Hebcal from "hebcal";
import { HDate, months } from "@hebcal/core";

export default function PersonnelFormDB() {
  const [timeUpdate, setTimeUpdate] = useState();
  const [archiveData, setArchiveData] = useState({});

  const [dataDB, setDataDB] = useState({
    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });
  const min = 0;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/personnel`)
      .then((response) => {
        setDataDB(response.data);
        setArchiveData(response.data);
        setTimeUpdate(response.data.updatedAt);
      })
      .catch((error) => {});
  }, []);

  function handleChange(evt) {
    const value = Math.max(min, Number(evt.target.value));
    setDataDB({ ...dataDB, [evt.target.name]: value });
  }

  const handleCloseSuccsecModal = () => {
    setDataDB({
      ...dataDB,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: true,
    });
  };
  const handleCloseLoadingModal = () => {
    setDataDB({ ...dataDB, loading: false });
  };
  const handleCloseErrorModal = () => {
    setDataDB({
      ...dataDB,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: false,
    });
  };
  const NavigateUser = () => {
    if (dataDB.NavigateToReferrer) {
      window.location.href = window.location.href;
      return <Navigate to="/genralInfo" />;
    }
  };
  const showSuccess = () => (
    <Dialog
      open={dataDB.successmsg}
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
          הטופס עודכן בהצלחה
        </MDTypography>
      </MDBox>
    </Dialog>
  );
  const showError = () => (
    <Dialog
      open={dataDB.error}
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
          שגיאה בעדכון הטופס
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
      open={dataDB.loading}
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
            אנא המתן...
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const onSubmit = (event) => {
    event.preventDefault();

    SendFormData(event);
    SendarchiveFormData(event);
  };
  const SendFormData = (event) => {
    event.preventDefault();

    const requestData = {
      hova_soldiers: dataDB.hova_soldiers,
      keva: dataDB.keva,
      civilian_employee: dataDB.civilian_employee,
      student: dataDB.student,
      miluim: dataDB.miluim,
      totalSolider: dataDB.totalSolider,

      casualty: dataDB.casualty,
      back_to_unit: dataDB.back_to_unit,
      totalHalalim: dataDB.totalHalalim,
      sadir_halalim: dataDB.sadir_halalim,
      miluim_halalim: dataDB.miluim_halalim,
    };
    axios
      .post(`http://localhost:5000/TowingLogApi/personnel/update`, requestData)
      .then((response) => {
        setDataDB({
          ...dataDB,
          loading: false,
          error: false,
          successmsg: true,
          NavigateToReferrer: true,
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setDataDB({
          ...dataDB,
          errortype: error.response,
          loading: false,
          error: true,
          NavigateToReferrer: false,
        });
      });
  };
  const SendarchiveFormData = async (event) => {
    event.preventDefault();

    const archiverequestData = {
      personalnumber: user.personalnumber,
      hova_soldiers: archiveData.hova_soldiers,
      keva: archiveData.keva,
      civilian_employee: archiveData.civilian_employee,
      student: archiveData.student,
      miluim: archiveData.miluim,
      totalSolider: archiveData.totalSolider,

      casualty: archiveData.casualty,
      back_to_unit: archiveData.back_to_unit,
      totalHalalim: archiveData.totalHalalim,
      sadir_halalim: archiveData.sadir_halalim,
      miluim_halalim: archiveData.miluim_halalim,
    };

    await axios
      .post(`http://localhost:5000/TowingLogApi/personnelArchive/add`, archiverequestData)
      .then((response) => {
        console.log("response.data");
        console.log(response.data);
        setDataDB({
          ...dataDB,
          loading: false,
          error: false,
          successmsg: true,
          NavigateToReferrer: false,
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setDataDB({
          ...dataDB,
          errortype: error.response,
          loading: false,
          error: true,
          NavigateToReferrer: false,
        });
      });
  };
  const PersonnelFormDB = () => (
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
                mx={20}
                mt={-3}
                p={3}
                mb={2}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  עדכון טופס מאמצים טכנולוגיים
                </MDTypography>
              </MDBox>
              <Form
                style={{ textAlign: "right", paddingBottom: "1rem", paddingTop: "1rem" }}
                role="form"
              >
                <FormGroup>
                  <Row>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{}}>חיילי חובה</h6>
                      <Input
                        placeholder="חיילי חובה"
                        type="number"
                        min={0}
                        name="hova_soldiers"
                        value={dataDB.hova_soldiers}
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
                      <h6 style={{}}> קבע</h6>
                      <Input
                        placeholder="קבע"
                        type="number"
                        min={0}
                        name="keva"
                        value={dataDB.keva}
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
                      <h6 style={{}}> אע"צ</h6>
                      <Input
                        placeholder='אע"צ'
                        type="number"
                        min={0}
                        name="civilian_employee"
                        value={dataDB.civilian_employee}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{}}>לומדים </h6>
                      <Input
                        placeholder="לומדים"
                        type="number"
                        min={0}
                        name="student"
                        value={dataDB.student}
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
                      <h6 style={{}}>מילואים </h6>
                      <Input
                        placeholder=" מילואים"
                        type="number"
                        min={0}
                        name="miluim"
                        value={dataDB.miluim}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>

                <FormGroup>
                  <Divider variant="middle" />

                  <Row>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{}}>נפגעים </h6>
                      <Input
                        placeholder="נפגעים"
                        type="number"
                        min={0}
                        name="casualty"
                        value={dataDB.casualty}
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
                      <h6 style={{}}>חזרו ליחידה </h6>
                      <Input
                        placeholder="חזרו ליחידה"
                        type="number"
                        min={0}
                        name="back_to_unit"
                        value={dataDB.back_to_unit}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{}}> חללים סדיר</h6>
                      <Input
                        placeholder="חללים סדיר"
                        type="number"
                        min={0}
                        name="sadir_halalim"
                        value={dataDB.sadir_halalim}
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
                      <h6 style={{}}> חללים מילואים</h6>
                      <Input
                        placeholder="חללים מילואים"
                        type="number"
                        min={0}
                        name="miluim_halalim"
                        value={dataDB.miluim_halalim}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <div className="text-center">
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
                {timeUpdate && (
                  <MDTypography variant="h6" textGradient color="dark">
                    עדכון אחרון:{timeUpdate.slice(0, 10)} {timeUpdate.slice(11, 16)}
                  </MDTypography>
                )}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  return (
    <>
      {showError()}
      {showSuccess()}
      {showLoading()}
      {NavigateUser()}

      {PersonnelFormDB()}
    </>
  );
}
