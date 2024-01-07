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

export default function SdacPowerForm() {
  const [dataDB, setDataDB] = useState({
    darom_tank: 0,
    darom_namer: 0,
    darom_hashaz: 0,
    darom_ngmash: 0,
    darom_tomat: 0,
    darom_zma: 0,
    darom_car: 0,

    merkaz_tank: 0,
    merkaz_ngmash: 0,
    merkaz_zma: 0,
    merkaz_car: 0,

    zafon_tank: 0,
    zafon_namer: 0,
    zafon_hashaz: 0,
    zafon_ngmash: 0,
    zafon_tomat: 0,
    zafon_zma: 0,
    zafon_car: 0,

    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });
  const min = 0;

  function handleChange(evt) {
    const value = Math.max(min, Number(evt.target.value));
    setDataDB({ ...dataDB, [evt.target.name]: value });
  }

  const onSubmit = (event) => {
    event.preventDefault();

    const requestData = {
      darom_tank: dataDB.darom_tank,
      darom_namer: dataDB.darom_namer,
      darom_hashaz: dataDB.darom_hashaz,
      darom_ngmash: dataDB.darom_ngmash,
      darom_tomat: dataDB.darom_tomat,
      darom_zma: dataDB.darom_zma,
      darom_car: dataDB.darom_car,

      merkaz_tank: dataDB.merkaz_tank,
      merkaz_ngmash: dataDB.merkaz_ngmash,
      merkaz_zma: dataDB.merkaz_zma,
      merkaz_car: dataDB.merkaz_car,

      zafon_tank: dataDB.zafon_tank,
      zafon_namer: dataDB.zafon_namer,
      zafon_hashaz: dataDB.zafon_hashaz,
      zafon_ngmash: dataDB.zafon_ngmash,
      zafon_tomat: dataDB.zafon_tomat,
      zafon_zma: dataDB.zafon_zma,
      zafon_car: dataDB.zafon_car,
    };
    setDataDB({
      ...dataDB,
      loading: true,
      successmsg: false,
      error: false,
      NavigateToReferrer: false,
    });
    axios
      .post(`http://localhost:5000/TowingLogApi/sdacPower/add`, requestData)
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
          הטופס נוסף בהצלחה
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
          שגיאה בהוספת הטופס
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
  const SdacPowerForm = () => (
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
                  הוספת טופס סד"כ עוצמה
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
                      <h6 style={{ fontWeight: "bold" }}>פיקוד דרום</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}> פיקוד צפון</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "center",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}> פיקוד מרכז</h6>
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}> טנקים </h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder=" מספר טנקים"
                        type="number"
                        min={0}
                        name="darom_tank"
                        value={dataDB.darom_tank}
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
                        placeholder=" מספר טנקים"
                        type="number"
                        min={0}
                        name="zafon_tank"
                        value={dataDB.zafon_tank}
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
                        placeholder=" מספר טנקים "
                        type="number"
                        min={0}
                        name="merkaz_tank"
                        value={dataDB.merkaz_tank}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}> נגמ"ש </h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="נגמ''ש"
                        type="number"
                        min={0}
                        name="darom_ngmash"
                        value={dataDB.darom_ngmash}
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
                        placeholder="נגמ''ש"
                        type="number"
                        min={0}
                        name="zafon_ngmash"
                        value={dataDB.zafon_ngmash}
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
                        placeholder="נגמ''ש "
                        type="number"
                        min={0}
                        name="merkaz_ngmash"
                        value={dataDB.merkaz_ngmash}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}> צמ"ה </h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder=" צמ''ה "
                        type="number"
                        min={0}
                        name="darom_zma"
                        value={dataDB.darom_zma}
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
                        placeholder=" צמ''ה"
                        type="number"
                        min={0}
                        name="zafon_zma"
                        value={dataDB.zafon_zma}
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
                        placeholder=" צמ''ה "
                        type="number"
                        min={0}
                        name="merkaz_zma"
                        value={dataDB.merkaz_zma}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}> רכב </h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder=" מספר רכבים"
                        type="number"
                        min={0}
                        name="darom_car"
                        value={dataDB.darom_car}
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
                        placeholder=" מספר רכבים"
                        type="number"
                        min={0}
                        name="zafon_car"
                        value={dataDB.zafon_car}
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
                        placeholder=" מספר רכבים "
                        type="number"
                        min={0}
                        name="merkaz_car"
                        value={dataDB.merkaz_car}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}> נמר </h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder=" מספר נמר"
                        type="number"
                        min={0}
                        name="darom_namer"
                        value={dataDB.darom_namer}
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
                        placeholder=" מספר נמר"
                        type="number"
                        min={0}
                        name="zafon_namer"
                        value={dataDB.zafon_namer}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}> חס"צ </h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder=" חס''צ "
                        type="number"
                        min={0}
                        name="darom_hashaz"
                        value={dataDB.darom_hashaz}
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
                        placeholder=" חס''צ "
                        type="number"
                        min={0}
                        name="zafon_hashaz"
                        value={dataDB.zafon_hashaz}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}> תומ"ת </h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder=" תומ''ת"
                        type="number"
                        min={0}
                        name="darom_tomat"
                        value={dataDB.darom_tomat}
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
                        placeholder=" תומ''ת"
                        type="number"
                        min={0}
                        name="zafon_tomat"
                        value={dataDB.zafon_tomat}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Divider variant="middle" />
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
  return (
    <>
      {showError()}
      {showSuccess()}
      {showLoading()}
      {NavigateUser()}

      {SdacPowerForm()}
    </>
  );
}
