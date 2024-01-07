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
  const [civilindustryDate, setcivilindustryDate] = useState("1900-01-01T00:01");
  const [checkData, setCheckData] = useState("update");
  const [data, setData] = useState({
    personalnumber: user.personalnumber,
    urgent: false,

    date_update: new Date().toISOString(),

    batashVeKravi: 0,
    trucksAndMinhala: 0,
    ztmaVeMi: 0,
    merkazHovala: 0,
    pikudHaoref: 0,
    hatal: 0,
    masha: 0,
    maharas: 0,

    krtfilerVeZoko: 0,
    machpileKoach: 0,
    tosefetHozit: 0,
    mifalimMerotakim: 0,

    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });
  const kshirot =
    (data.batashVeKravi +
      data.trucksAndMinhala +
      data.ztmaVeMi +
      data.merkazHovala +
      data.pikudHaoref +
      data.hatal +
      data.masha +
      data.maharas) /
    8;
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

  const dateUpdate = (date1) => {
    const newestDate = date1;
    return `${newestDate.slice(0, 10)} ${newestDate.slice(11, 16)}`;
  };

  const CheckFormData = () => {
    let flag = true;
    const ErrorReason = [];

    if (Number(data.batashVeKravi) < 0 || Number(data.batashVeKravi) > 100) {
      flag = false;
      ErrorReason.push("בט''ש וקרבי לא תקין");
    }
    if (Number(data.trucksAndMinhala) < 0 || Number(data.trucksAndMinhala) > 100) {
      flag = false;
      ErrorReason.push("משאיות ומנהלה לא תקין");
    }
    if (Number(data.ztmaVeMi) < 0 || Number(data.ztmaVeMi) > 100) {
      flag = false;
      ErrorReason.push("צמ''ה ומ''י לא תקין");
    }
    if (Number(data.merkazHovala) < 0 || Number(data.merkazHovala) > 100) {
      flag = false;
      ErrorReason.push("מרכז הובלה לא תקין");
    }
    if (Number(data.pikudHaoref) < 0 || Number(data.pikudHaoref) > 100) {
      flag = false;
      ErrorReason.push("פיקוד העורף לא תקין");
    }
    if (Number(data.hatal) < 0 || Number(data.hatal) > 100) {
      flag = false;
      ErrorReason.push("חט''ל לא תקין");
    }
    if (Number(data.masha) < 0 || Number(data.masha) > 100) {
      flag = false;
      ErrorReason.push("מש''א לא תקין");
    }
    if (Number(data.maharas) < 0 || Number(data.maharas) > 100) {
      flag = false;
      ErrorReason.push("מרה''ס לא תקין");
    }

    if (Number(data.krtfilerVeZoko) < 0) {
      flag = false;
      ErrorReason.push("קרטפילר וזוקו לא תקין");
    }
    if (Number(data.machpileKoach) < 0) {
      flag = false;
      ErrorReason.push("מכפילי כוח לא תקין");
    }
    if (Number(data.tosefetHozit) < 0) {
      flag = false;
      ErrorReason.push("תוספת חוזית לא תקין");
    }
    if (Number(data.mifalimMerotakim) < 0) {
      flag = false;
      ErrorReason.push("מפעלים מרותקים לא תקין");
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
      batashVeKravi: data.batashVeKravi,
      trucksAndMinhala: data.trucksAndMinhala,
      ztmaVeMi: data.ztmaVeMi,
      merkazHovala: data.merkazHovala,
      pikudHaoref: data.pikudHaoref,
      hatal: data.hatal,
      masha: data.masha,
      maharas: data.maharas,

      krtfilerVeZoko: data.krtfilerVeZoko,
      machpileKoach: data.machpileKoach,
      tosefetHozit: data.tosefetHozit,
      mifalimMerotakim: data.mifalimMerotakim,

      personalnumber: data.personalnumber,
      date_update: data.date_update,
    };

    console.log(checkData);
    console.log(requestData);
    console.log(archiveData);
    axios
      .post(`http://localhost:5000/TowingLogApi/Civilindustry/${checkData}`, requestData)
      .then((response) => {
        // toast.success(`הטופס נשלח בהצלחה`);
        console.log(response.data);
        if (checkData === "update") {
          axios
            .post(`http://localhost:5000/TowingLogApi/CivilindustryArchive/add`, archiveData)
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
      return <Navigate to="/kshirotMisgrot" />;
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/Civilindustry/`)
      .then(async (response) => {
        console.log(response.data);
        if (response.data !== null) {
          setData({
            ...data,
            batashVeKravi: response.data.batashVeKravi,
            trucksAndMinhala: response.data.trucksAndMinhala,
            ztmaVeMi: response.data.ztmaVeMi,
            merkazHovala: response.data.merkazHovala,
            pikudHaoref: response.data.pikudHaoref,
            hatal: response.data.hatal,
            masha: response.data.masha,
            maharas: response.data.maharas,

            krtfilerVeZoko: response.data.krtfilerVeZoko,
            machpileKoach: response.data.machpileKoach,
            tosefetHozit: response.data.tosefetHozit,
            mifalimMerotakim: response.data.mifalimMerotakim,
          });
          setcivilindustryDate(response.data.date_update);
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
                  אחזקה אזרחית{" "}
                </MDTypography>
              </MDBox>
              <Form style={{ textAlign: "right", paddingBottom: "5%" }} role="form">
                <Row>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>בט''ש וקרבי</h6>
                      <Input
                        placeholder="בט''ש וקרבי"
                        type="number"
                        min={0}
                        max={100}
                        name="batashVeKravi"
                        value={data.batashVeKravi}
                        onChange={handleChange1}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>משאיות ומנהלה</h6>
                      <Input
                        placeholder="משאיות ומנהלה"
                        type="number"
                        min={0}
                        max={100}
                        name="trucksAndMinhala"
                        value={data.trucksAndMinhala}
                        onChange={handleChange1}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>צמ''ה ומ''י</h6>
                      <Input
                        placeholder="צמ''ה ומ''י"
                        type="number"
                        min={0}
                        max={100}
                        name="ztmaVeMi"
                        value={data.ztmaVeMi}
                        onChange={handleChange1}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>מרכז הובלה</h6>
                      <Input
                        placeholder="מרכז הובלה"
                        type="number"
                        min={0}
                        max={100}
                        name="merkazHovala"
                        value={data.merkazHovala}
                        onChange={handleChange1}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row style={{ padding: "1%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>פיקוד העורף</h6>
                      <Input
                        placeholder="פיקוד העורף"
                        type="number"
                        min={0}
                        max={100}
                        name="pikudHaoref"
                        value={data.pikudHaoref}
                        onChange={handleChange1}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>חט''ל</h6>
                      <Input
                        placeholder="חט''ל"
                        type="number"
                        min={0}
                        max={100}
                        name="hatal"
                        value={data.hatal}
                        onChange={handleChange1}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>מש''א</h6>
                      <Input
                        placeholder="מש''א"
                        type="number"
                        min={0}
                        max={100}
                        name="masha"
                        value={data.masha}
                        onChange={handleChange1}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>מרה''ס</h6>
                      <Input
                        placeholder="מרה''ס"
                        type="number"
                        min={0}
                        max={100}
                        name="maharas"
                        value={data.maharas}
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
                      <h6 style={{}}>קרטפילר וזוקו</h6>
                      <Input
                        placeholder="קרטפילר וזוקו"
                        type="number"
                        min={0}
                        max={100}
                        name="krtfilerVeZoko"
                        value={data.krtfilerVeZoko}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>מכפילי כוח</h6>
                      <Input
                        placeholder="מכפילי כוח"
                        type="number"
                        min={0}
                        max={100}
                        name="machpileKoach"
                        value={data.machpileKoach}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>תוספת חוזית</h6>
                      <Input
                        placeholder="תוספת חוזית"
                        type="number"
                        min={0}
                        max={100}
                        name="tosefetHozit"
                        value={data.tosefetHozit}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>מפעלים מרותקים</h6>
                      <Input
                        placeholder="מפעלים מרותקים"
                        type="number"
                        min={0}
                        max={100}
                        name="mifalimMerotakim"
                        value={data.mifalimMerotakim}
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
                    עדכן טופס אחזקה אזרחית
                    <Icon fontSize="small">upload</Icon>&nbsp;
                  </MDButton>
                </div>
              </Form>
              {civilindustryDate !== "1900-01-01T00:01" && (
                <MDTypography variant="h6" textGradient color="secondary">
                  עדכון אחרון:
                  {dateUpdate(civilindustryDate)}
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
