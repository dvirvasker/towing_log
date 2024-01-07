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

export default function HoliyaRequestForm() {
  // const currentDate = new Date();
  // console.log(currentDate);
  // let dateString = "";
  // let minDateString = "";
  // if (currentDate.getMonth() + 1 >= 10) {
  //   if (currentDate.getDate() >= 10) {
  //     dateString = `${currentDate.getFullYear()}-${
  //       currentDate.getMonth() + 1
  //     }-${currentDate.getDate()}`;
  //   } else {
  //     dateString = `${currentDate.getFullYear()}-${
  //       currentDate.getMonth() + 1
  //     }-0${currentDate.getDate()}`;
  //   }
  // } else {
  //   if (currentDate.getDate() >= 10) {
  //     dateString = `${currentDate.getFullYear()}-0${
  //       currentDate.getMonth() + 1
  //     }-${currentDate.getDate()}`;
  //   } else {
  //     dateString = `${currentDate.getFullYear()}-0${
  //       currentDate.getMonth() + 1
  //     }-0${currentDate.getDate()}`;
  //   }
  // }
  // if (currentDate.getMonth() + 1 >= 10) {
  //   if (currentDate.getDate() + 1 >= 10) {
  //     minDateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${
  //       currentDate.getDate() + 1
  //     }`;
  //   } else {
  //     minDateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-0${
  //       currentDate.getDate() + 1
  //     }`;
  //   }
  // } else {
  //   if (currentDate.getDate() + 1 >= 10) {
  //     minDateString = `${currentDate.getFullYear()}-0${currentDate.getMonth() + 1}-${
  //       currentDate.getDate() + 1
  //     }`;
  //   } else {
  //     minDateString = `${currentDate.getFullYear()}-0${currentDate.getMonth() + 1}-0${
  //       currentDate.getDate() + 1
  //     }`;
  //   }
  // }
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [file, setFile] = useState([]);
  const [pikods, setPikods] = useState([]);
  const [classReportDB, setClassReportDB] = useState([]);
  const [classReportForSelect, setClassReportForSelect] = useState([]);

  const [data, setData] = useState({
    personalnumber: user.personalnumber,
    urgent: false,

    namecontact: "",
    numbercontact: "",

    msd: "",

    body_requires: user.admin === "1" ? user.pikod : "",
    unit_requires: "",

    classReport: "",
    number_class: 1,

    source_holi: "",

    what_happend: "",
    type_happend: "false",
    personal_protection: "false",

    amlah: "",
    merhav_amlah: "",

    zadik: "",

    mikom: "",

    date_need: new Date().toISOString(),

    mail: [],

    // alm: "",
    pikod: "",
    // road: "",

    status: 15,
    /* //? status options:
        ? 15 - חדש
        ? 25 - ממתין לאישור מכללות טנא
        ? 50 - אושר
        ? 75 - בתהליך
        ? 100 - הסתיים
        ? 888 - נדחה
        ? 999 - נדחה - לצורך תיקון
    */

    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });
  const [mails, setmailsarray] = useState([{ mail: `${user.personalnumber}@army.idf.il` }]);
  const [propPrint, setPropPrint] = useState([]); // {
  // nameFile: ``,
  // props: {
  // propPageType: "A4",
  // propCopyType: "b&w2",
  // },
  // },
  // const [textArea, setTextArea] = useState("");
  const [files, setFiles] = useState([]);
  const [open, setOpen] = React.useState(false);
  const { getRootProps, getInputProps } = useDropzone({});
  const inputRef = React.useRef(null);

  const [msdArray, setMSDArray] = useState([]);

  const [currentMSD, setCurrentMSD] = useState("");
  const [currentStatus, setCurrentStatus] = useState(5);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/Pikod/`)
      .then((response) => {
        setPikods(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.code);
      });

    axios
      .get(`http://localhost:5000/TowingLogApi/SourceHoliClassType/`)
      .then((response) => {
        setClassReportDB(response.data);
        const temp = response.data.map((item) => ({ label: item.name, id: item._id }));
        setClassReportForSelect(temp);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleChange(evt) {
    const { value } = evt.target;
    if (evt.target.name === "date_need") {
      // Input date in string format
      const inputDateStr = evt.target.value;

      // Convert the string to a Date object
      const inputDate = new Date(inputDateStr);

      // Add 3 hours to the Date object
      inputDate.setHours(inputDate.getHours() + 2);

      // Convert the result back to the desired string format
      const value1 = inputDate.toISOString();
      setData({ ...data, [evt.target.name]: value1 });
    } else {
      setData({ ...data, [evt.target.name]: value });
    }
  }

  function checkZadik(evt) {
    axios
      .get(`http://localhost:5000/TowingLogApi/HolyaReports/report/forms/getAllZadikNotFinished`)
      .then((response) => {
        response.data.forEach((element) => {
          if (data.zadik !== "" && element.zadik === data.zadik) {
            toast.info("צ' זה כבר קיים במערכת");
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getNewStatus() {
    /* //? status options:
        ? 15 - חדש
        ? 25 - ממתין לאישור מכלל טנא
        ? 50 - אושר
        ? 75 - בתהליך
        ? 100 - הסתיים
        ? 888 - נדחה
        ? 999 - נדחה - לצורך תיקון
    */
    // console.log(data.alm);
    console.log(data.pikod);
    // console.log(data.road);

    let status;

    if (
      // document.getElementById("selalm").options[document.getElementById("selalm").selectedIndex]
      //   .value === "true" &&
      document.getElementById("selpikod").options[document.getElementById("selpikod").selectedIndex]
        .value === "true"
      //   &&
      // document.getElementById("selroad").options[document.getElementById("selroad").selectedIndex]
      //   .value === "true"
    ) {
      status = 15;
    } else {
      status = 5;
    }

    console.log(status);
    return status;
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

    if (data.body_requires === "" || data.body_requires === undefined) {
      flag = false;
      ErrorReason.push(" גוף דורש ריק");
    }

    if (data.unit_requires === "" || data.unit_requires === undefined) {
      flag = false;
      ErrorReason.push(" יחידה דורשת ריקה");
    }
    if (data.amlah === "" || data.amlah === undefined) {
      flag = false;
      ErrorReason.push(" סוג אמלח ריק ");
    }
    if (
      document.getElementById("selamlah").options[document.getElementById("selamlah").selectedIndex]
        .value === "בחר"
    ) {
      flag = false;
      ErrorReason.push(" מרחב אמלח ריק ");
    }

    if (data.mikom === "" || data.mikom === undefined) {
      flag = false;
      ErrorReason.push("  מיקום אמלח ריק ");
    }
    if (data.what_happend === "" || data.what_happend === undefined) {
      flag = false;
      ErrorReason.push("  מהות התקלה ריק ");
    }

    if (
      document.getElementById("selhappend").options[
        document.getElementById("selhappend").selectedIndex
      ].value === "בחר"
    ) {
      flag = false;
      ErrorReason.push(" סוג התקלה ריק ");
    }
    if (data.classReport === "" || data.classReport === undefined) {
      flag = false;
      ErrorReason.push("  סוג הכיתה ריק ");
    }
    if (data.number_class === "" || data.number_class === undefined) {
      flag = false;
      ErrorReason.push("  מספר הכיתות ריק ");
    }
    if (
      document.getElementById("selholi").options[document.getElementById("selholi").selectedIndex]
        .value === "בחר"
    ) {
      flag = false;
      ErrorReason.push(" מקור החוליה ריק ");
    }
    if (!data.date_need) {
      flag = false;
      ErrorReason.push(" תאריך ריק ");
    }
    if (data.namecontact === "" || data.namecontact === undefined) {
      flag = false;
      ErrorReason.push("  שם נציג ריק ");
    }
    if (data.numbercontact === "" || data.numbercontact === undefined) {
      flag = false;
      ErrorReason.push("  טלפון נציג ריק ");
    }
    if (data.personalnumber === "" || data.personalnumber === undefined) {
      flag = false;
      ErrorReason.push("  מספר אישי ריק");
    }

    if (mails.length === 0) {
      flag = false;
      ErrorReason.push(" לא הוזן כתובת מייל");
    }

    if (user.role === "3" && data.status === "אושר") {
      if (!data.date_arrival) {
        flag = false;
        ErrorReason.push(" תאריך הגעה ליעד ריק ");
      }
      if (!data.date_start) {
        flag = false;
        ErrorReason.push(" תאריך התחלת המשימה ריק ");
      }
      if (!data.date_end) {
        flag = false;
        ErrorReason.push(" תאריך סיום המשימה ריק ");
      }
      if (!data.date_return) {
        flag = false;
        ErrorReason.push(" תאריך הגעה ליחידת האם ריק ");
      }
      if (data.holi_group === "" || data.holi_group === undefined) {
        flag = false;
        ErrorReason.push(" חברי החוליה ריק ");
      }
      if (data.note === "" || data.note === undefined) {
        flag = false;
        ErrorReason.push("הערות ריק ");
      }
    }

    if (flag !== true) {
      ErrorReason.forEach((reason) => {
        toast.error(reason);
        return false;
        // setData({ ...data, loading: false, successmsg: false, error: true });
      });
    } else {
      return true;
      // setData({ ...data, loading: false, successmsg: true, error: false });
    }
  };

  const makemsd = (length) => {
    let result = "";
    // const characters =
    //   "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789";
    const characters_str = "ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz";
    const characters_num =
      "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789";
    const charactersLength_str = characters_str.length;
    const charactersLength_num = characters_num.length;
    let counter = 0;
    while (counter < length) {
      // result += characters.charAt(Math.floor(Math.random() * charactersLength));
      if (counter === 0) {
        result += characters_str.charAt(Math.floor(Math.random() * charactersLength_str));
      } else {
        result += characters_num.charAt(Math.floor(Math.random() * charactersLength_num));
      }
      counter += 1;
    }
    return result;
  };

  const SendFormData = (event) => {
    let msd = makemsd(7);
    while (msdArray.includes(msd)) {
      msd = makemsd(7);
    }
    event.preventDefault();
    setData({
      ...data,
      msd,
      loading: true,
      successmsg: false,
      error: false,
      NavigateToReferrer: false,
    });
    const requestData = {
      namecontact: data.namecontact,
      numbercontact: data.numbercontact,
      msd,
      body_requires: data.body_requires,
      unit_requires: data.unit_requires,
      classReport: data.classReport?.id,
      number_class: data.number_class,
      source_holi: data.source_holi,
      what_happend: data.what_happend,
      type_happend: data.type_happend,
      personal_protection: data.personal_protection,
      amlah: data.amlah,
      merhav_amlah: data.merhav_amlah,
      zadik: data.zadik,
      mikom: data.mikom,
      personalnumber: data.personalnumber,
      urgent: data.urgent,
      date_need: data.date_need,
      // alm: data.alm,
      pikod: data.pikod,
      // road: data.road,
      mail: mails,
      status: getNewStatus(),
    };
    setCurrentStatus(requestData.status);
    setCurrentMSD(requestData.msd);

    console.log(requestData);
    axios
      .post(`http://localhost:5000/TowingLogApi/HolyaReports/report`, requestData)
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

  const handleCloseSuccsecModal = () => {
    setData({ ...data, loading: false, error: false, successmsg: false, NavigateToReferrer: true });
  };
  const handleCloseLoadingModal = () => {
    setData({ ...data, loading: false });
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
      return <Navigate to="/HomePage" />;
      // window.location.href = window.location.href;
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/HolyaReports/report`)
      .then(async (response) => {
        response.data.forEach((element) => {
          msdArray.push(element.msd);
        });
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
          בקשה לחוליה נשלחה{" "}
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            מספר מס"ד: {currentMSD}
          </MDTypography>
        </DialogContent>
        {currentStatus === 5 && (
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            שים לב הבקשה לא תעבור לאישורים עד שלא תשלים את הפרטים
          </MDTypography>
        )}
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

  const holiyaRequestForm = () => (
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
                  טופס בקשת חוליה{" "}
                </MDTypography>
              </MDBox>
              <Form style={{ textAlign: "right" }} role="form">
                <FormGroup>
                  <Row style={{ marginBottom: "1.5rem" }}>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <MDTypography variant="h5" fontWeight="medium" color="error" mt={1}>
                        דחיפות
                      </MDTypography>
                      <Input
                        // placeholder={textPlaceHolderInputs[5]}
                        name="urgent"
                        type="select"
                        value={data.urgent}
                        onChange={handleChange}
                        // disabled={user.admin === "1"}
                      >
                        <option disabled value="">
                          בחר
                        </option>
                        <option value={false}>לא דחוף</option>
                        <option value={true}>דחוף - מבצעי מאוד</option>
                      </Input>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{}}>גוף דורש*</h6>
                      <Input
                        // placeholder={textPlaceHolderInputs[5]}
                        name="body_requires"
                        type="select"
                        value={data.body_requires}
                        onChange={handleChange}
                        disabled={user.admin === "1"}
                      >
                        <option defult value="">
                          בחר
                        </option>
                        {pikods.map((pikod) => (
                          <option value={pikod._id}>{pikod.name}</option>
                        ))}{" "}
                      </Input>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{}}>יחידה דורשת*</h6>
                      <Input
                        placeholder="יחידה דורשת"
                        type="string"
                        name="unit_requires"
                        value={data.unit_requires}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col />
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
                      <h6 style={{}}>סוג האמל"ח*</h6>
                      <Input
                        placeholder='סוג האמל"ח'
                        type="string"
                        name="amlah"
                        value={data.amlah}
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
                      <h6 style={{}}>צ'</h6>
                      <Input
                        placeholder="צ'"
                        type="string"
                        name="zadik"
                        value={data.zadik}
                        onChange={handleChange}
                        onBlur={checkZadik}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{}}>מרחב האמל"ח*</h6>
                      <Input
                        placeholder='מרחב האמל"ח'
                        type="select"
                        name="merhav_amlah"
                        value={data.merhav_amlah}
                        onChange={handleChange}
                        id="selamlah"
                      >
                        <option value="בחר">בחר</option>
                        <option value="צפון">צפון</option>
                        <option value="דרום">דרום</option>
                        <option value="מרכז">מרכז</option>
                      </Input>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{}}>מיקום האמל"ח*</h6>
                      <Input
                        placeholder='מיקום האמל"ח'
                        type="string"
                        name="mikom"
                        value={data.mikom}
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
                      <h6 style={{}}>מהות התקלה*</h6>
                      <Input
                        placeholder="מהות התקלה"
                        type="textarea"
                        name="what_happend"
                        value={data.what_happend}
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
                      <h6 style={{}}>סוג התקלה*</h6>
                      <Input
                        placeholder="סוג התקלה"
                        type="select"
                        name="type_happend"
                        value={data.type_happend}
                        onChange={handleChange}
                        id="selhappend"
                      >
                        <option value="בחר">בחר</option>
                        <option value={true}>משבית</option>
                        <option value={false}>לא משבית</option>
                      </Input>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{}}>מיגון אישי*</h6>
                      <Input
                        placeholder="מיגון אישי"
                        type="select"
                        name="personal_protection"
                        value={data.personal_protection}
                        onChange={handleChange}
                        id="selpersonal_protection"
                      >
                        <option disabled value="בחר">
                          בחר
                        </option>
                        <option value={true}>נדרש</option>
                        <option value={false}>לא נדרש</option>
                      </Input>
                    </Col>
                    <Col />
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
                      <h6 style={{}}>סוג כיתה*</h6>
                      <Autocomplete
                        disablePortal
                        id="classReport"
                        name="classReport"
                        options={classReportForSelect}
                        value={data.classReport}
                        selectOnFocus
                        onChange={(event, newValue) => {
                          console.log(newValue);
                          setData({ ...data, classReport: newValue });
                        }} // sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="בחר" />}
                      />
                    </Col>

                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{}}>כמות כיתות*</h6>
                      <Input
                        placeholder="כמות כיתות"
                        type="number"
                        min={1}
                        name="number_class"
                        value={data.number_class}
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
                      <h6 style={{}}>מקור החוליה*</h6>
                      <Input
                        placeholder="מקור החוליה"
                        type="select"
                        name="source_holi"
                        value={data.source_holi}
                        onChange={handleChange}
                        id="selholi"
                      >
                        <option value="">בחר</option>
                        <option value="1">אגד טנ"א ארצי</option>
                        <option value="2">חט"ל</option>
                        <option value="3">רפ"ט</option>
                        <option value="4">מש"א</option>
                        <option value="5">תעשייה</option>
                        <option value="6">מקטנא"ר</option>
                        <option value="7">בה"ד 20</option>
                      </Input>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{}}>מועד רצוי להוצאת החוליה*</h6>
                      <Input
                        placeholder="מועד רצוי להוצאת החוליה"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        name="date_need"
                        value={data.date_need?.split("T")[0]}
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
                      <h6 style={{}}>שם נציג היחידה לתיאום*</h6>
                      <Input
                        placeholder="שם איש קשר"
                        type="string"
                        name="namecontact"
                        value={data.namecontact}
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
                      <h6 style={{}}>טלפון נציג היחידה לתיאום*</h6>
                      <Input
                        placeholder="טלפון איש קשר"
                        type="tel"
                        name="numbercontact"
                        value={data.numbercontact}
                        onChange={handleChange}
                      />
                    </Col>
                    {/* <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{}}>מספר אישי</h6>
                      <Input
                        placeholder="מספר אישי"
                        type="string"
                        name="personalnumber"
                        value={data.personalnumber}
                        onChange={handleChange}
                      />
                    </Col> */}
                  </Row>
                </FormGroup>

                {mails.length === 0 ? (
                  <Row>
                    <Col style={{ display: "flex", textAlign: "right" }}>
                      <MDButton
                        // style={{ width: "100px", padding: "5px" }}
                        variant="gradient"
                        color="mekatnar"
                        onClick={() => {
                          setmailsarray((currentSpec) => [...currentSpec, { id: generate() }]);
                        }}
                      >
                        <Icon>add</Icon>
                        הוסף מייל
                      </MDButton>
                    </Col>
                  </Row>
                ) : (
                  mails.map((p, index) => (
                    <div>
                      {index === 0 ? (
                        <Row>
                          <Col
                            style={{
                              display: "flex",
                              textAlign: "right",
                            }}
                          >
                            <MDButton
                              // style={{ width: "100px", padding: "5px" }}
                              variant="gradient"
                              color="mekatnar"
                              onClick={() => {
                                setmailsarray((currentSpec) => [
                                  ...currentSpec,
                                  { id: generate() },
                                ]);
                              }}
                            >
                              <Icon>add</Icon>
                              הוסף מייל
                            </MDButton>
                          </Col>
                        </Row>
                      ) : null}
                      <Row>
                        <Col xs={12} md={4}>
                          <div>
                            <p
                              style={{
                                margin: "0px",
                                float: "right",
                              }}
                            >
                              מייל לשליחה*
                            </p>
                            <Input
                              onChange={(e) => {
                                const mail = e.target.value;
                                setmailsarray((currentSpec) =>
                                  produce(currentSpec, (v) => {
                                    v[index].mail = mail;
                                  })
                                );
                              }}
                              placeholder="מייל"
                              value={p.mail}
                              type="email"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Button
                        type="button"
                        onClick={() => {
                          setmailsarray((currentSpec) => currentSpec.filter((x) => x.id !== p.id));
                        }}
                      >
                        <Icon>delete</Icon>
                      </Button>
                    </div>
                  ))
                )}

                <div
                  tag="h4"
                  style={{
                    direction: "rtl",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  תיאומים אגמיים
                </div>
                <FormGroup>
                  <Row>
                    {/* //ARMY - 15-11-2023 - need to be added to the army */}
                    {/* <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{}}>תדרוך אל"ם</h6>
                      <Input
                        placeholder='תדרוך אל"ם'
                        type="select"
                        name="alm"
                        value={data.alm}
                        onChange={handleChange}
                        id="selalm"
                      >
                        <option value="בחר">בחר</option>
                        <option value={true}>כן</option>
                        <option value={false}>לא</option>
                      </Input>
                    </Col> */}
                    {/* //!ARMY */}

                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{}}>אישור מול הפיקוד</h6>
                      <Input
                        placeholder="אישור מול הפיקוד"
                        type="select"
                        name="pikod"
                        value={data.pikod}
                        onChange={handleChange}
                        id="selpikod"
                      >
                        <option value="בחר">בחר</option>
                        <option value={true}>כן</option>
                        <option value={false}>לא</option>
                      </Input>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      {/* <h6 style={{}}>אישור צירי נסיעה</h6>
                      <Input
                        placeholder="אישור צירי נסיעה"
                        type="select"
                        name="road"
                        value={data.road}
                        onChange={handleChange}
                        id="selroad"
                      >
                        <option value="בחר">בחר</option>
                        <option value={true}>כן</option>
                        <option value={false}>לא</option>
                      </Input> */}
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
                    שלח בקשה
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

      {holiyaRequestForm()}
      <Outlet />
    </MDBox>
  );
}
