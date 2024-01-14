/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Dialog, DialogContent } from "@mui/material";
import { setMiniSidenav, setOpenConfigurator, useMaterialUIController } from "context";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard" 
import PieChart from "examples/Charts/PieChart";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import MDTypography from "components/MDTypography";
import MilitaryIndustryForm from "layouts/Forms/kshirotMisgrot/MilitaryIndustryForm";
import CivilIndustryForm from "layouts/Forms/kshirotMisgrot/CivilIndustryForm";
import HoliyotForm from "layouts/Forms/kshirotMisgrot/HoliyotForm";
// import MDProgress from "components/MDProgress";
import MDCircularProgress from "components/MDCircularProgress";
// import CircularProgress from "@mui/material/CircularProgress";
import MDButton from "components/MDButton";

// Dashboard components
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart"

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
    garage: "בחר",
    // commanderNotes: "",
  });

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    console.log(value);
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
        console.log("מדפיס מערך פיקודים");
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

  

  // מקבל את כל המוסכים מהמסד נתונים
  useEffect(() => {
    axios
      .get(`http://localhost:5000/TowingLogApi/Garages`)
      .then((response) => {
        setGarages(response.data);
      })
      .catch((error) => {});
  }, []);

  // מקבל את כל הגרירות מהמסד נתונים
  useEffect(() => {
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
  }

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
    const filter1 = data.area === 'בחר' ? allOrders : allOrders.filter((order) => order.area === data.area);
    // סינון לפי סטטוס
    const filter2 = data.status === 'בחר' ? filter1 : filter1.filter((order) => order.status === data.status);
    // סינון לפי מוסך
    const garagesIDs = garages.map((garage) => garage._id);

    const filter3 = data.garage === 'בחר' ? filter2 : filter2.filter((order) => isValidGarage(order, garagesIDs));
    // סינון לפי תאריך הזמנה מינימלי
    const filter4 = data.fromDate === '' ? filter3 : filter3.filter((order) => order.orderDate >= data.fromDate);
    // סינון לפי תאריך הזמנה מקסימלי
    const filter5 = data.toDate === '' ? filter4 : filter4.filter((order) => order.orderDate <= data.toDate);

    // סינון לפי תאריך ביקוש מינימלי
    const filter6 = data.fromDamandDate === '' ? filter5 : filter5.filter((order) => order.demandDate >= data.fromDamandDate);
    // סינון לפי תאריך ביקוש מקסימלי
    const filter7 = data.toDamandDate === '' ? filter6 : filter6.filter((order) => order.demandDate <= data.toDamandDate);

    const carsNumberList = carsList.map((carInfo) => carInfo.carnumber);
    const filter8 = !isCarFiltered ? filter7 : filter7.filter((order) => carsNumberList.includes(order.carnumber));

    setFilteredOrders(filter8);
  }, [data, carsList, isCarFiltered]);
  console.log(filteredOrders);
  //   console.log(garages);

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
    return israelDate >= currentIsraelDate && israelDate < new Date(currentIsraelDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  }
  
  // מערך ההזמנות לפי כל יום בשבוע האחרון
  const daysArray = [0,0,0,0,0,0,0];
  filteredOrders.forEach((order) => {
    const date = new Date(order.demandDate);
    if(isInThisWeek(date))
    {
        const day = date.getDay();
        daysArray[day] += 1;
    }
  })

// מערך הזמנות לפי גוף מבצע

const indexObject ={
  "חברה אזרחית-גרירה" : 0,
  "חברה אזרחית – ניידת שירות" : 1,
  "צבאי" : 2,
  "מוביל כננת" : 3, 
  "": 4
  
}

const executiveBodyArr = [0,0,0,0,0];

filteredOrders.forEach(order => {
  // console.log(`${order.executiveBody} : ${indexObject[order.executiveBody]}`);
  const index = indexObject[order.executiveBody];
  executiveBodyArr[index] += 1;
})
console.log(executiveBodyArr);
  // מערך ההזמנות לפי סוג רכב
const carTypesId = [];


  const dashboard = () => (
    <>
      <MDButton onClick={() => setFilterOpen((prev) => !prev)} color="mekatnar" iconOnly sx={{
        marginBottom: 2
      }}>
        <Icon>edit</Icon>
      </MDButton>
      {filterOpen && (
        <MDBox py={3}>
          <Row>
            <Col
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
            </Col>
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
                  <option value={garage._id}>{garage.garageName}</option>
                ))}
                <option value="אחר">אחר</option>
              </Input>
            </Col>
          </Row>

          <Row>
            <Col>
              <h6>תאריך פתיחת ההזמנה</h6>
            </Col>
            <Col>
              <h6>תאריך מבוקש</h6>
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
        <Grid item xs={6}>

                <DefaultInfoCard
            icon="table_view"
            title="הזמנות גרריה"
            description="מספר הזמנות הגרירה שקיימות"
            value={filteredOrders.length}
            />
            </Grid>
            <Grid item xs={6}>
              <DefaultDoughnutChart
              icon={{color: "mekatnar", component : "assignment"}}
              title="גוף מבצע"
              description="אחוזי הזמנות לפי גוף מבצע"
              chart={{
                labels: ["חברה אזרחית-גרירה", "חברה אזרחית – ניידת שירות", "צבאי", "מוביל כננת", "לא מוגדר"],
                datasets: {
                  label: "גוף מבצע",
                  backgroundColors: ["primary", "dark", "info", "mekatnar", "error"],
                  data: executiveBodyArr,
                },
                
              }}
              />
            </Grid>
            <Grid item xs={6}>
                <VerticalBarChart
                    icon={{ color: "mekatnar", component: "event" }}
                    title="כמות הזמנות לפי יום בשבוע"
                    description="כמות ההזמנות הגרירה לפי כל יום בשבוע בשבוע הנוכחי"  
                    chart={{
                        labels: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
                        datasets: [{
                        label: "orders by day",
                        color: "mekatnar",
                        data: daysArray,
                        }],
                    }}
                    />
                </Grid>
            </Grid>
    </>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />

      {dashboard()}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
