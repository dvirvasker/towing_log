/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint no-underscore-dangle: ["error", { "allow": ["foo_", "_id"] }] */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
/* eslint-disable react/jsx-curly-brace-presence */

/* eslint-disable react/jsx-no-bind */

/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import MenuItem from "@mui/material/MenuItem";
// import { useTheme } from "@mui/material/styles";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import TowingOrderForm from "layouts/Forms/towingOrder/towingOrderForm";

// Data
import { Dialog, DialogContent, Box, TextField } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import towingOrdersData from "layouts/tables/data/towingOrdersData";
import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import { Col, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import { authenticate, isAuthenticated, signin } from "auth/index";

const towingOrdersTable = (props) => {
  // const { pathname } = useLocation();
  const { typeTable } = props;

  // eslint-disable-next-line global-require
  const XLSX = require("xlsx");

  const [filterOpen, setFilterOpen] = useState(false);
  const [status, setStatus] = useState("בחר");
  const [statuses, setStatuses] = useState([]);
  const [area, setArea] = useState("בחר");
  const [dbError, setDbError] = useState(false);
  const [toAddFile, setToAddFile] = useState(false);
  const [toEditFile, setToEditFile] = useState(false);
  const [editFormId, setEditFormId] = useState("");
  // const usedTheme = useTheme();

  const [bankData, setBankData] = useState({});
  const [garagesData, setGaragesData] = useState([]);

  const [pikods, setPikods] = useState([]);
  const [ogdas, setOgdas] = useState([]);
  const [hativas, setHativas] = useState([]);
  const [gdods, setGdods] = useState([]);

  const [popUpMessage, setPopUpMessage] = useState("");
  const [popUpTitle, setPopUpTitle] = useState("");
  const [popUpColor, setPopUpColor] = useState("");
  const [isPopUp, setIsPopUp] = useState(false);

  const [chosenPikod, setChosenPikod] = useState("בחר");
  const [chosenOgda, setChosenOgda] = useState("בחר");
  const [chosenHativa, setChosenHativa] = useState("בחר");
  const [chosenGdod, setChosenGdod] = useState("בחר");
  const [garage, setGarage] = useState("בחר");
  const [executiveBody, setExecutiveBody] = useState("בחר");
  const [isCarFiltered, setIsCarFiltered] = useState(false);

  const [carData, setCarData] = useState([]);
  const [carTypesData, setCarTypesData] = useState([]);

  const [carsList, setCarsList] = useState([]);

  const { user } = isAuthenticated();

  const uploadCarXlsxRef = useRef(null);

  const [data, setData] = useState({
    fromDate: "",
    toDate: "",
    fromOrderDate: "",
    toOrderDate: "",
    erorrInfo: [],
    errInfoOther: "",
    //
    turnNumber: "",
    //
    demandDate: new Date().toISOString().split("T")[0],
    area: "",
    status: "",
    statuses: [],
    commanderNotes: "",
  });

  const filteredOgdas = ogdas.filter((ogda) => ogda.pikodId === chosenPikod);
  const filteredHativas = hativas.filter((hativa) => hativa.ogdaId === chosenOgda);
  const filteredGdods = gdods.filter((gdod) => gdod.hativaId === chosenHativa);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/TowingLogApi/CarDatas`)
  //     .then((response) => {
  //       response.data.forEach((carDataInfo) => {
  //         const gdod = bankData.Unit_bank.gdods[carDataInfo.gdodId];
  //         carDataInfo.gdodName = gdod.name;
  //         carDataInfo.hativaId = gdod.hativaId;
  //         const hativa = bankData.Unit_bank.hativas[carDataInfo.hativaId];
  //         carDataInfo.hativaName = hativa.name;
  //         carDataInfo.ogdaId = hativa.ogdaId;
  //         const ogda = bankData.Unit_bank.ogdas[carDataInfo.ogdaId];
  //         carDataInfo.ogdaName = ogda.name;
  //         carDataInfo.pikodId = ogda.pikodId;
  //         const pikod = bankData.Unit_bank.pikods[carDataInfo.pikodId];
  //         carDataInfo.pikodName = pikod.name;
  //         // console.log(carDataInfo);
  //       });
  //       setCarData(response.data);
  //     })
  //     .catch((error) => {});
  // }, [bankData]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/CarDatas`)
      .then((response) => {
        if (Object.keys(bankData).length === 0) return;
        const toSet = response.data.map((carDataInfo) => {
          const gdod = bankData.Unit_bank.gdods[carDataInfo.gdodId];
          if (!gdod) return carDataInfo;
          const hativa = bankData.Unit_bank.hativas[gdod.hativaId];
          const ogda = bankData.Unit_bank.ogdas[hativa.ogdaId];
          const pikod = bankData.Unit_bank.pikods[ogda.pikodId];
          return {
            ...carDataInfo,
            gdodName: gdod.name,
            hativaId: gdod.hativaId,
            hativaName: hativa.name,
            ogdaId: hativa.ogdaId,
            ogdaName: ogda.name,
            pikodId: ogda.pikodId,
            pikodName: pikod.name,
          };
          // console.log(carDataInfo);
        });
        if (toSet && toSet.length > 0) setCarData(toSet);
      })
      .catch((error) => {});
  }, [bankData]);

  useEffect(() => {
    function sortArrayByHebrewAlphabet(array) {
      return array.sort((a, b) =>
        a.garageFullName
          .trim()
          .localeCompare(b.garageFullName.trim(), "he", { sensitivity: "base" })
      );
    }

    axios
      .get(`http://localhost:5000/TowingLogApi/Garages`)
      .then((response) => {
        const garagesArray = response.data;
        const fixedData = garagesArray.map((garageEl) => {
          const res = {
            ...garageEl,
            garageFullName:
              garageEl.garageArea && garageEl.garageArea !== ""
                ? `${garageEl.garageName.trim()} - ${garageEl.garageArea.trim()}`
                : garageEl.garageName.trim(),
          };
          return res;
        });
        const sorted = sortArrayByHebrewAlphabet(fixedData);
        setGaragesData(sorted);
      })
      .catch((error) => {});

    axios
      .get(`http://localhost:5000/TowingLogApi/CarTypes`)
      .then((response) => {
        setCarTypesData(response.data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    // console.log("ubit filter: ");
    // console.log(carData);
    if (chosenGdod !== "בחר") {
      setCarsList(carData.filter((carInfo) => carInfo.gdodId === chosenGdod));
      setIsCarFiltered(true);
    } else if (chosenHativa !== "בחר") {
      setIsCarFiltered(true);

      setCarsList(carData.filter((carInfo) => carInfo.hativaId === chosenHativa));
    } else if (chosenOgda !== "בחר") {
      setCarsList(carData.filter((carInfo) => carInfo.ogdaId === chosenOgda));
      setIsCarFiltered(true);
    } else if (chosenPikod !== "בחר") {
      setCarsList(carData.filter((carInfo) => carInfo.pikodId === chosenPikod));
      setIsCarFiltered(true);
    } else {
      setCarsList([]);
      setIsCarFiltered(false);
    }
  }, [chosenPikod, chosenOgda, chosenHativa, chosenGdod, carData]);

  const options = {
    // weekday: 'long', // or 'short', 'narrow'
    year: "numeric",
    month: "numeric", // or 'short', 'narrow'
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: 'numeric',
    // timeZoneName: 'short', // or 'long'
  };

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

  const currentDate = new Date();
  useEffect(() => {
    setFilterOpen(false);
    setExecutiveBody("בחר");
    setGarage("בחר");
    setChosenGdod("בחר");
    setChosenHativa("בחר");
    setChosenOgda("בחר");
    setChosenPikod("בחר");
    setStatus("בחר");
    setArea("בחר");
    setData({
      ...data,
      fromDate: "",
      toDate: "",
      fromOrderDate: "",
      toOrderDate: "",
      erorrInfo: [],
      errInfoOther: "",
    });
  }, [typeTable]);

  let tableTittle = "";
  let urlType = "";
  if (typeTable === "landing") {
    tableTittle = `הזמנות שירות להיום - ${currentDate.toLocaleDateString("he-IL")}`;
    urlType = "landing";
  } else if (typeTable === "towingorders") {
    tableTittle = "הזמנות שירות";
    urlType = "towingorders";
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/get_banks`)
      .then((response) => {
        // console.log("מדפיס מערך פיקודים");
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

  const activateEditFile = (orderId) => {
    setEditFormId(orderId);
    setToEditFile(true);
    console.log(`sent to edit ${orderId}`);
  };
  // console.log(toEditFile);
  const {
    columns: pColumns,
    rows: pRows,
    dbError: dbe,
    setDBerror: setDbe,
    dataRow: requestDB,
  } = towingOrdersData(
    typeTable,
    urlType,
    currentDate,
    statuses,
    area,
    data.fromDate,
    data.toDate,
    data.erorrInfo,
    data.fromOrderDate,
    data.toOrderDate,
    carsList,
    isCarFiltered,
    garage,
    executiveBody,
    activateEditFile
  );

  const handleErrorClose = () => {
    setDbError(true);
    setDbe(false);
  };

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
    <div style={{ display: "flex", paddingLeft: "0.5%" }}>
      <Input
        style={{ marginLeft: "5px" }}
        type="checkbox"
        name="erorrInfo"
        value={val}
        onClick={toggleError}
      />
      <p>{val}</p>
    </div>
  );

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    if (name === "status") {
      setStatus(value);
    } else if (name === "area") {
      setArea(value);
    } else if (
      name === "fromDate" ||
      name === "toDate" ||
      name === "fromOrderDate" ||
      name === "toOrderDate"
    ) {
      setData({ ...data, [name]: value });
      console.log(value);
    } else if (name === "erorrInfo") {
      // console.log("sets error array");
      setData((prev) => ({
        ...prev,
        [name]: typeof value === "string" ? value.split(",") : value,
      }));
    } else if (name === "garage") {
      setGarage(value);
    } else if (name === "executiveBody") {
      setExecutiveBody(value);
    }
  };
  const addFile = () => (
    <Dialog
      px={5}
      open={toAddFile}
      onClose={() => setToAddFile(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xl"
    >
      <MDBox variant="gradient" bgColor="mekatnar" coloredShadow="mekatnar" borderRadius="l">
        <DialogContent>
          <TowingOrderForm edit={false} orderId="" />
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const editFile = () => (
    <Dialog
      px={5}
      open={toEditFile}
      onClose={() => setToEditFile(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xl"
    >
      <MDBox variant="gradient" bgColor="mekatnar" coloredShadow="mekatnar" borderRadius="l">
        <DialogContent>
          <TowingOrderForm edit={true} orderId={editFormId} />
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const textClientJourney = (clientJourney) => {
    let text = "";
    clientJourney.forEach((post) => {
      post.date = new Date(post.date);
      console.log(post);
      text += `${post.publisher} ${post.date.toLocaleTimeString(
        "he-IL"
      )} ${post.date.toLocaleDateString("he-IL")}: \n`;
      text += post.text;
      text += "\n";
    });
    return text;
  };

  const textErrorArray = (errorInfo, errorInfoOther) => {
    let text = "";
    let isOther = false;
    errorInfo.forEach((errorElement) => {
      if (errorElement === "אחר") {
        isOther = true;
      } else {
        text += `${errorElement}, `;
      }
    });
    if (isOther) {
      text += `אחר: ${errorInfoOther}`;
    }
    return text;
  };

  const getTimeDiffrencese = (time1, time2) => {
    const timeObject1 = new Date(time1);
    const timeObject2 = new Date(time2);
    const milliseconds = timeObject2.valueOf() - timeObject1.valueOf();
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(milliseconds / (60 * 1000));
    let hours = Math.floor(milliseconds / (60 * 60 * 1000));
    let days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    // seconds = seconds.toLocaleString('en-US', {
    //   minimumIntegerDigits: 2,
    //   useGrouping: false
    // })
    // minutes = minutes.toLocaleString('en-US', {
    //   minimumIntegerDigits: 2,
    //   useGrouping: false
    // })
    // hours = hours.toLocaleString('en-US', {
    //   minimumIntegerDigits: 2,
    //   useGrouping: false
    // })
    // days = days.toLocaleString('en-US', {
    //   minimumIntegerDigits: 2,
    //   useGrouping: false
    // })
    let text = "";
    if (days !== 0) {
      text += `${days} days `;
    }
    text += `${hours}:${minutes} hours`;

    return text;
  };

  function FixDataAndExportToExcel() {
    let tempdata_to_excel = [];
    let tempdata_to_excelrow = [];
    for (let i = 0; i < requestDB.length; i += 1) {
      tempdata_to_excel.push({ ...requestDB[i] });
    }

    for (let i = 0; i < pRows.length; i += 1) {
      tempdata_to_excelrow.push({ ...pRows[i] });
    }
    for (let i = 0; i < tempdata_to_excelrow.length; i += 1) {
      tempdata_to_excelrow[i].garage
        ? (tempdata_to_excel[i].garage_m = tempdata_to_excelrow[i].garage)
        : (tempdata_to_excel[i].garage_m = " ");
    }

    for (let i = 0; i < tempdata_to_excel.length; i += 1) {
      tempdata_to_excel[i].reference
        ? (tempdata_to_excel[i].reference_m = tempdata_to_excel[i].reference)
        : (tempdata_to_excel[i].reference_m = " ");

      tempdata_to_excel[i].orderDate
        ? (tempdata_to_excel[i].orderDate_m = tempdata_to_excel[i].orderDate.split("T")[0])
        : (tempdata_to_excel[i].orderDate_m = " ");

      tempdata_to_excel[i].orderTime
        ? (tempdata_to_excel[i].orderTime_m = tempdata_to_excel[i].orderTime)
        : (tempdata_to_excel[i].orderTime_m = " ");

      tempdata_to_excel[i].serviceName
        ? (tempdata_to_excel[i].serviceName_m = tempdata_to_excel[i].serviceName)
        : (tempdata_to_excel[i].serviceName_m = " ");

      tempdata_to_excel[i].ahmashNotes
        ? (tempdata_to_excel[i].ahmashNotes_m = tempdata_to_excel[i].ahmashNotes)
        : (tempdata_to_excel[i].ahmashNotes_m = " ");

      // console.log(textClientJourney(tempdata_to_excel[i].clientJourney));
      tempdata_to_excel[i].clientJourney && tempdata_to_excel[i].clientJourney.length > 0
        ? (tempdata_to_excel[i].clientJourney_m = textClientJourney(
            tempdata_to_excel[i].clientJourney
          ))
        : (tempdata_to_excel[i].clientJourney_m = " ");

      tempdata_to_excel[i].erorrInfo
        ? (tempdata_to_excel[i].erorrInfo_m = textErrorArray(
            tempdata_to_excel[i].erorrInfo,
            tempdata_to_excel[i].errInfoOther
          ))
        : (tempdata_to_excel[i].erorrInfo_m = " ");

      tempdata_to_excel[i].carnumber
        ? (tempdata_to_excel[i].carnumber_m = tempdata_to_excel[i].carnumber)
        : (tempdata_to_excel[i].carnumber_m = " ");

      tempdata_to_excel[i].location
        ? (tempdata_to_excel[i].location_m = tempdata_to_excel[i].location)
        : (tempdata_to_excel[i].location_m = " ");

      // tempdata_to_excel[i].garage
      //   ? (tempdata_to_excel[i].garage_m = tempdata_to_excel[i].garage)
      //   : (tempdata_to_excel[i].garage_m = " ");

      tempdata_to_excel[i].fullName
        ? (tempdata_to_excel[i].fullName_m = tempdata_to_excel[i].fullName)
        : (tempdata_to_excel[i].fullName_m = " ");

      tempdata_to_excel[i].phoneNumber
        ? (tempdata_to_excel[i].phoneNumber_m = tempdata_to_excel[i].phoneNumber)
        : (tempdata_to_excel[i].phoneNumber_m = " ");

      tempdata_to_excel[i].otherPhoneNumber
        ? (tempdata_to_excel[i].otherPhoneNumber_m = tempdata_to_excel[i].otherPhoneNumber)
        : (tempdata_to_excel[i].otherPhoneNumber_m = " ");

      tempdata_to_excel[i].transferOrderDate
        ? (tempdata_to_excel[i].transferOrderDate_m =
            tempdata_to_excel[i].transferOrderDate.split("T")[0])
        : (tempdata_to_excel[i].transferOrderDate_m = " ");

      tempdata_to_excel[i].transferOrderTime
        ? (tempdata_to_excel[i].transferOrderTime_m = tempdata_to_excel[i].transferOrderTime)
        : (tempdata_to_excel[i].transferOrderTime_m = " ");

      tempdata_to_excel[i].reciveName
        ? (tempdata_to_excel[i].reciveName_m = tempdata_to_excel[i].reciveName)
        : (tempdata_to_excel[i].reciveName_m = " ");

      tempdata_to_excel[i].executiveBody
        ? (tempdata_to_excel[i].executiveBody_m = tempdata_to_excel[i].executiveBody)
        : (tempdata_to_excel[i].executiveBody_m = " ");

      tempdata_to_excel[i].turnNumber
        ? (tempdata_to_excel[i].turnNumber_m = tempdata_to_excel[i].turnNumber)
        : (tempdata_to_excel[i].turnNumber_m = " ");

      tempdata_to_excel[i].demandDate
        ? (tempdata_to_excel[i].demandDate_m = tempdata_to_excel[i].demandDate.split("T")[0])
        : (tempdata_to_excel[i].demandDate_m = " ");

      tempdata_to_excel[i].area
        ? (tempdata_to_excel[i].area_m = tempdata_to_excel[i].area)
        : (tempdata_to_excel[i].area_m = " ");

      tempdata_to_excel[i].status
        ? (tempdata_to_excel[i].status_m = tempdata_to_excel[i].status)
        : (tempdata_to_excel[i].status_m = " ");

      tempdata_to_excel[i].commanderNotes
        ? (tempdata_to_excel[i].commanderNotes_m = tempdata_to_excel[i].commanderNotes)
        : (tempdata_to_excel[i].commanderNotes_m = " ");

      tempdata_to_excel[i].openOrderTime
        ? (tempdata_to_excel[i].openOrderTime_m = new Date(
            tempdata_to_excel[i].openOrderTime
          ).toLocaleString("en-IL"))
        : (tempdata_to_excel[i].openOrderTime_m = " ");

      tempdata_to_excel[i].closeOrderTime
        ? (tempdata_to_excel[i].closeOrderTime_m = new Date(
            tempdata_to_excel[i].closeOrderTime
          ).toLocaleString("en-IL"))
        : (tempdata_to_excel[i].closeOrderTime_m = " ");

      // tempdata_to_excel[i].waitForApproveTime
      //   ? (tempdata_to_excel[i].waitForApproveTime_m = new Date(
      //       tempdata_to_excel[i].waitForApproveTime
      //     ).toLocaleString("en-IL"))
      //   : (tempdata_to_excel[i].waitForApproveTime_m = " ");

      tempdata_to_excel[i].openToCloseTime_m = tempdata_to_excel[i].openOrderTime
        ? tempdata_to_excel[i].status === "פתוח" || !tempdata_to_excel[i].closeOrderTime
          ? getTimeDiffrencese(tempdata_to_excel[i].openOrderTime, new Date())
          : getTimeDiffrencese(
              tempdata_to_excel[i].openOrderTime,
              tempdata_to_excel[i].closeOrderTime
            )
        : "";

      tempdata_to_excel[i].orderWaitTime_m = tempdata_to_excel[i].waitForApproveTime
        ? tempdata_to_excel[i].status === "ממתין לאישור" || !tempdata_to_excel[i].openOrderTime
          ? getTimeDiffrencese(tempdata_to_excel[i].waitForApproveTime, new Date())
          : getTimeDiffrencese(
              tempdata_to_excel[i].waitForApproveTime,
              tempdata_to_excel[i].openOrderTime
            )
        : "";

      tempdata_to_excel[i].isYaram_m = tempdata_to_excel[i].isYaram ? "אזרחי" : "צבאי";
      tempdata_to_excel[i].personalnumber
        ? (tempdata_to_excel[i].personalnumber_m = tempdata_to_excel[i].personalnumber)
        : (tempdata_to_excel[i].personalnumber_m = " ");
    }

    // export to excel -fix
    for (let i = 0; i < tempdata_to_excel.length; i += 1) {
      // delete unwanted fields
      delete tempdata_to_excel[i]._id;
      delete tempdata_to_excel[i].__v;
      delete tempdata_to_excel[i].updatedAt;
      delete tempdata_to_excel[i].createdAt;
      delete tempdata_to_excel[i].clientJourney;
      delete tempdata_to_excel[i].reference;
      delete tempdata_to_excel[i].orderDate;
      delete tempdata_to_excel[i].orderTime;
      delete tempdata_to_excel[i].serviceName;
      delete tempdata_to_excel[i].ahmashNotes;
      delete tempdata_to_excel[i].carnumber;
      delete tempdata_to_excel[i].location;
      delete tempdata_to_excel[i].garage;
      delete tempdata_to_excel[i].fullName;
      delete tempdata_to_excel[i].phoneNumber;
      delete tempdata_to_excel[i].otherPhoneNumber;
      delete tempdata_to_excel[i].transferOrderDate;
      delete tempdata_to_excel[i].transferOrderTime;
      delete tempdata_to_excel[i].reciveName;
      delete tempdata_to_excel[i].executiveBody;
      delete tempdata_to_excel[i].demandDate;
      delete tempdata_to_excel[i].area;
      delete tempdata_to_excel[i].status;
      delete tempdata_to_excel[i].commanderNotes;
      delete tempdata_to_excel[i].turnNumber;
      delete tempdata_to_excel[i].erorrInfo;
      delete tempdata_to_excel[i].errInfoOther;
      delete tempdata_to_excel[i].openOrderTime;
      delete tempdata_to_excel[i].closeOrderTime;
      delete tempdata_to_excel[i].waitForApproveTime;
      delete tempdata_to_excel[i].isYaram;
      delete tempdata_to_excel[i].personalnumber;
      delete tempdata_to_excel[i].waitForApproveTime;

      // delete tempdata_to_excel[i].otherPhoneNumber;
      // delete tempdata_to_excel[i].transferOrderDate;
      // delete tempdata_to_excel[i].transferOrderTime;
    }

    // console.log(tempdata_to_excel);

    const todayDate = new Date();
    const month = (todayDate.getMonth() + 1).toString().padStart(2, "0");
    const day = todayDate.getDate().toString().padStart(2, "0");

    let EXCEL_EXTENSION = ".xlsx";
    let worksheet = XLSX.WorkSheet;
    let sheetName = `הזמנות שירות ${day}-${month}-${todayDate.getFullYear()}`;

    const headers = {
      reference_m: "אסמכתא",
      orderDate_m: "תאריך",
      orderTime_m: "שעה",
      clientJourney_m: "מסע לקוח",
      erorrInfo_m: "מהות התקלה",
      serviceName_m: "שם נציג שירות",
      ahmashNotes_m: "הערות אחמש",
      carnumber_m: "צ'",
      location_m: "מיקום",
      garage_m: "לגרור ל",
      fullName_m: "שם מלא",
      phoneNumber_m: "טלפון",
      otherPhoneNumber_m: "טלפון נוסף",
      transferOrderDate_m: "תאריך העברת הזמנה",
      transferOrderTime_m: "שעת העברת הזמנה",
      reciveName_m: "שם מקבל מחלקה צבאית או שגריר",
      executiveBody_m: "גוף מבצע",
      turnNumber_m: "מספר הזמנה",
      demandDate_m: "תאריך ביצוע מבוקש",
      area_m: "מרחב",
      status_m: "סטטוס",
      commanderNotes_m: "הערות מפקד",
      openOrderTime_m: "זמן פתיחת הזמנה",
      closeOrderTime_m: "זמן סגירת הזמנה",
      openToCloseTime_m: "זמן מפתיחת עד סגירת הזמנה",
      orderWaitTime_m: "זמן המתנה לאישור",
      isYaram_m: "סוג רכב",
      personalnumber_m: "מספר אישי",

      // transferOrderDate_m: "חטיבה",
      // transferOrderTime_m: "גדוד",
    };
    tempdata_to_excel.unshift(headers); // if custom header, then make sure first row of data is custom header

    worksheet = XLSX.utils.json_to_sheet(tempdata_to_excel, {
      skipHeader: true,
    });

    const workbook = XLSX.utils.book_new();
    const fileName = `הזמנות שירות ${day}-${month}-${todayDate.getFullYear()}${EXCEL_EXTENSION}`;
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, fileName);

    window.location.reload();
  }
  const showError = () => (
    <Dialog
      open={dbe}
      onClose={handleErrorClose}
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
          שגיאה בקבלת הבקשות
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            אנא נסה שנית מאוחר יותר
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const activatePopUp = (title, message, color) => {
    setPopUpColor(color);
    setPopUpMessage(message);
    setPopUpTitle(title);
    setIsPopUp(true);
  };

  const showPopUpMessage = () => (
    <Dialog
      open={isPopUp}
      onClose={() => {
        setIsPopUp(false);
        setPopUpMessage("");
        setPopUpTitle("");
        setPopUpColor("");
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor={popUpColor}
        coloredShadow={popUpColor}
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          {popUpTitle}
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            {popUpMessage}
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const statusesArr = ["פתוח", "ממתין לאישור", "מוקפא", "סגור", "מבוטל"];
  const statusesColors = ["success", "info", "warning", "secondary", "error"];
  const toggleStatus = (toggledStatus) => {
    const arr = [...statuses];
    if (statuses.includes(toggledStatus)) {
      setStatuses(arr.filter((statusEl) => statusEl !== toggledStatus));
    } else {
      arr.push(toggledStatus);
      setStatuses(arr);
    }
  };

  const updateCivilCars = (carsData) => {
    // תכתוב פעולה שתעשה את העברה של כל הרשומת בשרת, ככה תוכל לשלוח הודעה עם סטטום אם הפעולה הצליחה
    // carsData.forEach(carInfo => {
    //   const carNumber = carInfo['מספר רישוי'];
    //   const carTypeName = carInfo['דגם'];
    //   const releaseDate = carInfo['תאריך שחרור'];
    //   const weight = carInfo['משקל כולל'];
    //   const existingCar = carData.find(car => car.carnumber === carNumber);

    // })
    const civilCars = carsData.map((carInfo) => {
      // console.log(carInfo);
      console.log(carInfo["משקל כולל (קג)"]);
      const carTypeName = carInfo["דגם"];
      const carTypeObject = carTypesData.find((carType) => carType.carType === carTypeName);
      const carTypeId = carTypeObject ? carTypeObject._id : null;
      return {
        carnumber: carInfo["מספר רישוי"],
        weight: carInfo["משקל כולל (קג)"],
        carTypeId,
        status: !(carInfo["תאריך שחרור"] && carInfo["תאריך שחרור"].trim() !== ""),
      };
    });
    // console.log(civilCars);
    axios
      .post("http://localhost:5000/TowingLogApi/CarDatas/updateCivilCars", { cars: civilCars })
      .then((response) => {
        if (response.status === 200) {
          console.log("updated");
          activatePopUp("העדכון בוצע בהצלחה", `רכבי היר"מ עודכנו במערכת`, "mekatnar");
        } else {
          console.log("failed");
          activatePopUp("תקלת שרת", "עדכון הרכבים נכשל", "error");
        }
      });
  };
  const uploadCivilCarsXlsx = (event) => {
    console.log("reading...");
    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (e) => {
      const dataXl = e.target.result;
      const workbook = XLSX.read(dataXl, { type: "binary" });
      const sheetname = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetname];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { raw: false });
      // const newParsed = parsedData.map(car => {
      //   const date = new Date(car['תאריך שחרור']);
      //   return {
      //   ...car,
      //   'תאריך שחרור' : date
      // }})
      // console.log(newParsed);
      updateCivilCars(parsedData);
    };
    event.target.value = ""; // in order to allow the file reader to read the same file the second time in a row
  };

  const table = () => (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="mekatnar"
              borderRadius="lg"
              coloredShadow="mekatnar"
            >
              <MDTypography variant="h3" color="white">
                {tableTittle}
              </MDTypography>{" "}
              <Grid container justifyContent="flex-end">
              {urlType === "towingorders" && user.admin === "0" ? (
                <Grid item xs={2} md={2} xl={1.4}>
                {/* <Tooltip title="העלאת רכבים אזרחיים" arrow> */}
                      <MDButton
                        variant="gradient"
                        onClick={() => {
                          uploadCarXlsxRef.current.click();
                        }}
                        circular="true"
                        // iconOnly="true"
                        size="small"
                        startIcon={<Icon>file_upload</Icon>}
                      >{'טעינת רכבי יר"מ'}
                      </MDButton>
                      {/* </Tooltip> */}
                      <input
                        ref={uploadCarXlsxRef}
                        style={{ display: "none" }}
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={uploadCivilCarsXlsx}
                      />
                    </Grid>
                  ) : null}
                <Grid item xs={2} md={1} xl={0.5}>
                  <Tooltip title="הורדת קובץ אקסל" arrow>
                    <MDButton
                      circular="true"
                      iconOnly="true"
                      size="medium"
                      onClick={FixDataAndExportToExcel}
                    >
                      <Icon>download</Icon>
                    </MDButton>
                  </Tooltip>
                </Grid>
                {urlType === "towingorders" ? (
                  <Grid item xs={2} md={1} xl={0.4}>
                    <Tooltip title="הוסף הזמנה חדשה" arrow>
                      <MDButton
                        variant="gradient"
                        onClick={() => setToAddFile(true)}
                        // onClick={() => {
                        //   // setIsInfoPressed(true);
                        //   // setpressedID(hozla._id);
                        // }}
                        circular="true"
                        iconOnly="true"
                        size="medium"
                      >
                        <Icon>add</Icon>
                      </MDButton>
                    </Tooltip>
                  </Grid>
                ) : null}
              </Grid>
              <Grid style={{ position: "static", top: "7px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                  <MDButton
                    variant="gradient"
                    onClick={() => setFilterOpen(!filterOpen)}
                    // onClick={() => {
                    //   // setIsInfoPressed(true);
                    //   // setpressedID(hozla._id);
                    // }}
                    // circular="true"
                    size="small"
                    startIcon={<Icon>filter_alt</Icon>}
                  >
                    סינון
                  </MDButton>
                  
                </Box>
              </Grid>
            </MDBox>

            {filterOpen === true ? (
              <MDBox mx={2} mt={1} px={2}>
                <Row>
                  <Col
                    style={{
                      justifyContent: "right",
                      alignContent: "right",
                      textAlign: "right",
                    }}
                  >
                    <h6 style={{}}>סטטוס</h6>
                    {statusesArr.map((statusEl, index) => (
                      <MDButton
                        sx={{
                          marginRight: 2,
                        }}
                        color={statusesColors[index]}
                        variant={statuses.includes(statusEl) ? "gradient" : "outlined"}
                        onClick={() => {
                          toggleStatus(statusEl);
                        }}
                      >
                        {statusEl}
                      </MDButton>
                    ))}
                    {/* <Input
                      placeholder="סטטוס"
                      type="select"
                      name="status"
                      value={status}
                      onChange={handleChange}
                    >
                      <option value="בחר">בחר</option>
                      <option value="פתוח">פתוח</option>
                      <option value="סגור">סגור</option>
                      <option value="מבוטל">מבוטל</option>
                      <option value="מוקפא">מוקפא</option>
                      <option value="ממתין לאישור">ממתין לאישור</option>
                    </Input> */}
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
                    <h6 style={{}}>מרחב</h6>
                    <Input
                      placeholder="מרחב"
                      type="select"
                      name="area"
                      value={area}
                      onChange={handleChange}
                    >
                      <option value="בחר">בחר</option>
                      <option value="צפון">צפון</option>
                      <option value="דרום">דרום</option>
                      <option value="מרכז">מרכז</option>
                      <option value="הערבה">הערבה</option>
                      <option value="איו''ש">איוש</option>
                    </Input>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>לגרור ל</h6>
                      <Input
                        placeholder="לגרור ל"
                        type="select"
                        name="garage"
                        value={garage}
                        onChange={handleChange}
                      >
                        <option value="בחר">בחר</option>
                        {garagesData.map((garageEl) => (
                          <option value={garageEl._id}>{garageEl.garageFullName}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6>גוף מבצע</h6>
                      <Input
                        placeholder="גוף מבצע"
                        type="select"
                        name="executiveBody"
                        value={executiveBody}
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
                <Row>
                  <Col>
                    <h6>מהות התקלה</h6>
                    <TextField
                      // label="מהות תקלה"
                      select
                      onChange={handleChange}
                      name="erorrInfo"
                      value={data.erorrInfo}
                      fullWidth
                      SelectProps={{
                        multiple: true,
                      }}
                      variant="standard"
                    >
                      {errorResArr.map((errorRes) => (
                        <MenuItem value={errorRes}>{errorRes}</MenuItem>
                      ))}
                    </TextField>
                  </Col>
                </Row>
                {urlType === "towingorders" ? (
                  <>
                    <Row>
                      <Col>
                        <h6 style={{}}>טווח תאריכי הזמנה</h6>
                      </Col>
                      <Col>
                        <h6 style={{}}>טווח תאריכי ביצוע מבוקש</h6>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormGroup>
                          <Input
                            placeholder="מתאריך הזמנה"
                            type="date"
                            name="fromOrderDate"
                            value={data.fromOrderDate}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Input
                            placeholder="עד תאריך הזמנה"
                            type="date"
                            name="toOrderDate"
                            value={data.toOrderDate}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Input
                            placeholder="מתאריך"
                            type="date"
                            name="fromDate"
                            value={data.fromDate}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Input
                            placeholder="עד תאריך"
                            type="date"
                            name="toDate"
                            value={data.toDate}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </>
                ) : null}
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
                          <option value={pikod.id}>{pikod.name}</option>
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
                          <option value={ogda.id}>{ogda.name}</option>
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
                          <option value={hativa.id}>{hativa.name}</option>
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
                          <option value={gdod.id}>{gdod.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </MDBox>
            ) : null}

            <MDBox pt={3}>
              {pRows.length !== 0 ? (
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={true}
                  canSearch={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder={false}
                />
              ) : dbError || dbe ? (
                <MDTypography mx={30} variant="h3" color="error" textGradient={true}>
                  תקלת שרת{" "}
                </MDTypography>
              ) : (
                <MDTypography mx={30} variant="h3" color="mekatnar" textGradient={true}>
                  לא קיימות הזמנות שירות
                </MDTypography>
              )}
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {showError()}
      {showPopUpMessage()}
      {addFile()}
      {editFile()}
      {table()}
      <Outlet />
      <Footer />
    </DashboardLayout>
  );
};

export default towingOrdersTable;
