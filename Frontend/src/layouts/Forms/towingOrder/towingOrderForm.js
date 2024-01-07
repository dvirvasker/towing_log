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

    orderDate: new Date().toISOString().split("T")[0],
    orderTime: new Date().toISOString().split("T")[1].split(".")[0],
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
  console.log(data.orderTime);

  const min = 0;
  const max = 100;

  function handleChange(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value });
    console.log(value);
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
      orderDate: data.orderDate,
      orderTime: data.orderTime,
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
            orderDate: response.data.orderDate,
            orderTime: response.data.orderTime,
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
                  טופס הזמנת גרירה{" "}
                </MDTypography>
              </MDBox>
              <Form style={{ textAlign: "right", paddingBottom: "5%" }} role="form">
                <Row style={{ paddingLeft: "1%", paddingRight: "1%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>תאריך</h6>
                      <Input
                        placeholder="תאריך"
                        type="date"
                        name="orderDate"
                        value={data.orderDate}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>שעה</h6>
                      <Input
                        placeholder="שעה"
                        type="time"
                        name="orderTime"
                        value={data.orderTime}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: "1%", paddingRight: "1%", paddingBottom: "0%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>שם נציג שירות</h6>
                      <Input
                        placeholder="שם נציג שירות"
                        type="text"
                        name="serviceName"
                        value={data.serviceName}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>הערות אחמ"ש</h6>
                      <Input
                        placeholder="הערות אחמ''ש"
                        type="textarea"
                        name="ahmashNotes"
                        value={data.ahmashNotes}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: "1%", paddingRight: "1%", paddingBottom: "0%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>מסע לקוח</h6>
                      <Input
                        placeholder="מסע לקוח"
                        type="textarea"
                        name="clientJourney"
                        value={data.clientJourney}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: "1%", paddingRight: "1%", paddingBottom: "0%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>צ'</h6>
                      <Input
                        placeholder="צ'"
                        type="text"
                        name="carnumber"
                        value={data.carnumber}
                        onChange={handleChange}
                      />
                      <MDButton variant="gradient" color="info" iconOnly>
                        <Icon>search</Icon>
                      </MDButton>
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup>
                      <h6 style={{}}>יחידה</h6>
                      <Input
                        placeholder="יחידה"
                        type="text"
                        name="unit"
                        value={data.unit}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>סוג רכב נגרר</h6>
                      <Input
                        placeholder="סוג רכב נגרר"
                        type="text"
                        name="a"
                        value={data.a}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>משקל מילוי אוטומטי</h6>
                      <Input
                        placeholder="משקל מילוי אוטומטי"
                        type="text"
                        name="auto"
                        value={data.auto}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: "1%", paddingRight: "1%", paddingBottom: "0%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>מיקום</h6>
                      <Input
                        placeholder="מיקום"
                        type="text"
                        name="location"
                        value={data.location}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>לגרור ל</h6>
                      <Input
                        placeholder="לגרור ל"
                        type="text"
                        name="garage"
                        value={data.garage}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: "1%", paddingRight: "1%", paddingBottom: "0%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>שם מלא</h6>
                      <Input
                        placeholder="שם מלא"
                        type="text"
                        name="fullName"
                        value={data.fullName}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>טלפון</h6>
                      <Input
                        placeholder="טלפון"
                        type="number"
                        name="phoneNumber"
                        value={data.phoneNumber}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>טלפון נוסף</h6>
                      <Input
                        placeholder="טלפון נוסף"
                        type="number"
                        name="otherPhoneNumber"
                        value={data.otherPhoneNumber}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: "1%", paddingRight: "1%", paddingBottom: "0%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>תאריך העברת הזמנה</h6>
                      <Input
                        placeholder="תאריך העברת הזמנה"
                        type="number"
                        name="phoneNumber"
                        value={data.phoneNumber}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>שעת העברת הזמנה</h6>
                      <Input
                        placeholder="שעת העברת הזמנה"
                        type="number"
                        name="transferOrderTime"
                        value={data.transferOrderTime}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: "1%", paddingRight: "1%", paddingBottom: "0%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>שם מקבל מחלקה צבאית או שגריר</h6>
                      <Input
                        placeholder="שם מקבל מחלקה צבאית או שגריר"
                        type="number"
                        name="reciveName"
                        value={data.reciveName}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>גוף מבצע</h6>
                      <Input
                        placeholder="גוף מבצע"
                        type="select"
                        name="executiveBody"
                        value={data.executiveBody}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: "1%", paddingRight: "1%", paddingBottom: "0%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>תאריך ביצוע מבוקש</h6>
                      <Input
                        placeholder="תאריך ביצוע מבוקש"
                        type="number"
                        name="demandDate"
                        value={data.demandDate}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>מרחב</h6>
                      <Input
                        placeholder="מרחב"
                        type="text"
                        name="area"
                        value={data.area}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>סטטוס</h6>
                      <Input
                        placeholder="סטטוס"
                        type="number"
                        name="status"
                        value={data.status}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>הערות מפקד</h6>
                      <Input
                        placeholder="הערות מפקד"
                        type="textarea"
                        name="commanderNotes"
                        value={data.commanderNotes}
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
