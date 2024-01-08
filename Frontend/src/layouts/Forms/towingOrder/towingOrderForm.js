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

const digitsOnly = (str) => /^\d+$/.test(str);

export default function HoliyaRequestForm() {
  const [archiveData, setArchiveData] = useState([]);
  const [checkData, setCheckData] = useState("update");
  const [data, setData] = useState({
    reference: new Date()
      .toISOString()
      .substring(3)
      .replace(/-/g, "")
      .replace(/T/g, "")
      .replace(/:/g, "")
      .split(".")[0],
    orderDate: new Date().toISOString().split("T")[0],
    orderTime: new Date().toISOString().split("T")[1].split(".")[0].slice(0, 5),
    serviceName: `${user.firstName} ${user.lastName}`,
    ahmashNotes: "",
    clientJourney: [],
    // {text : string, publisher : string (first + last name), date, published : boolean (before posting/updating = false, after posting becomes true)}
    carnumber: "",
    erorrInfo: [],
    errInfoOther: "",
    location: "",
    garage: "",
    fullName: "",
    phoneNumber: "",
    otherPhoneNumber: "",
    transferOrderDate: new Date().toISOString().split("T")[0],
    transferOrderTime: "",
    reciveName: "",
    executiveBody: "",
    //
    turnNumber: "",
    //
    demandDate: new Date().toISOString().split("T")[0],
    area: "",
    status: "",
    commanderNotes: "",
  });
  console.log(data);

  const min = 0;
  const max = 100;

  function handleChange(evt) {
    console.log(evt);
    const { value } = evt.target;

    setData({ ...data, [evt.target.name]: value });
    console.log(value);
  }
  const handleClientJourneyChange = (evt, key) => {
    const index = key;
    const { value } = evt.target;
    const clientJourney = [...data.clientJourney];
    clientJourney[index].text = value;
    setData((prev) => ({ ...prev, [evt.target.name]: clientJourney }));
  };
  const removeClientJourneyPost = (index) => {
    const clientJourney = [...data.clientJourney];
    clientJourney.splice(index, 1);
    console.log(clientJourney);

    setData((prev) => ({ ...prev, clientJourney }));
  };

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
    const AddError = (error) => {
      flag = false;
      ErrorReason.push(error);
    }
    if (!data.orderDate) {
      AddError("תאריך ריק");
    }
    if(!data.orderTime || data.orderDate === "")
    {
      AddError("שעה ריקה");
    }
    if(data.serviceName === "")
    {
      AddError("שם נציג שירות ריק")
    }
    if(data.carnumber === "")
    {
      AddError("צ' ריק")
    }
    else if(!(digitsOnly(data.carnumber) && data.carnumber.length !== 7))
    {
      AddError("צ' לא תקין")
    }
    if(data.erorrInfo.length() === 0)
    {
      AddError("לא רשומה סיבת תקלה")
    }
    if(data.erorrInfo.includes("אחר"))
    {
      if(data.errInfoOther.trim() === "")
      {
        AddError("הערות ריק")
      }
    }
    if(data.location.trim === ""){
      AddError("מיקום ריק")
    }
    if(data.garage === "" ||  data.garage === "בחר")
    {
      AddError("לגרור ל, ריק")
    }
    if(data.fullName.trim() === "")
    {
      AddError("שם מלא ריק")
    }
    if(!(data.phoneNumber.length))
    // if (data.personalnumber === "" || data.personalnumber === undefined) {
    //   flag = false;
    //   ErrorReason.push("מספר אישי ריק");
    // }

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
      reference: data.reference,
      orderDate: data.orderDate,
      orderTime: data.orderTime,
      serviceName: data.serviceName,
      ahmashNotes: data.ahmashNotes,
      clientJourney: data.clientJourney.map((post) => ({ ...post, publisher: true })),
      carnumber: data.carnumber,
      erorrInfo: data.erorrInfo,
      errInfoOther: data.errInfoOther,
      location: data.location,
      garage: data.garage,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      otherPhoneNumber: data.otherPhoneNumber,
      transferOrderDate: data.transferOrderDate,
      transferOrderTime: data.transferOrderTime,
      reciveName: data.reciveName,
      executiveBody: data.executiveBody,
      turnNumber: data.turnNumber,
      demandDate: data.demandDate,
      area: data.area,
      status: data.status,
      commanderNotes: data.commanderNotes,
    };

    axios
      .post(`http://localhost:5000/TowingLogApi/TowingOrder/add`, requestData)
      .then((response) => {
        // toast.success(`הטופס נשלח בהצלחה`);
        console.log(response.data);
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
  const AddPost = () => {
    const clientJourney = [...data.clientJourney];
    clientJourney.push({
      text: "",
      publisher: `${user.firstName} ${user.lastName}`,
      date: new Date().toISOString().split("T")[0],
      published: false,
    });
    setData((prev) => ({ ...prev, clientJourney }));
    console.log("used set data");
  };
  const journey = data.clientJourney;
  console.log(journey);

  const toggleError = (evt) => {
    const errorInfo = [...data.erorrInfo];
    if(evt.target.checked)
    {
      errorInfo.push(evt.target.value);
      setData((prev) => ({...prev, [evt.target.name]:errorInfo}))
    }
    else
    {
      const index = errorInfo.indexOf(evt.target.value);
      errorInfo.splice(index, 1);
      // console.log(filtered);
      setData((prev) => ({...prev, [evt.target.name] : errorInfo}))
    }
  }

  const errorInput = (val) => (<div style={{display: 'flex'}}>
    <Input style={{marginLeft: '5px'}} 
    type="checkbox"
    name="erorrInfo"
    value={val}
    onClick={toggleError}
      />
      <p>{val}</p>
      </div>)

  const errorResArr = [
    "לא מניע",
    "מערכות בטיחות (הגה, בלמים)",
    "נורת התראה אדומה",
    "פנצ'ר",
    "מפתח",
    "תאונה",
    "תקלת מנוע",
    "חוסר נוזלים",
    "תקלת חשמל/קצר",
    "תיבת הילוכים",
    "רכב נעול (פריצה)",
    "קודן",
    "אחר"
  ]
  console.log("מערך סיבות טעות")
  console.log(data.erorrInfo);
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
                  {(user.admin === "0" || user.admin === "2") && (
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
                  )}
                </Row>
                <Row style={{ paddingLeft: "1%", paddingRight: "1%", paddingBottom: "0%" }}>
                  <Col>
                    <FormGroup>
                      <h6>מסע לקוח</h6>
                      {journey.length > 0 &&
                        journey.map((post, index) => (
                          <>
                            <p style={{ fontSize: "large" }}>
                              {post.publisher} {post.date}
                            </p>
                            <Input
                              key={index}
                              placeholder="מסע לקוח"
                              type="textarea"
                              name="clientJourney"
                              value={post.text}
                              onChange={(evt) => {
                                handleClientJourneyChange(evt, index);
                              }}
                              disabled={post.published}
                            />
                            {!post.published && (
                              <MDButton
                                variant="gradient"
                                color="error"
                                iconOnly
                                sx={{ marginBottom: 1, marginTop: 1, display: "block" }}
                                onClick={() => {
                                  removeClientJourneyPost(index);
                                }}
                              >
                                <Icon>delete</Icon>
                              </MDButton>
                            )}
                          </>
                        ))}
                      <MDButton variant="gradient" color="primary" onClick={AddPost} iconOnly>
                        <Icon>add</Icon>
                      </MDButton>
                      {/* <Input
                        placeholder="מסע לקוח"
                        type="textarea"
                        name="clientJourney"
                        value={data.clientJourney}
                        onChange={handleChange}
                      /> */}
                    </FormGroup>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: "1%", paddingRight: "1%", paddingBottom: "0%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>צ'</h6>
                      <div style={{ display: "flex" }}>
                        <Input
                          style={{ marginLeft: "5px" }}
                          placeholder="צ'"
                          type="text"
                          name="carnumber"
                          value={data.carnumber}
                          onChange={handleChange}
                          maxLength={7}
                          // minLength={7}
                        />
                        <MDButton variant="gradient" color="info" iconOnly>
                          <Icon>search</Icon>
                        </MDButton>
                      </div>
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

                <Row>
                  <Col>
                  <h6>מהות התקלה</h6>
                  <div style={{display: 'flex', flexWrap:'wrap', gap: '10px'}}>
                  {errorResArr.map((res) =>  errorInput(res)
                  )}
                   {
                  data.erorrInfo.includes("אחר") && <>
                    <p >הערות: </p>
                    <Row>
                      <Col>
                    <Input 
                    // style={{display:'inline', width:'320px'}}
                    placeholder="הערות"
                    name="errInfoOther"
                    value={data.errInfoOther}
                    onChange={handleChange}
                    type="text"
                    />
                    </Col></Row>
                    
                   </>
                }
                  </div>
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
                        type="string"
                        name="phoneNumber"
                        value={data.phoneNumber}
                        onChange={handleChange}
                        maxLength={11}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>טלפון נוסף</h6>
                      <Input
                        placeholder="טלפון נוסף"
                        type="string"
                        name="otherPhoneNumber"
                        value={data.otherPhoneNumber}
                        onChange={handleChange}
                        maxLength={11}
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
                        type="date"
                        name="transferOrderDate"
                        value={data.transferOrderDate}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>שעת העברת הזמנה</h6>
                      <Input
                        placeholder="שעת העברת הזמנה"
                        type="time"
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
                        type="text"
                        name="reciveName"
                        value={data.reciveName}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6>גוף מבצע</h6>
                      <Input
                        placeholder="גוף מבצע"
                        type="select"
                        name="executiveBody"
                        value={data.executiveBody}
                        onChange={handleChange}
                      >
                        <option value="בחר">בחר</option>
                        <option value="1">חברה אזרחית - גרירה</option>
                        <option value="2">חברה אזרחית – ניידת שירות</option>
                        <option value="3">צבאי</option>
                        <option value="4">מוביל כננת</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                {(data.executiveBody === "1" || data.executiveBody === "2") && (
                  <Row>
                    <Col />
                    <Col>
                      <FormGroup>
                        <h6>מספר הזמנה</h6>
                        <Input
                          placeholder="מספר הזמנה"
                          type="string"
                          name="turnNumber"
                          value={data.turnNumber}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                )}

                <Row style={{ paddingLeft: "1%", paddingRight: "1%", paddingBottom: "0%" }}>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>תאריך ביצוע מבוקש</h6>
                      <Input
                        placeholder="תאריך ביצוע מבוקש"
                        type="date"
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
                        type="select"
                        name="area"
                        value={data.area}
                        onChange={handleChange}
                      >
                        <option value="בחר">בחר</option>
                        <option value="1">צפון</option>
                        <option value="2">דרום</option>
                        <option value="3">מרכז</option>
                        <option value="4">הערבה</option>
                        <option value="5">איו"ש</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>סטטוס</h6>
                      <Input
                        placeholder="סטטוס"
                        type="select"
                        name="status"
                        value={data.status}
                        onChange={handleChange}
                      >
                        <option value="בחר">בחר</option>
                        <option value="1">פתוח</option>
                        <option value="2">סגור</option>
                        <option value="3">מוקפא</option>
                        <option value="4">מבוטל</option>
                        <option value="5">ממתין לאישור</option>
                      </Input>
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
