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

export default function MashkTechFormDB() {
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
      .get(`http://localhost:5000/TowingLogApi/mashkTeh`)
      .then((response) => {
        setDataDB(response.data);
        setArchiveData(response.data);
      })
      .catch((error) => {});
  }, []);

  function handleChange(evt) {
    const { value } = evt.target;
    setDataDB({ ...dataDB, [evt.target.name]: value });
  }

  function handleChange1(evt) {
    const value = Math.max(min, Math.min(evt.target.max, Number(evt.target.value)));
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
      return <Navigate to="/mashkTech" />;
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
        <DialogContent></DialogContent>
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

  // const CheckFormData = () => {
  //   let flag = true;
  //   const ErrorReason = [];

  //   if (dataDB.hatcim_kshirot > dataDB.hatcim ) {
  //     console.log(dataDB.hatcim_kshirot)
  //     flag = false;
  //     ErrorReason.push("מספר חט''כים כשירים אינו יכול להיות גדול יותר מסה''כ ");
  //   }
  //   if (flag !== true) {
  //     ErrorReason.forEach((reason) => {
  //       toast.error(reason);
  //       return false;
  //     });
  //   } else {
  //     return true;
  //   }
  // };
  const SendFormData = (event) => {
    event.preventDefault();

    const requestData = {
      hatcim: dataDB.hatcim,
      hatcim_kshirot: dataDB.hatcim_kshirot,
      bkhas: dataDB.bkhas,
      bkhas_kshirot: dataDB.bkhas_kshirot,
      malar: dataDB.malar,
      malar_kshirot: dataDB.malar_kshirot,
      malarCars: dataDB.malarCars,
      malarCars_kshirot: dataDB.malarCars_kshirot,
      departments_caza: dataDB.departments_caza,
      migunim: dataDB.migunim,
      Pergolas: dataDB.Pergolas,

      pikodZafon_totalNum: dataDB.pikodZafon_totalNum,
      pikodZafon_totalNum_kshirot: dataDB.pikodZafon_totalNum_kshirot,
      pikodDarom_totalNum: dataDB.pikodDarom_totalNum,
      pikodDarom_totalNum_kshirot: dataDB.pikodDarom_totalNum_kshirot,

      raklar: dataDB.raklar,
      lhat: dataDB.lhat,
      nativ_hasra: dataDB.nativ_hasra,
      robotics: dataDB.robotics,
      barack: dataDB.barack,

      life_support: dataDB.life_support,
      bow: dataDB.bow,
      windbreaker: dataDB.windbreaker,
      hanit: dataDB.hanit,

      dummy_platforms: dataDB.dummy_platforms,
      rear_line_platforms: dataDB.rear_line_platforms,
      rock_pos: dataDB.rock_pos,
      outpost_defenses: dataDB.outpost_defenses,
    };
    axios
      .post(`http://localhost:5000/TowingLogApi/mashkTeh/update`, requestData)
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
      hatcim: archiveData.hatcim,
      hatcim_kshirot: archiveData.hatcim_kshirot,
      bkhas: archiveData.bkhas,
      bkhas_kshirot: archiveData.bkhas_kshirot,
      malar: archiveData.malar,
      malar_kshirot: archiveData.malar_kshirot,
      malarCars: archiveData.malarCars,
      malarCars_kshirot: archiveData.malarCars_kshirot,
      departments_caza: archiveData.departments_caza,
      migunim: archiveData.migunim,
      Pergolas: archiveData.Pergolas,

      pikodZafon_totalNum: archiveData.pikodZafon_totalNum,
      pikodZafon_totalNum_kshirot: archiveData.pikodZafon_totalNum_kshirot,
      pikodDarom_totalNum: archiveData.pikodDarom_totalNum,
      pikodDarom_totalNum_kshirot: archiveData.pikodDarom_totalNum_kshirot,

      raklar: archiveData.raklar,
      lhat: archiveData.lhat,
      nativ_hasra: archiveData.nativ_hasra,
      robotics: archiveData.robotics,
      barack: archiveData.barack,

      life_support: archiveData.life_support,
      bow: archiveData.bow,
      windbreaker: archiveData.windbreaker,
      hanit: archiveData.hanit,

      dummy_platforms: archiveData.dummy_platforms,
      rear_line_platforms: archiveData.rear_line_platforms,
      rock_pos: archiveData.rock_pos,
      outpost_defenses: archiveData.outpost_defenses,
    };

    await axios
      .post(`http://localhost:5000/TowingLogApi/mashkTehArchive/add`, archiverequestData)
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
  const mashkTechFormDB = () => (
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
                      <h6 style={{}}>סה"כ ניידות מלא"ר</h6>
                      <Input
                        placeholder='מס ניידות מלא"ר'
                        type="number"
                        min={0}
                        name="malarCars"
                        value={dataDB.malarCars}
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
                      <h6 style={{}}> ניידות מלא"ר כשירות</h6>
                      <Input
                        placeholder=' מס ניידות מלא"ר כשירות'
                        type="number"
                        min={0}
                        name="malarCars_kshirot"
                        value={dataDB.malarCars_kshirot}
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
                      <h6 style={{}}>מחלקות כאצ"ה </h6>
                      <Input
                        placeholder="מחלקות כאצ''ה"
                        type="number"
                        min={0}
                        name="departments_caza"
                        value={dataDB.departments_caza}
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
                      <h6 style={{}}>מיגונים </h6>
                      <Input
                        placeholder="מיגונים"
                        type="number"
                        min={0}
                        name="migunim"
                        value={dataDB.migunim}
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
                      <h6 style={{}}> מספר פרגולות </h6>
                      <Input
                        placeholder="מספר פרגולות"
                        type="number"
                        min={0}
                        name="Pergolas"
                        value={dataDB.Pergolas}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Divider variant="middle" />
                  <MDTypography
                    variant="h6"
                    fontWeight="medium"
                    color="black"
                    mt={1}
                    mb={2}
                    textAlign="center"
                  >
                    כשירות משקים מטכ"ליים
                  </MDTypography>
                </FormGroup>
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
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>סה"כ מערכות</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>מספר מערכות כשירות</h6>
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>חטכ"ים</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="מספר חט''כים"
                        type="number"
                        min={0}
                        name="hatcim"
                        value={dataDB.hatcim}
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
                      <FormGroup>
                        <Input
                          placeholder="כשירות"
                          type="number"
                          min={0}
                          max={dataDB.hatcim}
                          name="hatcim_kshirot"
                          value={dataDB.hatcim_kshirot}
                          onChange={handleChange1}
                        />
                      </FormGroup>
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>בק"ש</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="מספר בק''ש"
                        type="number"
                        name="bkhas"
                        min={0}
                        value={dataDB.bkhas}
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
                        placeholder="כשירות"
                        type="number"
                        min={0}
                        max={dataDB.bkhas}
                        name="bkhas_kshirot"
                        value={dataDB.bkhas_kshirot}
                        onChange={handleChange1}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>מלא"ר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder='מספר מלא"ר'
                        type="number"
                        name="malar"
                        value={dataDB.malar}
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
                        placeholder="כשירות"
                        type="number"
                        min={0}
                        max={dataDB.malar}
                        name="malar_kshirot"
                        value={dataDB.malar_kshirot}
                        onChange={handleChange1}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Divider variant="middle" />
                    <MDTypography
                      variant="h6"
                      fontWeight="medium"
                      color="black"
                      mt={1}
                      textAlign="center"
                    >
                      מערך האיסוף
                    </MDTypography>
                  </Row>
                </FormGroup>
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
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>סה"כ מערכות</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>מספר מערכות כשירות</h6>
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>פיקוד צפון</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="פיקוד צפון"
                        type="number"
                        min={0}
                        name="pikodZafon_totalNum"
                        value={dataDB.pikodZafon_totalNum}
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
                        placeholder="כשירות"
                        type="number"
                        min={0}
                        max={dataDB.pikodZafon_totalNum}
                        name="pikodZafon_totalNum_kshirot"
                        value={dataDB.pikodZafon_totalNum_kshirot}
                        onChange={handleChange1}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>פיקוד דרום</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="פיקוד דרום"
                        type="number"
                        min={0}
                        name="pikodDarom_totalNum"
                        value={dataDB.pikodDarom_totalNum}
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
                        placeholder="כשירות"
                        type="number"
                        min={0}
                        max={dataDB.pikodDarom_totalNum}
                        name="pikodDarom_totalNum_kshirot"
                        value={dataDB.pikodDarom_totalNum_kshirot}
                        onChange={handleChange1}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Divider variant="middle" />
                    <MDTypography
                      variant="h6"
                      fontWeight="medium"
                      color="black"
                      mt={1}
                      textAlign="center"
                    >
                      קליטות אמל"ח
                    </MDTypography>
                    <MDTypography variant="h6" fontWeight="medium" color="black" mt={1} mb={1}>
                      קליטות אמל"ח חדש
                    </MDTypography>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{}}>ציין ראקלר</h6>
                      <Input
                        placeholder="ציין ראקלר"
                        type="number"
                        min={0}
                        name="raklar"
                        value={dataDB.raklar}
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
                      <h6 style={{}}>משגר טיל לה"ט</h6>
                      <Input
                        placeholder="לה''ט"
                        type="number"
                        min={0}
                        name="lhat"
                        value={dataDB.lhat}
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
                      <h6 style={{}}> מצלמות 'נתיב העשרה' </h6>
                      <Input
                        placeholder="נתיב העשרה"
                        type="number"
                        min={0}
                        name="nativ_hasra"
                        value={dataDB.nativ_hasra}
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
                      <h6 style={{}}>נגמ''ש רובוטי</h6>
                      <Input
                        placeholder="נגמ''ש רובוטי"
                        type="number"
                        min={0}
                        name="robotics"
                        value={dataDB.robotics}
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
                      <h6 style={{}}>טנק ברק</h6>
                      <Input
                        placeholder="טנק ברק"
                        type="number"
                        min={0}
                        name="barack"
                        value={dataDB.barack}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <MDTypography variant="h6" fontWeight="medium" color="black" mt={1} mb={1}>
                      אמצעים טכנולוגיים שתוקנו
                    </MDTypography>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{}}>תומכת חיים</h6>
                      <Input
                        placeholder="תומכת חיים"
                        type="number"
                        min={0}
                        name="life_support"
                        value={dataDB.life_support}
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
                      <h6 style={{}}>קשת</h6>
                      <Input
                        placeholder="קשת"
                        type="number"
                        min={0}
                        name="bow"
                        value={dataDB.bow}
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
                      <h6 style={{}}>מעיל רוח </h6>
                      <Input
                        placeholder="מעיל רוח"
                        type="number"
                        min={0}
                        name="windbreaker"
                        value={dataDB.windbreaker}
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
                      <h6 style={{}}>חנית</h6>
                      <Input
                        placeholder="חנית"
                        type="number"
                        min={0}
                        name="hanit"
                        value={dataDB.hanit}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <MDTypography variant="h6" fontWeight="medium" color="black" mt={1} mb={1}>
                      רוק"ק
                    </MDTypography>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{}}>הקמת במות דמה</h6>
                      <Input
                        placeholder="הקמת במות דמה"
                        type="number"
                        min={0}
                        name="dummy_platforms"
                        value={dataDB.dummy_platforms}
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
                      <h6 style={{}}>הקמת במות קו אחורי</h6>
                      <Input
                        placeholder="הקמת במות קו אחורי"
                        type="number"
                        min={0}
                        name="rear_line_platforms"
                        value={dataDB.rear_line_platforms}
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
                      <h6 style={{}}>הקמת עמדות רוק"ק </h6>
                      <Input
                        placeholder='הקמת עמדות רוק"ק'
                        type="number"
                        min={0}
                        name="rock_pos"
                        value={dataDB.rock_pos}
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
                      <h6 style={{}}>התקנת מצלמות להגנות מוצבים</h6>
                      <Input
                        placeholder="התקנת מצלמות להגנות מוצבים"
                        type="number"
                        min={0}
                        name="outpost_defenses"
                        value={dataDB.outpost_defenses}
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
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  // return (
  //   <MDBox>
  //     {/* //! fot the pop up warning windoes */}
  //     <ToastContainer
  //       position="top-right"
  //       autoClose={5000}
  //       hideProgressBar={false}
  //       newestOnTop={false}
  //       closeOnClick
  //       rtl={false}
  //       pauseOnFocusLoss
  //       draggable
  //       pauseOnHover
  //       theme="colored"
  //     />
  //     {showError()}
  //     {showSuccess()}
  //     {showLoading()}
  //     {/* {NavigateUser()}  */}

  //     {mashkTechForm()}
  //     <Outlet />
  //   </MDBox>
  // );

  return (
    <>
      {showError()}
      {showSuccess()}
      {showLoading()}
      {NavigateUser()}

      {mashkTechFormDB()}
    </>
  );
}
