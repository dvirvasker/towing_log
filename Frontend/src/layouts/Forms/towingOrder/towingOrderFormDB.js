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
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

// TODO check mult-files
// Material Dashboard 2 React components
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useParams, useNavigate } from "react-router-dom";
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

const TowingOrderFormDB = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [archiveData, setArchiveData] = useState([]);
  const [checkData, setCheckData] = useState("update");
  const [carData, setCarData] = useState([]);
  const [carTypesData, setCarTypesData] = useState([]);
  const [garagesData, setGaragesData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [bankData, setBankData] = useState({});
  const [pikods, setPikods] = useState([]);
  const [ogdas, setOgdas] = useState([]);
  const [hativas, setHativas] = useState([]);
  const [gdods, setGdods] = useState([]);

  const [chosenPikod, setChosenPikod] = useState("בחר");
  const [chosenOgda, setChosenOgda] = useState("בחר");
  const [chosenHativa, setChosenHativa] = useState("בחר");
  const [chosenGdod, setChosenGdod] = useState("בחר");
  const date = new Date().toISOString().split("T")[0];
  // const [htivas, setHtivas]

  const [data, setData] = useState({
    clientJourney: [],
    erorrInfo: [],
  });
  const carDataInfoArray = [];
  const filteredOgdas = ogdas.filter((ogda) => ogda.pikodId === chosenPikod);
  const filteredHativas = hativas.filter((hativa) => hativa.ogdaId === chosenOgda);
  const filteredGdods = gdods.filter((gdod) => gdod.hativaId === chosenHativa);

  // useEffect(() => {
  //   setChosenCarNumber(data.carnumber);
  // }, [data]);

  // console.log(data);

  const min = 0;
  const max = 100;

  function handleChange(evt) {
    // console.log(evt);
    const { value } = evt.target;

    if (evt.target.name === "orderDate" || evt.target.name === "transferOrderDate") {
      if (value < new Date()) {
        toast.error("אין לבחור תאריך עבר");
      }
    }

    setData({ ...data, [evt.target.name]: value });
    console.log(value);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/get_banks`)
      .then((response) => {
        setBankData(response.data.data);
        setPikods(
          Object.entries(response.data.data.Unit_bank.pikods).map(([key, value]) => ({
            ...value,
            id: key,
          }))
        );
        setOgdas(
          Object.entries(response.data.data.Unit_bank.ogdas).map(([key, value]) => ({
            ...value,
            id: key,
          }))
        );
        setHativas(
          Object.entries(response.data.data.Unit_bank.hativas).map(([key, value]) => ({
            ...value,
            id: key,
          }))
        );
        setGdods(
          Object.entries(response.data.data.Unit_bank.gdods).map(([key, value]) => ({
            ...value,
            id: key,
          }))
        );
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/CarDatas`)
      .then((response) => {
        response.data.forEach((carDataInfo) => {
          const gdod = bankData.Unit_bank.gdods[carDataInfo.gdodId];
          carDataInfo.gdodName = gdod.name;
          carDataInfo.hativaId = gdod.hativaId;
          const hativa = bankData.Unit_bank.hativas[carDataInfo.hativaId];
          carDataInfo.hativaName = hativa.name;
          carDataInfo.ogdaId = hativa.ogdaId;
          const ogda = bankData.Unit_bank.ogdas[carDataInfo.ogdaId];
          carDataInfo.ogdaName = ogda.name;
          carDataInfo.pikodId = ogda.pikodId;
          const pikod = bankData.Unit_bank.pikods[carDataInfo.pikodId];
          carDataInfo.pikodName = pikod.name;
          // console.log(carDataInfo);
        });
        setCarData(response.data);
      })
      .catch((error) => {});
  }, [bankData]);

  useEffect(() => {
    function sortArrayByHebrewAlphabet(array) {
      return array.sort((a, b) =>
        a.garageName.localeCompare(b.garageName, "he", { sensitivity: "base" })
      );
    }

    axios
      .get(`http://localhost:5000/TowingLogApi/Garages`)
      .then((response) => {
        const garagesArray = response.data;
        const sorted = sortArrayByHebrewAlphabet(garagesArray);
        setGaragesData(sorted);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/CarTypes`)
      .then((response) => {
        setCarTypesData(response.data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/TowingOrder`)
      .then((response) => {
        setOrdersData(response.data);
      })
      .catch((error) => {});
  }, []);

  useEffect(async () => {
    await axios
      .get(`http://localhost:5000/TowingLogApi/TowingOrder/${params.id}`)
      .then((response) => {
        delete response.data.updatedAt;
        delete response.data.__v;
        delete response.data._id;
        delete response.data.createdAt;

        const fixedDate = response.data.orderDate.split("T")[0];
        response.data.orderDate = fixedDate;
        const fixedDemandDate = response.data.demandDate.split("T")[0];
        response.data.demandDate = fixedDemandDate;
        const fixedTransferOrderDate = response.data.transferOrderDate.split("T")[0];
        response.data.transferOrderDate = fixedTransferOrderDate;

        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {});
  }, []);

  function setChosenCarNumber(value) {
    const carNumber = value;
    console.log(carNumber);
    carDataInfoArray.push(carData.filter((el) => el.carnumber === carNumber));
    console.log(carData);
    if (carDataInfoArray[0][0]) {
      setChosenPikod(carDataInfoArray[0][0].pikodId);
      setChosenOgda(carDataInfoArray[0][0].ogdaId);
      setChosenHativa(carDataInfoArray[0][0].hativaId);
      setChosenGdod(carDataInfoArray[0][0].gdodId);
      setData((prev) => ({ ...prev, a: carDataInfoArray[0][0].carTypeId }));
      const carType = carTypesData.filter(
        (element) => element._id === carDataInfoArray[0][0].carTypeId
      );
      setData((prev) => ({ ...prev, weight: carType[0].weight }));
    } else {
      toast.error("צ' לא קיים");
      setData((prev) => ({ ...data, carnumber: "" }));
    }
  }

  useEffect(async () => {
    if (carData.length > 0) {
      setChosenCarNumber(data.carnumber);
    }
  }, [carData]);

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
  function isValidIsraeliPhoneNumber(phoneNumber) {
    // Remove any non-digit characters from the input
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    // Check if the cleaned phone number matches either format
    const isValidFormat = /^05\d{8}$|^05\d{1}-\d{7}$/.test(cleanedPhoneNumber);

    return isValidFormat;
  }
  const CheckFormData = () => {
    let flag = true;
    const ErrorReason = [];
    const AddError = (error) => {
      flag = false;
      ErrorReason.push(error);
    };
    if (!data.orderDate) {
      AddError("תאריך ריק");
    }
    if (!data.orderTime || data.orderDate === "") {
      AddError("שעה ריקה");
    }
    if (data.serviceName === "") {
      AddError("שם נציג שירות ריק");
    }
    if (data.carnumber === "") {
      AddError("צ' ריק");
    } else if (!(digitsOnly(data.carnumber) && data.carnumber.length <= 9)) {
      AddError("צ' לא תקין");
    }
    // if (data.erorrInfo.length === 0) {
    //   AddError("לא רשומה סיבת תקלה");
    // }
    if (data.erorrInfo.includes("אחר")) {
      if (data.errInfoOther.trim() === "") {
        AddError("הערות ריק");
      }
    }
    if (data.garage === "" || data.garage === "בחר") {
      AddError("מוסך ריק");
    }
    if (data.garage === "אחר" && data.garageOther.trim() === "") {
      AddError("מוסך ריק (אחר)");
    }
    if (!isValidIsraeliPhoneNumber(data.phoneNumber)) {
      AddError("מספר טלפון לא תקין");
    }
    if (!isValidIsraeliPhoneNumber(data.otherPhoneNumber)) {
      AddError("מספר טלפון נוסף לא תקין");
    }

    // if (data.location.trim === "") {
    //   AddError("מיקום ריק");
    // }
    // if (data.garage === "" || data.garage === "בחר") {
    //   AddError("לגרור ל, ריק");
    // }
    // if (data.fullName.trim() === "") {
    //   AddError("שם מלא ריק");
    // }
    // if (!data.phoneNumber.length)
    if (flag !== true) {
      // if (data.personalnumber === "" || data.personalnumber === undefined) {
      //   flag = false;
      //   ErrorReason.push("מספר אישי ריק");
      // }

      ErrorReason.forEach((reason) => {
        toast.error(reason);
        return false;
      });
    } else {
      console.log("Valid");
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
      clientJourney: data.clientJourney.map((post) => ({ ...post, published: true })),
      carnumber: data.carnumber,
      erorrInfo: data.erorrInfo,
      errInfoOther: data.errInfoOther,
      location: data.location,
      garage: data.garage !== "אחר" ? data.garage : data.garageOther,
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
    console.log(requestData);

    axios
      .post(`http://localhost:5000/TowingLogApi/TowingOrder/update/${params.id}`, requestData)
      .then((response) => {
        // toast.success(`הטופס נשלח בהצלחה`);
        console.log(response.data);
        setData({
          ...data,
          loading: false,
          error: false,
          successmsg: true,
          NavigateToReferrer: false,
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
      return <Navigate to="/towingorders" />;
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
        <MDTypography variant="h2" fontWeight="medium" color="white" mt={1}>
          הזמנה {data.reference} עודכנה בהצלחה
        </MDTypography>

        <DialogContent>
          <MDButton
            color="white"
            size="large"
            variant="outlined"
            onClick={() => {
              setData({
                ...data,
                successmsg: false,
                NavigateToReferrer: true,
              });
            }}
            className="btn-new-blue"
          >
            סגור
          </MDButton>
        </DialogContent>
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
    if (evt.target.checked) {
      errorInfo.push(evt.target.value);
      setData((prev) => ({ ...prev, [evt.target.name]: errorInfo }));
    } else {
      const index = errorInfo.indexOf(evt.target.value);
      errorInfo.splice(index, 1);
      // console.log(filtered);
      setData((prev) => ({ ...prev, [evt.target.name]: errorInfo }));
    }
  };

  const errorInput = (val) => (
    <div style={{ display: "flex" }}>
      <Input
        style={{ marginLeft: "5px" }}
        type="checkbox"
        name="erorrInfo"
        value={val}
        checked={data.erorrInfo.includes(val)}
        onClick={toggleError}
      />
      <p>{val}</p>
    </div>
  );

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
    "אחר",
  ];
  console.log("מערך סיבות טעות");
  console.log(data.erorrInfo);

  const SearchCarNumber = (carNumber) => {
    console.log(ordersData);
    const existing = ordersData.filter(
      (orderData) =>
        orderData.carnumber === carNumber &&
        (orderData.status === "פתוח" || orderData.status === "מוקפא")
    );
    if (existing.length === 0) {
      if (carNumber.trim() !== "") {
        setChosenCarNumber(carNumber);
      }
    } else {
      toast.error(
        `שים לב ישנה הזמנה ${
          existing[0].status === "פתוח" ? "פתוחה" : "מוקפאת"
        } עם הצ' זה - אסמכתא : ${existing[0].reference}`
      );
    }
  };

  const towingOrderForm = () => (
    <Container className="" dir="rtl">
      <Row className="justify-content-center">
        <Col lg="10" md="10">
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
                  טופס הזמנת גרירה
                </MDTypography>
                <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
                  {data.reference}
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
                        min={date}
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
                        disabled={!(user.admin === "0" || user.admin === "2")}
                      />
                    </FormGroup>
                  </Col>
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
                          maxLength={8}
                        />
                        <MDButton
                          variant="gradient"
                          color="info"
                          iconOnly
                          onClick={() => {
                            SearchCarNumber(data.carnumber);
                          }}
                        >
                          <Icon>search</Icon>
                        </MDButton>
                      </div>
                    </FormGroup>
                  </Col>

                  {/* <Col>
                    <FormGroup>
                      <h6 style={{}}>יחידה</h6>
                      <Input
                        placeholder="יחידה"
                        type="text"
                        name="unit"
                        value={data.unit}
                        onChange={handleChange}
                        // disabled={data.carnumber.trim() === ""}
                      />
                    </FormGroup>
                  </Col> */}
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>סוג רכב נגרר</h6>
                      <Input
                        placeholder="סוג רכב נגרר"
                        type="select"
                        name="a"
                        value={data.a}
                        onChange={handleChange}
                        disabled={true}
                      >
                        <option value="בחר">בחר</option>
                        {carTypesData.map((carType) => (
                          <>
                            <option value={carType._id}>{carType.carType}</option>
                          </>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>משקל מילוי אוטומטי</h6>
                      <Input
                        placeholder="משקל מילוי אוטומטי"
                        type="text"
                        name="weight"
                        value={data.weight}
                        onChange={handleChange}
                        disabled={true}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <h6>פיקוד</h6>
                      <Input
                        placeholder="פיקוד"
                        type="select"
                        name="pikod"
                        value={chosenPikod}
                        onChange={(evt) => {
                          setChosenPikod(evt.target.value);
                        }}
                        disabled={chosenOgda !== "בחר"}
                      >
                        <option value="בחר">בחר</option>
                        {pikods.map((pikod) => (
                          <>
                            <option value={pikod.id}>{pikod.name}</option>
                          </>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup>
                      <h6>אוגדה</h6>
                      <Input
                        placeholder="אוגדה"
                        type="select"
                        name="ogda"
                        value={chosenOgda}
                        onChange={(evt) => {
                          setChosenOgda(evt.target.value);
                        }}
                        disabled={chosenHativa !== "בחר" || chosenPikod === "בחר"}
                      >
                        <option value="בחר">בחר</option>
                        {filteredOgdas.map((ogda) => (
                          <>
                            <option value={ogda.id}>{ogda.name}</option>
                          </>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup>
                      <h6>חטיבה</h6>
                      <Input
                        placeholder="חטיבה"
                        type="select"
                        name="hativa"
                        value={chosenHativa}
                        onChange={(evt) => {
                          setChosenHativa(evt.target.value);
                        }}
                        disabled={chosenGdod !== "בחר" || chosenOgda === "בחר"}
                      >
                        <option value="בחר">בחר</option>
                        {filteredHativas.map((hativa) => (
                          <>
                            <option value={hativa.id}>{hativa.name}</option>
                          </>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup>
                      <h6>גדוד</h6>
                      <Input
                        placeholder="גדוד"
                        type="select"
                        name="gdod"
                        value={chosenGdod}
                        onChange={(evt) => {
                          setChosenGdod(evt.target.value);
                        }}
                        disabled={chosenHativa === "בחר"}
                      >
                        <option value="בחר">בחר</option>
                        {filteredGdods.map((gdod) => (
                          <>
                            <option value={gdod.id}>{gdod.name}</option>
                          </>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>מהות התקלה</h6>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      {errorResArr.map((res) => errorInput(res))}
                      {data.erorrInfo.includes("אחר") && (
                        <>
                          <p>הערות: </p>
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
                            </Col>
                          </Row>
                        </>
                      )}
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
                        type="select"
                        name="garage"
                        value={data.garage}
                        onChange={handleChange}
                      >
                        <option value="בחר">בחר</option>
                        {garagesData.map((garage) => (
                          <option value={garage._id}>{garage.garageName}</option>
                        ))}
                        <option value="אחר">אחר</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                {data.garage === "אחר" && (
                  <Row>
                    <Col />
                    <Col>
                      <FormGroup>
                        <h6>מיקום גרירה</h6>
                        <Input
                          placeholder="מיקום גרירה"
                          type="string"
                          name="garageOther"
                          value={data.garageOther}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                )}
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
                        min={date}
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
                        <option value="חברה אזרחית - גרירה">חברה אזרחית - גרירה</option>
                        <option value="חברה אזרחית – ניידת שירות">חברה אזרחית – ניידת שירות</option>
                        <option value="צבאי">צבאי</option>
                        <option value="מוביל כננת">מוביל כננת</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                {(data.executiveBody === "חברה אזרחית - גרירה" ||
                  data.executiveBody === "חברה אזרחית – ניידת שירות") && (
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
                        <option value="צפון">צפון</option>
                        <option value="דרום">דרום</option>
                        <option value="מרכז">מרכז</option>
                        <option value="הערבה">הערבה</option>
                        <option value="איו''ש">איוש</option>
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
                        <option value="פתוח">פתוח</option>
                        <option value="סגור">סגור</option>
                        <option value="מבוטל">מבוטל</option>
                        <option value="מוקפא">מוקפא</option>
                        <option value="ממתין לאישור">ממתין לאישור</option>{" "}
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
                        disabled={user.admin !== "0"}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-center">
                      <MDButton
                        color="mekatnar"
                        size="large"
                        onClick={onSubmit}
                        className="btn-new-blue"
                        type="submit"
                        style={{ marginLeft: "3%" }}
                      >
                        עדכן טופס גרירה
                        <Icon fontSize="small">check</Icon>&nbsp;
                      </MDButton>
                      <MDButton
                        color="error"
                        size="large"
                        onClick={() => navigate(-1)}
                        className="btn-new-blue"
                        style={{ marginRight: "3%" }}
                      >
                        צא ללא שינויים
                        <Icon fontSize="small">clear</Icon>&nbsp;
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

        {towingOrderForm()}
      </MDBox>
      <Footer />
      <Outlet />
    </DashboardLayout>
  );
};

export default TowingOrderFormDB;
