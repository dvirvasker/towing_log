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
  const [data, setData] = useState({
    personalnumber: user.personalnumber,
    urgent: false,

    date_update: new Date().toISOString(),

    mk4Number: 0,
    malarGinsNumber: 0,
    mk3Number: 0,
    namerNumber: 0,
    pumaNumber: 0,
    achzaritNumber: 0,
    dahporimNumber: 0,
    tomatNumber: 0,
    hamerNumber: 0,
    s3ramahHalfim: 0,
    tomatHalfim: 0,
    s3ramahKshirot: 0,
    trucks: 0,
    itemsInStockZero: 0,
    ogda162: 0,
    ogda36: 0,
    ogda252: 0,
    ogda143: 0,
    ogda98: 0,
    drishotDarom: 0,
    dhiyotDarom: 0,
    nipukimDarom: 0,
    drishotZtafon: 0,
    dhiyotZtafon: 0,
    nipukimZtafon: 0,

    merkavamk4Text: "",
    merkavamk3Text: "",
    tomatText: "",
    ginsText: "",
    namerText: "",
    pumaText: "",
    achzaritText: "",
    dahpurText: "",

    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });
  const hanztlatHalfim = Number(data.tomatHalfim) + Number(data.s3ramahHalfim);
  const hahzaraLekshirot = Number(data.trucks) + Number(data.s3ramahKshirot);
  const sumItems =
    Number(data.mk4Number) +
    Number(data.malarGinsNumber) +
    Number(data.mk3Number) +
    Number(data.namerNumber) +
    Number(data.pumaNumber) +
    Number(data.achzaritNumber) +
    Number(data.dahporimNumber) +
    Number(data.tomatNumber) +
    Number(data.hamerNumber);
  // setCivilkshirot(kshirot / 8);
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

  const onSubmit = (event) => {
    event.preventDefault();
    if (CheckFormData(event)) {
      SendFormData(event);
    }
  };
  const CheckFormData = () => {
    let flag = true;
    const ErrorReason = [];

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
      mk4Number: data.mk4Number,
      malarGinsNumber: data.malarGinsNumber,
      mk3Number: data.mk3Number,
      namerNumber: data.namerNumber,
      pumaNumber: data.pumaNumber,
      achzaritNumber: data.achzaritNumber,
      dahporimNumber: data.dahporimNumber,
      tomatNumber: data.tomatNumber,
      hamerNumber: data.hamerNumber,
      s3ramahHalfim: data.s3ramahHalfim,
      tomatHalfim: data.tomatHalfim,
      s3ramahKshirot: data.s3ramahKshirot,
      trucks: data.trucks,
      itemsInStockZero: data.itemsInStockZero,
      ogda162: data.ogda162,
      ogda36: data.ogda36,
      ogda252: data.ogda252,
      ogda143: data.ogda143,
      ogda98: data.ogda98,
      drishotDarom: data.drishotDarom,
      dhiyotDarom: data.dhiyotDarom,
      nipukimDarom: data.nipukimDarom,
      drishotZtafon: data.drishotZtafon,
      dhiyotZtafon: data.dhiyotZtafon,
      nipukimZtafon: data.nipukimZtafon,
      merkavamk4Text: data.merkavamk4Text,
      merkavamk3Text: data.merkavamk3Text,
      tomatText: data.tomatText,
      ginsText: data.ginsText,
      namerText: data.namerText,
      pumaText: data.pumaText,
      achzaritText: data.achzaritText,
      dahpurText: data.dahpurText,
      personalnumber: data.personalnumber,
      date_update: data.date_update,
    };

    axios
      .post(`http://localhost:5000/TowingLogApi/Halfim/${checkData}`, requestData)
      .then((response) => {
        // toast.success(`הטופס נשלח בהצלחה`);
        console.log(response.data);
        if (checkData === "update") {
          axios
            .post(`http://localhost:5000/TowingLogApi/HalfimArchive/add`, archiveData)
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

  const handleCloseSuccsecModal = () => {
    setData({ ...data, loading: false, error: false, successmsg: false, NavigateToReferrer: true });
  };
  const handleCloseLoadingModal = () => {
    setData({ ...data, loading: false });
  };
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
      return <Navigate to="/halfim" />;
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/Halfim/`)
      .then(async (response) => {
        console.log(response.data);
        if (response.data !== null) {
          setData({
            ...data,
            mk4Number: response.data.mk4Number,
            malarGinsNumber: response.data.malarGinsNumber,
            mk3Number: response.data.mk3Number,
            namerNumber: response.data.namerNumber,
            pumaNumber: response.data.pumaNumber,
            achzaritNumber: response.data.achzaritNumber,
            dahporimNumber: response.data.dahporimNumber,
            tomatNumber: response.data.tomatNumber,
            hamerNumber: response.data.hamerNumber,
            s3ramahHalfim: response.data.s3ramahHalfim,
            tomatHalfim: response.data.tomatHalfim,
            s3ramahKshirot: response.data.s3ramahKshirot,
            trucks: response.data.trucks,
            itemsInStockZero: response.data.itemsInStockZero,
            ogda162: response.data.ogda162,
            ogda36: response.data.ogda36,
            ogda252: response.data.ogda252,
            ogda143: response.data.ogda143,
            ogda98: response.data.ogda98,
            drishotDarom: response.data.drishotDarom,
            dhiyotDarom: response.data.dhiyotDarom,
            nipukimDarom: response.data.nipukimDarom,
            drishotZtafon: response.data.drishotZtafon,
            dhiyotZtafon: response.data.dhiyotZtafon,
            nipukimZtafon: response.data.nipukimZtafon,
            merkavamk4Text: response.data.merkavamk4Text,
            merkavamk3Text: response.data.merkavamk3Text,
            tomatText: response.data.tomatText,
            ginsText: response.data.ginsText,
            namerText: response.data.namerText,
            pumaText: response.data.pumaText,
            achzaritText: response.data.achzaritText,
            dahpurText: response.data.dahpurText,
          });
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
          טופס חלפים עודכן{" "}
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

  const halfimForm = () => (
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
                mx={15}
                mt={-3}
                p={3}
                mb={4}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  טופס חלפים{" "}
                </MDTypography>
              </MDBox>
              <Form style={{ textAlign: "right", paddingBottom: "5%" }} role="form">
                <MDTypography variant="h4" fontWeight="medium" color="mekatnar" mt={1}>
                  כלים עומדים{" "}
                </MDTypography>
                <Row style={{ paddingLeft: "1%", paddingRight: "1%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>סימן 4</h6>
                      <Input
                        placeholder="סימן 4"
                        type="number"
                        name="mk4Number"
                        value={data.mk4Number}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>מלא"ר/גינס</h6>
                      <Input
                        placeholder="מלא''ר/גינס"
                        type="number"
                        name="malarGinsNumber"
                        value={data.malarGinsNumber}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>סימן 3</h6>
                      <Input
                        placeholder="סימן 3"
                        type="number"
                        name="mk3Number"
                        value={data.mk3Number}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>נמר</h6>
                      <Input
                        placeholder="נמר"
                        type="number"
                        name="namerNumber"
                        value={data.namerNumber}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>פומה</h6>
                      <Input
                        placeholder="פומה"
                        type="number"
                        name="pumaNumber"
                        value={data.pumaNumber}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: "1%", paddingRight: "1%", paddingBottom: "0%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>אכזרית</h6>
                      <Input
                        placeholder="אכזרית"
                        type="number"
                        name="achzaritNumber"
                        value={data.achzaritNumber}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>דחפורים</h6>
                      <Input
                        placeholder="דחפורים"
                        type="number"
                        name="dahporimNumber"
                        value={data.dahporimNumber}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>תומ''ת</h6>
                      <Input
                        placeholder="תומ''ת"
                        type="number"
                        name="tomatNumber"
                        value={data.tomatNumber}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>האמר</h6>
                      <Input
                        placeholder="האמר"
                        type="number"
                        name="hamerNumber"
                        value={data.hamerNumber}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row
                  style={{
                    paddingRight: "35%",
                    paddingLeft: "35%",
                    paddingTop: "0%",
                    paddingBottom: "2%",
                  }}
                >
                  <Col>
                    <MDTypography variant="h5" fontWeight="large" color="mekatnar" mt={1}>
                      סך כלים עומדים:
                    </MDTypography>
                  </Col>
                  <Col>
                    <MDTypography variant="h5" fontWeight="large" color="dark" mt={1}>
                      {sumItems}
                    </MDTypography>
                  </Col>
                </Row>
                <Row style={{ paddingRight: "1%", paddingLeft: "1%" }}>
                  <Row>
                    <Col>
                      <MDTypography variant="h5" fontWeight="large" color="mekatnar" mt={1}>
                        הנצלת חלפים:
                      </MDTypography>
                    </Col>
                    <Col>
                      <MDTypography variant="h5" fontWeight="large" color="dark" mt={1}>
                        {hanztlatHalfim}
                      </MDTypography>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <h6 style={{}}>ס'3 רמ"ח</h6>
                        <Input
                          placeholder="ס'3 רמ''ח"
                          type="number"
                          name="s3ramahHalfim"
                          value={data.s3ramahHalfim}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <h6 style={{}}>תומ"ת</h6>
                        <Input
                          placeholder="תומ''ת"
                          type="number"
                          name="tomatHalfim"
                          value={data.tomatHalfim}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Col>
                    <MDTypography variant="h5" fontWeight="large" color="mekatnar" mt={1}>
                      החזרה לכשירות:
                    </MDTypography>
                    <FormGroup>
                      <h6 style={{}}>ס'3 רמ"ח</h6>
                      <Input
                        placeholder="ס'3 רמ''ח"
                        type="number"
                        name="s3ramahKshirot"
                        value={data.s3ramahKshirot}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <MDTypography variant="h5" fontWeight="large" color="dark" mt={1}>
                      {hahzaraLekshirot}
                    </MDTypography>
                    <FormGroup>
                      <h6 style={{}}>משאיות</h6>
                      <Input
                        placeholder="משאיות"
                        type="number"
                        name="trucks"
                        value={data.trucks}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row style={{ paddingRight: "35%", paddingLeft: "35%", paddingTop: "1%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>פריטים במלאי אפס</h6>
                      <Input
                        placeholder="פריטים במלאי אפס"
                        type="number"
                        name="itemsInStockZero"
                        value={data.itemsInStockZero}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row style={{ padding: "1%", paddingTop: "3%" }}>
                  <MDTypography variant="h4" fontWeight="large" color="mekatnar" mt={1}>
                    אוגדות:
                  </MDTypography>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>אוגדה 162</h6>
                      <Input
                        placeholder="אוגדה 162"
                        type="number"
                        name="ogda162"
                        value={data.ogda162}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>אוגדה 36</h6>
                      <Input
                        placeholder="אוגדה 36"
                        type="number"
                        name="ogda36"
                        value={data.ogda36}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>אוגדה 252</h6>
                      <Input
                        placeholder="אוגדה 252"
                        type="number"
                        name="ogda252"
                        value={data.ogda252}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>אוגדה 143</h6>
                      <Input
                        placeholder="אוגדה 143"
                        type="number"
                        name="ogda143"
                        value={data.ogda143}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>אוגדה 98</h6>
                      <Input
                        placeholder="אוגדה 98"
                        type="number"
                        name="ogda98"
                        value={data.ogda98}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row style={{ padding: "1%" }}>
                  <MDTypography variant="h4" fontWeight="large" color="mekatnar" mt={1}>
                    פיקוד דרום:
                  </MDTypography>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>דרישות</h6>
                      <Input
                        placeholder="דרישות"
                        type="number"
                        name="drishotDarom"
                        value={data.drishotDarom}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>דחיות</h6>
                      <Input
                        placeholder="דחיות"
                        type="number"
                        name="dhiyotDarom"
                        value={data.dhiyotDarom}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>ניפוקים</h6>
                      <Input
                        placeholder="ניפוקים"
                        type="number"
                        name="nipukimDarom"
                        value={data.nipukimDarom}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row style={{ padding: "1%" }}>
                  <MDTypography variant="h4" fontWeight="large" color="mekatnar" mt={1}>
                    פיקוד צפון:
                  </MDTypography>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>דרישות</h6>
                      <Input
                        placeholder="דרישות"
                        type="number"
                        name="drishotZtafon"
                        value={data.drishotZtafon}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>דחיות</h6>
                      <Input
                        placeholder="דחיות"
                        type="number"
                        name="dhiyotZtafon"
                        value={data.dhiyotZtafon}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>ניפוקים</h6>
                      <Input
                        placeholder="ניפוקים"
                        type="number"
                        name="nipukimZtafon"
                        value={data.nipukimZtafon}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <MDTypography variant="h4" fontWeight="large" color="mekatnar" mt={1}>
                  פלטפורמות:
                </MDTypography>
                <Row style={{ padding: "1%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>מרכבה ס'4</h6>
                      <Input
                        placeholder="פערים עיקריים"
                        type="textarea"
                        name="merkavamk4Text"
                        value={data.merkavamk4Text}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>מרכבה ס'3</h6>
                      <Input
                        placeholder="פערים עיקריים"
                        type="textarea"
                        name="merkavamk3Text"
                        value={data.merkavamk3Text}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>תומ''ת</h6>
                      <Input
                        placeholder="פערים עיקריים"
                        type="textarea"
                        name="tomatText"
                        value={data.tomatText}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>גינס</h6>
                      <Input
                        placeholder="פערים עיקריים"
                        type="textarea"
                        name="ginsText"
                        value={data.ginsText}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row style={{ padding: "1%", paddingBottom: "4%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>נמר</h6>
                      <Input
                        placeholder="פערים עיקריים"
                        type="textarea"
                        name="namerText"
                        value={data.namerText}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>פומה</h6>
                      <Input
                        placeholder="פערים עיקריים"
                        type="textarea"
                        name="pumaText"
                        value={data.pumaText}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>אכזרית</h6>
                      <Input
                        placeholder="פערים עיקריים"
                        type="textarea"
                        name="achzaritText"
                        value={data.achzaritText}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>דחפור</h6>
                      <Input
                        placeholder="פערים עיקריים"
                        type="textarea"
                        name="dahpurText"
                        value={data.dahpurText}
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
                    עדכן טופס חלפים
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

      {halfimForm()}
      <Outlet />
    </MDBox>
  );
}
