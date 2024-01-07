/* eslint-disable react/self-closing-comp */
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

export default function DamagedtoolsForm() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [file, setFile] = useState([]);
  const [pikods, setPikods] = useState([]);
  const [classReportDB, setClassReportDB] = useState([]);
  const [classReportForSelect, setClassReportForSelect] = useState([]);

  const [data, setData] = useState({
    c4_trained: 0,
    c4_treatment: 0,
    c4_shutdown: 0,
    c4_rescue: 0,

    c3_trained: 0,
    c3_treatment: 0,
    c3_shutdown: 0,
    c3_rescue: 0,

    malar_trained: 0,
    malar_treatment: 0,
    malar_shutdown: 0,
    malar_rescue: 0,

    namer_trained: 0,
    namer_treatment: 0,
    namer_shutdown: 0,
    namer_rescue: 0,

    zma_trained: 0,
    zma_treatment: 0,
    zma_shutdown: 0,
    zma_rescue: 0,

    hasz_trained: 0,
    hasz_treatment: 0,
    hasz_shutdown: 0,
    hasz_rescue: 0,

    nagmash_trained: 0,
    nagmash_treatment: 0,
    nagmash_shutdown: 0,
    nagmash_rescue: 0,

    until_timron_tank_trained: 0,
    until_timron_tank_left: 0,

    until_timron_malar_trained: 0,
    until_timron_malar_left: 0,

    until_timron_namer_trained: 0,
    until_timron_namer_left: 0,

    until_timron_dahfor_trained: 0,
    until_timron_dahfor_left: 0,

    until_timron_hasz_trained: 0,
    until_timron_hasz_left: 0,

    from_timron_tank_trained: 0,
    from_timron_tank_left: 0,

    from_timron_malar_trained: 0,
    from_timron_malar_left: 0,

    from_timron_namer_trained: 0,
    from_timron_namer_left: 0,

    from_timron_dahfor_trained: 0,
    from_timron_dahfor_left: 0,

    from_timron_hasz_trained: 0,
    from_timron_hasz_left: 0,

    tank_fix: 0,
    tank_till_weeks: 0,
    tank_till_month: 0,
    tank_up_month: 0,
    tank_long_fix: 0,

    malar_fix: 0,
    malar_till_weeks: 0,
    malar_till_month: 0,
    malar_up_month: 0,
    malar_long_fix: 0,

    namer_fix: 0,
    namer_till_weeks: 0,
    namer_till_month: 0,
    namer_up_month: 0,
    namer_long_fix: 0,

    dahfor_fix: 0,
    dahfor_till_weeks: 0,
    dahfor_till_month: 0,
    dahfor_up_month: 0,
    dahfor_long_fix: 0,

    hasz_fix: 0,
    hasz_till_weeks: 0,
    hasz_till_month: 0,
    hasz_up_month: 0,
    hasz_long_fix: 0,

    pikod_fix: 0,
    pikod_till_weeks: 0,
    pikod_till_month: 0,
    pikod_up_month: 0,
    pikod_long_fix: 0,

    egad_fix: 0,
    egad_till_weeks: 0,
    egad_till_month: 0,
    egad_up_month: 0,
    egad_long_fix: 0,

    masha_fix: 0,
    masha_till_weeks: 0,
    masha_till_month: 0,
    masha_up_month: 0,
    masha_long_fix: 0,

    katrapiler_fix: 0,
    katrapiler_till_weeks: 0,
    katrapiler_till_month: 0,
    katrapiler_up_month: 0,
    katrapiler_long_fix: 0,

    nt_trained: 0,
    nt_treatment: 0,
    nt_shutdown: 0,

    mtan_trained: 0,
    mtan_treatment: 0,
    mtan_shutdown: 0,

    pazmar_trained: 0,
    pazmar_treatment: 0,
    pazmar_shutdown: 0,

    fire_trained: 0,
    fire_treatment: 0,
    fire_shutdown: 0,

    reversal_trained: 0,
    reversal_treatment: 0,
    reversal_shutdown: 0,

    other_trained: 0,
    other_treatment: 0,
    other_shutdown: 0,

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

  function handleChange(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    SendFormData(event);
    SendarchiveFormData(event);
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
      c4_trained: data.c4_trained,
      c4_treatment: data.c4_treatment,
      c4_shutdown: data.c4_shutdown,
      c4_rescue: data.c4_rescue,

      c3_trained: data.c3_trained,
      c3_treatment: data.c3_treatment,
      c3_shutdown: data.c3_shutdown,
      c3_rescue: data.c3_rescue,

      malar_trained: data.malar_trained,
      malar_treatment: data.malar_treatment,
      malar_shutdown: data.malar_shutdown,
      malar_rescue: data.malar_rescue,

      namer_trained: data.namer_trained,
      namer_treatment: data.namer_treatment,
      namer_shutdown: data.namer_shutdown,
      namer_rescue: data.namer_rescue,

      zma_trained: data.zma_trained,
      zma_treatment: data.zma_treatment,
      zma_shutdown: data.zma_shutdown,
      zma_rescue: data.zma_rescue,

      hasz_trained: data.hasz_trained,
      hasz_treatment: data.hasz_treatment,
      hasz_shutdown: data.hasz_shutdown,
      hasz_rescue: data.hasz_rescue,

      nagmash_trained: data.nagmash_trained,
      nagmash_treatment: data.nagmash_treatment,
      nagmash_shutdown: data.nagmash_shutdown,
      nagmash_rescue: data.nagmash_rescue,

      until_timron_tank_trained: data.until_timron_tank_trained,
      until_timron_tank_left: data.until_timron_tank_left,

      until_timron_malar_trained: data.until_timron_malar_trained,
      until_timron_malar_left: data.until_timron_malar_left,

      until_timron_namer_trained: data.until_timron_namer_trained,
      until_timron_namer_left: data.until_timron_namer_left,

      until_timron_dahfor_trained: data.until_timron_dahfor_trained,
      until_timron_dahfor_left: data.until_timron_dahfor_left,

      until_timron_hasz_trained: data.until_timron_hasz_trained,
      until_timron_hasz_left: data.until_timron_hasz_left,

      from_timron_tank_trained: data.from_timron_tank_trained,
      from_timron_tank_left: data.from_timron_tank_left,

      from_timron_malar_trained: data.from_timron_malar_trained,
      from_timron_malar_left: data.from_timron_malar_left,

      from_timron_namer_trained: data.from_timron_namer_trained,
      from_timron_namer_left: data.from_timron_namer_left,

      from_timron_dahfor_trained: data.from_timron_dahfor_trained,
      from_timron_dahfor_left: data.from_timron_dahfor_left,

      from_timron_hasz_trained: data.from_timron_hasz_trained,
      from_timron_hasz_left: data.from_timron_hasz_left,

      tank_fix: data.tank_fix,
      tank_till_weeks: data.tank_till_weeks,
      tank_till_month: data.tank_till_month,
      tank_up_month: data.tank_up_month,
      tank_long_fix: data.tank_long_fix,

      malar_fix: data.malar_fix,
      malar_till_weeks: data.malar_till_weeks,
      malar_till_month: data.malar_till_month,
      malar_up_month: data.malar_up_month,
      malar_long_fix: data.malar_long_fix,

      namer_fix: data.namer_fix,
      namer_till_weeks: data.namer_till_weeks,
      namer_till_month: data.namer_till_month,
      namer_up_month: data.namer_up_month,
      namer_long_fix: data.namer_long_fix,

      dahfor_fix: data.dahfor_fix,
      dahfor_till_weeks: data.dahfor_till_weeks,
      dahfor_till_month: data.dahfor_till_month,
      dahfor_up_month: data.dahfor_up_month,
      dahfor_long_fix: data.dahfor_long_fix,

      hasz_fix: data.hasz_fix,
      hasz_till_weeks: data.hasz_till_weeks,
      hasz_till_month: data.hasz_till_month,
      hasz_up_month: data.hasz_up_month,
      hasz_long_fix: data.hasz_long_fix,

      pikod_fix: data.pikod_fix,
      pikod_till_weeks: data.pikod_till_weeks,
      pikod_till_month: data.pikod_till_month,
      pikod_up_month: data.pikod_up_month,
      pikod_long_fix: data.pikod_long_fix,

      egad_fix: data.egad_fix,
      egad_till_weeks: data.egad_till_weeks,
      egad_till_month: data.egad_till_month,
      egad_up_month: data.egad_up_month,
      egad_long_fix: data.egad_long_fix,

      masha_fix: data.masha_fix,
      masha_till_weeks: data.masha_till_weeks,
      masha_till_month: data.masha_till_month,
      masha_up_month: data.masha_up_month,
      masha_long_fix: data.masha_long_fix,

      katrapiler_fix: data.katrapiler_fix,
      katrapiler_till_weeks: data.katrapiler_till_weeks,
      katrapiler_till_month: data.katrapiler_till_month,
      katrapiler_up_month: data.katrapiler_up_month,
      katrapiler_long_fix: data.katrapiler_long_fix,

      nt_trained: data.nt_trained,
      nt_treatment: data.nt_treatment,
      nt_shutdown: data.nt_shutdown,

      mtan_trained: data.mtan_trained,
      mtan_treatment: data.mtan_treatment,
      mtan_shutdown: data.mtan_shutdown,

      pazmar_trained: data.pazmar_trained,
      pazmar_treatment: data.pazmar_treatment,
      pazmar_shutdown: data.pazmar_shutdown,

      fire_trained: data.fire_trained,
      fire_treatment: data.fire_treatment,
      fire_shutdown: data.fire_shutdown,

      reversal_trained: data.reversal_trained,
      reversal_treatment: data.reversal_treatment,
      reversal_shutdown: data.reversal_shutdown,

      other_trained: data.other_trained,
      other_treatment: data.other_treatment,
      other_shutdown: data.other_shutdown,
    };

    console.log(requestData);
    axios
      .post(`http://localhost:5000/TowingLogApi/damagedtools/add`, requestData)
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

  const SendarchiveFormData = (event) => {
    event.preventDefault();
    setData({
      ...data,
      loading: true,
      successmsg: false,
      error: false,
      NavigateToReferrer: false,
    });
    const archiverequestData = {
      personalnumber: user.personalnumber,

      c4_trained: data.c4_trained,
      c4_treatment: data.c4_treatment,
      c4_shutdown: data.c4_shutdown,
      c4_rescue: data.c4_rescue,

      c3_trained: data.c3_trained,
      c3_treatment: data.c3_treatment,
      c3_shutdown: data.c3_shutdown,
      c3_rescue: data.c3_rescue,

      malar_trained: data.malar_trained,
      malar_treatment: data.malar_treatment,
      malar_shutdown: data.malar_shutdown,
      malar_rescue: data.malar_rescue,

      namer_trained: data.namer_trained,
      namer_treatment: data.namer_treatment,
      namer_shutdown: data.namer_shutdown,
      namer_rescue: data.namer_rescue,

      zma_trained: data.zma_trained,
      zma_treatment: data.zma_treatment,
      zma_shutdown: data.zma_shutdown,
      zma_rescue: data.zma_rescue,

      hasz_trained: data.hasz_trained,
      hasz_treatment: data.hasz_treatment,
      hasz_shutdown: data.hasz_shutdown,
      hasz_rescue: data.hasz_rescue,

      nagmash_trained: data.nagmash_trained,
      nagmash_treatment: data.nagmash_treatment,
      nagmash_shutdown: data.nagmash_shutdown,
      nagmash_rescue: data.nagmash_rescue,

      until_timron_tank_trained: data.until_timron_tank_trained,
      until_timron_tank_left: data.until_timron_tank_left,

      until_timron_malar_trained: data.until_timron_malar_trained,
      until_timron_malar_left: data.until_timron_malar_left,

      until_timron_namer_trained: data.until_timron_namer_trained,
      until_timron_namer_left: data.until_timron_namer_left,

      until_timron_dahfor_trained: data.until_timron_dahfor_trained,
      until_timron_dahfor_left: data.until_timron_dahfor_left,

      until_timron_hasz_trained: data.until_timron_hasz_trained,
      until_timron_hasz_left: data.until_timron_hasz_left,

      from_timron_tank_trained: data.from_timron_tank_trained,
      from_timron_tank_left: data.from_timron_tank_left,

      from_timron_malar_trained: data.from_timron_malar_trained,
      from_timron_malar_left: data.from_timron_malar_left,

      from_timron_namer_trained: data.from_timron_namer_trained,
      from_timron_namer_left: data.from_timron_namer_left,

      from_timron_dahfor_trained: data.from_timron_dahfor_trained,
      from_timron_dahfor_left: data.from_timron_dahfor_left,

      from_timron_hasz_trained: data.from_timron_hasz_trained,
      from_timron_hasz_left: data.from_timron_hasz_left,

      tank_fix: data.tank_fix,
      tank_till_weeks: data.tank_till_weeks,
      tank_till_month: data.tank_till_month,
      tank_up_month: data.tank_up_month,
      tank_long_fix: data.tank_long_fix,

      malar_fix: data.malar_fix,
      malar_till_weeks: data.malar_till_weeks,
      malar_till_month: data.malar_till_month,
      malar_up_month: data.malar_up_month,
      malar_long_fix: data.malar_long_fix,

      namer_fix: data.namer_fix,
      namer_till_weeks: data.namer_till_weeks,
      namer_till_month: data.namer_till_month,
      namer_up_month: data.namer_up_month,
      namer_long_fix: data.namer_long_fix,

      dahfor_fix: data.dahfor_fix,
      dahfor_till_weeks: data.dahfor_till_weeks,
      dahfor_till_month: data.dahfor_till_month,
      dahfor_up_month: data.dahfor_up_month,
      dahfor_long_fix: data.dahfor_long_fix,

      hasz_fix: data.hasz_fix,
      hasz_till_weeks: data.hasz_till_weeks,
      hasz_till_month: data.hasz_till_month,
      hasz_up_month: data.hasz_up_month,
      hasz_long_fix: data.hasz_long_fix,

      pikod_fix: data.pikod_fix,
      pikod_till_weeks: data.pikod_till_weeks,
      pikod_till_month: data.pikod_till_month,
      pikod_up_month: data.pikod_up_month,
      pikod_long_fix: data.pikod_long_fix,

      egad_fix: data.egad_fix,
      egad_till_weeks: data.egad_till_weeks,
      egad_till_month: data.egad_till_month,
      egad_up_month: data.egad_up_month,
      egad_long_fix: data.egad_long_fix,

      masha_fix: data.masha_fix,
      masha_till_weeks: data.masha_till_weeks,
      masha_till_month: data.masha_till_month,
      masha_up_month: data.masha_up_month,
      masha_long_fix: data.masha_long_fix,

      katrapiler_fix: data.katrapiler_fix,
      katrapiler_till_weeks: data.katrapiler_till_weeks,
      katrapiler_till_month: data.katrapiler_till_month,
      katrapiler_up_month: data.katrapiler_up_month,
      katrapiler_long_fix: data.katrapiler_long_fix,

      nt_trained: data.nt_trained,
      nt_treatment: data.nt_treatment,
      nt_shutdown: data.nt_shutdown,

      mtan_trained: data.mtan_trained,
      mtan_treatment: data.mtan_treatment,
      mtan_shutdown: data.mtan_shutdown,

      pazmar_trained: data.pazmar_trained,
      pazmar_treatment: data.pazmar_treatment,
      pazmar_shutdown: data.pazmar_shutdown,

      fire_trained: data.fire_trained,
      fire_treatment: data.fire_treatment,
      fire_shutdown: data.fire_shutdown,

      reversal_trained: data.reversal_trained,
      reversal_treatment: data.reversal_treatment,
      reversal_shutdown: data.reversal_shutdown,

      other_trained: data.other_trained,
      other_treatment: data.other_treatment,
      other_shutdown: data.other_shutdown,
    };

    console.log(archiverequestData);
    axios
      .post(`http://localhost:5000/TowingLogApi/archiveddamagedtools/add`, archiverequestData)
      .then((response) => {
        setData({
          ...data,
          loading: false,
          error: false,
          successmsg: true,
          NavigateToReferrer: true,
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
          טופס כלים פגועים עודכן{" "}
        </MDTypography>
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

  const handleCloseSuccsecModal = () => {
    setData({ ...data, loading: false, error: false, successmsg: false, NavigateToReferrer: true });
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
  const handleCloseLoadingModal = () => {
    setData({ ...data, loading: false });
  };

  const NavigateUser = () => {
    if (data.NavigateToReferrer) {
      window.location.href = window.location.href;
      return <Navigate to="/damegedTools" />;
    }
  };

  const damagedtoolsForm = () => (
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
                  טופס כלים פגועים{" "}
                </MDTypography>
              </MDBox>
              <Form style={{ textAlign: "right" }} role="form">
                <div
                  tag="h4"
                  style={{
                    direction: "rtl",
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingTop: "20px",
                    paddingBottom: "10px",
                  }}
                >
                  <p style={{ fontSize: 18 }}>שחיקה מבצעית</p>
                </div>
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
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>הוכשרו</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>בטיפול</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>הושבתו</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>טרם חולצו</h6>
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>סימן 4</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="c4_trained"
                        value={data.c4_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="c4_treatment"
                        value={data.c4_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="c4_shutdown"
                        value={data.c4_shutdown}
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
                        placeholder="טרם חולצו"
                        type="number"
                        min={0}
                        name="c4_rescue"
                        value={data.c4_rescue}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>סימן 3</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="c3_trained"
                        value={data.c3_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="c3_treatment"
                        value={data.c3_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="c3_shutdown"
                        value={data.c3_shutdown}
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
                        placeholder="טרם חולצו"
                        type="number"
                        min={0}
                        name="c3_rescue"
                        value={data.c3_rescue}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>מלא"ר/גינס</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="malar_trained"
                        value={data.malar_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="malar_treatment"
                        value={data.malar_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="malar_shutdown"
                        value={data.malar_shutdown}
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
                        placeholder="טרם חולצו"
                        type="number"
                        min={0}
                        name="malar_rescue"
                        value={data.malar_rescue}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>נמר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="namer_trained"
                        value={data.namer_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="namer_treatment"
                        value={data.namer_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="namer_shutdown"
                        value={data.namer_shutdown}
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
                        placeholder="טרם חולצו"
                        type="number"
                        min={0}
                        name="namer_rescue"
                        value={data.namer_rescue}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>צמ"ה</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="zma_trained"
                        value={data.zma_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="zma_treatment"
                        value={data.zma_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="zma_shutdown"
                        value={data.zma_shutdown}
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
                        placeholder="טרם חולצו"
                        type="number"
                        min={0}
                        name="zma_rescue"
                        value={data.zma_rescue}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>חס"צ</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="hasz_trained"
                        value={data.hasz_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="hasz_treatment"
                        value={data.hasz_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="hasz_shutdown"
                        value={data.hasz_shutdown}
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
                        placeholder="טרם חולצו"
                        type="number"
                        min={0}
                        name="hasz_rescue"
                        value={data.hasz_rescue}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>נגמ"ש</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="nagmash_trained"
                        value={data.nagmash_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="nagmash_treatment"
                        value={data.nagmash_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="nagmash_shutdown"
                        value={data.nagmash_shutdown}
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
                        placeholder="טרם חולצו"
                        type="number"
                        min={0}
                        name="nagmash_rescue"
                        value={data.nagmash_rescue}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <div
                  tag="h4"
                  style={{
                    direction: "rtl",
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingTop: "20px",
                    paddingBottom: "10px",
                  }}
                >
                  <p style={{ fontSize: 18 }}>עד התמרון</p>
                </div>
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
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>הוכשר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>נותר</h6>
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>טנקים</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="until_timron_tank_trained"
                        value={data.until_timron_tank_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="until_timron_tank_left"
                        value={data.until_timron_tank_left}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>מלא"ר/גינס</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="until_timron_malar_trained"
                        value={data.until_timron_malar_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="until_timron_malar_left"
                        value={data.until_timron_malar_left}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>נמר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="until_timron_namer_trained"
                        value={data.until_timron_namer_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="until_timron_namer_left"
                        value={data.until_timron_namer_left}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>דחפור</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="until_timron_dahfor_trained"
                        value={data.until_timron_dahfor_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="until_timron_dahfor_left"
                        value={data.until_timron_dahfor_left}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>חס"צ</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="until_timron_hasz_trained"
                        value={data.until_timron_hasz_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="until_timron_hasz_left"
                        value={data.until_timron_hasz_left}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <div
                  tag="h4"
                  style={{
                    direction: "rtl",
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingTop: "20px",
                    paddingBottom: "10px",
                  }}
                >
                  <p style={{ fontSize: 18 }}>מתחילת התמרון</p>
                </div>
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
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>הוכשר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>נותר</h6>
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>טנקים</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="from_timron_tank_trained"
                        value={data.from_timron_tank_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="from_timron_tank_left"
                        value={data.from_timron_tank_left}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>מלא"ר/גינס</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="from_timron_malar_trained"
                        value={data.from_timron_malar_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="from_timron_malar_left"
                        value={data.from_timron_malar_left}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>נמר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="from_timron_namer_trained"
                        value={data.from_timron_namer_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="from_timron_namer_left"
                        value={data.from_timron_namer_left}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>דחפור</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="from_timron_dahfor_trained"
                        value={data.from_timron_dahfor_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="from_timron_dahfor_left"
                        value={data.from_timron_dahfor_left}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>חס"צ</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשר"
                        type="number"
                        min={0}
                        name="from_timron_hasz_trained"
                        value={data.from_timron_hasz_trained}
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
                        placeholder="נותר"
                        type="number"
                        min={0}
                        name="from_timron_hasz_left"
                        value={data.from_timron_hasz_left}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <div
                  tag="h4"
                  style={{
                    direction: "rtl",
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingTop: "20px",
                    paddingBottom: "10px",
                  }}
                >
                  <p style={{ fontSize: 18 }}>סוג רק"ם</p>
                </div>
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
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>תוקן</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>עד שבועיים</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>עד חודש</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>מעל חודש</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>תיקון ארוך</h6>
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>טנקים</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="תוקן"
                        type="number"
                        min={0}
                        name="tank_fix"
                        value={data.tank_fix}
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
                        placeholder="עד שבועיים"
                        type="number"
                        min={0}
                        name="tank_till_weeks"
                        value={data.tank_till_weeks}
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
                        placeholder="עד חודש"
                        type="number"
                        min={0}
                        name="tank_till_month"
                        value={data.tank_till_month}
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
                        placeholder="מעל חודש"
                        type="number"
                        min={0}
                        name="tank_up_month"
                        value={data.tank_up_month}
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
                        placeholder="תיקון ארוך"
                        type="number"
                        min={0}
                        name="tank_long_fix"
                        value={data.tank_long_fix}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>מלא"ר/גינס</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="תוקן"
                        type="number"
                        min={0}
                        name="malar_fix"
                        value={data.malar_fix}
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
                        placeholder="עד שבועיים"
                        type="number"
                        min={0}
                        name="malar_till_weeks"
                        value={data.malar_till_weeks}
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
                        placeholder="עד חודש"
                        type="number"
                        min={0}
                        name="malar_till_month"
                        value={data.malar_till_month}
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
                        placeholder="מעל חודש"
                        type="number"
                        min={0}
                        name="malar_up_month"
                        value={data.malar_up_month}
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
                        placeholder="תיקון ארוך"
                        type="number"
                        min={0}
                        name="malar_long_fix"
                        value={data.malar_long_fix}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>נמר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="תוקן"
                        type="number"
                        min={0}
                        name="namer_fix"
                        value={data.namer_fix}
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
                        placeholder="עד שבועיים"
                        type="number"
                        min={0}
                        name="namer_till_weeks"
                        value={data.namer_till_weeks}
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
                        placeholder="עד חודש"
                        type="number"
                        min={0}
                        name="namer_till_month"
                        value={data.namer_till_month}
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
                        placeholder="מעל חודש"
                        type="number"
                        min={0}
                        name="namer_up_month"
                        value={data.namer_up_month}
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
                        placeholder="תיקון ארוך"
                        type="number"
                        min={0}
                        name="namer_long_fix"
                        value={data.namer_long_fix}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>דחפור</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="תוקן"
                        type="number"
                        min={0}
                        name="dahfor_fix"
                        value={data.dahfor_fix}
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
                        placeholder="עד שבועיים"
                        type="number"
                        min={0}
                        name="dahfor_till_weeks"
                        value={data.dahfor_till_weeks}
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
                        placeholder="עד חודש"
                        type="number"
                        min={0}
                        name="dahfor_till_month"
                        value={data.dahfor_till_month}
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
                        placeholder="מעל חודש"
                        type="number"
                        min={0}
                        name="dahfor_up_month"
                        value={data.dahfor_up_month}
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
                        placeholder="תיקון ארוך"
                        type="number"
                        min={0}
                        name="dahfor_long_fix"
                        value={data.dahfor_long_fix}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>חס"צ</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="תוקן"
                        type="number"
                        min={0}
                        name="hasz_fix"
                        value={data.hasz_fix}
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
                        placeholder="עד שבועיים"
                        type="number"
                        min={0}
                        name="hasz_till_weeks"
                        value={data.hasz_till_weeks}
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
                        placeholder="עד חודש"
                        type="number"
                        min={0}
                        name="hasz_till_month"
                        value={data.hasz_till_month}
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
                        placeholder="מעל חודש"
                        type="number"
                        min={0}
                        name="hasz_up_month"
                        value={data.hasz_up_month}
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
                        placeholder="תיקון ארוך"
                        type="number"
                        min={0}
                        name="hasz_long_fix"
                        value={data.hasz_long_fix}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <div
                  tag="h4"
                  style={{
                    direction: "rtl",
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingTop: "20px",
                    paddingBottom: "10px",
                  }}
                >
                  <p style={{ fontSize: 18 }}>מיקום הרק"ם</p>
                </div>
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
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>תוקן</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>עד שבועיים</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>עד חודש</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>מעל חודש</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>תיקון ארוך</h6>
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>במרחב הפיקוד</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="תוקן"
                        type="number"
                        min={0}
                        name="pikod_fix"
                        value={data.pikod_fix}
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
                        placeholder="עד שבועיים"
                        type="number"
                        min={0}
                        name="pikod_till_weeks"
                        value={data.pikod_till_weeks}
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
                        placeholder="עד חודש"
                        type="number"
                        min={0}
                        name="pikod_till_month"
                        value={data.pikod_till_month}
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
                        placeholder="מעל חודש"
                        type="number"
                        min={0}
                        name="pikod_up_month"
                        value={data.pikod_up_month}
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
                        placeholder="תיקון ארוך"
                        type="number"
                        min={0}
                        name="pikod_long_fix"
                        value={data.pikod_long_fix}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>אגד</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="תוקן"
                        type="number"
                        min={0}
                        name="egad_fix"
                        value={data.egad_fix}
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
                        placeholder="עד שבועיים"
                        type="number"
                        min={0}
                        name="egad_till_weeks"
                        value={data.egad_till_weeks}
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
                        placeholder="עד חודש"
                        type="number"
                        min={0}
                        name="egad_till_month"
                        value={data.egad_till_month}
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
                        placeholder="מעל חודש"
                        type="number"
                        min={0}
                        name="egad_up_month"
                        value={data.egad_up_month}
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
                        placeholder="תיקון ארוך"
                        type="number"
                        min={0}
                        name="egad_long_fix"
                        value={data.egad_long_fix}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>מש"א</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="תוקן"
                        type="number"
                        min={0}
                        name="masha_fix"
                        value={data.masha_fix}
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
                        placeholder="עד שבועיים"
                        type="number"
                        min={0}
                        name="masha_till_weeks"
                        value={data.masha_till_weeks}
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
                        placeholder="עד חודש"
                        type="number"
                        min={0}
                        name="masha_till_month"
                        value={data.masha_till_month}
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
                        placeholder="מעל חודש"
                        type="number"
                        min={0}
                        name="masha_up_month"
                        value={data.masha_up_month}
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
                        placeholder="תיקון ארוך"
                        type="number"
                        min={0}
                        name="masha_long_fix"
                        value={data.masha_long_fix}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>קטרפילר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="תוקן"
                        type="number"
                        min={0}
                        name="katrapiler_fix"
                        value={data.katrapiler_fix}
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
                        placeholder="עד שבועיים"
                        type="number"
                        min={0}
                        name="katrapiler_till_weeks"
                        value={data.katrapiler_till_weeks}
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
                        placeholder="עד חודש"
                        type="number"
                        min={0}
                        name="katrapiler_till_month"
                        value={data.katrapiler_till_month}
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
                        placeholder="מעל חודש"
                        type="number"
                        min={0}
                        name="katrapiler_up_month"
                        value={data.katrapiler_up_month}
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
                        placeholder="תיקון ארוך"
                        type="number"
                        min={0}
                        name="katrapiler_long_fix"
                        value={data.katrapiler_long_fix}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <div
                  tag="h4"
                  style={{
                    direction: "rtl",
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingTop: "20px",
                    paddingBottom: "10px",
                  }}
                >
                  <p style={{ fontSize: 18 }}>שחיקה מבצעית</p>
                </div>
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
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>הוכשרו</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>בטיפול</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold" }}>הושבתו</h6>
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>פגיעת נ"ט</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="nt_trained"
                        value={data.nt_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="nt_treatment"
                        value={data.nt_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="nt_shutdown"
                        value={data.nt_shutdown}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>מטען</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="mtan_trained"
                        value={data.mtan_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="mtan_treatment"
                        value={data.mtan_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="mtan_shutdown"
                        value={data.mtan_shutdown}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>פצמ"ר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="pazmar_trained"
                        value={data.pazmar_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="pazmar_treatment"
                        value={data.pazmar_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="pazmar_shutdown"
                        value={data.pazmar_shutdown}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>שריפה</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="fire_trained"
                        value={data.fire_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="fire_treatment"
                        value={data.fire_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="fire_shutdown"
                        value={data.fire_shutdown}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>התהפכות</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="reversal_trained"
                        value={data.reversal_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="reversal_treatment"
                        value={data.reversal_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="reversal_shutdown"
                        value={data.reversal_shutdown}
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
                      <h6 style={{ fontWeight: "bold", paddingTop: "7px" }}>אחר</h6>
                    </Col>
                    <Col
                      style={{
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                      }}
                    >
                      <Input
                        placeholder="הוכשרו"
                        type="number"
                        min={0}
                        name="other_trained"
                        value={data.other_trained}
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
                        placeholder="בטיפול"
                        type="number"
                        min={0}
                        name="other_treatment"
                        value={data.other_treatment}
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
                        placeholder="הושבתו"
                        type="number"
                        min={0}
                        name="other_shutdown"
                        value={data.other_shutdown}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <div className="text-center" style={{ paddingTop: "20px" }}>
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
      {damagedtoolsForm()}
      <Outlet />
    </MDBox>
  );
}
