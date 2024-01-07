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

export default function KshirotFormDB() {
  const [archiveData, setArchiveData] = useState({});
  const [timeUpdate, setTimeUpdate] = useState("1900-01-01T00:01");
  const [dataDB, setDataDB] = useState({
    weeksArray: [{}],

    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });

  const [weekArray, setWeekArray] = useState([]);
  const min = 0;
  const max = 100;

  // eslint-disable-next-line prefer-const
  // let weekArray =[];

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/kshirot`)
      .then((response) => {
        console.log(response.data);
        setDataDB(response.data.weeksArray);
        setArchiveData(response.data.weeksArray);
        setWeekArray(response.data.weeksArray);
        setTimeUpdate(response.data.updatedAt);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(weekArray);
  }, []);

  const handleChangeC3 = (index) => (evt) => {
    const newWeek = [...weekArray];
    newWeek[index].c3 = Math.max(min, Math.min(max, Number(evt.target.value)));
    setWeekArray(newWeek);
    console.log(newWeek);
  };
  const handleChangeC4 = (index) => (evt) => {
    const newWeek = [...weekArray];
    newWeek[index].c4 = Math.max(min, Math.min(max, Number(evt.target.value)));
    setWeekArray(newWeek);
    console.log(newWeek);
  };
  const handleChangeNamer = (index) => (evt) => {
    const newWeek = [...weekArray];
    newWeek[index].namer = Math.max(min, Math.min(max, Number(evt.target.value)));
    setWeekArray(newWeek);
    console.log(newWeek);
  };
  const handleChangeZma = (index) => (evt) => {
    const newWeek = [...weekArray];
    newWeek[index].zma = Math.max(min, Math.min(max, Number(evt.target.value)));
    setWeekArray(newWeek);
    console.log(newWeek);
  };
  const addWeek = () => {
    const addNewWeek = {
      num: 5,
      week_name: `שבוע ${weekArray.length + 1}`,
      c3: 0,
      c4: 0,
      namer: 0,
      zma: 0,
    };
    setWeekArray([...weekArray, addNewWeek]);
    console.log(weekArray.length);
  };

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
        <MDTypography variant="h3" fontWeight="medium" color="white">
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
      weeksArray: weekArray,
    };
    axios
      .post(`http://localhost:5000/TowingLogApi/kshirot/update`, requestData)
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
      weeksArray: archiveData,
      personalnumber: user.personalnumber,
    };

    await axios
      .post(`http://localhost:5000/TowingLogApi/kshirotArchive/add`, archiverequestData)
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

  const KshirotFormDB = () => (
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
                  עדכון טופס כשירות
                </MDTypography>
              </MDBox>
              <Form
                style={{ textAlign: "right", paddingBottom: "1rem", paddingTop: "1rem" }}
                role="form"
              >
                <FormGroup>
                  <Divider variant="middle" />
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
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>סימן 3</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}> סימן 4</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}> נמר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}> צמ"ה </h6>
                    </Col>
                  </Row>
                </FormGroup>

                {weekArray !== null
                  ? weekArray.map((weeksArrays, index) => (
                      <>
                        <FormGroup>
                          <Row xs={12} md={6} lg={6}>
                            <Col
                              style={{
                                justifyContent: "right",
                                alignContent: "right",
                                textAlign: "center",
                              }}
                            >
                              <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>
                                {" "}
                                {weekArray[index].week_name}
                              </h6>
                            </Col>
                            <Col
                              style={{
                                justifyContent: "right",
                                alignContent: "right",
                                textAlign: "right",
                              }}
                            >
                              <Input
                                placeholder="ס'3"
                                type="number"
                                min={0}
                                name="c3"
                                value={weekArray[index].c3}
                                onChange={handleChangeC3(index)}
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
                                placeholder="ס'4"
                                type="number"
                                min={0}
                                name="c4"
                                value={weekArray[index].c4}
                                onChange={handleChangeC4(index)}
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
                                placeholder="נמר"
                                type="number"
                                min={0}
                                name="namer"
                                value={weekArray[index].namer}
                                onChange={handleChangeNamer(index)}
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
                                placeholder="צמ''ה"
                                type="number"
                                min={0}
                                name="zma"
                                value={weekArray[index].zma}
                                onChange={handleChangeZma(index)}
                              />
                            </Col>
                          </Row>
                        </FormGroup>
                      </>
                    ))
                  : console.log("null")}
                <FormGroup>
                  <div className="text-right" mt={3}>
                    <MDButton onClick={addWeek} color="mekatnar" iconOnly>
                      <Icon>add</Icon>
                    </MDButton>
                  </div>
                </FormGroup>

                <div className="text-center" mt={3}>
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
                {timeUpdate !== "1900-01-01T00:01" && (
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

      {KshirotFormDB()}
    </>
  );
}