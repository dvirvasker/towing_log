/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
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
import { Link, Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
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
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { authenticate, isAuthenticated, signin } from "auth/index";
import MDProgress from "components/MDProgress";
import { m } from "framer-motion";
const { user } = isAuthenticated();

// console.log("Hozla Print Request Form");
// console.log(user);

// FIXME_ARMY - all the alam wans need to be fixed

export default function HoliyaRequestFormDB() {
  const params = useParams();
  const navigate = useNavigate();

  const [pikods, setPikods] = useState([]);
  const [classReportDB, setClassReportDB] = useState([]);
  const [classReportForSelect, setClassReportForSelect] = useState([]);

  const [currentStatus, setCurrentStatus] = useState(5);
  const [currentclassReport, setCurrentClassReport] = useState({ label: "", id: "" });

  const [data, setData] = useState({
    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });

  const [reportData, setReportData] = useState({});
  const [mails, setmailsarray] = useState([{}]);
  const [holi_groups, setholi_groups] = useState([{}]);

  const inputRef = React.useRef(null);

  useEffect(() => {
    let classReportTemp = "";
    axios
      .get(`http://localhost:5000/TowingLogApi/HolyaReports/report/${params.id}`)
      .then((response) => {
        setReportData(response.data);
        setmailsarray(response.data.mail);
        setholi_groups(response.data.holi_group);
        classReportTemp = response.data.classReport;
      })
      .catch((error) => {
        setData({
          ...data,
          error: true,
          successmsg: false,
          loading: false,
          NavigateToReferrer: false,
        });
      });

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

        if (classReportTemp !== "") {
          temp.forEach((item) => {
            // console.log(item);
            // console.log("&&&&&&&&&&&&&&&&&&&&&");
            // console.log(item.id === classReportTemp);
            // console.log("fsdfsasdfsadfsadfdsf");
            // console.log(reportData);
            if (item.id === classReportTemp) {
              // console.log(` found ${item}`);
              setCurrentClassReport(item);
            }
          });
        }

        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleChange(evt) {
    const { value } = evt.target;
    if (
      evt.target.name === "date_arrival" ||
      evt.target.name === "date_sechauled" ||
      evt.target.name === "date_need" ||
      evt.target.name === "date_start" ||
      evt.target.name === "date_end" ||
      evt.target.name === "date_return"
    ) {
      // Input date in string format
      const inputDateStr = value;

      // Convert the string to a Date object
      const inputDate = new Date(inputDateStr);

      // Add 3 hours to the Date object
      inputDate.setHours(inputDate.getHours() + 2);

      // Convert the result back to the desired string format
      const value1 = inputDate.toISOString();
      setReportData({ ...reportData, [evt.target.name]: value1 });
    } else if (evt.target.name === "kshirot_tne") {
      setReportData({
        ...reportData,
        date_kshirot_tne: new Date().toISOString(),
        [evt.target.name]: value,
      });
    } else if (evt.target.name === "matcal_tne") {
      setReportData({
        ...reportData,
        date_matcal_tne: new Date().toISOString(),
        [evt.target.name]: value,
      });
    } else {
      setReportData({ ...reportData, [evt.target.name]: value });
    }
  }

  function checkZadik(evt) {
    axios
      .get(`http://localhost:5000/TowingLogApi/HolyaReports/report/forms/getAllZadikNotFinished`)
      .then((response) => {
        response.data.forEach((element) => {
          if (
            reportData.zadik !== "" &&
            element.zadik === reportData.zadik &&
            element._id !== params.id
          ) {
            toast.info("צ' זה כבר קיים במערכת");
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
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

    if (reportData.body_requires === "" || reportData.body_requires === undefined) {
      flag = false;
      ErrorReason.push(" גוף דורש ריק");
    }

    if (reportData.unit_requires === "" || reportData.unit_requires === undefined) {
      flag = false;
      ErrorReason.push(" יחידה דורשת ריקה");
    }
    if (reportData.amlah === "" || reportData.amlah === undefined) {
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

    if (reportData.mikom === "" || reportData.mikom === undefined) {
      flag = false;
      ErrorReason.push("  מיקום אמלח ריק ");
    }
    if (reportData.what_happend === "" || reportData.what_happend === undefined) {
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
    if (reportData.classReport === "" || reportData.classReport === undefined) {
      flag = false;
      ErrorReason.push("  סוג הכיתה ריק ");
    }
    if (reportData.number_class === "" || reportData.number_class === undefined) {
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
    if (!reportData.date_need) {
      flag = false;
      ErrorReason.push(" תאריך ריק ");
    }
    if (reportData.namecontact === "" || reportData.namecontact === undefined) {
      flag = false;
      ErrorReason.push("  שם נציג ריק ");
    }
    if (reportData.numbercontact === "" || reportData.numbercontact === undefined) {
      flag = false;
      ErrorReason.push("  טלפון נציג ריק ");
    }
    if (reportData.personalnumber === "" || reportData.personalnumber === undefined) {
      flag = false;
      ErrorReason.push("  מספר אישי ריק");
    }

    if (mails.length === 0) {
      flag = false;
      ErrorReason.push(" לא הוזן כתובת מייל");
    }

    // if (reportData.classReport === "65493272e4972fdaf25f57f5") {
    //   flag = false;
    //   ErrorReason.push(" 3");
    // }

    // if (reportData.classReport === "654932cc3cc00614522fcd2b") {
    //   flag = false;
    //   ErrorReason.push(" 2");
    // }

    // if (reportData.classReport === "654932d63cc00614522fcd2c") {
    //   flag = false;
    //   ErrorReason.push(" 1");
    // }

    // if (user.admin === "3" && reportData.status === 50) {
    //   if (!reportData.date_arrival) {
    //     flag = false;
    //     ErrorReason.push(" תאריך הגעה ליעד ריק ");
    //   }
    //   if (!reportData.date_start) {
    //     flag = false;
    //     ErrorReason.push(" תאריך התחלת המשימה ריק ");
    //   }
    //   if (!reportData.date_end) {
    //     flag = false;
    //     ErrorReason.push(" תאריך סיום המשימה ריק ");
    //   }
    //   if (!reportData.date_return) {
    //     flag = false;
    //     ErrorReason.push(" תאריך הגעה ליחידת האם ריק ");
    //   }
    //   if (reportData.holi_group === "" || reportData.holi_group === undefined) {
    //     flag = false;
    //     ErrorReason.push(" חברי החוליה ריק ");
    //   }
    //   if (reportData.note === "" || reportData.note === undefined) {
    //     flag = false;
    //     ErrorReason.push("הערות ריק ");
    //   }
    // }

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

  function getNewStatus() {
    /* //? status options:
        ? 15 - חדש
        ? 25 - ממתין לאישור מכללות טנא
        ? 50 - אושר
        ? 75 - בתהליך
        ? 100 - הסתיים
        ? 888 - נדחה
        ? 999 - נדחה - לצורך תיקון
    */
    let status;

    if (reportData.status == 5) {
      if (
        // document.getElementById("selalm").options[document.getElementById("selalm").selectedIndex]
        //   .value == "true" &&
        document.getElementById("selpikod").options[
          document.getElementById("selpikod").selectedIndex
        ].value == "true"
        // &&
        // document.getElementById("selroad").options[document.getElementById("selroad").selectedIndex]
        //   .value == "true"
      ) {
        status = 15;
      } else {
        status = 5;
      }
    } else if (reportData.status == 15) {
      if (
        // document.getElementById("selalm").options[document.getElementById("selalm").selectedIndex]
        //   .value == "true" &&
        document.getElementById("selpikod").options[
          document.getElementById("selpikod").selectedIndex
        ].value == "true"
        //  &&
        // document.getElementById("selroad").options[document.getElementById("selroad").selectedIndex]
        //   .value == "true"
      ) {
        if (reportData.kshirot_tne != 0 && reportData.matcal_tne == 0) {
          status = reportData.kshirot_tne;
        } else {
          console.log("................................................");
          status = reportData.status;
        }
      } else {
        status = 5;
      }
    } else if (
      ((user.admin == "3" || user.admin == "0") &&
        reportData.status > 50 &&
        reportData.status <= 100) ||
      reportData.status == 999
    ) {
      status = reportData.status;
    } else {
      if (reportData.kshirot_tne != 0 && reportData.matcal_tne == 0) {
        status = reportData.kshirot_tne;
      } else if (reportData.kshirot_tne != 0 && reportData.matcal_tne != 0) {
        status = reportData.matcal_tne;
      } else {
        status = reportData.status;
      }
    }
    console.log(`getNewStatus - status: ${status}`);
    return status;

    // if (
    //   (user.admin === "3" || user.admin === "0") &&
    //   reportData.status > 50 &&
    //   reportData.status <= 100
    // ) {
    //   return reportData.status;
    // }
    // if (reportData.kshirot_tne !== null && reportData.matcal_tne === null) {
    //   return reportData.kshirot_tne;
    // }
    // else if(reportData.kshirot_tne !== null && reportData.matcal_tne !== null){
    //   return reportData.matcal_tne;
    // }else{
    //   return reportData.status;
    // }
  }

  // const getAprrovalDate = (type) => {
  //   /* //? status options:
  //       ? 15 - חדש
  //       ? 25 - ממתין לאישור מכללות טנא
  //       ? 50 - אושר
  //       ? 75 - בתהליך
  //       ? 100 - הסתיים
  //       ? 888 - נדחה
  //       ? 999 - נדחה - לצורך תיקון
  //   */
  //   //! types:
  //   //! 1 - date_kshirot_tne
  //   //! 2 - date_matcal_tne

  //   let date = null;
  //   const status = getNewStatus();

  //   if (type === 1) {
  //     //! 1 - date_kshirot_tne
  //     if (reportData.date_kshirot_tne === null && reportData.kshirot_tne === null) {
  //       date = null;
  //     } else if (reportData.date_kshirot_tne === null && reportData.kshirot_tne !== null) {
  //       date = new Date().toISOString();
  //     } else if (reportData.date_kshirot_tne !== null && reportData.kshirot_tne !== null) {
  //       if (status !== reportData.status && !(status === 50 || status === 75 || status === 100)) {
  //         date = new Date().toISOString();
  //       } else {
  //         date = reportData.date_kshirot_tne;
  //       }
  //     }
  //   } else if (type === 2) {
  //     //! 2 - date_matcal_tne

  //     if (reportData.date_matcal_tne === null && reportData.matcal_tne === null) {
  //       date = null;
  //     } else if (reportData.date_matcal_tne === null && reportData.matcal_tne !== null) {
  //       date = new Date().toISOString();
  //     } else if (reportData.date_matcal_tne !== null && reportData.matcal_tne !== null) {
  //       if (status !== reportData.status && !(status === 50 || status === 75 || status === 100)) {
  //         date = new Date().toISOString();
  //       } else {
  //         date = reportData.date_kshirot_tne;
  //       }
  //     }
  //   }
  //   return date;
  // };

  const SendFormData = async (event) => {
    event.preventDefault();

    // if (
    //   (user.admin === "2" || user.admin === "0") &&
    //   reportData.status === 15 &&
    //   reportData.kshirot_tne !== null
    // ) {
    //   setReportData({ ...reportData, date_kshirot_tne: new Date().toISOString() });
    // }
    // if (user.admin === "0" && reportData.status === 25 && reportData.matcal_tne !== null) {
    //   setReportData({ ...reportData, date_matcal_tne: new Date().toISOString() });
    // }

    // if ((user.admin === "2" || user.admin === "0") && reportData.status === 15) {
    //   if (reportData.kshirot_tne) {
    //     setReportData({ ...reportData, status: 25 });
    //   } else {
    //     setReportData({ ...reportData, status: 888 });
    //   }
    // }

    // if (user.admin === "0" && reportData.status >= 25) {
    //   if (reportData.matcal_tne) {
    //     setReportData({ ...reportData, status: 50 });
    //   } else {
    //     setReportData({ ...reportData, status: 888 });
    //   }
    // }

    // if (user.admin === "3") {
    //   setReportData({ ...reportData });
    // }

    setData({
      ...data,
      loading: true,
      successmsg: false,
      error: false,
      NavigateToReferrer: false,
    });
    const requestData = {
      urgent: reportData.urgent,
      msd: reportData.msd,
      namecontact: reportData.namecontact,
      numbercontact: reportData.numbercontact,
      body_requires: reportData.body_requires,
      unit_requires: reportData.unit_requires,
      classReport: reportData.classReport,
      number_class: reportData.number_class,
      source_holi: reportData.source_holi,
      what_happend: reportData.what_happend,
      type_happend: reportData.type_happend,
      personal_protection: reportData.personal_protection,
      amlah: reportData.amlah,
      merhav_amlah: reportData.merhav_amlah,
      zadik: reportData.zadik,
      mikom: reportData.mikom,
      personalnumber: reportData.personalnumber,
      date_need: reportData.date_need,
      alm: reportData.alm,
      pikod: reportData.pikod,
      road: reportData.road,
      mail: mails,

      kshirot_tne: reportData.kshirot_tne,
      pirot_kshirot_tne: reportData.pirot_kshirot_tne,
      date_kshirot_tne: reportData.date_kshirot_tne,

      matcal_tne: reportData.matcal_tne,
      pirot_matcal_tne: reportData.pirot_matcal_tne,
      date_matcal_tne: reportData.date_matcal_tne,

      date_sechauled: reportData.date_sechauled,
      date_arrival: reportData.date_arrival,
      date_start: reportData.date_start,
      date_end: reportData.date_end,
      date_return: reportData.date_return,
      holi_group: holi_groups,
      note: reportData.note,
      responsible_fram: reportData.responsible_fram,

      status: await getNewStatus(),
    };
    setCurrentStatus(requestData.status);
    console.log(requestData);
    console.log(requestData.classReport);
    axios
      .post(
        `http://localhost:5000/TowingLogApi/HolyaReports/report/update/${params.id}`,
        requestData
      )
      .then((response) => {
        axios
          .post(`http://localhost:5000/TowingLogApi/sendemail`, {
            mail: mails,
            type: getWorkStuts(response.data.status)[0],
            msd: reportData.msd,
            reportID: params.id,
            zadik: reportData.zadik,
            amlah: reportData.amlah,
          })
          .then(() => {
            if (response.data.status == 50) {
              axios
                .post(`http://localhost:5000/TowingLogApi/user/getEmilListSourceHoli`, {
                  source_holi: response.data.source_holi,
                })
                .then((r) => {
                  console.log(r.data);
                  axios
                    .post(`http://localhost:5000/TowingLogApi/sendemail/sourceHoli`, {
                      mail: r.data,
                      msd: reportData.msd,
                      reportID: params.id,
                      zadik: reportData.zadik,
                      amlah: reportData.amlah,
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
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
      navigate(-1);
      // return <Navigate to="/HomePage" />;
      // window.location.href = window.location.href;
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
          בקשה לחוליה נשלחה{" "}
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            מספר מס"ד: {reportData.msd}
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

  // ! try DND

  const getIfDisabled = () => {
    if (reportData.status <= 15) return false;

    if (user.admin === "2" && reportData.status < 75) return false;
    if (user.admin === "0") return false;
    return true;
  };

  const getWorkStuts = (value) => {
    let stutus = "חדש";
    let color = "error";
    if (value == 15) {
      stutus = "חדש";
      color = "primary";
    } else if (value == 25) {
      stutus = 'ממתין לאישור מכלול טנ"א';
      color = "info";
    } else if (value == 50) {
      stutus = "אושר";
      color = "success";
    } else if (value == 75) {
      stutus = "בתהליך";
      color = "warning";
    } else if (value == 100) {
      stutus = "הסתיים";
      color = "success";
    } else if (value == 888) {
      stutus = "נדחה";
      color = "error";
    } else if (value == 5) {
      stutus = "ממתין להשלמת נתונים";
      color = "error";
    } else if (value == 999) {
      stutus = "הסתיים - עקב ביטול ";
      color = "error";
    }
    return [stutus, color];
  };

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      {/* <MDTypography variant="caption" color={color} fontWeight="medium">
        {value}%
      </MDTypography> */}

      <MDBox ml={0.5} width="60rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const getname = (idnum, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._id === idnum) return arr[i].name;
    }
    return "";
  };

  const holiyaRequestFormDB = () => (
    <Container className="" dir="rtl">
      <Row className="justify-content-center">
        <Col lg="8" md="8">
          <Card className="shadow border-0">
            <CardBody className="px-lg-8 py-lg-10">
              <MDBox
                variant="gradient"
                bgColor={reportData.urgent ? "error" : "mekatnar"}
                borderRadius="lg"
                coloredShadow={reportData.urgent ? "error" : "mekatnar"}
                mx={2}
                mt={-3}
                p={3}
                mb={1}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  טופס בקשת חוליה - {reportData.msd} מתאריך{" "}
                  {reportData.createdAt?.split("T")[0].split("-").reverse().join("/")}
                </MDTypography>
              </MDBox>
              {(user.admin !== "3" && user.admin !== "0") ||
              (user.admin === "3" &&
                (reportData.status === 15 ||
                  reportData.status === 25 ||
                  reportData.status === 888)) ||
              (user.admin === "0" &&
                reportData.status !== 50 &&
                reportData.status !== 75 &&
                reportData.status !== 100 &&
                reportData.status !== 999) ? (
                <MDBox
                  sx={{
                    justifyContent: "center",
                    alignContent: "center",
                    textAlign: "center",
                  }}
                  my={2}
                >
                  <MDTypography
                    alignItems="center"
                    component="h3"
                    color={getWorkStuts(reportData.status)[1]}
                    fontWeight="medium"
                  >
                    סטטוס הבקשה: {getWorkStuts(reportData.status)[0]}
                  </MDTypography>
                  <Progress
                    variant="gradient"
                    color={getWorkStuts(reportData.status)[1]}
                    value={reportData.status >= 125 ? 100 : reportData.status}
                  />
                </MDBox>
              ) : (
                <MDBox
                  sx={{
                    justifyContent: "center",
                    alignContent: "center",
                    textAlign: "center",
                  }}
                  my={2}
                >
                  <FormGroup>
                    <Label for="status">סטטוס</Label>
                    <Input
                      // placeholder={textPlaceHolderInputs[5]}
                      name="status"
                      type="select"
                      value={reportData.status}
                      onChange={handleChange}
                    >
                      <option value={50}>אושר</option>
                      <option value={75}>בתהליך</option>
                      <option value={100}>הסתיים</option>
                      <option value={999}>הסתיים - עקב ביטול</option>
                    </Input>
                  </FormGroup>
                </MDBox>
              )}
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
                        value={reportData.urgent}
                        onChange={handleChange}
                        disabled={getIfDisabled()}
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
                        value={reportData.body_requires}
                        onChange={handleChange}
                        disabled={getIfDisabled()}
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
                        value={reportData.unit_requires}
                        onChange={handleChange}
                        disabled={getIfDisabled()}
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
                        value={reportData.amlah}
                        onChange={handleChange}
                        disabled={getIfDisabled()}
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
                        value={reportData.zadik}
                        onChange={handleChange}
                        disabled={getIfDisabled()}
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
                        value={reportData.merhav_amlah}
                        onChange={handleChange}
                        id="selamlah"
                        disabled={getIfDisabled()}
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
                        value={reportData.mikom}
                        onChange={handleChange}
                        disabled={getIfDisabled()}
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
                        value={reportData.what_happend}
                        onChange={handleChange}
                        disabled={getIfDisabled()}
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
                        value={reportData.type_happend}
                        onChange={handleChange}
                        id="selhappend"
                        disabled={getIfDisabled()}
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
                        value={reportData.personal_protection}
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
                        value={currentclassReport}
                        disabled={getIfDisabled()}
                        selectOnFocus
                        onChange={(event, newValue) => {
                          // console.groupCollapsed();
                          // console.log(newValue);
                          // console.log(reportData.classReport);
                          // console.log(currentclassReport);
                          setCurrentClassReport(newValue);
                          setReportData({ ...reportData, classReport: newValue?.id });
                          // console.groupEnd();
                        }} // sx={{ width: 300 }}
                        renderInput={(p) => <TextField {...p} label="בחר" />}
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
                        value={reportData.number_class}
                        onChange={handleChange}
                        disabled={getIfDisabled()}
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
                        value={reportData.source_holi}
                        onChange={handleChange}
                        id="selholi"
                        disabled={getIfDisabled()}
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
                        value={reportData.date_need?.split("T")[0]}
                        onChange={handleChange}
                        disabled={getIfDisabled()}
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
                        value={reportData.namecontact}
                        onChange={handleChange}
                        disabled={getIfDisabled()}
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
                        value={reportData.numbercontact}
                        onChange={handleChange}
                        disabled={getIfDisabled()}
                      />
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{}}> מספר אישי של מזמין הטופס</h6>
                      <Input
                        placeholder="מספר אישי"
                        type="string"
                        name="personalnumber"
                        value={reportData.personalnumber}
                        onChange={handleChange}
                        disabled
                      />
                    </Col>
                  </Row>
                </FormGroup>

                {/* {getIfDisabled() ? (
                  <MDBox
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      flexDirection: "column",
                      justifyContent: "left",
                      alignContent: "left",
                    }}
                  >
                    <MDBox>
                      <p
                        style={{
                          margin: "0px",
                          float: "right",
                        }}
                      >
                        מייל לשליחה
                      </p>
                    </MDBox>
                    <MDBox>
                      {mails.map((p, index) => (
                        <MDTypography
                          variant="h6"
                          fontWeight="medium"
                          sx={{ color: "#6c757d", display: "block" }}
                        >
                          {p.mail}
                        </MDTypography>
                      ))}
                    </MDBox>
                  </MDBox>
                ) : ( */}
                {
                  <>
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
                            הוסף מייל
                            <Icon>add</Icon>
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
                              setmailsarray((currentSpec) =>
                                currentSpec.filter((x) => x.id !== p.id)
                              );
                            }}
                          >
                            <Icon>delete</Icon>
                          </Button>
                        </div>
                      ))
                    )}
                  </>
                }
                {/* )} */}

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
                        value={reportData.pikod}
                        onChange={handleChange}
                        id="selpikod"
                        disabled={getIfDisabled()}
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
                        value={reportData.road}
                        onChange={handleChange}
                        id="selroad"
                        disabled={getIfDisabled()}
                      >
                        <option value="בחר">בחר</option>
                        <option value={true}>כן</option>
                        <option value={false}>לא</option>
                      </Input> */}
                    </Col>
                  </Row>
                </FormGroup>

                {reportData.status >= 15 ? (
                  <FormGroup>
                    <Row>
                      <Col
                        style={{
                          justifyContent: "right",
                          alignContent: "right",
                          textAlign: "right",
                        }}
                      >
                        <h6 style={{}}>אישור תחום כשירות מסגרות הטנ"א</h6>
                        <Input
                          placeholder='אישור תחום כשירות מסגרות הטנ"א'
                          type="select"
                          name="kshirot_tne"
                          value={reportData.kshirot_tne}
                          onChange={handleChange}
                          id="selkshirot_tne"
                          disabled={
                            !(user.admin === "0" || user.admin === "2") || reportData.status > 25
                          }
                        >
                          <option value={0}>בחר</option>
                          <option value={25}>אושר</option>
                          <option value={888}>נדחה</option>
                        </Input>
                      </Col>
                      <Col
                        style={{
                          justifyContent: "right",
                          alignContent: "right",
                          textAlign: "right",
                        }}
                      >
                        <h6 style={{}}>הערות תחום כשירות מסגרות הטנ"א</h6>
                        <Input
                          placeholder='הערות תחום כשירות מסגרות הטנ"א'
                          type="textarea"
                          name="pirot_kshirot_tne"
                          value={reportData.pirot_kshirot_tne}
                          onChange={handleChange}
                          disabled={
                            !(user.admin === "0" || user.admin === "2") || reportData.status > 25
                          }
                        />
                      </Col>
                      {reportData.date_kshirot_tne !== null && (
                        <MDTypography variant="h6" fontWeight="medium" sx={{ color: "#6c757d" }}>
                          בתאריך:{" "}
                          {reportData.date_kshirot_tne
                            ?.split("T")[0]
                            .split("-")
                            .reverse()
                            .join("/")}
                          {/* {reportData.date_kshirot_tne} */}
                        </MDTypography>
                      )}
                    </Row>
                  </FormGroup>
                ) : null}
                {reportData.status >= 25 ? (
                  <FormGroup>
                    <Row>
                      <Col
                        style={{
                          justifyContent: "right",
                          alignContent: "right",
                          textAlign: "right",
                        }}
                      >
                        <h6 style={{}}>אישור מכלול טנ"א מטכ"לי</h6>
                        <Input
                          placeholder='אישור מכלול טנ"א מטכ"לי'
                          type="select"
                          name="matcal_tne"
                          value={reportData.matcal_tne}
                          onChange={handleChange}
                          id="selmatcal_tne"
                          disabled={reportData.status === 888 || user.admin !== "0"}
                        >
                          <option value={0}>בחר</option>
                          <option value={50}>אושר</option>
                          <option value={888}>נדחה</option>
                        </Input>
                      </Col>
                      <Col
                        style={{
                          justifyContent: "right",
                          alignContent: "right",
                          textAlign: "right",
                        }}
                      >
                        <h6 style={{}}>הערות מכלול טנ"א מטכ"לי</h6>
                        <Input
                          placeholder='הערות מכלול טנ"א מטכ"לי'
                          type="textarea"
                          name="pirot_matcal_tne"
                          value={reportData.pirot_matcal_tne}
                          onChange={handleChange}
                          disabled={reportData.status === 888 || user.admin !== "0"}
                        />
                      </Col>
                      {reportData.date_matcal_tne !== null && (
                        <MDTypography variant="h6" fontWeight="medium" sx={{ color: "#6c757d" }}>
                          בתאריך:{" "}
                          {reportData.date_matcal_tne?.split("T")[0].split("-").reverse().join("/")}
                          {/* {reportData.date_matcal_tne} */}
                        </MDTypography>
                      )}
                    </Row>
                  </FormGroup>
                ) : null}
                {reportData.status >= 50 && reportData.status <= 100 ? (
                  <FormGroup>
                    <div
                      tag="h4"
                      style={{
                        direction: "rtl",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      פרטי חוליה{" "}
                    </div>
                    <Row>
                      <Col
                        style={{
                          justifyContent: "right",
                          alignContent: "right",
                          textAlign: "right",
                        }}
                      >
                        <h6 style={{}}>מסגרת אחראית</h6>
                        <Input
                          placeholder="מסגרת אחראית"
                          type="text"
                          name="responsible_fram"
                          value={reportData.responsible_fram}
                          onChange={handleChange}
                          disabled={!(user.admin === "3" || user.admin === "0")}
                        />
                      </Col>

                      <Col
                        style={{
                          justifyContent: "right",
                          alignContent: "right",
                          textAlign: "right",
                        }}
                      >
                        <h6 style={{}}>מועד מתוכנן לשליחת חוליה</h6>
                        <Input
                          placeholder="מועד מתוכנן לשליחת חוליה"
                          type="date"
                          name="date_sechauled"
                          value={reportData.date_sechauled?.split("T")[0]}
                          onChange={handleChange}
                          disabled={!(user.admin === "3" || user.admin === "0")}
                        />
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
                        <h6 style={{}}>שעת הגעה ליעד</h6>
                        <Input
                          placeholder="שעת הגעה ליעד"
                          type="datetime-local"
                          name="date_arrival"
                          value={reportData.date_arrival?.slice(0, 16)}
                          onChange={handleChange}
                          disabled={!(user.admin === "3" || user.admin === "0")}
                        />
                      </Col>
                      <Col
                        style={{
                          justifyContent: "right",
                          alignContent: "right",
                          textAlign: "right",
                        }}
                      >
                        <h6 style={{}}>שעת התחלת המשימה</h6>
                        <Input
                          placeholder="שעת התחלת המשימה"
                          type="datetime-local"
                          name="date_start"
                          value={reportData.date_start?.slice(0, 16)}
                          onChange={handleChange}
                          disabled={!(user.admin === "3" || user.admin === "0")}
                        />
                      </Col>
                      <Col
                        style={{
                          justifyContent: "right",
                          alignContent: "right",
                          textAlign: "right",
                        }}
                      >
                        <h6 style={{}}>שעת סיום המשימה</h6>
                        <Input
                          placeholder="שעת סיום המשימה"
                          type="datetime-local"
                          name="date_end"
                          value={reportData.date_end?.slice(0, 16)}
                          onChange={handleChange}
                          disabled={!(user.admin === "3" || user.admin === "0")}
                        />
                      </Col>
                      <Col
                        style={{
                          justifyContent: "right",
                          alignContent: "right",
                          textAlign: "right",
                        }}
                      >
                        <h6 style={{}}>שעת הגעה ליחידת האם</h6>
                        <Input
                          placeholder="שעת הגעה ליחידת האם"
                          type="datetime-local"
                          name="date_return"
                          value={reportData.date_return?.slice(0, 16)}
                          onChange={handleChange}
                          disabled={!(user.admin === "3" || user.admin === "0")}
                        />
                      </Col>
                      <Col
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
                          value={reportData.alm}
                          onChange={handleChange}
                          id="selalm"
                          disabled={!(user.admin === "3" || user.admin === "0")}
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
                        <h6 style={{}}>אישור צירי נסיעה</h6>
                        <Input
                          placeholder="אישור צירי נסיעה"
                          type="select"
                          name="road"
                          value={reportData.road}
                          onChange={handleChange}
                          id="selroad"
                        >
                          <option value="בחר">בחר</option>
                          <option value={true}>כן</option>
                          <option value={false}>לא</option>
                        </Input>
                      </Col>
                    </Row>
                    <div
                      tag="h4"
                      style={{
                        direction: "rtl",
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "1rem",
                        marginBotton: "2rem",
                      }}
                    >
                      חברי החוליה{" "}
                    </div>
                    {/* <Row>
                      <Col
                        style={{
                          justifyContent: "right",
                          alignContent: "right",
                          textAlign: "right",
                        }}
                      >
                        <h6 style={{}}>חברי החוליה</h6>
                        <Input
                          placeholder="חברי החוליה"
                          type="textarea"
                          name="holi_group"
                          value={reportData.holi_group}
                          onChange={handleChange}
                          disabled={!(user.admin === "3" || user.admin === "0")}
                        />
                      </Col>
                    </Row> */}
                    {holi_groups.length === 0 ? (
                      <Row>
                        <Col style={{ display: "flex", textAlign: "right" }}>
                          <MDButton
                            variant="gradient"
                            color="mekatnar"
                            onClick={() => {
                              setholi_groups((currentSpec) => [...currentSpec, { id: generate() }]);
                            }}
                            startIcon={<PersonAddAlt1Icon />}
                            disabled={!(user.admin === "3" || user.admin === "0")}
                          >
                            הוסף חבר חוליה
                          </MDButton>
                        </Col>
                      </Row>
                    ) : (
                      holi_groups.map((p, index) => (
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
                                    setholi_groups((currentSpec) => [
                                      ...currentSpec,
                                      { id: generate() },
                                    ]);
                                  }}
                                  startIcon={<PersonAddAlt1Icon />}
                                  disabled={!(user.admin === "3" || user.admin === "0")}
                                >
                                  הוסף חבר חוליה
                                </MDButton>
                              </Col>
                            </Row>
                          ) : null}
                          <div
                            tag="h4"
                            style={{
                              direction: "rtl",
                              textAlign: "right",
                              fontWeight: "bold",
                              marginTop: "1rem",
                              marginBotton: "2rem",
                            }}
                          >
                            {`פרטי חבר חוליה ${index + 1}`}
                          </div>
                          <Row>
                            <Col xs={12} md={4}>
                              <div>
                                <h6 style={{}}>שם מלא</h6>
                                <Input
                                  onChange={(e) => {
                                    const holiMemberName = e.target.value;
                                    setholi_groups((currentSpec) =>
                                      produce(currentSpec, (v) => {
                                        v[index].holiMemberName = holiMemberName;
                                      })
                                    );
                                  }}
                                  placeholder="שם מלא"
                                  value={p.holiMemberName}
                                  type="string"
                                  disabled={!(user.admin === "3" || user.admin === "0")}
                                />
                              </div>
                            </Col>
                            <Col xs={12} md={4}>
                              <div>
                                <h6 style={{}}>מספר טלפון</h6>
                                <Input
                                  onChange={(e) => {
                                    const holiMemberPhone = e.target.value;
                                    setholi_groups((currentSpec) =>
                                      produce(currentSpec, (v) => {
                                        v[index].holiMemberPhone = holiMemberPhone;
                                      })
                                    );
                                  }}
                                  placeholder="מספר טלפון"
                                  value={p.holiMemberPhone}
                                  type="string"
                                  disabled={!(user.admin === "3" || user.admin === "0")}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Button
                            type="button"
                            onClick={() => {
                              setholi_groups((currentSpec) =>
                                currentSpec.filter((x) => x.id !== p.id)
                              );
                            }}
                            disabled={!(user.admin === "3" || user.admin === "0")}
                          >
                            <Icon>delete</Icon>
                          </Button>
                        </div>
                      ))
                    )}
                    <Row>
                      <Col
                        style={{
                          justifyContent: "right",
                          alignContent: "right",
                          marginTop: "1rem",
                          textAlign: "right",
                        }}
                      >
                        <h6 style={{}}>הערות</h6>
                        <Input
                          placeholder="הערות"
                          type="textarea"
                          name="note"
                          value={reportData.note}
                          onChange={handleChange}
                          disabled={!(user.admin === "3" || user.admin === "0")}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                ) : null}
                <Row>
                  <Col>
                    <div style={{ paddingRight: "200px" }}>
                      <MDButton
                        color="success"
                        size="large"
                        onClick={onSubmit}
                        className="btn-new-blue"
                        type="submit"
                        startIcon={<Icon fontSize="small">done</Icon>}
                      >
                        שמור שינויים
                      </MDButton>
                    </div>
                  </Col>
                  <Col>
                    <div style={{ paddingLeft: "200px" }}>
                      <MDButton
                        color="error"
                        size="large"
                        className="btn-new-blue"
                        startIcon={<Icon fontSize="small">clear</Icon>}
                        onClick={() => navigate(-1)}
                      >
                        אל תשמור שינויים
                      </MDButton>
                    </div>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
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

        {holiyaRequestFormDB()}
      </MDBox>
      <Footer />
      <Outlet />
    </DashboardLayout>
  );
}
