/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-computed-key */

/* eslint no-underscore-dangle: 0 */

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
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { Box, Button, Dialog, DialogContent } from "@mui/material";
import { setMiniSidenav, setOpenConfigurator, useMaterialUIController } from "context";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import SimpleInfoCard from "examples/Cards/InfoCards/SimpleInfoCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import PieChart from "examples/Charts/PieChart";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import MDTypography from "components/MDTypography";
import MilitaryIndustryForm from "layouts/Forms/kshirotMisgrot/MilitaryIndustryForm";
import CivilIndustryForm from "layouts/Forms/kshirotMisgrot/CivilIndustryForm";
import HoliyotForm from "layouts/Forms/kshirotMisgrot/HoliyotForm";
import TowingOrderForm from "layouts/Forms/towingOrder/towingOrderForm";
// import MDProgress from "components/MDProgress";
import MDCircularProgress from "components/MDCircularProgress";
// import CircularProgress from "@mui/material/CircularProgress";
import MDButton from "components/MDButton";

// Dashboard components
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";

import { CardBody, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";

// user and auth import
import { authenticate, isAuthenticated, signin } from "auth/index";
import axios from "axios";

const { user } = isAuthenticated();

function Dashboard() {
  const [filterOpen, setFilterOpen] = useState(false);
  //   const [status, setStatus] = useState("בחר");
  const [bankData, setBankData] = useState({});
  const [pikods, setPikods] = useState([]);
  const [ogdas, setOgdas] = useState([]);
  const [hativas, setHativas] = useState([]);
  const [gdods, setGdods] = useState([]);
  const [carTypesData, setCarTypesData] = useState([]);
  const [toAddFile, setToAddFile] = useState(false);

  const [garages, setGarages] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  //   const [area, setArea] = useState("בחר");
  const [carData, setCarData] = useState([]);

  const [chosenPikod, setChosenPikod] = useState("בחר");
  const [chosenOgda, setChosenOgda] = useState("בחר");
  const [chosenHativa, setChosenHativa] = useState("בחר");
  const [chosenGdod, setChosenGdod] = useState("בחר");

  const [isCarFiltered, setIsCarFiltered] = useState(false);
  const [carsList, setCarsList] = useState([]);

  const filteredOgdas = ogdas.filter((ogda) => ogda.pikodId === chosenPikod);
  const filteredHativas = hativas.filter((hativa) => hativa.ogdaId === chosenOgda);
  const filteredGdods = gdods.filter((gdod) => gdod.hativaId === chosenHativa);
  const [data, setData] = useState({
    fromDate: "",
    toDate: "",
    fromDamandDate: "",
    toDamandDate: "",
    // erorrInfo: [],
    // errInfoOther: "",
    //
    // turnNumber: "",
    //
    // demandDate: new Date().toISOString().split("T")[0],
    area: "בחר",
    status: "בחר",
    statuses: [],
    garage: "בחר",
    // commanderNotes: "",
  });

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    // console.log(value);
    setData((prev) => ({ ...prev, [name]: value }));
    // if (name === "status") {
    //   setStatus(value);
    // } else if (name === "area") {
    //   setArea(value);
    // } else if (name === "fromDate" || name === "toDate") {
    //   setData({ ...data, [name]: value });
    // } else if (name === "erorrInfo") {
    //   // console.log("sets error array");
    //   setData((prev) => ({
    //     ...prev,
    //     [name]: typeof value === "string" ? value.split(",") : value,
    //   }));
    // }
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
  // מכניס את כל היחידות מהבנק
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

  // מכניס את המידע על הרכבים במערכת
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

  // console.log(carData);

  // // מקבל את כל המוסכים מהמסד נתונים
  // useEffect(() => {
  //   function sortArrayByHebrewAlphabet(array) {
  //     return array.sort((a, b) =>
  //       a.garageName.localeCompare(b.garageName, "he", { sensitivity: "base" })
  //     );
  //   }

  //   axios
  //     .get(`http://localhost:5000/TowingLogApi/Garages`)
  //     .then((response) => {
  //       const garagesArray = response.data;
  //       const sorted = sortArrayByHebrewAlphabet(garagesArray);
  //       setGarages(sorted);
  //     })
  //     .catch((error) => {});
  // }, []);

  useEffect(() => {
    // מקבל את כל המוסכים מהמסד נתונים
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
        setGarages(sorted);
      })
      .catch((error) => {});

    // מקבל את כל סוגי הרכבים ממסד הנתונים
    axios
      .get(`http://localhost:5000/TowingLogApi/CarTypes`)
      .then((response) => {
        setCarTypesData(response.data);
      })
      .catch((error) => {});

    // מקבל את כל הגרירות מהמסד נתונים
    axios
      .get(`http://localhost:5000/TowingLogApi/TowingOrder`)
      .then((response) => {
        setOrdersData(response.data);
        setFilteredOrders(response.data);
      })
      .catch((error) => {});
  }, []);
  //   console.log(ordersData);
  //   console.log(carData);
  const isValidGarage = (order, garagesIDs) => {
    if (data.garage === "אחר") {
      return !garagesIDs.includes(order.garage);
    }
    return order.garage === data.garage;
  };

  // מעדכן את רשימת הרכבים המתאימים לפי עץ היחידות שהוכנס
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
  // מבצע סינון לגרירות לפי הנתונים שהוכנסו
  useEffect(() => {
    const allOrders = ordersData;
    // סינון לפי אזור
    const filter1 =
      data.area === "בחר" ? allOrders : allOrders.filter((order) => order.area === data.area);
    // סינון לפי סטטוס
    const filter2 = data.statuses.length === 0 ? filter1 : filter1.filter((order) => data.statuses.includes(order.status));
    // סינון לפי מוסך
    const garagesIDs = garages.map((garage) => garage._id);

    const filter3 =
      data.garage === "בחר" ? filter2 : filter2.filter((order) => isValidGarage(order, garagesIDs));
    // סינון לפי תאריך הזמנה מינימלי
    const filter4 =
      data.fromDate === "" ? filter3 : filter3.filter((order) => order.orderDate >= data.fromDate);
    // סינון לפי תאריך הזמנה מקסימלי
    const filter5 =
      data.toDate === "" ? filter4 : filter4.filter((order) => order.orderDate <= data.toDate);

    // סינון לפי תאריך ביקוש מינימלי
    const filter6 =
      data.fromDamandDate === ""
        ? filter5
        : filter5.filter((order) => order.demandDate >= data.fromDamandDate);
    // סינון לפי תאריך ביקוש מקסימלי
    const filter7 =
      data.toDamandDate === ""
        ? filter6
        : filter6.filter((order) => order.demandDate <= data.toDamandDate);

    const carsNumberList = carsList.map((carInfo) => carInfo.carnumber);
    const filter8 = !isCarFiltered
      ? filter7
      : filter7.filter((order) => carsNumberList.includes(order.carnumber));

    setFilteredOrders(filter8);
  }, [data, carsList, isCarFiltered]);
  // console.log(filteredOrders);
  //   console.log(garages);

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
          <TowingOrderForm />
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const statusesArr = ["פתוח", "ממתין לאישור", "מוקפא", "סגור", "מבוטל"];
  const statusesColors = ["success", "info", "warning", "secondary", "error"];
  const toggleStatus = (status) => {
    const arr = [...data.statuses];
    if (data.statuses.includes(status)) {
      setData((prev) => ({ ...prev, statuses: arr.filter((statusEl) => statusEl !== status) }));
    } else {
      arr.push(status);
      setData((prev) => ({ ...prev, statuses: arr }));
    }
  };

  function isInThisWeek(israelDate) {
    // Get the current date in Israel time
    const currentDateInIsrael = new Date().toLocaleString("en-US", { timeZone: "Asia/Jerusalem" });
    const currentIsraelDate = new Date(currentDateInIsrael);

    // Set the time to the beginning of the current week (Sunday)
    currentIsraelDate.setHours(0, 0, 0, 0);
    currentIsraelDate.setDate(currentIsraelDate.getDate() - currentIsraelDate.getDay());

    // Set the time of the input date to the beginning of the day
    israelDate.setHours(0, 0, 0, 0);

    // Check if the input date is within the current week
    return (
      israelDate >= currentIsraelDate &&
      israelDate < new Date(currentIsraelDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    );
  }

  // מערך ההזמנות לפי כל יום בשבוע האחרון
  const daysArray = [0, 0, 0, 0, 0, 0, 0];
  // filteredOrders.forEach((order) => {
  //   const date = new Date(order.demandDate);
  //   if (isInThisWeek(date)) {
  //     const day = date.getDay();
  //     daysArray[day] += 1;
  //   }
  // });

  // מערך הזמנות לפי גוף מבצע
  const tzvai = "צבאי";
  const indexObject = {
    "חברה אזרחית - גרירה": 0,
    "חברה אזרחית – ניידת שירות": 1,
    [tzvai]: 2,
    "מוביל כננת": 3,
  };

  const executiveBodyArr = [0, 0, 0, 0];
  const statusCountArr = [0, 0, 0, 0, 0];
  const statusIndexes = {
    ["פתוח"]: 0,
    ["ממתין לאישור"]: 1,
    ["מוקפא"]: 2,
    ["סגור"]: 3,
    ["מבוטל"]: 4,
  };
  // 0 פתוח
  // 1 ממתין לאישור
  // 2 מוקפא
  // 3 סוגר
  // 4 מבוטל

  // filteredOrders.forEach((order) => {
  //   // console.log(`${order.executiveBody} : ${indexObject[order.executiveBody]}`);
  //   const index = indexObject[order.executiveBody];
  //   executiveBodyArr[index] += 1;
  // });
  // console.log(executiveBodyArr);
  let today = 0;
  let open = 0;
  // מערך ההזמנות לפי סוג רכב
  const carTypesCount = {};
  filteredOrders.forEach((order) => {
    const date = new Date(order.demandDate);
    statusCountArr[statusIndexes[order.status]] += 1;
    if (isInThisWeek(date)) {
      const day = date.getDay();
      daysArray[day] += 1;
    }

    const index = indexObject[order.executiveBody];
    executiveBodyArr[index] += 1;

    const car = carData.find((carEl) => carEl.carnumber === order.carnumber);
    if (car) {
      if (carTypesCount[car.carTypeId]) {
        carTypesCount[car.carTypeId] += 1;
      } else {
        carTypesCount[car.carTypeId] = 1;
      }
    }
    if (order.orderDate.split("T")[0] === new Date().toISOString().split("T")[0]) {
      today += 1;
    }
    if (order.status === "פתוח") {
      open += 1;
    }
  });
  console.log(statusCountArr);
  const byNamesArr = [];
  console.log(carTypesCount);
  Object.entries(carTypesCount).forEach(([key, value]) => {
    const type = carTypesData.find((el) => el._id === key);
    if (type) {
      byNamesArr.push({
        name: type.carType,
        value,
      });
    }
  });

  byNamesArr.sort((a, b) => a.value - b.value);
  byNamesArr.reverse();
  const top8 = byNamesArr.slice(0, 8);

  const [typeNames, typesNumbers] = [[], []];
  top8.forEach((top) => {
    typeNames.push(top.name);
    typesNumbers.push(top.value);
  });
  // console.log(data.statuses);
  const dashboard = () => (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 1,
        }}
      >
        <MDButton
          color="mekatnar"
          variant="gradient"
          onClick={() => setFilterOpen((prev) => !prev)}
          sx={{
            marginBottom: 2,
          }}
          // onClick={() => {
          //   // setIsInfoPressed(true);
          //   // setpressedID(hozla._id);
          // }}
          // circular="true"
          size="medium"
          startIcon={<Icon>filter_alt</Icon>}
        >
          סינון
        </MDButton>

        <Tooltip title="הוסף הזמנה חדשה" arrow>
          <MDButton
            sx={{}}
            color="mekatnar"
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
      </Box>

      {filterOpen && (
        <MDBox py={3}>
          <Row>
            <Col>
            <h6 style={{}}>סטטוסים</h6>
            </Col>
          </Row>
          <Row>
          <Col>
            {statusesArr.map((status, index) => (       
                <MDButton
                sx={{
                  marginRight: 2
                }}
                  color={statusesColors[index]}
                  variant={data.statuses.includes(status) ? "contained" : "outlined"}
                  onClick={() => {
                    toggleStatus(status);
                  }}
                >
                  {status}
                </MDButton>
            ))}
           </Col>
          </Row>
          <Row>
            {/* <Col
              style={{
                justifyContent: "right",
                alignContent: "right",
                textAlign: "right",
              }}
            >
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
                <option value="ממתין לאישור">ממתין לאישור</option>
              </Input>
            </Col> */}
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
            </Col>
            <Col>
              <h6>מוסך</h6>
              <Input
                placeholder="מוסך"
                type="select"
                name="garage"
                value={data.garage}
                onChange={handleChange}
              >
                <option value="בחר">בחר</option>
                {garages.map((garage) => (
                  <option value={garage._id}>{garage.garageFullName}</option>
                ))}
                <option value="אחר">אחר</option>
              </Input>
            </Col>
          </Row>

          <Row>
            <Col>
              <MDBox
                color="black"
                bgColor="lightGray"
                borderRadius="lg"
                opacity={1}
                p={2}
                sx={{
                  // border : 3,
                  marginTop: 2,
                }}
              >
                <Row>
                  <Col>
                    <h6>תאריך פתיחת ההזמנה</h6>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>מתאריך</h6>
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
                      <h6 style={{}}>עד תאריך</h6>
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
              </MDBox>
            </Col>
            <Col>
              <MDBox
                color="black"
                bgColor="lightGray"
                borderRadius="lg"
                opacity={1}
                p={2}
                sx={{
                  // border : 3,
                  marginTop: 2,
                }}
              >
                <Row>
                  <h6>תאריך מבוקש</h6>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>מתאריך</h6>
                      <Input
                        placeholder="מתאריך"
                        type="date"
                        name="fromDamandDate"
                        value={data.fromDamandDate}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <h6 style={{}}>עד תאריך</h6>
                      <Input
                        placeholder="עד תאריך"
                        type="date"
                        name="toDamandDate"
                        value={data.toDamandDate}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </MDBox>
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
      )}
      <Grid container spacing={3}>
        {/* <Grid item xs={6}>
          <Grid container spacing={1}> */}
        <Grid item xs={4}>
          <DefaultInfoCard
            icon="table_view"
            title="הזמנות שירות"
            // description="מספר הזמנות הגרירה שקיימות"
            value={filteredOrders.length}
          />
        </Grid>
        <Grid item xs={4}>
          <DefaultInfoCard icon="today" title="הזמנות שנפתחו היום" value={today} />
        </Grid>
        <Grid item xs={4}>
          <DefaultInfoCard icon="table_view" title="הזמנות עם סטטוס פתוח" value={open} />
        </Grid>
        {/* </Grid>
        </Grid> */}

        <Grid item xs={6}>
          <DefaultDoughnutChart
            icon={{ color: "mekatnar", component: "assignment" }}
            title="גוף מבצע"
            description="אחוזי הזמנות לפי גוף מבצע"
            chart={{
              labels: ["חברה אזרחית-גרירה", "חברה אזרחית – ניידת שירות", "צבאי", "מוביל כננת"],
              datasets: {
                label: "גוף מבצע",
                backgroundColors: ["primary", "dark", "info", "mekatnar"],
                data: executiveBodyArr,
              },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <PieChart
            icon={{ color: "mekatnar", component: "pie_chart" }}
            title="סטטוס"
            description="אחוזי הזמנות לפי סטטוס הזמנה"
            chart={{
              labels: ["פתוח", "ממתין לאישור", "מוקפא", "סגור", "מבוטל"],
              datasets: {
                label: "סטטוס הזמנה",
                backgroundColors:  ["primary", "dark", "info", "mekatnar", "secondary"],
                data: statusCountArr,
              },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <VerticalBarChart
            icon={{ color: "mekatnar", component: "calendar_today" }}
            title="כמות הזמנות לפי יום בשבוע"
            description="כמות ההזמנות הגרירה לפי כל יום בשבוע בשבוע הנוכחי"
            chart={{
              labels: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
              datasets: [
                {
                  label: "הזמנות לפי יום בשבוע",
                  color: "mekatnar",
                  data: daysArray,
                },
              ],
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <VerticalBarChart
            icon={{ color: "mekatnar", component: "directions_car" }}
            title="כמות הזמנות לפי סוג רכב"
            description="כמות ההזמנות הגרירה לפי סוגי הרכבים שמוזמנים לגרירה בהזמנות"
            chart={{
              labels: typeNames,
              datasets: [
                {
                  label: "הזמנות לפי סוג רכב",
                  color: "mekatnar",
                  data: typesNumbers,
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {addFile()}
      {dashboard()}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
